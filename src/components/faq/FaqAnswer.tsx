"use client";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
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
      {paragraphs.map((p) => (
        <p key={p}>{renderInline(p)}</p>
      ))}
    </div>
  );
}
