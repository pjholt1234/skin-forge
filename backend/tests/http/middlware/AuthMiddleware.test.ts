import Server from '../../../src/http/Server';
import ControllerFactory from "../../../src/factories/ControllerFactory";
import RouteFactory from "../../../src/factories/RouteFactory";
import request from 'supertest';
import AuthMiddleware from "../../../src/http/middleware/AuthMiddleware";
import {withDatabase, withServer} from "../../../test-helpers";

let serverUtil: Server;
let app: any;
let server: any;

beforeEach(async () => {
    serverUtil = withServer();
    app = serverUtil.app;
    server = serverUtil.server;
});

afterEach(async () => {
    await server.close();
});


describe('Server', () => {
    it('should 403 on all routes', async () => {
        const controller = new ControllerFactory().create();
        const routes = new RouteFactory(controller, 'exampleGetRequest', [new AuthMiddleware()],'get', '/example').create(1);

        serverUtil.registerRoutes(routes);

        expect(app).toBeDefined();
        expect(serverUtil.getRoutes()).toEqual(routes);

        await request(app)
            .get('/example')
            .expect(403);
    });

    it('should have 200 response with correct auth header', async () => {
        const controller = new ControllerFactory().create();
        const routes = new RouteFactory(controller, 'exampleGetRequest', [new AuthMiddleware()],'get', '/example').create(1);

        serverUtil.registerRoutes(routes);

        expect(app).toBeDefined();
        expect(serverUtil.getRoutes()).toEqual(routes);
        
        await request(app)
            .get('/example')
            .set('Accept', 'application/json')
            .set('Authorization', 'ZXhhbXBsZS1zZWNyZXQ')
            .expect(200);
    });
});