import BaseError from "./baseError";

class NotFoundError extends BaseError {
    constructor(error_code: string, error_description: string = "Nenhuma leitura encontrada") {
        super(404, error_code, error_description);
    }
}

export default NotFoundError;