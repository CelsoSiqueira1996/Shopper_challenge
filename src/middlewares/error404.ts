import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/notFoundError';

function error404(req: Request, res: Response, next: NextFunction) {
    const error404 = new NotFoundError("PAGE_NOT_FOUND", "Página não encontrada");
    next(error404);
}

export default error404;