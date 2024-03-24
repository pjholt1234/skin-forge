
import UserFactory from "../../src/factories/UserFactory";
import {withDatabase, withServer} from "../../test-helpers";
import request from "supertest";
import Server from "../../src/http/Server";
import ItemFactory from "../../src/factories/ItemFactory";

describe('Auth controller', () => {
    let prisma: any;
    let serverUtil: Server;
    let app: any;
    let server: any;

    beforeEach(async () => {
        prisma = withDatabase();
        serverUtil = withServer(true);
        server = serverUtil.server;
        app = serverUtil.app;
    });

    afterEach(async () => {
        await server.close();
        await prisma.$disconnect();
    });

    it('GET /stickers - 403 without authorization', async () => {
        await request(app)
            .get('/stickers')
            .expect(403);
    });

    it('GET /stickers - returns object containing stickers', async () => {
        const stickers = await new ItemFactory(true, null,null, null,'Sticker').create(3);
        await new ItemFactory(true, null,null, null,'Nova').create(4);

        const response = await request(app)
            .get('/stickers')
            .set('Accept', 'application/json')
            .set('Authorization', 'ZXhhbXBsZS1zZWNyZXQ')
            .expect(200);

        expect(response.body).toHaveLength(3);

        response.body.map((item: any, index: number) => {
            expect(item.type).toBe('Sticker');
            expect(item.market_name).toBe(stickers[index].market_name);
            expect(item.price).toBe(stickers[index].price);
            expect(item.image_url).toBe(stickers[index].image_url);
            expect(item.inspect_url).toBe(stickers[index].inspect_url);
        });

    });

    it('GET /stickers - returns object containing other items', async () => {
        await new ItemFactory(true, null,null, null,'Sticker').create(3);
        const otherItems = await new ItemFactory(true).create(4);

        const response = await request(app)
            .get('/weapons')
            .set('Accept', 'application/json')
            .set('Authorization', 'ZXhhbXBsZS1zZWNyZXQ')
            .expect(200);

        expect(response.body).toHaveLength(4);

        response.body.map((item: any, index: number) => {
            expect(item.type).toBe(otherItems[index].type);
            expect(item.market_name).toBe(otherItems[index].market_name);
            expect(item.price).toBe(otherItems[index].price);
            expect(item.image_url).toBe(otherItems[index].image_url);
            expect(item.inspect_url).toBe(otherItems[index].inspect_url);
        });

    });
});
