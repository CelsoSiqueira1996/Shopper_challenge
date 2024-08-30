import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(__dirname, '..', 'images', 'image.png');

export async function base64ToBuffer(ImageBase64: string) {
    const base64Data = ImageBase64.replace(/^data:image\/\w+;base64,/, '');
    await saveImage(Buffer.from(base64Data, 'base64'));
    return filePath;
}

async function saveImage(imageBuffer: Buffer) {
    await fs.writeFile(filePath, imageBuffer);
}



