import express from "express";

interface MiddlewareInterface {
    action(req: express.Request, res: express.Response, next: express.NextFunction): void;
}

export default MiddlewareInterface;