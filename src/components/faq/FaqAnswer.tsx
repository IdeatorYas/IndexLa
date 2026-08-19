import type { FaqBlock } from "@/lib/faq";
import { FaqInline } from "@/components/faq/faqInline";

function FaqTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="-mx-1 overflow-x-auto sm:mx-0">
      <table className="min-w-full border-collapse text-left text-[0.92rem] sm:text-[0.96rem]">
        <thead>
          <tr className="border-b border-line">
            {headers.map((header) => (
              <th
                key={header}
                className="whitespace-nowrap px-3 py-2.5 font-semibold text-ink first:pl-0 last:pr-0"
              >
                <FaqInline text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-line/70 last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  className="px-3 py-2.5 align-top text-muted first:pl-0 last:pr-0"
                >
                  <FaqInline text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FaqBlockView({ block }: { block: FaqBlock }) {
  if (block.type === "table") {
    return <FaqTable headers={block.headers} rows={block.rows} />;
  }

  if (block.type === "list") {
    const ListTag = block.ordered ? "ol" : "ul";
    return (
      <ListTag
        className={
          block.ordered
            ? "list-decimal space-y-2 pl-5 marker:text-electric"
            : "list-disc space-y-2 pl-5 marker:text-electric"
        }
      >
        {block.items.map((item) => (
          <li key={item} className="pl-1">
            <FaqInline text={item} />
          </li>
        ))}
      </ListTag>
    );
  }

  return (
    <p className="text-[0.98rem] leading-relaxed text-muted sm:text-[1.02rem]">
      <FaqInline text={block.text} />
    </p>
  );
}

export function FaqAnswer({ blocks }: { blocks: FaqBlock[] }) {
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <FaqBlockView key={`${i}-${block.type}`} block={block} />
      ))}
    </div>
  );
}
