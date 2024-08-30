import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import InvalidData from '../errors/invalidData';
import BaseError from '../errors/baseError';

function errorHandler(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    if(error instanceof ZodError) {
        new InvalidData(error).sendAnswer(res);
    } else if (error instanceof BaseError) {
        error.sendAnswer(res);
    } else {
        new BaseError().sendAnswer(res);
    }
    console.log(error);
}

export default errorHandler;