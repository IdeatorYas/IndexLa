import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_ALT =
  "INDEXLA — Decentralized Portfolio Management. One Portfolio. Every Asset. Every Chain.";

async function loadLogoDataUrl(): Promise<string> {
  const logoPath = join(
    process.cwd(),
    "public/logo/indexla-logo-transparent.png",
  );
  const buffer = await readFile(logoPath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function loadDisplayFonts(): Promise<
  { name: string; data: ArrayBuffer; weight: 600 | 700 }[]
> {
  const base = join(process.cwd(), "public/fonts");
  const [semiBold, bold] = await Promise.all([
    readFile(join(base, "bricolage-grotesque-semibold.ttf")),
    readFile(join(base, "bricolage-grotesque-bold.ttf")),
  ]);
  return [
    {
      name: "Bricolage Grotesque",
      data: semiBold.buffer.slice(
        semiBold.byteOffset,
        semiBold.byteOffset + semiBold.byteLength,
      ) as ArrayBuffer,
      weight: 600,
    },
    {
      name: "Bricolage Grotesque",
      data: bold.buffer.slice(
        bold.byteOffset,
        bold.byteOffset + bold.byteLength,
      ) as ArrayBuffer,
      weight: 700,
    },
  ];
}

const nodes = [
  { x: 880, y: 96, size: 10, color: "#38bdf8" },
  { x: 980, y: 140, size: 8, color: "#a78bfa" },
  { x: 1040, y: 220, size: 11, color: "#38bdf8" },
  { x: 920, y: 250, size: 7, color: "#22d3ee" },
  { x: 1080, y: 320, size: 9, color: "#a78bfa" },
  { x: 860, y: 330, size: 8, color: "#7c3aed" },
  { x: 1000, y: 400, size: 10, color: "#38bdf8" },
] as const;

const links = [
  [0, 1],
  [1, 2],
  [2, 4],
  [4, 6],
  [0, 3],
  [3, 5],
  [5, 6],
  [1, 3],
] as const;

const bars = [
  { h: 72, color: "rgba(56,189,248,0.35)" },
  { h: 110, color: "rgba(167,139,250,0.32)" },
  { h: 88, color: "rgba(34,211,238,0.28)" },
  { h: 130, color: "rgba(56,189,248,0.38)" },
  { h: 96, color: "rgba(124,58,237,0.3)" },
] as const;

export async function createOgImage() {
  const [logo, fonts] = await Promise.all([
    loadLogoDataUrl(),
    loadDisplayFonts(),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "#0a0614",
          overflow: "hidden",
          fontFamily: "Bricolage Grotesque",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            right: -40,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
          }}
        />

        {/* Cross-chain network */}
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", inset: 0 }}
        >
          {links.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="rgba(56,189,248,0.22)"
              strokeWidth="2"
            />
          ))}
          {nodes.map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              opacity={0.85}
            />
          ))}
        </svg>

        {/* Portfolio allocation bars */}
        <div
          style={{
            position: "absolute",
            right: 72,
            bottom: 56,
            display: "flex",
            alignItems: "flex-end",
            gap: 10,
            opacity: 0.55,
          }}
        >
          {bars.map((bar, i) => (
            <div
              key={i}
              style={{
                width: 18,
                height: bar.h,
                borderRadius: 8,
                background: bar.color,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "52px 64px 48px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt=""
              width={220}
              height={72}
              style={{ objectFit: "contain", objectPosition: "left center" }}
            />
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#a89bc4",
              }}
            >
              indexla.tech
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 44 }}>
            <div
              style={{
                fontSize: 58,
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "#f4f1ff",
                maxWidth: 920,
              }}
            >
              Decentralized Portfolio Management
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 36,
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#38bdf8",
              }}
            >
              One Portfolio. Every Asset. Every Chain.
            </div>
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 20,
              fontWeight: 500,
              lineHeight: 1.4,
              color: "#a89bc4",
              maxWidth: 980,
            }}
          >
            Crypto · Tokenized Stocks · Tokenized Commodities · Tokenized RWAs ·
            DeFi
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 32,
            }}
          >
            {[
              "Automated Strategies",
              "Non-Custodial",
              "Privacy",
            ].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(56,189,248,0.35)",
                  background: "rgba(56,189,248,0.08)",
                  color: "#f4f1ff",
                  fontSize: 17,
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, #7c3aed 0%, #38bdf8 50%, #22d3ee 100%)",
          }}
        />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts,
    },
  );
}
