import DatabaseService from "./src/services/DatabaseService";
import createPrismaMock from "prisma-mock";
import {PrismaClient} from "@prisma/client";
import Server from "./src/http/Server";
import routes from "./src/http/routes";

export function withDatabase(): PrismaClient {
    return DatabaseService.getInstance(createPrismaMock()).getClient()
}

export function withServer(withAppRoutes: boolean = true): any {
    let server =  new Server();

    if(withAppRoutes) {
        server.registerRoutes(routes);
    }

    return server;
}