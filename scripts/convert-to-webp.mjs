import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '..', 'public', 'assets');

async function convertImages(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            await convertImages(filePath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                // Skip if .webp already exists to avoid redundant processing (optional)
                const name = path.basename(file, ext);
                const newFilePath = path.join(directory, `${name}.webp`);

                if (fs.existsSync(newFilePath)) {
                    console.log(`Skipping existing: ${name}.webp`);
                    continue;
                }

                console.log(`Converting: ${file} -> ${name}.webp`);
                try {
                    await sharp(filePath)
                        .webp({ quality: 80 }) // 80% quality is usually a good balance
                        .toFile(newFilePath);
                } catch (err) {
                    console.error(`Failed to convert ${file}:`, err);
                }
            }
        }
    }
}

console.log('Starting image conversion...');
convertImages(assetsDir)
    .then(() => console.log('Conversion complete!'))
    .catch(err => console.error('Error:', err));
