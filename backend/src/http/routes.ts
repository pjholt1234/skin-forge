import Route from '../types/Route';
import AuthController from "./controllers/AuthController";
import CraftController from "./controllers/CraftController";

const routes: Route[] = [
    {
        method: 'post',
        path: '/login',
        controller: AuthController,
        controllerFunction: 'login'
    },
    {
        method: 'post',
        path: '/register',
        controller: AuthController,
        controllerFunction: 'register'
    },
    {
        method: 'get',
        path: '/stickers',
        controller: CraftController,
        controllerFunction: 'stickers'
    }
];

export default routes;