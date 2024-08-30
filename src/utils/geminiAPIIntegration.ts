import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../env";

export async function geminiApiIntegration(imagePath: string) {
    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    });

    const fileManager = new GoogleAIFileManager(env.GEMINI_API_KEY);

    const uploadResponse = await fileManager.uploadFile(imagePath, {
        mimeType: "image/png",
        displayName: "Measurement display",
    });

    const result = await model.generateContent([
        {
        fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri
        }
        },
        { text: "Return the numerical value shown on the measurement display. Return only the value, with no text." },
    ]);

    return({ imageUrl: uploadResponse.file.uri, readingResult: result.response.text()});
}