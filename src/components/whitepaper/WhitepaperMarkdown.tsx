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
  lightTheme = false,
}: {
  markdown: string;
  resetTop?: boolean;
  card?: boolean;
  accentLists?: boolean;
  lightTheme?: boolean;
}) {
  const usedIds = new Map<string, number>();

  const ink = lightTheme ? "text-[#0f172a]" : "text-ink";
  const muted = lightTheme ? "text-[#475569]" : "text-muted";
  const mutedDim = lightTheme ? "text-[#64748b]" : "text-muted-dim";
  const accent = lightTheme ? "text-[#2563eb]" : "text-electric";
  const border = lightTheme ? "border-[#dbe4f0]" : "border-line";
  const calloutBg = lightTheme
    ? "border-[#bfdbfe] bg-[#eff6ff]"
    : "border-electric/20 bg-electric/[0.06]";
  const blockquoteBg = lightTheme
    ? "border-[#2563eb]/50 bg-[#eff6ff]"
    : "border-electric/50 bg-electric/[0.05]";
  const codeBg = lightTheme
    ? "border-[#dbe4f0] bg-[#f8fafc] text-[#2563eb]"
    : "border-line bg-void/70 text-electric";
  const preBg = lightTheme
    ? "border-[#dbe4f0] bg-[#f8fafc] text-[#475569]"
    : "border-line bg-void/80 text-muted";
  const tableWrap = lightTheme
    ? "border-[#dbe4f0] bg-white shadow-sm"
    : "border-line bg-void/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]";
  const theadBg = lightTheme ? "border-[#dbe4f0] bg-[#f8fafc]" : "border-line bg-panel/60";
  const rowAlt = lightTheme ? "even:bg-[#f8fafc]" : "even:bg-deep/30";
  const thSticky = lightTheme ? "first:bg-[#f8fafc]" : "first:bg-panel/95";
  const tdSticky = lightTheme
    ? "first:border-[#e2e8f0] first:bg-white"
    : "first:border-line/80 first:bg-void/95";
  const accentLi = lightTheme
    ? "border-[#dbe4f0] bg-white shadow-sm"
    : "border-line bg-deep/55";
  const bulletColor = lightTheme ? "before:bg-[#2563eb]/70" : "before:bg-electric/70";

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
                className={`display scroll-mt-32 border-t ${border} pt-10 mt-10 text-[clamp(1.55rem,2.8vw,1.95rem)] tracking-[-0.02em] ${ink}`}
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
                className={`display scroll-mt-32 mt-10 border-l-2 ${lightTheme ? "border-[#2563eb]/40" : "border-electric/40"} pl-3.5 text-[clamp(1.22rem,2.1vw,1.5rem)] tracking-[-0.02em] ${ink} sm:pl-4`}
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
                    ? `scroll-mt-32 text-[1.05rem] font-semibold tracking-[-0.015em] ${ink} sm:text-[1.1rem]`
                    : `scroll-mt-32 mt-8 text-[1.05rem] font-semibold tracking-[-0.015em] ${ink} sm:text-[1.12rem]`
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
                className={`scroll-mt-32 mt-6 text-[0.98rem] font-semibold tracking-[-0.01em] ${accent}`}
              >
                {children}
              </h5>
            );
          },
          p: ({ children }) => {
            if (isPureStrongParagraph(children)) {
              return (
                <p
                  className={`my-5 rounded-lg border px-4 py-3.5 text-[1.05rem] leading-relaxed ${calloutBg} ${ink} sm:px-5`}
                >
                  {children}
                </p>
              );
            }
            return (
              <p
                className={
                  card
                    ? `mt-2 text-[0.98rem] leading-[1.7] ${muted}`
                    : `my-4 text-[1.02rem] leading-[1.75] ${muted}`
                }
              >
                {children}
              </p>
            );
          },
          blockquote: ({ children }) => (
            <blockquote
              className={`my-3 rounded-r-lg border-l-2 px-4 py-3 text-[1.02rem] leading-relaxed ${blockquoteBg} ${ink} sm:px-5 [&>p]:my-0 [&>p]:text-inherit`}
            >
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-inherit">{children}</strong>
          ),
          em: ({ children }) => (
            <em className={`text-[0.92rem] not-italic ${mutedDim}`}>
              {children}
            </em>
          ),
          ul: ({ children }) =>
            accentLists ? (
              <ul className="my-5 grid gap-2 sm:grid-cols-2">{children}</ul>
            ) : (
              <ul
                className={`my-4 space-y-2 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.7em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full ${bulletColor}`}
              >
                {children}
              </ul>
            ),
          ol: ({ children }) => (
            <ol
              className={`my-4 list-decimal space-y-2 pl-5 marker:font-semibold ${lightTheme ? "marker:text-[#2563eb]" : "marker:text-electric"}`}
            >
              {children}
            </ol>
          ),
          li: ({ children }) =>
            accentLists ? (
              <li
                className={`rounded-lg border px-3.5 py-3 text-[0.95rem] font-medium leading-snug ${accentLi} ${ink}`}
              >
                {children}
              </li>
            ) : (
              <li className={`text-[1.02rem] leading-[1.7] ${muted}`}>
                {children}
              </li>
            ),
          hr: () => <hr className={`my-12 border-0 border-t ${border}`} />,
          a: ({ href, children }) => (
            <a
              href={href}
              className={`font-medium underline-offset-2 hover:underline ${accent}`}
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code
              className={`rounded-md border px-1.5 py-0.5 font-mono text-[0.88em] ${codeBg}`}
            >
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre
              className={`my-5 overflow-x-auto rounded-xl border p-4 text-[0.85rem] leading-relaxed sm:p-5 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[0.85rem] ${preBg}`}
            >
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div
              className={`wp-table-wrap my-6 -mx-1 overflow-x-auto rounded-xl border sm:mx-0 ${tableWrap}`}
            >
              <table className="w-full min-w-[20rem] border-collapse text-left text-[0.88rem] sm:min-w-0 sm:text-[0.9rem]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className={`border-b ${theadBg}`}>{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr
              className={`border-b ${border} odd:bg-transparent ${rowAlt} last:border-b-0`}
            >
              {children}
            </tr>
          ),
          th: ({ children, style }) => (
            <th
              style={style}
              className={`whitespace-nowrap px-3.5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.08em] ${mutedDim} first:sticky first:left-0 first:z-[1] first:text-left first:backdrop-blur-sm sm:px-4 ${thSticky}`}
            >
              {children}
            </th>
          ),
          td: ({ children, style }) => (
            <td
              style={style}
              className={`whitespace-nowrap px-3.5 py-3 align-middle tabular-nums leading-snug ${lightTheme ? "text-[#0f172a]/95" : "text-ink/95"} first:sticky first:left-0 first:z-[1] first:min-w-[9.5rem] first:whitespace-normal first:border-r first:font-semibold first:backdrop-blur-sm sm:px-4 ${tdSticky}`}
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
