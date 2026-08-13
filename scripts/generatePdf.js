import puppeteer from 'puppeteer';

async function generate() {
  const url = process.env.URL || 'http://localhost:4321';
  const out = process.env.OUT || 'public/right-resume.pdf';

  console.log('Opening', url);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.pdf({ path: out, format: 'A4', printBackground: true });
    console.log('PDF saved to', out);
  } finally {
    await browser.close();
  }
}

generate().catch((err) => {
  console.error('PDF generation failed:', err.message || err);
  process.exit(1);
});
