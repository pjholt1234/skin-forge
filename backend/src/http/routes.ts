import Route from '../types/Route';
import AuthController from "./controllers/AuthController";

const routes: Route[] = [
    {
        method: 'post',
        path: '/',
        controller: AuthController,
        controllerFunction: 'login'
    },
];

export default routes;