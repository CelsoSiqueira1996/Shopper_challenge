import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    GEMINI_API_KEY: z.string(),
    PORT: z.coerce.number().default(3000)
})

export const env = envSchema.parse(process.env);