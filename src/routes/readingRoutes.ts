import express from 'express';
import { validateDataBody } from '../middlewares/validationMiddleware';
import { readingConfirmSchema, readingRegistrationSchema } from '../schemas/readingSchemas';
import ReadingController from '../controllers/readingController';

const readingRoutes = express.Router();

readingRoutes
    .get('/:customer_code/list', ReadingController.listMeasures)
    .post('/upload', validateDataBody(readingRegistrationSchema), ReadingController.uploadMeasure)
    .patch('/confirm', validateDataBody(readingConfirmSchema), ReadingController.confirmMeasure)

export default readingRoutes;