import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-xl border border-black/10 p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:hover:shadow-black/30"
    >
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {post.date}
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {post.excerpt}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
        Read more
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
    </Link>
  );
}
