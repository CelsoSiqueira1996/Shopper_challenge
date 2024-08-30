import BaseError from "./baseError";

class DuplicateError extends BaseError {
    constructor(error_code: string, error_description: string) {
        super(409, error_code, error_description);
    }
}

export default DuplicateError;