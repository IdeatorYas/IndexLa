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
  // Darker / higher-contrast bake so gray INDEX letters stay readable on white
  const html =
    '<!doctype html><html><body style="margin:0;background:transparent;display:flex;align-items:flex-start;justify-content:center;width:1400px;height:1400px;padding-top:40px">' +
    '<img id="logo" src="data:image/png;base64,' +
    b64 +
    '" style="width:1000px;height:auto;filter:brightness(0.72) contrast(1.55) saturate(1.45);" />' +
    '</body></html>';
  await page.setContent(html, { waitUntil: 'load' });
  const logo = page.locator('#logo');
  const box = await logo.boundingBox();
  if (!box) throw new Error('no logo box');
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
