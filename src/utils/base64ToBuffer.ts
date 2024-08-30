import fs from 'fs/promises';
import path from 'path';

const folderPath = path.join(__dirname, '..', 'images');
const filePath = path.join(folderPath, 'image.png');

export async function base64ToBuffer(ImageBase64: string) {
    const base64Data = ImageBase64.replace(/^data:image\/\w+;base64,/, '');
    await saveImage(Buffer.from(base64Data, 'base64'));
    return filePath;
}

async function saveImage(imageBuffer: Buffer) {
    await fs.mkdir(folderPath, { recursive: true });
    await fs.writeFile(filePath, imageBuffer);
}



