import puppeteer from 'puppeteer';
import fs from 'fs';

async function generate() {
  const url = process.env.URL || 'http://localhost:4321';
  const out = process.env.OUT || 'public/resume.pdf';
  console.log('Opening', url);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    // AQUI ESTÁ A CORREÇÃO PRINCIPAL: 
    // networkidle0 força a espera do carregamento completo do CSS/Fontes do Astro.
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    
    // Injeção de CSS extra para evitar cortes feios nos blocos:
    await page.addStyleTag({
      content: `
        @media print {
          .timeline-card, .skill-category { 
            page-break-inside: avoid;
            break-inside: avoid; 
          }
          header, .nav-filters, footer { display: none !important; }
        }
      `,
    });

    const pdfBuffer = await page.pdf({
      path: out,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '15mm',
        right: '15mm',
        bottom: '15mm',
        left: '15mm',
      },
    });
    
    fs.writeFileSync(out, pdfBuffer);

    console.log('PDF saved to', out);
  } finally {
    await browser.close();
  }
}

generate().catch((err) => {
  console.error('PDF generation failed:', err.message || err);
  process.exit(1);
});
