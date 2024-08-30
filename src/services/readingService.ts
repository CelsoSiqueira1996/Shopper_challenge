import { env } from "../env";
import BaseError from "../errors/baseError";
import DuplicateError from "../errors/duplicateError";
import NotFoundError from "../errors/notFoundError";
import { prisma } from "../lib/prisma";
import { IUpload } from "../types/IUpload";
import { base64ToBuffer } from "../utils/base64ToBuffer";
import { geminiApiIntegration } from "../utils/geminiAPIIntegration";

class ReadingService {
    async uploadMeasure(dto: IUpload) {
        const { image, 
            customer_code: customerCode, 
            measure_datetime: measureDatetime, 
            measure_type: measureType 
        } = dto;

        const date = new Date(measureDatetime);
        const monthFirstDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
        const monthLastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));

        try {
            const measure = await prisma.measure.findFirst({
                where: {
                    AND: [
                        { measure_datetime: {
                            gte: monthFirstDay,
                            lte: monthLastDay
                        } },
                        { measure_type: measureType },
                        { customer_code: customerCode }
                    ]
                }
            })
            if(measure) throw new DuplicateError("DOUBLE_REPORT", "Leitura do mês já realizada");

            const imagePath = await base64ToBuffer(image);
            const { imageUrl, readingResult } = await geminiApiIntegration(imagePath);
            const measureValue = parseInt(readingResult);

            if(!measureValue) throw new BaseError(400, "INVALID_DATA", "Não foi possível fazer a leitura da medição a partir da imagem fornecida");

            await this.checkAndCreateCustomer(customerCode);

            const createMeasure = await prisma.measure.create({
                data: {
                    image_url: imageUrl,
                    measure_datetime: date,
                    measure_type: measureType,
                    customer_code: customerCode,
                    measure_value: measureValue,                   
                }
            });

            return createMeasure;

        } catch(error) {
            throw error;
        }
    }

    async confirmMeasure(measureId: string, confirmedValue: number) {
        try {
            const measure = await prisma.measure.findUnique({
                where: {
                    measure_uuid: measureId
                }
            });
    
            if(!measure) throw new NotFoundError("MEASURE_NOT_FOUND");
            if(measure.has_confirmed) throw new DuplicateError("CONFIRMATION_DUPLICATE", "Leitura do mês já confirmada");
            
            await prisma.measure.update({
                where: {
                    measure_uuid: measureId
                },
                data: {
                    measure_value: confirmedValue,
                    has_confirmed: true
                }
            });

            return;

        } catch(error) {
            throw error;
        }
    }

    async listMeasures(customerCode: string, measureType: string) {
        try {
            const customer = await prisma.customer.findUnique({
                where: {
                    customer_code: customerCode
                },
                include: {
                    measures: {
                        where: {
                            measure_type: measureType !== 'ALL'
                                ? measureType 
                                :{ in: ['WATER', 'GAS'] }
                        },
                        select: {
                            measure_uuid: true,
                            measure_datetime: true,
                            measure_type: true,
                            has_confirmed:true,
                            image_url: true
                        }
                    }
                }
            });

            if(!customer) throw new NotFoundError("CUSTOMER_NOT_FOUND", "Cliente não encontrado");
            if(!customer.measures.length) throw new NotFoundError("MEASURES_NOT_FOUND");
    
            return customer;
        } catch(error) {
            throw error;
        }
    }

    async checkAndCreateCustomer(customerCode: string) {
        await prisma.customer.upsert({
            where: {
                customer_code: customerCode
            },
            update: {

            },
            create: {
                customer_code: customerCode
            }
        });
    }
}

export default ReadingService;
