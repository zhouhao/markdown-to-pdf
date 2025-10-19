import html2pdf from 'html2pdf.js';

export async function exportToPdf(element: HTMLElement, filename: string = 'document'): Promise<void> {
  // 确保所有字体已加载完成
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  
  const opt = {
    margin: [15, 15, 15, 15] as [number, number, number, number],
    filename: `${filename}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true,
      allowTaint: true,
      letterRendering: true,
      windowHeight: element.scrollHeight + 100,
      scrollY: 0,
      scrollX: 0,
      logging: false,
      imageTimeout: 0,
      removeContainer: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' as const,
      compress: true,
      putOnlyUsedFonts: true
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'] as any,
      before: '.page-break-before',
      after: '.page-break-after',
      avoid: 'pre'
    }
  };
  
  return html2pdf().from(element).set(opt).save();
}
