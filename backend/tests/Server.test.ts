import Server from '../src/http/Server';
import ControllerFactory from "../src/factories/ControllerFactory";
import RouteFactory from "../src/factories/RouteFactory";
import request from 'supertest';

let serverUtil: Server;
let app: any;
let server: any;

beforeEach(async () => {
    serverUtil = new Server();
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
});