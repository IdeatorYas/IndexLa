/**
 * Export INDEXLA investor deck to PDF via Chrome headless (no extra deps).
 * Usage: node scripts/export-investor-deck-pdf.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "presentations");
const pdfPath = path.join(outDir, "INDEXLA-Investor-Deck.pdf");
const port = Number(process.env.DECK_PORT || 3456);
const baseUrl = `http://127.0.0.1:${port}/investor-deck`;
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

const chromeCandidates =
  process.platform === "win32"
    ? [
        path.join(
          process.env.ProgramFiles || "C:\\Program Files",
          "Google",
          "Chrome",
          "Application",
          "chrome.exe",
        ),
        path.join(
          process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)",
          "Google",
          "Chrome",
          "Application",
          "chrome.exe",
        ),
        path.join(
          process.env.ProgramFiles || "C:\\Program Files",
          "Microsoft",
          "Edge",
          "Application",
          "msedge.exe",
        ),
      ]
    : [
        "/usr/bin/google-chrome",
        "/usr/bin/chromium-browser",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      ];

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", cwd: root, ...opts });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited ${code}`));
    });
  });
}

async function waitForServer(url, attempts = 90) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Server not ready at ${url}`);
}

async function findBrowser() {
  const { access } = await import("node:fs/promises");
  for (const candidate of chromeCandidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      /* try next */
    }
  }
  throw new Error("Chrome or Edge not found for PDF export");
}

async function exportPdf(browser, url, outFile) {
  await run(browser, [
    "--headless",
    "--disable-gpu",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=20000",
    `--print-to-pdf=${outFile}`,
    url,
  ]);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await findBrowser();
  let server;

  try {
    await fetch(baseUrl);
  } catch {
    server = spawn(npmCmd, ["run", "start", "--", "-p", String(port)], {
      cwd: root,
      stdio: "pipe",
    });
    await waitForServer(baseUrl);
  }

  try {
    await exportPdf(browser, baseUrl, pdfPath);
    console.log(`PDF exported: ${pdfPath}`);
  } finally {
    server?.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
