import { jsPDF } from 'jspdf';

interface PlanData {
  projectName?: string;
  projectType?: string;
  buildingType?: string;
  length?: string;
  width?: string;
  height?: string;
  floors?: string;
  roofingMaterial?: string;
  wallMaterial?: string;
  flooringMaterial?: string;
  additionalNotes?: string;
}

// Brand colors matching the main theme
const BRAND_COLORS = {
  blue: { r: 0, g: 114, b: 255 },    // #0072ff
  purple: { r: 106, g: 17, b: 203 }, // #6a11cb
  orange: { r: 255, g: 106, b: 0 }  // #ff6a00
};

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
};

export const generateSimplePDF = (data: PlanData): Promise<Blob> => {
  return new Promise(async (resolve) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // --- BRANDED HEADER ---
      // Small top bar gradient
      const totalHeaderWidth = 210;
      doc.setFillColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
      doc.rect(0, 0, totalHeaderWidth, 3, 'F');

      // Logo in header
      try {
        const logoImg = await loadImage('/assets/logo.webp');
        doc.addImage(logoImg, 'PNG', 15, 8, 15, 15, undefined, 'FAST');
      } catch (e) {
        // Ignore logo error
      }

      // Header Text
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(50, 50, 50);
      doc.text('Omosocho Prime Plan Report', 35, 15);

      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.setFont('helvetica', 'normal');
      doc.text('www.omosochoprime.co.ke', 35, 20);

      // Separator line
      doc.setDrawColor(220, 220, 220);
      doc.line(15, 25, 195, 25);

      // --- COVER & TITLE SECTION ---
      let yPosition = 45;

      // Project Title Pill
      doc.setFillColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
      doc.roundedRect(15, yPosition, 180, 25, 2, 2, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text((data.projectName || 'Untitled Project').toUpperCase(), 105, yPosition + 12, { align: 'center' });

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, yPosition + 20, { align: 'center' });

      yPosition += 40;

      // --- SECTIONS ---
      // Function to draw section header
      const drawSection = (title: string, color: typeof BRAND_COLORS.orange) => {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(color.r, color.g, color.b);
        doc.text(title, 20, yPosition);

        // Underline
        doc.setDrawColor(color.r, color.g, color.b);
        doc.setLineWidth(0.5);
        doc.line(20, yPosition + 2, 80, yPosition + 2);

        yPosition += 15;
      };

      // Function to draw data row
      const drawRow = (label: string, value: string) => {
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        doc.setFont('helvetica', 'bold');
        doc.text(label, 25, yPosition);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(40, 40, 40);
        doc.text(value, 80, yPosition); // Value column

        yPosition += 8;
      };

      // 1. General Info
      drawSection('PROJECT DETAILS', BRAND_COLORS.orange);
      drawRow('Building Type:', `${data.projectType?.toUpperCase()} - ${data.buildingType?.toUpperCase()}`);
      drawRow('Number of Floors:', data.floors || '1');
      yPosition += 5;

      // 2. Dimensions
      drawSection('DIMENSIONS', BRAND_COLORS.purple);
      doc.setFillColor(245, 245, 250);
      doc.roundedRect(20, yPosition - 5, 170, 30, 2, 2, 'F'); // Background box

      // Grid style layout for dimensions
      doc.setTextColor(60, 60, 60);
      doc.setFont('helvetica', 'bold');
      doc.text(`${data.length}m`, 50, yPosition + 5, { align: 'center' });
      doc.text('Length', 50, yPosition + 12, { align: 'center' });

      doc.text(`${data.width}m`, 105, yPosition + 5, { align: 'center' });
      doc.text('Width', 105, yPosition + 12, { align: 'center' });

      doc.text(`${data.height}m`, 160, yPosition + 5, { align: 'center' });
      doc.text('Height', 160, yPosition + 12, { align: 'center' });

      yPosition += 40;

      // 3. Material Specifications
      drawSection('MATERIAL SPECIFICATIONS', BRAND_COLORS.blue);
      // Modern table-like rows with alternating background
      const materials = [
        { label: 'Roofing Material', value: data.roofingMaterial },
        { label: 'Wall Material', value: data.wallMaterial },
        { label: 'Flooring Material', value: data.flooringMaterial },
      ];

      materials.forEach((item, idx) => {
        if (idx % 2 === 0) {
          doc.setFillColor(248, 248, 248);
          doc.rect(20, yPosition - 5, 170, 10, 'F');
        }
        drawRow(item.label, item.value || 'Not Specified');
        yPosition += 2; // Extra spacing
      });
      yPosition += 10;

      // 4. Notes
      if (data.additionalNotes) {
        drawSection('ADDITIONAL NOTES', BRAND_COLORS.orange);
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.setFont('helvetica', 'italic');

        const noteLines = doc.splitTextToSize(data.additionalNotes, 160);
        // Draw a quote bar on left
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(1);
        doc.line(25, yPosition, 25, yPosition + (noteLines.length * 5));

        doc.text(noteLines, 30, yPosition);
        yPosition += (noteLines.length * 5) + 20;
      }

      // Footer
      const addFooter = () => {
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setFillColor(BRAND_COLORS.blue.r, BRAND_COLORS.blue.g, BRAND_COLORS.blue.b);
        doc.rect(0, pageHeight - 15, 210, 15, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text('Omosocho Prime Building Supplies • +254 705621054 • nikeombura@gmail.com', 105, pageHeight - 6, { align: 'center' });
      };

      addFooter();

      // Output
      const blob = doc.output('blob');
      resolve(blob);
    } catch (error) {
      console.error('Simple PDF generation error:', error);
      // Fallback
      resolve(new Blob(['Error generating PDF'], { type: 'text/plain' }));
    }
  });
};