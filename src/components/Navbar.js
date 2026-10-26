import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Navbar() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium">
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
