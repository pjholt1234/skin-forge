import Server from "./http/Server";
import routes from "./http//routes";
import importEnv from "./ImportEnv";
import DatabaseService from "./services/DatabaseService";
import Prisma from "./services/Prisma";

importEnv();
const server = new Server();
server.registerRoutes(routes);
DatabaseService.getInstance(Prisma.instance());

export { server };