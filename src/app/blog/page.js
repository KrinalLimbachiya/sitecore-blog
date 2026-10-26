import { publishedPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata = {
  title: "Blog",
};

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-accent">Writing</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        {publishedPosts.length} posts on Sitecore JSS and Angular architecture.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {publishedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
