import { NextFunction, Request, Response } from "express";


export function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction) {
    res.status(400).json({
        error: err.message || 'Unexpected error'
    });
}