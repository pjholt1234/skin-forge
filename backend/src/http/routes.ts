import Route from '../types/Route';
import AuthController from "./controllers/AuthController";

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
];

export default routes;