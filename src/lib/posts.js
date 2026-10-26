// Simple in-code post index used by the blog listing page.
// Each entry points at a route under src/app/blog/<slug>/page.js.
// Add a new post by: 1) adding an entry here, 2) creating that folder + page.js.
// `body` is placeholder text — replace it (and ideally move to real content
// later) once you send over the actual post content.

export const posts = [
  {
    slug: "understanding-sitecore-jss-architecture-with-angular",
    title: "Understanding Sitecore JSS Architecture with Angular",
    date: "2026-09-08",
    excerpt:
      "A look at how Sitecore JSS is structured when paired with Angular.",
  },
  {
    slug: "how-sitecore-layout-service-works-with-angular",
    title: "How Sitecore Layout Service Works with Angular",
    date: "2026-09-22",
    excerpt:
      "Breaking down the Layout Service and how Angular consumes it.",
  },
  {
    slug: "sitecore-graphql-with-angular",
    title: "Sitecore GraphQL with Angular",
    date: "2026-10-06",
    excerpt: "Querying Sitecore content via GraphQL from an Angular app.",
  },
  {
    slug: "building-reusable-sitecore-components-with-angular-jss",
    title: "Building Reusable Sitecore Components with Angular JSS",
    date: "2026-10-20",
    excerpt: "Patterns for reusable, JSS-friendly Angular components.",
  },
  {
    slug: "debugging-sitecore-jss-angular-applications",
    published: false, // content not written yet - set to true (or remove) to show it
    title: "Debugging Sitecore JSS Angular Applications",
    date: "2026-09-05",
    excerpt: "Practical techniques for debugging JSS + Angular apps.",
  },
  {
    slug: "sitecore-angular-performance-optimization",
    published: false, // content not written yet - set to true (or remove) to show it
    title: "Sitecore + Angular Performance Optimization",
    date: "2026-09-06",
    excerpt: "Performance tuning tips for Sitecore JSS Angular apps.",
  },
  {
    slug: "multi-language-rtl-sitecore-applications-with-angular",
    published: false, // content not written yet - set to true (or remove) to show it
    title: "Multi-language & RTL Sitecore Applications with Angular",
    date: "2026-09-07",
    excerpt: "Handling multi-language and RTL support in JSS + Angular.",
  },
  {
    slug: "sitecore-jss-vs-content-sdk",
    published: false, // content not written yet - set to true (or remove) to show it
    title: "Sitecore JSS vs Content SDK",
    date: "2026-09-08",
    excerpt: "Comparing Sitecore JSS with the newer Content SDK.",
  },
  {
    slug: "building-an-ai-powered-sitecore-component-generator",
    published: false, // content not written yet - set to true (or remove) to show it
    title: "Building an AI-Powered Sitecore Component Generator",
    date: "2026-09-09",
    excerpt: "Using AI tooling to generate Sitecore JSS components.",
  },
];

// Only posts that are ready are shown in lists. Unpublished ones stay hidden.
export const publishedPosts = posts.filter((post) => post.published !== false);
