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
  // Full logo — no crop. Contrast only for print clarity on white.
  const html =
    '<!doctype html><html><body style="margin:0;background:transparent;display:flex;align-items:center;justify-content:center;width:1400px;height:1400px">' +
    '<img id="logo" src="data:image/png;base64,' +
    b64 +
    '" style="width:1000px;height:auto;filter:brightness(0.8) contrast(1.45) saturate(1.4);" />' +
    '</body></html>';
  await page.setContent(html, { waitUntil: 'load' });
  await page.locator('#logo').screenshot({ path: out, omitBackground: true });
  const b = fs.readFileSync(out);
  console.log('wrote', out, b.readUInt32BE(16) + 'x' + b.readUInt32BE(20), b.length);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
