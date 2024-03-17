import Server from '../src/http/Server';
import ControllerFactory from "../src/factories/ControllerFactory";
import RouteFactory from "../src/factories/RouteFactory";
import request from 'supertest';


describe('Server', () => {
    it('should set up the server routes', () => {
        const controller = new ControllerFactory().create();
        const routes = new RouteFactory(controller, 'exampleGetRequest', 'get', '/example').create(1);
        const server = new Server(routes);

        expect(server).toBeDefined();
        expect(server.getRoutes()).toEqual(routes);

        request(server.app)
            .get('/example')
            .expect(200);
    });


});