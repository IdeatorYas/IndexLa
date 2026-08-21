'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const src = path.resolve(__dirname, '..', 'public', 'logo', 'indexla-logo-transparent.png');
  const out = path.resolve(__dirname, '..', 'public', 'logo', 'indexla-logo-onepager.png');
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1400, height: 1400 },
    deviceScaleFactor: 3,
  });
  const b64 = fs.readFileSync(src).toString('base64');
  const html =
    '<!doctype html><html><body style="margin:0;background:transparent;display:flex;align-items:flex-start;justify-content:center;width:1400px;height:1400px;padding-top:40px">' +
    '<img id="logo" src="data:image/png;base64,' +
    b64 +
    '" style="width:1000px;height:auto;filter:saturate(1.85) contrast(1.42) brightness(0.88);" />' +
    '</body></html>';
  await page.setContent(html, { waitUntil: 'load' });
  const logo = page.locator('#logo');
  const box = await logo.boundingBox();
  if (!box) throw new Error('no logo box');
  // Crop away the tiny tagline band (~bottom 12%) so the mark stays sharp at print size
  await page.screenshot({
    path: out,
    omitBackground: true,
    clip: {
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height * 0.88,
    },
  });
  const b = fs.readFileSync(out);
  console.log('wrote', out, b.readUInt32BE(16) + 'x' + b.readUInt32BE(20), b.length);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
