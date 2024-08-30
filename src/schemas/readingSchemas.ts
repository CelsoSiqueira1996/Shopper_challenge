import { z } from 'zod';

const isNotBlank = (fieldValue: string) => String(fieldValue).trim() !== '';

export const readingRegistrationSchema = z.object({
  image: z.string().base64().refine( isNotBlank, { message: "Blank. The field should have a value"}),
  customer_code: z.string().refine( isNotBlank, { message: "Blank. The field should have a value"}),
  measure_datetime: z.coerce.date(),
  measure_type: z.enum(['WATER', 'GAS'])
});

export const readingConfirmSchema = z.object({
    measure_uuid: z.string().uuid(),
    confirmed_value: z.number().int()
});
