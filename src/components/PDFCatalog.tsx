import { jsPDF } from 'jspdf';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

// Brand colors from theme
const BRAND_COLORS = {
    blue: { r: 0, g: 114, b: 255 },    // #0072ff
    purple: { r: 106, g: 17, b: 203 }, // #6a11cb
    orange: { r: 255, g: 106, b: 0 }  // #ff6a00
};

const PDFCatalog = () => {
    const generatePDF = async () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // ======================
        // STUNNING COVER PAGE
        // ======================
        // Gradient background
        for (let i = 0; i < 297; i += 5) {
            const ratio = i / 297;
            const r = Math.floor(BRAND_COLORS.blue.r + (BRAND_COLORS.purple.r - BRAND_COLORS.blue.r) * ratio);
            const g = Math.floor(BRAND_COLORS.blue.g + (BRAND_COLORS.purple.g - BRAND_COLORS.blue.g) * ratio);
            const b = Math.floor(BRAND_COLORS.blue.b + (BRAND_COLORS.purple.b - BRAND_COLORS.blue.b) * ratio);
            doc.setFillColor(r, g, b);
            doc.rect(0, i, 210, 5, 'F');
        }

        // White overlay with transparency
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 210, 297, 'F');

        // Brand name with gradient effect
        doc.setFontSize(40);
        doc.setFont('helvetica', 'bold');

        // Create gradient effect by overlaying colors
        doc.setTextColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
        doc.text('Omosocho Prime', 105, 60, { align: 'center' });

        // Main title
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(BRAND_COLORS.orange.r, BRAND_COLORS.orange.g, BRAND_COLORS.orange.b);
        doc.text('Building Supplies', 105, 80, { align: 'center' });

        // Tagline
        doc.setFontSize(16);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100, 100, 100);
        doc.text('Premium Construction Materials & Tools', 105, 90, { align: 'center' });

        // Decorative elements
        doc.setDrawColor(BRAND_COLORS.purple.r, BRAND_COLORS.purple.g, BRAND_COLORS.purple.b);
        doc.setLineWidth(1);
        doc.line(30, 100, 180, 100);

        // Featured section
        doc.setFontSize(14);
        doc.setTextColor(120, 120, 120);
        doc.text('🏗️ Quality Materials for Your Construction Projects', 105, 110, { align: 'center' });

        // Contact info footer
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text('📞 +254 705621054 | 📧 nikeombura@gmail.com | 🌐 www.omosochoprime.co.ke', 105, 285, { align: 'center' });

        // Add main content page
        doc.addPage();

        // ======================
        // VISUALLY STUNNING GRID LAYOUT
        // ======================
        let yPosition = 20;
        const pageHeight = 280;
        const margin = 15;
        const cardWidth = 85;
        const cardHeight = 110;
        const gutter = 10;
        const cardsPerRow = 2;

        // Group products by category
        const productsByCategory = products.reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {} as Record<string, typeof products>);

        // Process each category
        Object.entries(productsByCategory).forEach(([category, categoryProducts]) => {
            // Category header with gradient
            if (yPosition + cardHeight > pageHeight) {
                doc.addPage();
                yPosition = 20;
            }

            // Gradient header background
            doc.setFillColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
            doc.rect(margin, yPosition, 180, 12, 'F');

            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text(category, margin + 5, yPosition + 8);

            yPosition += 20;

            // Process products in grid layout
            categoryProducts.forEach((product, productIndex) => {
                // Check if we need a new page
                if (yPosition + cardHeight > pageHeight) {
                    doc.addPage();
                    yPosition = 20;
                }

                // Calculate card position
                const rowIndex = Math.floor(productIndex / cardsPerRow);
                const colIndex = productIndex % cardsPerRow;
                const cardX = margin + (colIndex * (cardWidth + gutter));
                const cardY = yPosition + (rowIndex * (cardHeight + gutter));

                // Product card with shadow effect
                doc.setDrawColor(220, 220, 220);
                doc.setLineWidth(0.5);
                doc.rect(cardX, cardY, cardWidth, cardHeight);

                // Add subtle shadow
                doc.setFillColor(245, 245, 245);
                doc.rect(cardX + 2, cardY + 2, cardWidth, cardHeight);

                // Product image area (top 60% of card)
                const imageHeight = cardHeight * 0.6;
                doc.setDrawColor(240, 240, 240);
                doc.rect(cardX + 5, cardY + 5, cardWidth - 10, imageHeight - 5);

                // Image placeholder with product name
                doc.setFontSize(8);
                doc.setTextColor(180, 180, 180);
                const imageText = `📷 ${product.name}`;
                const imageTextLines = doc.splitTextToSize(imageText, cardWidth - 10);
                doc.text(imageTextLines, cardX + cardWidth/2, cardY + imageHeight/2, { align: 'center' });

                // Product info area (bottom 40% of card)
                const infoY = cardY + imageHeight + 5;

                // Product name - bold with brand color
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
                const nameLines = doc.splitTextToSize(product.name, cardWidth - 10);
                doc.text(nameLines, cardX + 5, infoY);

                // Brand - small italic
                doc.setFontSize(8);
                doc.setFont('helvetica', 'italic');
                doc.setTextColor(120, 120, 120);
                doc.text(`by ${product.brand}`, cardX + 5, infoY + (nameLines.length * 4));

                // Description - short preview
                doc.setFontSize(8);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(80, 80, 80);
                const shortDesc = product.description.substring(0, 60) + '...';
                const descLines = doc.splitTextToSize(shortDesc, cardWidth - 10);
                doc.text(descLines, cardX + 5, infoY + (nameLines.length * 4) + 6);

                // Price/availability - green with icon
                doc.setFontSize(9);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 150, 0);
                doc.text('✅ In Stock • Contact for Price', cardX + 5, infoY + (nameLines.length * 4) + 18);

                // Move to next position
                if ((productIndex + 1) % cardsPerRow === 0) {
                    yPosition += cardHeight + gutter;
                }
            });

            // Add space between categories
            yPosition += 25;
        });

        // ======================
        // PROFESSIONAL BACK PAGE
        // ======================
        doc.addPage();

        // Branding section with gradient
        doc.setFillColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
        doc.rect(0, 0, 210, 80, 'F');

        // Brand name with gradient effect
        doc.setFontSize(36);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text('Omosocho Prime', 105, 40, { align: 'center' });

        doc.setFontSize(18);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(255, 255, 255);
        doc.text('Your Trusted Construction Partner', 105, 60, { align: 'center' });

        // Contact information
        doc.setFontSize(16);
        doc.setTextColor(BRAND_COLORS.orange.r, BRAND_COLORS.orange.g, BRAND_COLORS.orange.b);
        doc.text('📞 Get In Touch', 105, 100, { align: 'center' });

        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);

        const contactInfo = [
            { icon: '📍', label: 'Address:', value: 'Nyamache, Kisii County, Kenya' },
            { icon: '📞', label: 'Phone:', value: '+254 705621054' },
            { icon: '📧', label: 'Email:', value: 'nikeombura@gmail.com' },
            { icon: '🌐', label: 'Website:', value: 'www.omosochoprime.co.ke' },
            { icon: '⏰', label: 'Hours:', value: 'Mon-Sat: 7AM-6PM, Sun: 8AM-2PM' }
        ];

        let infoY = 120;
        contactInfo.forEach(item => {
            doc.setFont('helvetica', 'bold');
            doc.text(`${item.icon} ${item.label}`, 40, infoY);

            doc.setFont('helvetica', 'normal');
            doc.text(item.value, 80, infoY);

            infoY += 10;
        });

        // Social media
        infoY += 15;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(BRAND_COLORS.purple.r, BRAND_COLORS.purple.g, BRAND_COLORS.purple.b);
        doc.text('🔗 Connect With Us', 105, infoY, { align: 'center' });

        infoY += 8;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        doc.text('Facebook | Instagram | Twitter | LinkedIn | WhatsApp', 105, infoY, { align: 'center' });

        // Footer
        infoY = 280;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('© 2025 Omosocho Prime Building Supplies. All Rights Reserved.', 105, infoY, { align: 'center' });
        infoY += 5;
        doc.setFontSize(8);
        doc.text('Serving Kisii, Nyamache and surrounding areas with premium construction materials.', 105, infoY, { align: 'center' });
        infoY += 5;
        doc.text('Quality you can trust. Service you can rely on.', 105, infoY, { align: 'center' });

        // Save the PDF
        doc.save('Omosocho_Prime_Building_Supplies_Catalog.pdf');
    };

    return (
        <Button
            onClick={generatePDF}
            className="btn-hero"
            aria-label="Download Product Catalog"
        >
            <Download className="w-4 h-4 mr-2" />
            Download Catalog
        </Button>
    );
};

export default PDFCatalog;