"use client";

import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/whitepaper";

function textFromChildren(children: ReactNode): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }
  if (typeof children === "object" && "props" in children) {
    return textFromChildren(
      (children as { props?: { children?: ReactNode } }).props?.children,
    );
  }
  return "";
}

function nextHeadingId(
  usedIds: Map<string, number>,
  children: ReactNode,
): string {
  const title = textFromChildren(children).trim();
  let id = slugifyHeading(title);
  const count = usedIds.get(id) ?? 0;
  usedIds.set(id, count + 1);
  if (count > 0) id = `${id}-${count + 1}`;
  return id;
}

function isStrongNode(node: ReactNode): boolean {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    (node as { type?: unknown }).type === "strong"
  );
}

function isPureStrongParagraph(children: ReactNode): boolean {
  if (isStrongNode(children)) return true;
  if (!Array.isArray(children)) return false;
  const meaningful = children.filter((child) => {
    if (typeof child === "string") return child.trim().length > 0;
    return child != null && child !== false;
  });
  return meaningful.length === 1 && isStrongNode(meaningful[0]);
}

export function WhitepaperMarkdown({
  markdown,
  resetTop = false,
  card = false,
  accentLists = false,
}: {
  markdown: string;
  resetTop?: boolean;
  /** Compact heading styles for concept cards */
  card?: boolean;
  /** Render unordered lists as accent concept chips */
  accentLists?: boolean;
}) {
  const usedIds = new Map<string, number>();

  return (
    <div
      className={
        resetTop
          ? "[&>*:first-child]:!mt-0 [&>*:first-child]:!border-t-0 [&>*:first-child]:!pt-0"
          : undefined
      }
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => {
            const id = nextHeadingId(usedIds, children);
            return (
              <h2
                id={id}
                className="display scroll-mt-28 border-t border-line pt-10 mt-10 text-[clamp(1.55rem,2.8vw,1.95rem)] tracking-[-0.02em] text-ink"
              >
                {children}
              </h2>
            );
          },
          h2: ({ children }) => {
            const id = nextHeadingId(usedIds, children);
            return (
              <h3
                id={id}
                className="display scroll-mt-28 mt-10 border-l-2 border-electric/40 pl-3.5 text-[clamp(1.22rem,2.1vw,1.5rem)] tracking-[-0.02em] text-ink sm:pl-4"
              >
                {children}
              </h3>
            );
          },
          h3: ({ children }) => {
            const id = nextHeadingId(usedIds, children);
            return (
              <h4
                id={id}
                className={
                  card
                    ? "scroll-mt-28 text-[1.05rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.1rem]"
                    : "scroll-mt-28 mt-8 text-[1.05rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.12rem]"
                }
              >
                {children}
              </h4>
            );
          },
          h4: ({ children }) => {
            const id = nextHeadingId(usedIds, children);
            return (
              <h5
                id={id}
                className="scroll-mt-28 mt-6 text-[0.98rem] font-semibold tracking-[-0.01em] text-electric"
              >
                {children}
              </h5>
            );
          },
          p: ({ children }) => {
            if (isPureStrongParagraph(children)) {
              return (
                <p className="my-5 rounded-lg border border-electric/20 bg-electric/[0.06] px-4 py-3.5 text-[1.05rem] leading-relaxed text-ink sm:px-5">
                  {children}
                </p>
              );
            }
            return (
              <p
                className={
                  card
                    ? "mt-2 text-[0.98rem] leading-[1.7] text-muted"
                    : "my-4 text-[1.02rem] leading-[1.75] text-muted"
                }
              >
                {children}
              </p>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="my-3 rounded-r-lg border-l-2 border-electric/50 bg-electric/[0.05] px-4 py-3 text-[1.02rem] leading-relaxed text-ink sm:px-5 [&>p]:my-0 [&>p]:text-ink">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-ink">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-[0.92rem] not-italic text-muted-dim">
              {children}
            </em>
          ),
          ul: ({ children }) =>
            accentLists ? (
              <ul className="my-5 grid gap-2 sm:grid-cols-2">
                {children}
              </ul>
            ) : (
              <ul className="my-4 space-y-2 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.7em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-electric/70">
                {children}
              </ul>
            ),
          ol: ({ children }) => (
            <ol className="my-4 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-electric">
              {children}
            </ol>
          ),
          li: ({ children }) =>
            accentLists ? (
              <li className="rounded-lg border border-line bg-deep/55 px-3.5 py-3 text-[0.95rem] font-medium leading-snug text-ink">
                {children}
              </li>
            ) : (
              <li className="text-[1.02rem] leading-[1.7] text-muted">
                {children}
              </li>
            ),
          hr: () => <hr className="my-12 border-0 border-t border-line" />,
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-electric underline-offset-2 hover:underline"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="my-6 -mx-1 overflow-x-auto rounded-xl border border-line bg-void/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:mx-0">
              <table className="w-full min-w-[20rem] border-collapse text-left text-[0.88rem] sm:min-w-0 sm:text-[0.9rem]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-line bg-panel/60">{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-line odd:bg-transparent even:bg-deep/30 last:border-b-0">
              {children}
            </tr>
          ),
          th: ({ children, style }) => (
            <th
              style={style}
              className="whitespace-nowrap px-3.5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-muted-dim first:sticky first:left-0 first:z-[1] first:bg-panel/95 first:text-left first:backdrop-blur-sm sm:px-4"
            >
              {children}
            </th>
          ),
          td: ({ children, style }) => (
            <td
              style={style}
              className="whitespace-nowrap px-3.5 py-3 align-middle tabular-nums leading-snug text-ink/95 first:sticky first:left-0 first:z-[1] first:min-w-[9.5rem] first:whitespace-normal first:border-r first:border-line/80 first:bg-void/95 first:font-semibold first:backdrop-blur-sm sm:px-4"
            >
              {children}
            </td>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
