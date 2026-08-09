"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-void/80 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="section-pad container-max flex h-[4.5rem] items-center justify-between gap-4">
        <BrandLogo priority />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.875rem] font-medium text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/strategies"
            className="text-[0.875rem] font-semibold text-muted transition-colors hover:text-electric"
          >
            Explore Strategies
          </Link>
          <Button href="/creators" className="!px-5 !py-2.5 text-sm">
            Build Your First Portfolio
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex w-4 flex-col gap-1.5">
            <span className="h-px w-full bg-ink" />
            <span className="h-px w-full bg-ink" />
            <span className="h-px w-3 bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-deep/95 backdrop-blur-xl lg:hidden">
          <nav className="section-pad flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-muted hover:bg-white/5 hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 px-3 pb-2">
              <Button href="/creators" className="w-full">
                Build Your First Portfolio
              </Button>
              <Button href="/strategies" variant="secondary" className="w-full">
                Explore Strategies
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
