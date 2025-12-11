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

export const generateSimplePDF = (data: PlanData): Promise<Blob> => {
  return new Promise((resolve) => {
    try {
      const doc = new jsPDF();

      // Title
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('OMOSOCHO PRIME CONSTRUCTION PLAN', 105, 20, { align: 'center' });

      // Subtitle
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('Project Summary Report', 105, 30, { align: 'center' });

      // Project Info
      let yPosition = 50;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Project Information:', 15, yPosition);
      yPosition += 10;

      doc.setFont('helvetica', 'normal');
      doc.text(`Project Name: ${data.projectName || 'Untitled Project'}`, 20, yPosition);
      yPosition += 8;
      doc.text(`Project Type: ${data.projectType || 'N/A'}`, 20, yPosition);
      yPosition += 8;
      doc.text(`Building Type: ${data.buildingType || 'N/A'}`, 20, yPosition);
      yPosition += 8;
      doc.text(`Number of Floors: ${data.floors || '1'}`, 20, yPosition);
      yPosition += 12;

      // Dimensions
      doc.setFont('helvetica', 'bold');
      doc.text('Dimensions:', 15, yPosition);
      yPosition += 10;

      doc.setFont('helvetica', 'normal');
      doc.text(`Length: ${data.length || '-'} meters`, 20, yPosition);
      yPosition += 8;
      doc.text(`Width: ${data.width || '-'} meters`, 20, yPosition);
      yPosition += 8;
      doc.text(`Height: ${data.height || '-'} meters`, 20, yPosition);
      yPosition += 12;

      // Materials
      doc.setFont('helvetica', 'bold');
      doc.text('Materials:', 15, yPosition);
      yPosition += 10;

      doc.setFont('helvetica', 'normal');
      doc.text(`Roofing: ${data.roofingMaterial || 'Not specified'}`, 20, yPosition);
      yPosition += 8;
      doc.text(`Walls: ${data.wallMaterial || 'Not specified'}`, 20, yPosition);
      yPosition += 8;
      doc.text(`Flooring: ${data.flooringMaterial || 'Not specified'}`, 20, yPosition);
      yPosition += 12;

      // Additional Notes
      if (data.additionalNotes) {
        doc.setFont('helvetica', 'bold');
        doc.text('Additional Notes:', 15, yPosition);
        yPosition += 10;

        doc.setFont('helvetica', 'normal');
        const noteLines = doc.splitTextToSize(data.additionalNotes, 180);
        doc.text(noteLines, 20, yPosition);
        yPosition += (noteLines.length * 6) + 12;
      }

      // Footer
      const footerY = 280;
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('Omosocho Prime Building Supplies', 105, footerY, { align: 'center' });
      doc.text('Nyamache, Kisii • +254 705621054 • nikeombura@gmail.com', 105, footerY + 6, { align: 'center' });
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, footerY + 12, { align: 'center' });

      // Generate and return PDF blob
      const blob = doc.output('blob');
      resolve(blob);
    } catch (error) {
      console.error('Simple PDF generation error:', error);
      // Fallback to text download if PDF fails
      const textContent = `OMOSOCHO PRIME CONSTRUCTION PLAN\n\nProject: ${data.projectName || 'Untitled Project'}\nType: ${data.projectType} - ${data.buildingType}\nDimensions: ${data.length}m × ${data.width}m × ${data.height}m\nFloors: ${data.floors}\nRoofing: ${data.roofingMaterial}\nWalls: ${data.wallMaterial}\nFlooring: ${data.flooringMaterial}\nNotes: ${data.additionalNotes || 'None'}`;
      resolve(new Blob([textContent], { type: 'text/plain' }));
    }
  });
};