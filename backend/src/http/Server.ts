import express from "express";
import cors from "cors";
import Route from "../types/Route";
import http from "http";
import MiddlewareInterface from "./middleware/MiddlewareInterface";

class Server {
    public app: express.Application;
    public server: http.Server | null = null;

    private routes: Route[] = [];

    constructor() {
        this.app = express();
        this.start();
    }

    private start(): void {
        this.app.use(express.json());
        this.app.use(cors());

        this.server = this.app.listen(process.env.APP_PORT, () => {
            console.log(`Server is running on port ${process.env.APP_PORT}`);
        });
    }

    public stop(): void {
        process.on('SIGINT',
            () => setTimeout(() => {
                console.log(' Shutting down application');
                if (this.server) {
                    this.server.close(function () {
                        console.log('All requests stopped, shutting down');
                        process.exit();
                    });
                } else {
                    console.log('Application closed already');
                }
            }, 0)
        );
    }

    public registerRoutes(routes: Route[]): void {
        this.routes = routes;
        // @ts-ignore
        this.routes.map((route: Route) => {
            const requestType = route.method as keyof express.Application;
            const Controller = route.controller;
            const controllerFunction =
                route.controllerFunction as keyof typeof Controller;

            if (
                typeof this.app[requestType] !== "function" ||
                typeof Controller[controllerFunction] !== "function"
            ) {
                // @ts-ignore
                throw new Error("Invalid route.");
            }


            let middlewares: any = [];

            if(route.middleware?.length > 0) {
                middlewares = this.prepareMiddleware(route.middleware);
            }

            this.app[requestType](
                route.path,
                middlewares,
                (req: Request, res: Response) =>
                    Controller[controllerFunction](req, res),
            );
        });
    }

    private prepareMiddleware(middlewares: MiddlewareInterface[]) {
        return middlewares.map((middleware: MiddlewareInterface) => {
            return middleware.action;
        });
    }

    public getRoutes(): Route[] {
        return this.routes;
    }
}

export default Server;