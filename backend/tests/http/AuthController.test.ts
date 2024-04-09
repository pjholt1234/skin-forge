
import UserFactory from "../../src/factories/UserFactory";
import {refreshDatabase, withDatabase, withServer} from "../../test-helpers";
import request from "supertest";
import Server from "../../src/http/Server";

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
        await refreshDatabase();
    });

    it('POST /login - successful login', async () => {
        const password = 'password';
        const user = new UserFactory(null, null, password).create();

         await request(app)
            .post('/login')
            .send({ email: user.email, password })
            .expect(200);
    });

    it('POST /login - 403 with incorrect details', async () => {
        const password = 'example-password';
        const user = new UserFactory(null, null, 'password').create();

        await request(app)
            .post('/login')
            .send({ email: user.email, password })
            .expect(403);
    });

    it('POST /register - successful account creation', async () => {
        const userData = {
            email: 'test1@example.com',
            password: 'password',
            name: 'test',
        };

        await request(app)
            .post('/register')
            .send(userData)
            .expect(200);

        const user = await prisma.user.findUnique({
            where: {
                email: userData.email,
            }
        });

        expect(user).toBeTruthy();
        expect(user?.email).toBe(userData.email);
        expect(user?.name).toBe(userData.name);
    });

    it('POST /register - Fails account creation due to duplicate email', async () => {
        const email = 'test2@example.com';
        const existingUser = new UserFactory(email, 'user 2').create();

        const userData = {
            email: email,
            password: 'password',
            name: 'user 1',
        };

        await request(app)
            .post('/register')
            .send(userData)
            .expect(400)
            .expect({ email: 'Email already exists.' });

        const user = await prisma.user.findUnique({
            where: {
                name: userData.name,
            }
        });

        expect(user).toBeFalsy();
    });

    it('POST /register - Fails account creation due to invalid email', async () => {
        const userData = {
            email: 'blah blah',
            password: 'password',
            name: 'user 1',
        };

        await request(app)
            .post('/register')
            .send(userData)
            .expect(400);

        const user = await prisma.user.findUnique({
            where: {
                email: userData.email,
            }
        });

        expect(user).toBeFalsy();
    });

    it('POST /register - Fails account creation due to name too short', async () => {
        const userData = {
            email: 'test3@example.com',
            password: 'password',
            name: 's',
        };

        await request(app)
            .post('/register')
            .send(userData)
            .expect(400);

        const user = await prisma.user.findUnique({
            where: {
                email: userData.email,
            }
        });

        expect(user).toBeFalsy();
    });

    it('POST /register - Fails account creation due to password too short', async () => {
        const userData = {
            email: 'test4@example.com',
            password: 'short',
            name: 'Testing',
        };

        await request(app)
            .post('/register')
            .send(userData)
            .expect(400);

        const user = await prisma.user.findUnique({
            where: {
                email: userData.email,
            }
        });

        expect(user).toBeFalsy();
    });
});
