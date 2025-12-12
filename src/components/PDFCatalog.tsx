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

    const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.crossOrigin = 'Anonymous';
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
        });
    };

    const generatePDF = async () => {
        try {
            setIsGenerating(true);
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

            const addHeader = async () => {
                // Small top bar
                doc.setFillColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
                doc.rect(0, 0, 210, 2, 'F');

                try {
                    const logoImg = await loadImage('/assets/logo.webp');
                    doc.addImage(logoImg, 'PNG', 15, 5, 12, 12, undefined, 'FAST');
                } catch (e) { /* ignore */ }

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
            for (let i = 0; i < 297; i += 2) { // Smoother gradient
                const ratio = i / 297;
                const r = Math.floor(BRAND_COLORS.blue.r + (BRAND_COLORS.purple.r - BRAND_COLORS.blue.r) * ratio);
                const g = Math.floor(BRAND_COLORS.blue.g + (BRAND_COLORS.purple.g - BRAND_COLORS.blue.g) * ratio);
                const b = Math.floor(BRAND_COLORS.blue.b + (BRAND_COLORS.purple.b - BRAND_COLORS.blue.b) * ratio);
                doc.setFillColor(r, g, b);
                doc.rect(0, i, 210, 2, 'F');
            }

            // White overlay with transparency (lighter this time)
            doc.setFillColor(255, 255, 255);
            doc.rect(15, 15, 180, 267, 'F');

            // Logo on cover
            try {
                const logoImg = await loadImage('/assets/logo.webp');
                doc.addImage(logoImg, 'PNG', 75, 40, 60, 60, undefined, 'FAST');
            } catch (error) {
                console.warn('Could not load logo:', error);
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

            // ======================
            // TABLE OF CONTENTS
            // ======================
            doc.addPage();
            await addHeader();
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


            // ======================
            // GRID LAYOUT WITH IMAGES
            // ======================
            let currentPage = 3;
            let yPosition = 30; // Start below header
            const pageHeight = 280;
            const margin = 15;
            const cardWidth = 85;
            const cardHeight = 115; // Slightly taller handling
            const gutter = 10;
            const cardsPerRow = 2;

            // Loop through categories
            for (const [category, categoryProducts] of Object.entries(productsByCategory)) {

                // --- NEW CATEGORY PAGE ---
                doc.addPage();
                await addHeader();
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

                // Process products in grid layout
                for (let productIndex = 0; productIndex < categoryProducts.length; productIndex++) {
                    const product = categoryProducts[productIndex];

                    // Check if we need a new page
                    if (yPosition + cardHeight > pageHeight) {
                        doc.addPage();
                        await addHeader();
                        addFooter(currentPage++);
                        yPosition = 30;
                    }

                    // Calculate card position
                    const rowIndex = Math.floor(productIndex / cardsPerRow);
                    const colIndex = productIndex % cardsPerRow;
                    const cardX = margin + (colIndex * (cardWidth + gutter));
                    const cardY = yPosition + (rowIndex * (cardHeight + gutter) - (yPosition === 30 ? 0 : 0)); // simple grid logic needs reset if new page? No, standard logic works if we reset productIndex per page... 
                    // Use simpler flow:
                    // If even index, it's left. If odd, it's right.
                    // Y only increases after odd index or end of array

                    // Correction for loop logic with pagination:
                    // We need separate tracking of "position on current page" vs "index in category"

                }

                // Re-implementation of loop for correct pagination
                let cardsOnPage = 0;
                for (let i = 0; i < categoryProducts.length; i++) {
                    const product = categoryProducts[i];
                    const colIndex = cardsOnPage % cardsPerRow; // 0 or 1

                    // If it's the first card of a row, check space
                    if (colIndex === 0) {
                        if (yPosition + cardHeight > 285) { // Check bottom margin
                            doc.addPage();
                            await addHeader();
                            addFooter(currentPage++);
                            yPosition = 30;
                            cardsOnPage = 0;
                        }
                    }

                    const cardX = margin + (colIndex * (cardWidth + gutter));
                    // Do not increase Y yet

                    // == DRAW CARD ==
                    // White background with border
                    doc.setDrawColor(230, 230, 230);
                    doc.setFillColor(255, 255, 255);
                    doc.roundedRect(cardX, yPosition, cardWidth, cardHeight, 2, 2, 'FD');

                    // Image area
                    const imageHeight = cardHeight * 0.55;

                    try {
                        const img = await loadImage(product.image);
                        // Fit image logic
                        const imgRatio = img.width / img.height;
                        const boxRatio = (cardWidth - 4) / (imageHeight - 4);

                        let drawW = cardWidth - 4;
                        let drawH = imageHeight - 4;
                        let dX = 2;
                        let dY = 2;

                        if (imgRatio > boxRatio) {
                            drawH = drawW / imgRatio;
                            dY = ((imageHeight - 4) - drawH) / 2 + 2;
                        } else {
                            drawW = drawH * imgRatio;
                            dX = ((cardWidth - 4) - drawW) / 2 + 2;
                        }

                        doc.addImage(img, 'JPEG', cardX + dX, yPosition + dY, drawW, drawH, undefined, 'FAST');

                        // Mild border around image
                        doc.setDrawColor(245, 245, 245);
                        doc.rect(cardX + 2, yPosition + 2, cardWidth - 4, imageHeight - 4);

                    } catch (e) {
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
                    doc.text(product.brand, cardX + 4, contentY + 5);

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
                    if (colIndex === 1) {
                        yPosition += cardHeight + gutter;
                    }
                }

                // If last row had only 1 item, advance Y anyway for next section flow check (though we force new page per category here)
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
            try {
                const logoImg = await loadImage('/assets/logo.webp');
                doc.addImage(logoImg, 'PNG', 65, 100, 80, 80, undefined, 'FAST');
            } catch (error) { }

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

            // Save the PDF
            doc.save('Omosocho_Prime_Catalog.pdf');

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate catalog. Please try again.');
        } finally {
            setIsGenerating(false);
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
                    Generating PDF...
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