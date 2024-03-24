import Route from '../types/Route';
import AuthController from "./controllers/AuthController";
import CraftController from "./controllers/CraftController";
import AuthMiddleware from "./middleware/AuthMiddleware";

const routes: Route[] = [
    {
        method: 'post',
        path: '/login',
        controller: AuthController,
        controllerFunction: 'login',
        middleware: []
    },
    {
        method: 'post',
        path: '/register',
        controller: AuthController,
        controllerFunction: 'register',
        middleware: []
    },
    {
        method: 'get',
        path: '/stickers',
        controller: CraftController,
        controllerFunction: 'stickers',
        middleware: [new AuthMiddleware()]
    },
    {
        method: 'get',
        path: '/weapons',
        controller: CraftController,
        controllerFunction: 'weapons',
        middleware: [new AuthMiddleware()]
    }
];

export default routes;