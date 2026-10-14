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
    
    // Manipulação direta do DOM - Infalível contra conflitos de CSS
    await page.evaluate(() => {
      // 1. Remover fisicamente os botões "Ver competências" para não haver sobreposição
      document.querySelectorAll('summary').forEach(el => el.remove());

      // 2. Expandir todas as habilidades
      document.querySelectorAll('details').forEach(el => {
        el.setAttribute('open', 'true');
        el.style.display = 'block';
      });

      // 3. Forçar o texto do cabeçalho a branco
      const header = document.querySelector('header.hero');
      if (header) {
        header.style.backgroundColor = '#101e36';
        header.style.webkitPrintColorAdjust = 'exact';
        header.style.printColorAdjust = 'exact';
        // Aplica cor branca a todos os elementos filhos do cabeçalho
        header.querySelectorAll('*').forEach(child => {
          child.style.color = '#ffffff';
          child.style.visibility = 'visible';
        });
      }

      // 4. Quebrar o formato de grelha para evitar texto sobreposto
      const skillsGrid = document.querySelector('.skills-grid');
      if (skillsGrid) {
        skillsGrid.style.display = 'block'; // Transforma grelha em blocos verticais
      }

      // 5. Ajustar os cartões para não quebrarem a meio da página
      const cards = document.querySelectorAll('.skill-card, .timeline-card');
      cards.forEach(card => {
        card.style.display = 'block';
        card.style.height = 'auto';
        card.style.marginBottom = '25px';
        card.style.pageBreakInside = 'avoid';
        card.style.breakInside = 'avoid';
      });


      // 6. Esconder secções exclusivas da web e a barra de ferramentas do Astro
      const elementsToHide = document.querySelectorAll('.profile-nav, .contact-section, footer.site-footer, astro-dev-toolbar, #astro-dev-toolbar');
      elementsToHide.forEach(el => {
        if (el) el.style.display = 'none';
      });     

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
        bottom: "10mm",
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