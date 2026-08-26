'use strict';
const { chromium } = require('playwright');
const path = require('path');

const baseUrl = process.env.DECK_URL || 'http://127.0.0.1:3456/investor-deck';
const pdfPath =
  process.env.DECK_PDF_OUT ||
  path.join(__dirname, '..', 'presentations', 'INDEXLA-Investor-Deck.pdf');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.waitForSelector('.deck-slide', { timeout: 120000 });
  const count = await page.locator('.deck-slide').count();
  if (count !== 14) {
    throw new Error(`Expected 14 slides, found ${count}`);
  }

  const required = [
    '01 — COVER',
    '02 — THE BIG SHIFT',
    '03 — THE MISSING LAYER',
    '04 — THE PRODUCT',
    '05 — CREATOR ECONOMY',
    '06 — BUSINESS MODEL & PATH TO SCALE',
    '07 — DEGEN CLUB',
    '08 — $DEXLA TOKEN',
    '09 — MARKET OPPORTUNITY',
    '10 — WHY INDEXLA WINS',
    '11 — COMPETITIVE REALITY',
    '12 — GO-TO-MARKET',
    '13 — ROADMAP & FUNDRAISING',
    '14 — THE BIG BET',
  ];

  for (let i = 0; i < 14; i++) {
    const slide = page.locator('.deck-slide').nth(i);
    const headline = slide.locator('.deck-slide-headline');
    await headline.waitFor({ state: 'visible', timeout: 15000 });
    const box = await headline.boundingBox();
    if (!box || box.height < 8 || box.width < 40) {
      throw new Error(`Slide ${i + 1}: headline not visibly laid out`);
    }
    const text = ((await headline.innerText()) || '').replace(/\s+/g, ' ').trim();
    if (text !== required[i]) {
      throw new Error(`Slide ${i + 1}: expected "${required[i]}", got "${text}"`);
    }
  }
  console.log('All 14 official headlines verified visible.');

  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: pdfPath,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: true,
  });
  await browser.close();
  console.log('PDF exported:', pdfPath);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
