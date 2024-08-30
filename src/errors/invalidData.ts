import { ZodError } from "zod";
import BaseError from "./baseError";

class InvalidData extends BaseError {
    constructor(error?: ZodError) {
        if(error) {
            const errorMessages = error.errors.map((issue: any) => {
                return `${issue.path.join('.')} is ${issue.message}`;            
            }).join('; ');
            super(400, "INVALID_DATA", errorMessages)
        } else {
            super(400, "INVALID_TYPE",  "Tipo de medição não permitida");
        }
    }
}

export default InvalidData;