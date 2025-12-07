import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

export const generatePlanPDF = async (data: PlanData): Promise<Blob> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  // Header background
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageWidth, 36, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('OMOSOCHO PRIME', margin + 40, 22);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Construction Plan Report', pageWidth - margin, 22, { align: 'right' });

  // Try to fetch and embed the company logo (public/assets/logo.png)
  try {
    const fetchImageAsDataUrl = async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch image');
      const blob = await res.blob();
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const logoDataUrl = await fetchImageAsDataUrl('/assets/logo.png');
    // Add the logo at the top-left corner inside the header
    // width 32, height auto (maintain aspect ratio)
    doc.addImage(logoDataUrl, 'PNG', margin, 6, 32, 18);
  } catch (err) {
    // If logo fetch fails, continue without blocking PDF generation
    // eslint-disable-next-line no-console
    console.warn('Could not load logo for PDF:', err);
  }

  // Project Title
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(data.projectName || 'Untitled Project', margin, 48);

  // Project meta
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const metaY = 56;
  doc.text(`Type: ${data.projectType || 'N/A'}`, margin, metaY);
  doc.text(`Building: ${data.buildingType || 'N/A'}`, pageWidth / 2, metaY);
  doc.text(`Floors: ${data.floors || '1'}`, pageWidth - margin, metaY, { align: 'right' });

  // Divider
  doc.setDrawColor(234, 88, 12);
  doc.setLineWidth(0.8);
  doc.line(margin, 62, pageWidth - margin, 62);

  // Dimensions block
  let cursorY = 72;
  doc.setFont('helvetica', 'bold');
  doc.text('Dimensions', margin, cursorY);
  doc.setFont('helvetica', 'normal');
  cursorY += 8;
  doc.text(`Length: ${data.length || '-' } m`, margin, cursorY);
  doc.text(`Width: ${data.width || '-' } m`, margin + 70, cursorY);
  doc.text(`Height: ${data.height || '-' } m`, margin + 140, cursorY);

  // Materials block
  cursorY += 12;
  doc.setFont('helvetica', 'bold');
  doc.text('Materials', margin, cursorY);
  doc.setFont('helvetica', 'normal');
  cursorY += 8;
  const materials = [
    ['Roofing', data.roofingMaterial || 'Not specified'],
    ['Walls', data.wallMaterial || 'Not specified'],
    ['Flooring', data.flooringMaterial || 'Not specified'],
  ];

  // Use autoTable for neat layout
  // @ts-ignore - jsPDF has autoTable via plugin
  (doc as any).autoTable({
    startY: cursorY,
    theme: 'grid',
    head: [['Material', 'Selection']],
    body: materials,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [37, 99, 235], textColor: [255,255,255] },
    margin: { left: margin, right: margin },
  });

  cursorY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 8 : cursorY + 36;

  // Additional Notes
  doc.setFont('helvetica', 'bold');
  doc.text('Additional Notes', margin, cursorY);
  doc.setFont('helvetica', 'normal');
  const noteLines = doc.splitTextToSize(data.additionalNotes || 'None', pageWidth - margin * 2);
  doc.text(noteLines, margin, cursorY + 8);

  // Footer with contact info
  const footerY = 280;
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Omosocho Prime Building Supplies • Nyamache, Kisii • +254 705621054 • nikeombura@gmail.com', pageWidth / 2, footerY, { align: 'center' });
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, footerY + 6, { align: 'center' });

  // Return blob so caller can trigger the download in the user gesture context
  const blob = doc.output('blob');
  return blob;
};
