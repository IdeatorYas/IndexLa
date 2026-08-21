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
    '" style="width:1000px;height:auto;filter:brightness(0.78) contrast(1.5) saturate(1.55);" />' +
    '</body></html>';
  await page.setContent(html, { waitUntil: 'load' });
  const box = await page.locator('#logo').boundingBox();
  if (!box) throw new Error('no logo box');
  // Icon-only crop — wordmark is rendered as crisp text in the brand box
  await page.screenshot({
    path: out,
    omitBackground: true,
    clip: {
      x: box.x + box.width * 0.12,
      y: box.y,
      width: box.width * 0.76,
      height: box.height * 0.58,
    },
  });
  const b = fs.readFileSync(out);
  console.log('wrote', out, b.readUInt32BE(16) + 'x' + b.readUInt32BE(20), b.length);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
