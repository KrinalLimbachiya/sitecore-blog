import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { publishedPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  const latest = publishedPosts.slice(0, 4);

  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16">
        <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Sitecore · JSS · Angular
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          {siteConfig.headline}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          {siteConfig.tagline}
        </p>
        <p className="mt-4 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
          {siteConfig.intro}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Read the blog →
          </Link>
          {latest[0] && (
            <Link
              href={`/blog/${latest[0].slug}`}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-accent dark:text-zinc-400"
            >
              Latest: {latest[0].title}
            </Link>
          )}
        </div>
      </section>

      <section className="border-t border-black/10 bg-surface dark:border-white/10">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Latest posts
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-accent hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
