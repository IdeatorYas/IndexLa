import type { ReactNode } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { NAV_LINKS } from "@/lib/site";

const CONTACT_LINKS: {
  label: string;
  href: string;
  external?: boolean;
  icon: ReactNode;
}[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/indexla-onchain-investing/",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-[1.05rem] w-[1.05rem]">
        <path
          fill="currentColor"
          d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V24H.24V8.25zM8.34 8.25h4.33v2.14h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.86c0-1.88-.03-4.29-2.62-4.29-2.62 0-3.02 2.05-3.02 4.16V24H8.34V8.25z"
        />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:contact@indexla.tech",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-[1.05rem] w-[1.05rem]" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4 7.5 12 13l8-5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com/indexla_app",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-[1.05rem] w-[1.05rem]">
        <path
          fill="currentColor"
          d="M14.7 10.3 22.4 2h-1.8l-6.7 7.2L8.4 2H2l8.1 11.1L2 22h1.8l7.1-7.6L15.6 22H22l-7.3-11.7Zm-2.5 2.7-.8-1.1L4.6 3.3h2.8l5.2 7 .8 1.1 6.9 9.3h-2.8l-5.3-7.7Z"
        />
      </svg>
    ),
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-void">
      <div className="section-pad container-max flex flex-col gap-10 py-14 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <BrandLogo size="footer" />
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
            Own the assets. Own the strategy. Control the execution.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
          {NAV_LINKS.flatMap((link) =>
            link.children?.length
              ? link.children.map((child) => (
                  <Link
                    key={`${child.href}-${child.label}`}
                    href={child.href}
                    className="text-[1rem] font-medium text-muted transition-colors hover:text-electric"
                  >
                    {child.label}
                  </Link>
                ))
              : [
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[1rem] font-medium text-muted transition-colors hover:text-electric"
                  >
                    {link.label}
                  </Link>,
                ]
          )}
        </nav>
      </div>
      <div className="section-pad container-max flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {CONTACT_LINKS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-muted transition-colors hover:text-electric"
              >
                {item.icon}
                <span>{item.label}</span>
                {item.external ? (
                  <span className="sr-only"> (opens in a new tab)</span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-dim">
          © {new Date().getFullYear()} INDEXLA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
