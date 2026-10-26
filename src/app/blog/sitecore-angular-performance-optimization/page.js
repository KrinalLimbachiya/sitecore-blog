import Link from "next/link";

// PLACEHOLDER_CONTENT
export const metadata = {
  title: "Sitecore + Angular Performance Optimization",
};

export default function Post() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="text-sm font-medium text-accent hover:underline"
      >
        ← Back to blog
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        Sitecore + Angular Performance Optimization
      </h1>
      <div className="mt-4 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-accent"
        />
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          2026-09-06
        </p>
      </div>
      <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-fuchsia-500" />
      <div className="mt-10 rounded-xl border border-dashed border-accent/30 bg-accent/5 p-6">
        <p className="text-sm font-semibold text-accent">Coming soon</p>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Content coming soon. Send this post&apos;s text over and it will
          replace this placeholder at{" "}
          <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.9em] text-accent">
            src/app/blog/sitecore-angular-performance-optimization/page.js
          </code>
          .
        </p>
      </div>
    </article>
  );
}
