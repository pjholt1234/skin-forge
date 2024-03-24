import Server from '../src/http/Server';
import ControllerFactory from "../src/factories/ControllerFactory";
import RouteFactory from "../src/factories/RouteFactory";
import request from 'supertest';
import AuthMiddleware from "../src/http/middleware/AuthMiddleware";
import {withServer} from "../test-helpers";

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
    it('should set up the server routes', async () => {
        const controller = new ControllerFactory().create();
        const routes = new RouteFactory(controller, 'exampleGetRequest', [],'get', '/example').create(1);

        serverUtil.registerRoutes(routes);

        expect(app).toBeDefined();
        expect(serverUtil.getRoutes()).toEqual(routes);

        await request(app)
            .get('/example')
            .expect(200);
    });

    it('should implement middleware on routes', async () => {
        const controller = new ControllerFactory().create();
        const routes = new RouteFactory(controller, 'exampleGetRequest', [new AuthMiddleware()],'get', '/example').create(1);

        serverUtil.registerRoutes(routes);

        expect(app).toBeDefined();
        expect(serverUtil.getRoutes()).toEqual(routes);

        await request(app)
            .get('/example')
            .expect(403);
    });
});