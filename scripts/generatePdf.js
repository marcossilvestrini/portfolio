import puppeteer from "puppeteer";
import fs from "fs";

async function generate() {
  const url = process.env.URL || "http://localhost:4321/portfolio/";
  const out = process.env.OUT || "public/resume.pdf";
  console.log("Opening", url);
  
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    await page.goto(url, { 
      waitUntil: "networkidle0", 
      timeout: 60000 
    });
    
    // Força o ecrã normal para ignorar o ficheiro print.css do site
    await page.emulateMediaType('screen');
    
    // 1. A sua lógica impecável de manipulação do DOM
    await page.evaluate(() => {
      document.querySelectorAll('summary').forEach(el => el.remove());

      document.querySelectorAll('details').forEach(el => {
        el.setAttribute('open', 'true');
        el.style.display = 'block';
      });

      const header = document.querySelector('header.hero');
      if (header) {
        header.style.backgroundColor = '#101e36';
        header.style.webkitPrintColorAdjust = 'exact';
        header.style.printColorAdjust = 'exact';
        header.querySelectorAll('*').forEach(child => {
          child.style.color = '#ffffff';
          child.style.visibility = 'visible';
        });
      }

      // Esconder secções exclusivas da web e a barra de ferramentas do Astro
      const elementsToHide = document.querySelectorAll('.profile-nav, .contact-section, footer.site-footer, astro-dev-toolbar, #astro-dev-toolbar');
      elementsToHide.forEach(el => {
        if (el) el.style.display = 'none';
      });
    });

    // 2. A CORREÇÃO CIRÚRGICA PARA AS QUEBRAS DE PÁGINA
    // Nota: Como estamos emulando 'screen', não podemos usar @media print!
    await page.addStyleTag({
      content: `
        /* Remove o Flex/Grid dos contentores pais (obrigatório para o break-inside funcionar no Chrome) */
        .skills-grid, .experience-list, .certification-grid, .content-shell {
          display: block !important;
        }

        /* Classes CORRETAS das caixas para evitar o corte a meio */
        .skill-card, .experience-card, .certification-card {
          display: block !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          margin-bottom: 25px !important;
        }

        /* Evita que as linhas das listas sejam cortadas ao meio */
        li {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }

        /* Evita que um título fique órfão no final de uma página */
        h2, h3, h4 {
          page-break-after: avoid !important;
          break-after: avoid !important;
        }
        
        /* Garantia extra contra a barra do Astro */
        astro-dev-toolbar { display: none !important; }
      `
    });
    
    // Aguarda 3 segundos para que todas as alterações estruturais se estabilizem
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const pdfBuffer = await page.pdf({
      path: out,
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "15mm",
        bottom: "15mm",
        left: "15mm",
      },
    });

    fs.writeFileSync(out, pdfBuffer);
    console.log("PDF saved to", out);
  } finally {
    await browser.close();
  }
}

generate().catch((err) => {
  console.error("PDF generation failed:", err.message || err);
  process.exit(1);
});