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

export function WhitepaperMarkdown({ markdown }: { markdown: string }) {
  const usedIds = new Map<string, number>();

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => {
          const id = nextHeadingId(usedIds, children);
          return (
            <h2
              id={id}
              className="display scroll-mt-28 border-t border-line pt-12 mt-14 text-[clamp(1.65rem,3vw,2.15rem)] tracking-[-0.02em] text-ink first:mt-0 first:border-t-0 first:pt-0"
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
              className="display scroll-mt-28 mt-10 text-[clamp(1.25rem,2.2vw,1.55rem)] tracking-[-0.02em] text-ink"
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
              className="scroll-mt-28 mt-8 text-[1.05rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.12rem]"
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
              <p className="my-5 border-l-2 border-electric/45 bg-electric/[0.04] px-4 py-3 text-[1.02rem] leading-relaxed text-ink sm:px-5">
                {children}
              </p>
            );
          }
          return (
            <p className="my-4 text-[1.02rem] leading-[1.75] text-muted">
              {children}
            </p>
          );
        },
        strong: ({ children }) => (
          <strong className="font-semibold text-ink">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="text-[0.92rem] not-italic text-muted-dim">{children}</em>
        ),
        ul: ({ children }) => (
          <ul className="my-4 space-y-2 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.7em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-electric/70">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="my-4 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-electric">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-[1.02rem] leading-[1.7] text-muted">{children}</li>
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
          <div className="my-6 overflow-x-auto rounded-xl border border-line bg-void/40">
            <table className="w-full min-w-[36rem] border-collapse text-left text-[0.9rem]">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="border-b border-line bg-panel/50">{children}</thead>
        ),
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => (
          <tr className="border-b border-line last:border-b-0">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="whitespace-nowrap px-3.5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted-dim sm:px-4">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-3.5 py-3 align-top text-muted sm:px-4">
            <span className="text-ink/95">{children}</span>
          </td>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
