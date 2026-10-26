import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/10 bg-surface dark:border-white/10">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/" className="text-base font-semibold tracking-tight">
              {siteConfig.name}
            </Link>
            <p className="mt-2 max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
              {siteConfig.tagline}
            </p>
          </div>
          <ul className="flex gap-6 text-sm font-medium">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-zinc-600 transition-colors hover:text-accent dark:text-zinc-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 border-t border-black/10 pt-6 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
          © {year} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
