import Server from "./http/Server";

import routes from "./http//routes";
import importEnv from "./ImportEnv";


importEnv();
const server = new Server(routes);

export { server };