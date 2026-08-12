"use client";

function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-electric underline-offset-2 hover:underline"
        >
          {link[1]}
        </a>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function FaqAnswer({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-3 text-[0.98rem] leading-relaxed text-muted sm:text-[1.02rem]">
      {paragraphs.map((p, i) => (
        <p key={`${i}-${p.slice(0, 24)}`}>{renderInline(p)}</p>
      ))}
    </div>
  );
}
