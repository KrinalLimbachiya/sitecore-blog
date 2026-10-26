import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-3xl px-6 py-8 text-sm text-zinc-500 dark:text-zinc-400">
        © {year} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
