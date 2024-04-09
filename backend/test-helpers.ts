import DatabaseService from "./src/services/DatabaseService";
import createPrismaMock from "prisma-mock";
import {PrismaClient} from "@prisma/client";
import Server from "./src/http/Server";
import routes from "./src/http/routes";

export function withDatabase(): PrismaClient {
    return DatabaseService.getInstance(createPrismaMock()).getClient()
}

export async function refreshDatabase(): Promise<void> {
    let prisma: PrismaClient = DatabaseService.getInstance(createPrismaMock()).getClient();
    //const modelNames = Object.getOwnPropertyNames(prisma).filter(name => name !== 'constructor' && !name.includes('$') && !name.includes('_'));
    //todo Figure out a way of automating this
    await prisma.item.deleteMany({});
    await prisma.user.deleteMany({});
}

export function withServer(withAppRoutes: boolean = true): any {
    let server =  new Server();

    if(withAppRoutes) {
        server.registerRoutes(routes);
    }

    return server;
}