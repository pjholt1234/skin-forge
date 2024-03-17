import MiddlewareInterface from "../http/middleware/MiddlewareInterface";

type Route = {
    path: string;
    method: string;
    controller: any;
    controllerFunction: string;
    middleware: MiddlewareInterface[];
};

export default Route;