"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:bg-black/60 dark:supports-[backdrop-filter]:bg-black/40">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-xs font-bold text-accent-foreground">
            {siteConfig.name.charAt(0)}
          </span>
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {siteConfig.navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "text-accent"
                        : "text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
