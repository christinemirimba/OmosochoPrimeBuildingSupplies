import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { products, Product } from '@/data/products';
import { categoryData } from '@/data/categoryImages';

// Extend jsPDF with autoTable
declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

export const generateCatalogPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;

    // Colors
    const primaryColor: [number, number, number] = [37, 99, 235]; // Blue #2563EB
    const accentColor: [number, number, number] = [234, 88, 12]; // Orange #EA580C
    const textColor: [number, number, number] = [30, 41, 59]; // Slate 800

    // Helper function to add page header
    const addPageHeader = (title: string) => {
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, pageWidth, 25, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(title, margin, 16);
        doc.setTextColor(...textColor);
    };

    // Helper function to add page footer
    const addPageFooter = (pageNumber: number) => {
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
        doc.text('Omosocho Prime Building Supplies | Nyamache, Kisii County, Kenya', pageWidth / 2, pageHeight - 5, { align: 'center' });
    };

    // ========== COVER PAGE ==========
    // Background gradient effect
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // White overlay for content area
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin - 5, 60, pageWidth - (margin * 2) + 10, pageHeight - 100, 5, 5, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.text('OMOSOCHO PRIME', pageWidth / 2, 35, { align: 'center' });
    doc.setFontSize(18);
    doc.text('BUILDING SUPPLIES', pageWidth / 2, 48, { align: 'center' });

    // Catalog subtitle
    doc.setTextColor(...textColor);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('PRODUCT CATALOG', pageWidth / 2, 85, { align: 'center' });

    // Year
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`${new Date().getFullYear()} Edition`, pageWidth / 2, 95, { align: 'center' });

    // Divider
    doc.setDrawColor(...accentColor);
    doc.setLineWidth(2);
    doc.line(margin + 20, 105, pageWidth - margin - 20, 105);

    // Description
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    const description = 'Your trusted partner for premium construction materials, tools, and hardware in Kisii County and surrounding areas. Quality products, competitive prices, and reliable service.';
    const descLines = doc.splitTextToSize(description, pageWidth - (margin * 2) - 20);
    doc.text(descLines, pageWidth / 2, 120, { align: 'center' });

    // Stats
    const stats = [
        { value: '90+', label: 'Products' },
        { value: '9', label: 'Categories' },
        { value: '20+', label: 'Brands' },
    ];
    let statX = margin + 30;
    const statY = 155;
    stats.forEach((stat) => {
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...primaryColor);
        doc.text(stat.value, statX, statY, { align: 'center' });
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(stat.label, statX, statY + 8, { align: 'center' });
        statX += 55;
    });

    // Contact Information Box
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, 180, pageWidth - (margin * 2), 55, 3, 3, 'F');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text('CONTACT US', pageWidth / 2, 192, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textColor);
    const contactInfo = [
        '📍 Nyamache, Kisii County, Kenya',
        '📞 +254 705621054',
        '✉️ nikeombura@gmail.com',
        '📱 TikTok: @omosocho_prime',
    ];
    let contactY = 205;
    contactInfo.forEach((info) => {
        doc.text(info, pageWidth / 2, contactY, { align: 'center' });
        contactY += 9;
    });

    // Footer on cover
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('www.omosochoprime.com', pageWidth / 2, pageHeight - 15, { align: 'center' });

    // ========== CATEGORY PAGES ==========
    let currentPage = 2;

    // Group products by category
    const productsByCategory: Record<string, Product[]> = {};
    products.forEach(product => {
        if (!productsByCategory[product.category]) {
            productsByCategory[product.category] = [];
        }
        productsByCategory[product.category].push(product);
    });

    // Generate pages for each category
    for (const category of categoryData) {
        const categoryProducts = productsByCategory[category.id] || [];
        if (categoryProducts.length === 0) continue;

        doc.addPage();
        addPageHeader(`${category.name}`);

        // Category description
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text(category.description, margin, 38);

        // Products table
        const tableData = categoryProducts.map(product => [
            product.name,
            product.brand || '-',
            product.description.substring(0, 80) + (product.description.length > 80 ? '...' : ''),
            product.rating ? `${product.rating}★` : '-',
            product.inStock ? 'In Stock' : 'Out of Stock'
        ]);

        doc.autoTable({
            startY: 48,
            head: [['Product Name', 'Brand', 'Description', 'Rating', 'Availability']],
            body: tableData,
            margin: { left: margin, right: margin },
            headStyles: {
                fillColor: primaryColor,
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                fontSize: 9,
            },
            bodyStyles: {
                fontSize: 8,
                textColor: textColor,
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252],
            },
            columnStyles: {
                0: { cellWidth: 35 },
                1: { cellWidth: 25 },
                2: { cellWidth: 70 },
                3: { cellWidth: 15 },
                4: { cellWidth: 22 },
            },
        });

        addPageFooter(currentPage);
        currentPage++;
    }

    // ========== ALL PRODUCTS SUMMARY PAGE ==========
    doc.addPage();
    addPageHeader('Complete Product Index');

    const allProductsData = products.map(product => [
        product.id.toString(),
        product.name,
        product.category,
        product.brand || '-',
    ]);

    doc.autoTable({
        startY: 35,
        head: [['#', 'Product Name', 'Category', 'Brand']],
        body: allProductsData,
        margin: { left: margin, right: margin },
        headStyles: {
            fillColor: primaryColor,
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 9,
        },
        bodyStyles: {
            fontSize: 7,
            textColor: textColor,
        },
        alternateRowStyles: {
            fillColor: [248, 250, 252],
        },
        columnStyles: {
            0: { cellWidth: 12 },
            1: { cellWidth: 60 },
            2: { cellWidth: 35 },
            3: { cellWidth: 45 },
        },
    });

    addPageFooter(currentPage);

    // ========== BACK COVER ==========
    doc.addPage();

    // Background
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Content
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Thank You!', pageWidth / 2, 60, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('For choosing Omosocho Prime Building Supplies', pageWidth / 2, 75, { align: 'center' });

    // Contact box
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin + 10, 95, pageWidth - (margin * 2) - 20, 100, 5, 5, 'F');

    doc.setTextColor(...textColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Get in Touch', pageWidth / 2, 115, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const finalContact = [
        'Visit Us: Nyamache, Kisii County, Kenya',
        'Call Us: +254 705621054',
        'Email: nikeombura@gmail.com',
        '',
        'Business Hours:',
        'Monday - Friday: 8:00 AM - 6:00 PM',
        'Sunday: 8:00 AM - 6:00 PM',
        'Saturday: Closed',
    ];
    let finalY = 130;
    finalContact.forEach((line) => {
        doc.text(line, pageWidth / 2, finalY, { align: 'center' });
        finalY += 9;
    });

    // Tagline
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text('"Building Dreams, One Material at a Time"', pageWidth / 2, pageHeight - 40, { align: 'center' });

    // Generated date
    doc.setFontSize(9);
    doc.text(`Catalog generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 15, { align: 'center' });

    // Save the PDF
    doc.save('Omosocho_Prime_Product_Catalog.pdf');
};
