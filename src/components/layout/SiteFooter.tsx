import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { NAV_LINKS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-void">
      <div className="section-pad container-max flex flex-col gap-10 py-14 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <BrandLogo />
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
      <div className="section-pad container-max border-t border-line py-6 text-sm text-muted-dim">
        © {new Date().getFullYear()} INDEXLA. All rights reserved.
      </div>
    </footer>
  );
}
