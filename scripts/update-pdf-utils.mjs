import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'src', 'utils', 'pdfUtils.ts');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace .jpg with .webp
    content = content.replace(/\.jpg/g, '.webp');
    // Replace .png with .webp
    content = content.replace(/\.png/g, '.webp');

    fs.writeFileSync(filePath, content);
    console.log('Successfully updated pdfUtils.ts image references to WebP');
} catch (error) {
    console.error('Error updating pdfUtils.ts:', error);
}
