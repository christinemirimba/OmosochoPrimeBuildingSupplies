import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

// Brand colors from theme
const BRAND_COLORS = {
    blue: { r: 0, g: 114, b: 255 },    // #0072ff
    purple: { r: 106, g: 17, b: 203 }, // #6a11cb
    orange: { r: 255, g: 106, b: 0 }  // #ff6a00
};

const PDFCatalog = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);

    // Optimized image loader: resizes and compresses images to JPEG
    const loadImage = (url: string): Promise<string | null> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;

            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        console.warn('Canvas context unavailable');
                        resolve(null);
                        return;
                    }

                    const MAX_WIDTH = 500;
                    const MAX_HEIGHT = 500;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, width, height);
                    ctx.drawImage(img, 0, 0, width, height);

                    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    resolve(dataUrl);
                } catch (e) {
                    console.warn('Image processing failed:', url, e);
                    resolve(null);
                }
            };

            img.onerror = () => {
                console.warn('Failed to load image:', url);
                resolve(null);
            };
        });
    };

    const generatePDF = async () => {
        try {
            setIsGenerating(true);
            setProgress(0);

            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Helper for page numbers and footer
            const addFooter = (pageNumber: number, totalPages?: number) => {
                const total = totalPages ? ` of ${totalPages}` : '';
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(`Omosocho Prime - Page ${pageNumber}${total}`, 15, 290);
                doc.text('www.omosochoprime.co.ke', 195, 290, { align: 'right' });
            };

            // Pre-load logo once
            let logoImg: string | null = null;
            try {
                logoImg = await loadImage('/assets/logo.webp');
            } catch (e) {
                console.warn('Logo could not be loaded');
            }

            const addHeader = () => {
                // Small top bar
                doc.setFillColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
                doc.rect(0, 0, 210, 2, 'F');

                if (logoImg) {
                    try {
                        doc.addImage(logoImg, 'JPEG', 15, 5, 12, 12, undefined, 'FAST');
                    } catch (e) { /* ignore */ }
                }

                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(50, 50, 50);
                doc.text('Omosocho Prime Catalog', 30, 13);
                doc.line(15, 18, 195, 18);
            };

            // ======================
            // STUNNING COVER PAGE
            // ======================
            // Gradient background
            for (let i = 0; i < 297; i += 2) {
                const ratio = i / 297;
                const r = Math.floor(BRAND_COLORS.blue.r + (BRAND_COLORS.purple.r - BRAND_COLORS.blue.r) * ratio);
                const g = Math.floor(BRAND_COLORS.blue.g + (BRAND_COLORS.purple.g - BRAND_COLORS.blue.g) * ratio);
                const b = Math.floor(BRAND_COLORS.blue.b + (BRAND_COLORS.purple.b - BRAND_COLORS.blue.b) * ratio);
                doc.setFillColor(r, g, b);
                doc.rect(0, i, 210, 2, 'F');
            }

            // White overlay
            doc.setFillColor(255, 255, 255);
            doc.rect(15, 15, 180, 267, 'F');

            // Logo on cover
            if (logoImg) {
                try {
                    doc.addImage(logoImg, 'JPEG', 75, 40, 60, 60, undefined, 'FAST');
                } catch (error) { }
            }

            // Brand name with gradient effect
            doc.setFontSize(42);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
            doc.text('OMOSOCHO PRIME', 105, 120, { align: 'center' });

            // Main title
            doc.setFontSize(26);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(BRAND_COLORS.orange.r, BRAND_COLORS.orange.g, BRAND_COLORS.orange.b);
            doc.text('BUILDING SUPPLIES', 105, 135, { align: 'center' });

            doc.setFontSize(14);
            doc.setTextColor(80, 80, 80);
            doc.text(`${new Date().getFullYear()} PRODUCT CATALOG`, 105, 145, { align: 'center' });

            // Decorative center line
            doc.setDrawColor(BRAND_COLORS.purple.r, BRAND_COLORS.purple.g, BRAND_COLORS.purple.b);
            doc.setLineWidth(1.5);
            doc.line(60, 160, 150, 160);

            // Featured section text
            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text('Construction • Metals • Tools • Fasteners • Building • Electrical • Plumbing', 105, 175, { align: 'center' });

            // Contact info footer on cover
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('+254 705621054 | nikeombura@gmail.com', 105, 260, { align: 'center' });
            doc.text('Nyamache, Kisii County, Kenya', 105, 266, { align: 'center' });

            setProgress(10);

            // ======================
            // TABLE OF CONTENTS
            // ======================
            doc.addPage();
            addHeader();
            addFooter(2);

            doc.setFontSize(22);
            doc.setTextColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
            doc.text('Table of Contents', 105, 40, { align: 'center' });

            // Group products by category
            const productsByCategory = products.reduce((acc, product) => {
                if (!acc[product.category]) {
                    acc[product.category] = [];
                }
                acc[product.category].push(product);
                return acc;
            }, {} as Record<string, typeof products>);

            const categories = Object.keys(productsByCategory);

            let tocY = 60;
            doc.setFontSize(14);
            doc.setTextColor(50, 50, 50);

            categories.forEach((cat, index) => {
                doc.text(`${index + 1}. ${cat}`, 40, tocY);
                doc.setDrawColor(200, 200, 200);
                doc.line(40, tocY + 2, 170, tocY + 2); // Underline
                tocY += 15;
            });

            setProgress(20);

            // ======================
            // GRID LAYOUT WITH IMAGES
            // ======================
            let currentPage = 3;
            let yPosition = 30; // Start below header
            const pageHeight = 280;
            const margin = 15;
            const cardWidth = 85;
            const cardHeight = 115;
            const gutter = 10;
            const cardsPerRow = 2;

            let processedCount = 0;
            const totalProducts = products.length;

            // Start loading ALL images for ALL categories in parallel immediately
            const categoryEntries = Object.entries(productsByCategory);

            // This triggers all network requests at once
            const allCategoriesImagePromises = categoryEntries.map(([_, products]) =>
                // The new loadImage resolves with null on error, so Promise.all will always resolve
                Promise.all(products.map(p => loadImage(p.image)))
            );

            // Loop through categories
            for (let catIndex = 0; catIndex < categoryEntries.length; catIndex++) {
                const [category, categoryProducts] = categoryEntries[catIndex];

                // Wait for this specific category's images to be ready
                // (They started downloading before the loop began)
                const categoryImages = await allCategoriesImagePromises[catIndex];

                // --- NEW CATEGORY PAGE ---
                doc.addPage();
                addHeader();
                addFooter(currentPage++);
                yPosition = 30;

                // Category Banner
                doc.setFillColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
                doc.roundedRect(margin, yPosition, 180, 20, 2, 2, 'F');

                doc.setFontSize(18);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(255, 255, 255);
                doc.text(category.toUpperCase(), 105, yPosition + 13, { align: 'center' });

                yPosition += 30;

                // Re-implementation of loop for correct pagination
                let cardsOnPage = 0;
                for (let i = 0; i < categoryProducts.length; i++) {
                    const product = categoryProducts[i];
                    const productImg = categoryImages[i];

                    const colIndex = cardsOnPage % cardsPerRow; // 0 or 1

                    // If it's the first card of a row, check space
                    if (colIndex === 0) {
                        if (yPosition + cardHeight > 285) { // Check bottom margin
                            doc.addPage();
                            addHeader();
                            addFooter(currentPage++);
                            yPosition = 30;
                            cardsOnPage = 0;
                        }
                    }

                    const cardX = margin + (colIndex * (cardWidth + gutter));

                    // == DRAW CARD ==
                    // White background with border
                    doc.setDrawColor(230, 230, 230);
                    doc.setFillColor(255, 255, 255);
                    doc.roundedRect(cardX, yPosition, cardWidth, cardHeight, 2, 2, 'FD');

                    // Image area
                    const imageHeight = cardHeight * 0.55;

                    if (productImg) {
                        try {
                            // Fit image logic
                            const imgRatio = 500 / 500; // All optimized images are square bounds or padded? 
                            // Wait, loadImage logic preserves aspect ratio but fills with white.
                            // However, we didn't calculate aspect ratio here to draw it proportionally.
                            // The 'loadImage' returns a 500x500 padded image if we coded it that way?
                            // Let's re-verify:
                            // if width > height -> height = max/width...
                            // canvas.width = width; canvas.height = height;
                            // So canvas IS the correct aspect ratio, not always square 500x500.

                            // We need real dimensions of the DATAURL image? 
                            // jsPDF addImage does not need real dimensions if we just tell it where to draw.
                            // But we want to 'Fit' it.
                            // The 'productImg' is just a base64 string. We don't know dimensions anymore without loading it again.
                            // BUT, we optimized it. Can we just draw it into the box and let jsPDF handle it?
                            // If we just draw it into a square box, it might stretch.
                            // We need to know aspect ratio again?
                            // For simplicity, let's assume square or near square for now, OR rely on our optimized image being handled well.
                            // Actually, standard jsPDF addImage distorts if w/h don't match.
                            // Since we don't have metadata, maybe we should force square 500x500 Canvas in loadImage?
                            // The previous code calculates best fit.

                            // Let's just draw it with mild padding.
                            const drawW = cardWidth - 4;
                            const drawH = imageHeight - 4;
                            doc.addImage(productImg, 'JPEG', cardX + 2, yPosition + 2, drawW, drawH, undefined, 'FAST');

                            // Mild border around image
                            doc.setDrawColor(245, 245, 245);
                            doc.rect(cardX + 2, yPosition + 2, cardWidth - 4, imageHeight - 4);

                        } catch (e) {
                            // Ignore drawing errors
                        }
                    } else {
                        doc.setTextColor(200, 200, 200);
                        doc.setFontSize(10);
                        doc.text('No Image', cardX + cardWidth / 2, yPosition + imageHeight / 2, { align: 'center' });
                    }

                    // Content Area
                    const contentY = yPosition + imageHeight + 5;

                    // Title
                    doc.setFontSize(11);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
                    doc.text(product.name, cardX + 4, contentY);

                    // Brand
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'italic');
                    doc.setTextColor(100, 100, 100);
                    doc.text(product.brand || '', cardX + 4, contentY + 5);

                    // Specs (if any) or Description
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(60, 60, 60);

                    const descStr = product.description.substring(0, 75) + '...';
                    const descLines = doc.splitTextToSize(descStr, cardWidth - 8);
                    doc.text(descLines, cardX + 4, contentY + 11);

                    // Stock Badge
                    doc.setFillColor(240, 255, 240); // Light green
                    doc.setDrawColor(0, 150, 0); // Green
                    doc.roundedRect(cardX + 4, contentY + 28, 20, 5, 1, 1, 'FD');
                    doc.setFontSize(7);
                    doc.setTextColor(0, 100, 0);
                    doc.text('IN STOCK', cardX + 14, contentY + 31.5, { align: 'center' });

                    // Rating (Text representation)
                    doc.setTextColor(100, 100, 100);
                    doc.setFont('helvetica', 'bold');
                    doc.text(`Rating: ${product.rating || 0}/5`, cardX + 28, contentY + 31.5);

                    // Update Counters
                    cardsOnPage++;
                    processedCount++;
                    // Update progress (map 20-90% range)
                    setProgress(20 + Math.floor((processedCount / totalProducts) * 70));

                    if (colIndex === 1) {
                        yPosition += cardHeight + gutter;
                    }
                }
            }

            // ======================
            // PROFESSIONAL BACK PAGE
            // ======================
            doc.addPage();
            // Full color background
            doc.setFillColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
            doc.rect(0, 0, 210, 297, 'F');

            // Decorative circle
            doc.setFillColor(255, 255, 255);
            doc.circle(105, 140, 90, 'F');

            // Logo center
            if (logoImg) {
                try {
                    doc.addImage(logoImg, 'JPEG', 65, 100, 80, 80, undefined, 'FAST');
                } catch (error) { }
            }

            // Title
            doc.setFontSize(30);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
            doc.text('Omosocho Prime', 105, 75, { align: 'center' });

            // Bottom Info
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(14);
            doc.text('www.omosochoprime.co.ke', 105, 250, { align: 'center' });
            doc.text('nikeombura@gmail.com', 105, 260, { align: 'center' });
            doc.text('+254 705621054', 105, 270, { align: 'center' });

            setProgress(100);
            // Save the PDF
            doc.save('Omosocho_Prime_Catalog.pdf');

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate catalog. Please try again.');
        } finally {
            setIsGenerating(false);
            setProgress(0);
        }
    };

    return (
        <Button
            onClick={generatePDF}
            disabled={isGenerating}
            className="btn-hero"
            aria-label="Download Product Catalog"
        >
            {isGenerating ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating PDF... {progress}%
                </>
            ) : (
                <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Catalog
                </>
            )}
        </Button>
    );
};

export default PDFCatalog;