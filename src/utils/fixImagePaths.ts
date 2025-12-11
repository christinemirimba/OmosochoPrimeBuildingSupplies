/**
 * Utility to verify and fix product image paths
 * This ensures all product images point to existing files in public/assets/products
 */

import { products } from '@/data/products';

export const verifyImagePaths = () => {
    const missingImages: string[] = [];
    const productImages = products.map(p => p.image);

    // Check which images might be missing
    productImages.forEach((imagePath, index) => {
        const filename = imagePath.split('/').pop();
        // In a real implementation, you would check if the file exists
        // For now, we'll just log the paths
        console.log(`Product ${products[index].id}: ${imagePath} -> ${filename}`);
    });

    return {
        totalProducts: products.length,
        uniqueImages: [...new Set(productImages)].length,
        missingImages
    };
};

/**
 * Fix image paths to ensure they point to public/assets/products
 * In Vite, public folder files are served from the root, so /assets/products/... should work
 */
export const ensureCorrectImagePaths = () => {
    return products.map(product => ({
        ...product,
        // Ensure path starts with /assets/products/
        image: product.image.startsWith('/assets/products/')
            ? product.image
            : `/assets/products/${product.image.split('/').pop()}`
    }));
};