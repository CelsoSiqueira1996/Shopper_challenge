import InvalidData from "../errors/invalidData";
import ReadingService from "../services/readingService";
import { Response, Request, NextFunction } from 'express';

const readingService = new ReadingService();

class ReadingController {
    static async uploadMeasure(req: Request, res: Response, next: NextFunction) {
        try {
            const { image_url, measure_value, measure_uuid} = await readingService.uploadMeasure(req.body);
            res.status(200).send({ image_url, measure_value, measure_uuid});
        } catch(error) {
            next(error);
        }
    }

    static async confirmMeasure(req: Request, res: Response, next: NextFunction) {
        const { measure_uuid: measureId, confirmed_value: confirmedValue } = req.body;
        try {
            await readingService.confirmMeasure(measureId, confirmedValue);
            res.status(200).send({ success: true });
        } catch(error) {
            next(error)
        }
    }

    static async listMeasures(req: Request, res: Response, next: NextFunction) {
        const { customer_code: customerCode } = req.params;
        const { measure_type = 'ALL' } = req.query;
        const measureType = String(measure_type).toUpperCase();
        const regexMeasure = new RegExp(/^WATER$|^GAS$|^ALL$/);
        try {
            if(!regexMeasure.test(measureType)) {
                throw new InvalidData();
            }
            const customer = await readingService.listMeasures(customerCode, measureType);
            res.status(200).send({ customer_code: customer.customer_code, measures: customer.measures })
        } catch(error) {
            next(error);
        }
    }
}

export default ReadingController;