import MiddlewareInterface from "./MiddlewareInterface";
import express from "express";

class AuthMiddleware implements MiddlewareInterface {
    constructor() {}
    public action(req: express.Request, res: express.Response, next: express.NextFunction) {
        const authorizationHeader = req.headers["authorization"];

        if (!authorizationHeader) {
            return res.status(403).send("Authentication required.");
        }

        const decodedCredentials = Buffer.from(
            authorizationHeader,
            "base64",
        ).toString("utf-8");

        if (decodedCredentials !== process.env.BASIC_AUTH_SECRET) {
            return res.status(403).send("Authentication failed.");
        }

        next();
    }
}

export default AuthMiddleware;