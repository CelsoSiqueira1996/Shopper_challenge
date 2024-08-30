import { Response } from 'express';

class BaseError extends Error {
    status: number;
    error_description: string;
    error_code: string;
    constructor(
        status: number = 500, 
        error_code: string = "SERVER_ERROR", 
        error_description: string = "Erro interno do servidor"
    ) {
        super();
        this.status = status;
        this.error_description = error_description;
        this.error_code = error_code;
    }

    sendAnswer(res: Response) {
        res.status(this.status).send(
            { error_code: this.error_code, error_description: this.error_description }
        );
    }
}

export default BaseError;