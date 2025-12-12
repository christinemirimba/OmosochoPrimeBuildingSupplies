import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.ts');

try {
    let content = fs.readFileSync(productsPath, 'utf8');

    // Replace .jpg" and .png" with .webp"
    // Using simple replacement for paths ending in quote
    const newContent = content
        .replace(/\.jpg"/g, '.webp"')
        .replace(/\.png"/g, '.webp"');

    fs.writeFileSync(productsPath, newContent);
    console.log('Successfully updated product image references to WebP');
} catch (error) {
    console.error('Error updating products.ts:', error);
}
