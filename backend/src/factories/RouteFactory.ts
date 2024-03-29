import Factory from './Factory';
import Route from "../types/Route";
import ControllerInterface from "../http/controllers/ControllerInterface";
import MiddlewareInterface from "../http/middleware/MiddlewareInterface";

class RouteFactory extends Factory {
    constructor(
        public controller: ControllerInterface,
        public controllerFunction: string,
        public middleware: MiddlewareInterface[],
        public method? : string,
        public path?: string,
    ) {
        super();
    }

    protected fakeParameters(): void {
        if(!this.method) {
            this.method = this.faker.helpers.arrayElement(['get', 'post', 'put', 'delete']);
        }

        if(!this.path) {
            this.path = this.faker.system.filePath();
        }

        if(!this.middleware) {
            this.middleware = [];
        }
    }

    public create(count: number = 1): Route[]
    {
        const routes: Route[] = [];

        for (let i = 0; i < count; i++) {
            routes.push(this.createRoute());
        }

        return routes;
    }

    private createRoute(): Route
    {
        this.fakeParameters();

        if(!this.method || !this.path || !this.controller || !this.controllerFunction) {
            throw new Error('Invalid route.');
        }

        return {
            method: this.method,
            path: this.path,
            controller: this.controller,
            controllerFunction: this.controllerFunction,
            middleware: this.middleware
        }
    }
}

export default RouteFactory;