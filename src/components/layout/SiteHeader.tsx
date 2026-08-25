"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { NAV_LINKS, type NavLink } from "@/lib/site";

function linkIsActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  // Keep Whitepaper and Technical Paper mutually exclusive in the active state.
  if (href === "/whitepaper") {
    return (
      pathname === "/whitepaper" ||
      (pathname.startsWith("/whitepaper/") &&
        !pathname.startsWith("/whitepaper/technical"))
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function parentIsActive(link: NavLink, pathname: string) {
  if (link.children?.length) {
    return link.children.some((child) => linkIsActive(child.href, pathname));
  }
  return linkIsActive(link.href, pathname);
}

const navLinkClass = (active: boolean) =>
  `whitespace-nowrap text-[1.05rem] font-medium tracking-[-0.01em] transition-colors xl:text-[1.1rem] ${
    active ? "text-ink" : "text-muted hover:text-ink"
  }`;

function WhitepaperDesktopDropdown({
  link,
  pathname,
}: {
  link: NavLink;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const active = parentIsActive(link, pathname);
  const children = link.children ?? [];

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => {
        const first = rootRef.current?.querySelector<HTMLAnchorElement>(
          "[data-nav-dropdown-item]"
        );
        first?.focus();
      });
    }
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      rootRef.current?.querySelectorAll<HTMLAnchorElement>(
        "[data-nav-dropdown-item]"
      ) ?? []
    );
    const index = items.findIndex((item) => item === document.activeElement);

    if (event.key === "Escape") {
      event.preventDefault();
      close();
      buttonRef.current?.focus();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = items[(index + 1) % items.length];
      next?.focus();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = items[(index - 1 + items.length) % items.length];
      prev?.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`inline-flex items-center gap-1.5 ${navLinkClass(active)}`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onButtonKeyDown}
      >
        {link.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2 3.5 L5 6.5 L8 3.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={link.label}
          className="absolute left-1/2 top-full z-50 min-w-[12.5rem] -translate-x-1/2 pt-2"
          onKeyDown={onMenuKeyDown}
        >
          <div className="overflow-hidden rounded-xl border border-line bg-deep/95 py-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            {children.map((child) => {
              const childActive = linkIsActive(child.href, pathname);
              return (
                <Link
                  key={`${child.href}-${child.label}`}
                  href={child.href}
                  role="menuitem"
                  data-nav-dropdown-item
                  className={`block whitespace-nowrap px-4 py-2.5 text-[1rem] font-medium tracking-[-0.01em] transition-colors ${
                    childActive
                      ? "bg-white/5 text-ink"
                      : "text-muted hover:bg-white/5 hover:text-ink"
                  }`}
                  onClick={close}
                >
                  {child.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileWhitepaperOpen, setMobileWhitepaperOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileWhitepaperOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-void/80 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="section-pad container-max flex h-20 items-center justify-between gap-3 lg:gap-4">
        <BrandLogo priority />

        <nav
          className="hidden items-center gap-3.5 lg:flex xl:gap-4 2xl:gap-5"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) =>
            link.children?.length ? (
              <WhitepaperDesktopDropdown
                key={link.href}
                link={link}
                pathname={pathname}
              />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(linkIsActive(link.href, pathname))}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

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
          <nav className="section-pad flex flex-col gap-1 py-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => {
              if (link.children?.length) {
                const active = parentIsActive(link, pathname);
                return (
                  <div key={link.href} className="flex flex-col">
                    <button
                      type="button"
                      className={`flex items-center justify-between rounded-lg px-3 py-3.5 text-left text-[1.1rem] font-medium transition-colors hover:bg-white/5 hover:text-ink ${
                        active ? "text-ink" : "text-muted"
                      }`}
                      aria-expanded={mobileWhitepaperOpen}
                      onClick={() => setMobileWhitepaperOpen((value) => !value)}
                    >
                      <span>{link.label}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden
                        className={`transition-transform duration-200 ${
                          mobileWhitepaperOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M2 3.5 L5 6.5 L8 3.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {mobileWhitepaperOpen ? (
                      <div className="mb-1 ml-2 flex flex-col gap-0.5 border-l border-line pl-3">
                        {link.children.map((child) => {
                          const childActive = linkIsActive(child.href, pathname);
                          return (
                            <Link
                              key={`${child.href}-${child.label}`}
                              href={child.href}
                              className={`rounded-lg px-3 py-3 text-[1.05rem] font-medium transition-colors hover:bg-white/5 hover:text-ink ${
                                childActive ? "text-ink" : "text-muted"
                              }`}
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              }

              const active = linkIsActive(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-3.5 text-[1.1rem] font-medium transition-colors hover:bg-white/5 hover:text-ink ${
                    active ? "text-ink" : "text-muted"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
