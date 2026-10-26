import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight">
        {siteConfig.name}
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        {siteConfig.tagline}
      </p>
      <p className="mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Read the blog →
        </Link>
      </p>
    </div>
  );
}
