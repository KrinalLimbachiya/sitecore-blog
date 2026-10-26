// One-off generator: creates a page.js for every entry in src/lib/posts.js
// that doesn't already have custom content. Safe to re-run — it will not
// overwrite a page.js that no longer contains the placeholder marker.
import { posts } from "../src/lib/posts.js";
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import path from "node:path";

const PLACEHOLDER_MARKER = "PLACEHOLDER_CONTENT";
const blogDir = path.join(process.cwd(), "src/app/blog");

for (const post of posts) {
  const dir = path.join(blogDir, post.slug);
  const file = path.join(dir, "page.js");
  await mkdir(dir, { recursive: true });

  let shouldWrite = true;
  try {
    const existing = await readFile(file, "utf8");
    shouldWrite = existing.includes(PLACEHOLDER_MARKER);
  } catch {
    shouldWrite = true;
  }

  if (!shouldWrite) {
    console.log(`skip (has real content): ${post.slug}`);
    continue;
  }

  const content = `// ${PLACEHOLDER_MARKER}
export const metadata = {
  title: "${post.title.replace(/"/g, '\\"')}",
};

export default function Post() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        ${post.title.replace(/"/g, "&quot;")}
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        ${post.date}
      </p>
      <div className="prose mt-8 max-w-none">
        <p>
          Content coming soon. Send this post&apos;s text over and it will
          replace this placeholder at{" "}
          <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
            src/app/blog/${post.slug}/page.js
          </code>
          .
        </p>
      </div>
    </article>
  );
}
`;

  await writeFile(file, content, "utf8");
  console.log(`wrote: ${post.slug}`);
}
