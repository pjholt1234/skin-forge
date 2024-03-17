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
        middleware: [AuthMiddleware]
    },
    {
        method: 'post',
        path: '/register',
        controller: AuthController,
        controllerFunction: 'register',
        middleware: [AuthMiddleware]
    },
    {
        method: 'get',
        path: '/stickers',
        controller: CraftController,
        controllerFunction: 'stickers',
        middleware: [AuthMiddleware]
    },
    {
        method: 'get',
        path: '/weapons',
        controller: CraftController,
        controllerFunction: 'weapons',
        middleware: [AuthMiddleware]
    }
];

export default routes;