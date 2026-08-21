'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const baseUrl = process.env.ONE_PAGER_URL || 'http://127.0.0.1:3457/investor-one-pager';
const pdfPath =
  process.env.ONE_PAGER_PDF_OUT ||
  path.join(__dirname, '..', 'presentations', 'INDEXLA-Investor-One-Pager.pdf');

(async () => {
  fs.mkdirSync(path.dirname(pdfPath), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1400, height: 1000 },
  });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-one-pager="true"]', { timeout: 120000 });

  const box = await page.locator('[data-one-pager="true"]').boundingBox();
  if (!box) throw new Error('One-pager page box missing');

  // Detect overflow inside the fixed page
  const overflow = await page.evaluate(() => {
    const el = document.querySelector('[data-one-pager="true"]');
    if (!el) return { ok: false, reason: 'missing' };
    const inner = el.querySelector('.op-inner');
    if (!inner) return { ok: false, reason: 'no-inner' };
    const overflowY = inner.scrollHeight > el.clientHeight + 2;
    const overflowX = inner.scrollWidth > el.clientWidth + 2;
    return {
      ok: !overflowY && !overflowX,
      scrollHeight: inner.scrollHeight,
      clientHeight: el.clientHeight,
      scrollWidth: inner.scrollWidth,
      clientWidth: el.clientWidth,
      overflowY,
      overflowX,
    };
  });

  if (!overflow.ok) {
    throw new Error(`One-pager overflow detected: ${JSON.stringify(overflow)}`);
  }

  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: pdfPath,
    width: '11in',
    height: '8.5in',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    pageRanges: '1',
  });

  // Verify PDF is single page via pdf page count heuristic (file size + reopen)
  const pdf = await chromium.launch();
  const check = await pdf.newPage();
  // Use pdfjs-less approach: render PDF as buffer and count /Type /Page
  const buf = fs.readFileSync(pdfPath);
  const text = buf.toString('latin1');
  const pageCount = (text.match(/\/Type\s*\/Page[^s]/g) || []).length;
  if (pageCount !== 1) {
    await pdf.close();
    await browser.close();
    throw new Error(`Expected exactly 1 PDF page, found ${pageCount}`);
  }
  await pdf.close();
  await browser.close();
  console.log('One-pager PDF exported (1 page):', pdfPath);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
