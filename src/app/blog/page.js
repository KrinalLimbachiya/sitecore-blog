import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata = {
  title: "Blog",
};

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <h2 className="text-xl font-medium group-hover:underline">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {post.date}
              </p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {post.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
