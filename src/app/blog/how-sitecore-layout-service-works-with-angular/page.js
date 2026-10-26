import Link from "next/link";
import TableOfContents from "@/components/TableOfContents";

export const metadata = {
  title: "How Sitecore Layout Service Works with Angular",
  description:
    "Breaking down the Layout Service and how Angular consumes it.",
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const SECTION_OUTLINE = [
  "1. What Is Sitecore Layout Service?",
  [
    "2. Traditional Sitecore Rendering vs Layout Service",
    ["Traditional Sitecore", "Headless Sitecore JSS"],
  ],
  "3. The Complete Layout Service Flow",
  "4. What Does Layout Service Actually Return?",
  "5. Understanding the Route",
  "6. Understanding Placeholders",
  "7. How Angular Uses a Placeholder",
  "8. How Does Sitecore Tell Angular Which Component to Render?",
  "9. Where Does Component Content Come From?",
  "10. Angular Component Example",
  "11. Why Should We Use Sitecore Field Helpers?",
  "12. Datasources and Layout Service",
  "13. Rendering Parameters",
  "14. The Complete Example",
  "15. REST Layout Service",
  "16. GraphQL Layout Service",
  "17. Layout Service and Experience Edge",
  "18. What Happens When a Component Doesn't Render?",
  "19. Debugging Using Browser DevTools",
  "20. A Practical Debugging Matrix",
  "21. A Useful Mental Model",
  [
    "22. Key Takeaways",
    [
      "1. Sitecore owns content",
      "2. Sitecore owns page composition",
      "3. Layout Service delivers the structure",
      "4. JSS connects Sitecore to Angular",
      "5. Angular owns the presentation",
    ],
  ],
  "23. Final Architecture",
  "Conclusion",
];

const SECTIONS = SECTION_OUTLINE.map((entry) => {
  const [title, children] = Array.isArray(entry) ? entry : [entry];
  return {
    id: slugify(title),
    title,
    children: children?.map((child) => ({
      id: slugify(child),
      title: child,
    })),
  };
});

function H2({ children }) {
  return (
    <h2
      id={slugify(children)}
      className="mt-14 scroll-mt-24 flex items-center gap-3 text-2xl font-semibold tracking-tight"
    >
      <span
        aria-hidden="true"
        className="h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-accent to-fuchsia-500"
      />
      {children}
    </h2>
  );
}

function H3({ children }) {
  return (
    <h3
      id={slugify(children)}
      className="mt-8 scroll-mt-24 text-lg font-semibold tracking-tight text-accent"
    >
      {children}
    </h3>
  );
}

function P({ children }) {
  return (
    <p className="mt-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
      {children}
    </p>
  );
}

function List({ items }) {
  return (
    <ul className="mt-4 list-disc space-y-1.5 pl-6 text-zinc-700 dark:text-zinc-300">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function IC({ children }) {
  return (
    <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.9em] text-accent">
      {children}
    </code>
  );
}

const FLOW_TONES = {
  accent: {
    border: "border-accent/25",
    bg: "bg-accent/[.05] dark:bg-accent/[.09]",
    badge: "bg-accent text-accent-foreground",
    text: "text-zinc-900 dark:text-zinc-50",
    line: "text-accent/40",
  },
  neutral: {
    border: "border-zinc-300 dark:border-zinc-700",
    bg: "bg-zinc-100/70 dark:bg-zinc-800/50",
    badge: "bg-zinc-500 text-white",
    text: "text-zinc-700 dark:text-zinc-200",
    line: "text-zinc-400/60",
  },
  good: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/[.06] dark:bg-emerald-500/[.12]",
    badge: "bg-emerald-500 text-white",
    text: "text-emerald-950 dark:text-emerald-100",
    line: "text-emerald-500/50",
  },
  bad: {
    border: "border-rose-500/30",
    bg: "bg-rose-500/[.06] dark:bg-rose-500/[.12]",
    badge: "bg-rose-500 text-white",
    text: "text-rose-950 dark:text-rose-100",
    line: "text-rose-500/50",
  },
};

function FlowNode({ title, items, badge, tone = "accent", size = "md" }) {
  const t = FLOW_TONES[tone];
  const compact = size === "sm";
  return (
    <div
      className={`w-full ${compact ? "max-w-[220px]" : "max-w-md"} rounded-xl border ${t.border} ${t.bg} ${compact ? "px-3 py-2" : "px-4 py-3"} shadow-sm`}
    >
      <div className="flex items-center gap-2">
        {badge && (
          <span
            className={`inline-flex h-5 shrink-0 items-center justify-center rounded-full px-2 text-[10px] font-bold ${t.badge}`}
          >
            {badge}
          </span>
        )}
        <span
          className={`${compact ? "text-[12.5px]" : "text-sm"} font-semibold leading-snug ${t.text}`}
        >
          {title}
        </span>
      </div>
      {items?.length > 0 && (
        <ul
          className={`mt-1.5 space-y-1 ${compact ? "text-[11px]" : "text-[12.5px]"} text-zinc-600 dark:text-zinc-400`}
        >
          {items.map((it, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-current opacity-60" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FlowArrow({ label, tone = "accent", size = "md" }) {
  const t = FLOW_TONES[tone];
  return (
    <div className={`flex flex-col items-center ${size === "sm" ? "py-1" : "py-1.5"}`}>
      {label && (
        <span className="mb-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-center text-[10.5px] font-medium text-accent">
          {label}
        </span>
      )}
      <svg
        width={size === "sm" ? "12" : "14"}
        height={size === "sm" ? "16" : "18"}
        viewBox="0 0 14 18"
        fill="none"
        aria-hidden="true"
        className={t.line}
      >
        <path
          d="M7 0V13M7 13L1.5 7.5M7 13L12.5 7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Flow({ steps, tone = "accent", size = "md", bare = false }) {
  return (
    <div className={`flex flex-col items-center ${bare ? "" : "my-6"}`}>
      {steps.map((step, i) => (
        <div key={i} className="flex w-full flex-col items-center">
          <FlowNode {...step} tone={step.tone || tone} size={size} />
          {i < steps.length - 1 && (
            <FlowArrow label={step.arrowLabel} tone={step.tone || tone} size={size} />
          )}
        </div>
      ))}
    </div>
  );
}

function TreeItem({ node, isLast, isRoot, tone = "accent" }) {
  const chip = {
    accent:
      "border-accent/25 bg-accent/[.06] text-zinc-800 dark:bg-accent/[.1] dark:text-zinc-100",
    neutral:
      "border-zinc-300 bg-zinc-100/70 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200",
  }[tone];
  return (
    <li
      className={
        isRoot
          ? "relative"
          : `relative pl-5 pt-2 before:absolute before:left-0 before:top-[1.05rem] before:h-px before:w-5 before:bg-accent/30 after:absolute after:left-0 after:top-0 after:w-px after:bg-accent/30 ${
              isLast ? "after:h-[1.05rem]" : "after:h-full"
            }`
      }
    >
      <div
        className={`inline-flex flex-wrap items-baseline gap-x-2 rounded-lg border px-3 py-1.5 ${chip}`}
      >
        <span className="text-[13px] font-semibold">{node.label}</span>
        {node.value && (
          <span className="text-[12px] italic text-zinc-500 dark:text-zinc-400">
            “{node.value}”
          </span>
        )}
      </div>
      {node.children?.length > 0 && (
        <ul className="pl-5">
          {node.children.map((child, i) => (
            <TreeItem
              key={i}
              node={child}
              isLast={i === node.children.length - 1}
              tone={tone}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function Tree({ data, tone = "accent" }) {
  return (
    <div className="my-6 overflow-x-auto">
      <ul className="min-w-max text-sm">
        <TreeItem node={data} isRoot tone={tone} />
      </ul>
    </div>
  );
}

function Code({ children }) {
  return (
    <div className="my-6 overflow-hidden rounded-lg bg-indigo-950">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-indigo-100">
        <code>{children.trim()}</code>
      </pre>
    </div>
  );
}

function Callout({ children }) {
  return (
    <div className="my-6 flex gap-3 rounded-xl border border-accent/20 bg-gradient-to-r from-accent/10 to-fuchsia-500/10 px-5 py-4 text-zinc-800 dark:text-zinc-100">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground"
      >
        !
      </span>
      <div>{children}</div>
    </div>
  );
}

function Table({ head, rows }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-accent/20">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-accent/20 bg-accent/5">
            {head.map((h, i) => (
              <th
                key={i}
                className="px-4 py-2 text-left font-semibold text-accent"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-accent/10 last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-2 text-zinc-700 dark:text-zinc-300"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArchNode({ x, y, w, h, label, accent }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        className={
          accent
            ? "fill-accent stroke-accent"
            : "fill-accent/[.08] stroke-accent/30 dark:fill-accent/[.16]"
        }
        strokeWidth="1.2"
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        className={
          accent
            ? "fill-accent-foreground text-[13px] font-semibold"
            : "fill-zinc-800 text-[13px] font-semibold dark:fill-zinc-100"
        }
      >
        {label}
      </text>
    </g>
  );
}

function FinalArchitectureDiagram() {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-accent/15 bg-accent/[.02] p-4 dark:bg-accent/[.04]">
      <svg
        viewBox="0 0 640 600"
        className="mx-auto min-w-[560px]"
        role="img"
        aria-label="Sitecore branches into Content, Layout and Rendering, which merge into the Layout Service, delivered via REST or GraphQL into JSS Angular. JSS Angular branches into Routing, Placeholder and Mapping, which merge into Angular Components, then flow into HTML/CSS/UI and finally the Browser."
      >
        <g className="text-accent/35" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M320,60 V80 M130,80 H510 M130,80 V100 M320,80 V100 M510,80 V100 M130,140 V160 M320,140 V160 M510,140 V160 M130,160 H510 M320,160 V180 M320,220 V260 M320,300 V320 M130,320 H510 M130,320 V340 M320,320 V340 M510,320 V340 M130,380 V400 M320,380 V400 M510,380 V400 M130,400 H510 M320,400 V420 M320,460 V480 M320,520 V540" />
        </g>
        <text x={335} y={244} className="fill-accent text-[11px] font-medium">
          REST / GraphQL
        </text>
        <ArchNode x={245} y={20} w={150} h={40} label="SITECORE" accent />
        <ArchNode x={60} y={100} w={140} h={40} label="Content" />
        <ArchNode x={250} y={100} w={140} h={40} label="Layout" />
        <ArchNode x={440} y={100} w={140} h={40} label="Rendering" />
        <ArchNode x={220} y={180} w={200} h={40} label="LAYOUT SERVICE" accent />
        <ArchNode x={220} y={260} w={200} h={40} label="JSS ANGULAR" accent />
        <ArchNode x={60} y={340} w={140} h={40} label="Routing" />
        <ArchNode x={250} y={340} w={140} h={40} label="Placeholder" />
        <ArchNode x={440} y={340} w={140} h={40} label="Mapping" />
        <ArchNode x={210} y={420} w={220} h={40} label="ANGULAR COMPONENTS" />
        <ArchNode x={230} y={480} w={180} h={40} label="HTML / CSS / UI" />
        <ArchNode x={250} y={540} w={140} h={40} label="BROWSER" accent />
      </svg>
    </div>
  );
}

function DataFlowDiagram() {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-accent/15 bg-accent/[.02] p-4 dark:bg-accent/[.04]">
      <svg
        viewBox="0 0 640 480"
        className="mx-auto min-w-[560px]"
        role="img"
        aria-label="Sitecore branches into Layout, Renderings and Content, which merge into the Layout Service and flow as JSON into Angular JSS. Angular JSS branches into Hero, Content and Promo, each rendered by its own Angular Component."
      >
        <g className="text-accent/35" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M320,60 V80 M130,80 H510 M130,80 V100 M320,80 V100 M510,80 V100 M130,140 V160 M320,140 V160 M510,140 V160 M130,160 H510 M320,160 V180 M320,220 V260 M320,300 V320 M130,320 H510 M130,320 V340 M320,320 V340 M510,320 V340 M130,380 V420 M320,380 V420 M510,380 V420" />
        </g>
        <text x={345} y={244} className="fill-accent text-[11px] font-medium">
          JSON
        </text>
        <ArchNode x={245} y={20} w={150} h={40} label="SITECORE" accent />
        <ArchNode x={60} y={100} w={140} h={40} label="Layout" />
        <ArchNode x={250} y={100} w={140} h={40} label="Renderings" />
        <ArchNode x={440} y={100} w={140} h={40} label="Content" />
        <ArchNode x={220} y={180} w={200} h={40} label="LAYOUT SERVICE" accent />
        <ArchNode x={220} y={260} w={200} h={40} label="ANGULAR JSS" accent />
        <ArchNode x={60} y={340} w={140} h={40} label="Hero" />
        <ArchNode x={250} y={340} w={140} h={40} label="Content" />
        <ArchNode x={440} y={340} w={140} h={40} label="Promo" />
        <ArchNode x={50} y={420} w={160} h={40} label="Angular Component" />
        <ArchNode x={240} y={420} w={160} h={40} label="Angular Component" />
        <ArchNode x={430} y={420} w={160} h={40} label="Angular Component" />
      </svg>
    </div>
  );
}

export default function Post() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-12">
      <TableOfContents sections={SECTIONS} />
      <article className="mx-auto max-w-3xl lg:mx-0">
      <Link
        href="/blog"
        className="text-sm font-medium text-accent hover:underline"
      >
        ← Back to blog
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        How Sitecore Layout Service Works with Angular
      </h1>
      <div className="mt-4 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-accent"
        />
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          2026-09-22
        </p>
      </div>
      <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-fuchsia-500" />

      <div className="mt-8 max-w-none">
        <P>
          In the previous article, we explored the overall architecture of{" "}
          <Link
            href="/blog/understanding-sitecore-jss-architecture-with-angular"
            className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
          >
            Sitecore JSS with Angular
          </Link>{" "}
          and how Sitecore and Angular work together in a headless
          architecture.
        </P>
        <P>
          One component of that architecture deserves a much deeper look:{" "}
          <strong>Sitecore Layout Service</strong>.
        </P>
        <P>
          If you are new to Sitecore JSS, Layout Service can initially feel
          like a black box:
        </P>
        <Flow
          bare
          size="sm"
          steps={[
            { title: "Angular requests a page" },
            { title: "Sitecore returns JSON" },
            { title: "Angular somehow turns that JSON into a complete page" },
          ]}
        />
        <P>But what exactly is inside that JSON?</P>
        <List
          items={[
            "How does Sitecore know which components should be displayed?",
            "How does Angular know which Angular component should be rendered?",
            "What happens when a component has a datasource?",
            "And how do you debug the application when a Sitecore component doesn't appear?",
          ]}
        />
        <P>
          In this article, we will answer all of these questions by
          following the complete journey from a browser request to the final
          Angular component.
        </P>

        <H2>1. What Is Sitecore Layout Service?</H2>
        <P>
          Sitecore Layout Service is an API that exposes page layout and
          rendering information as structured data so that a headless
          application can consume it.
        </P>
        <P>
          Instead of Sitecore generating the final HTML, Sitecore provides
          information such as:
        </P>
        <List
          items={[
            "The requested route",
            "Page layout",
            "Placeholders",
            "Renderings",
            "Rendering parameters",
            "Datasource information",
            "Component fields",
            "Context information",
          ]}
        />
        <P>The Angular application then uses this information to render the page.</P>
        <P>At a high level:</P>
        <Flow
          steps={[
            { title: "Sitecore", arrowLabel: "Page + Layout" },
            { title: "Layout Service", arrowLabel: "JSON" },
            { title: "Angular JSS" },
            { title: "Angular Components" },
            { title: "HTML / UI" },
          ]}
        />
        <Callout>
          This separation is one of the key concepts behind headless Sitecore
          development.
        </Callout>

        <H2>2. Traditional Sitecore Rendering vs Layout Service</H2>
        <P>Let&apos;s first compare the two approaches.</P>

        <H3>Traditional Sitecore</H3>
        <P>In a traditional Sitecore implementation:</P>
        <Flow
          steps={[
            { title: "Browser" },
            {
              title: "Sitecore",
              items: ["Content", "Layout", "Rendering", "Razor View"],
            },
            { title: "HTML", tone: "neutral" },
            { title: "Browser" },
          ]}
        />
        <P>Sitecore is responsible for generating the HTML.</P>

        <H3>Headless Sitecore JSS</H3>
        <P>With JSS:</P>
        <Flow
          steps={[
            { title: "Browser" },
            { title: "Angular" },
            { title: "Layout Service" },
            {
              title: "Sitecore",
              items: ["Content", "Layout", "Renderings", "Datasources"],
              arrowLabel: "JSON",
            },
            { title: "Angular" },
            { title: "HTML" },
          ]}
        />
        <P>The responsibility changes.</P>
        <Callout>
          <strong>Sitecore answers:</strong> What should be displayed?
          <br />
          <strong>Angular answers:</strong> How should it be displayed?
        </Callout>

        <H2>3. The Complete Layout Service Flow</H2>
        <P>Let&apos;s look at the complete request lifecycle.</P>
        <Flow
          steps={[
            { badge: "1", title: "Browser", items: ["/products"] },
            { badge: "2", title: "Angular Router" },
            {
              badge: "3",
              title: "JSS Layer",
              items: ["Route + Site Context"],
            },
            { badge: "4", title: "Layout Service" },
            {
              badge: "5",
              title: "Sitecore",
              items: [
                "Content + Layout",
                "Renderings",
                "Placeholders",
                "Datasources",
              ],
              arrowLabel: "JSON",
            },
            { badge: "6", title: "Angular JSS" },
            { badge: "7", title: "Component Mapping" },
            { badge: "8", title: "Angular Components" },
          ]}
        />
        <Callout>
          The important part is that Layout Service is the bridge between
          Sitecore&apos;s page composition and the frontend application.
        </Callout>

        <H2>4. What Does Layout Service Actually Return?</H2>
        <P>Suppose we have a Sitecore page:</P>
        <Tree
          data={{
            label: "Home",
            children: [
              {
                label: "main",
                children: [
                  { label: "Hero" },
                  { label: "Content Block" },
                  { label: "Promo Banner" },
                ],
              },
            ],
          }}
        />
        <P>
          Sitecore knows that these three renderings have been placed inside
          the <IC>main</IC> placeholder.
        </P>
        <P>The Layout Service exposes that information to the frontend.</P>
        <P>A simplified representation might look like:</P>
        <Code>{`
{
  "sitecore": {
    "route": {
      "name": "home",
      "placeholders": {
        "main": [
          {
            "componentName": "Hero"
          },
          {
            "componentName": "ContentBlock"
          },
          {
            "componentName": "PromoBanner"
          }
        ]
      }
    }
  }
}
        `}</Code>
        <P>
          The actual response structure depends on the Sitecore/JSS version
          and configuration, but the important concept remains the same:
        </P>
        <Flow
          bare
          size="sm"
          tone="neutral"
          steps={[
            { title: "Sitecore Layout" },
            { title: "Structured Data" },
            { title: "Angular" },
          ]}
        />

        <H2>5. Understanding the Route</H2>
        <P>
          One of the most important objects in the Layout Service response is
          the <IC>route</IC>.
        </P>
        <P>The route represents the Sitecore page being requested.</P>
        <P>Conceptually:</P>
        <Code>{`
{
  "route": {
    "name": "products",
    "displayName": "Products",
    "placeholders": {}
  }
}
        `}</Code>
        <P>The route can contain:</P>
        <List
          items={[
            "Page information",
            "Fields",
            "Placeholder data",
            "Rendering information",
            "Context information",
          ]}
        />
        <P>For example:</P>
        <Flow
          bare
          size="sm"
          steps={[
            { title: "/products" },
            { title: "Sitecore Content Item" },
            { title: "Products Page" },
            { title: "Layout Service" },
            { title: "Angular Route Data" },
          ]}
        />
        <P>
          This is why Sitecore JSS applications don&apos;t necessarily need
          every page to be hardcoded as an Angular route.
        </P>
        <P>The content tree can drive the page structure.</P>

        <H2>6. Understanding Placeholders</H2>
        <P>Placeholders are one of the most important concepts to understand.</P>
        <P>Imagine your Sitecore page contains:</P>
        <Tree
          data={{
            label: "Home",
            children: [
              { label: "Header" },
              {
                label: "main",
                children: [
                  { label: "Hero" },
                  { label: "Feature List" },
                  { label: "Promo" },
                ],
              },
              { label: "Footer" },
            ],
          }}
        />
        <P>
          The <IC>main</IC> section is a placeholder.
        </P>
        <P>Sitecore knows:</P>
        <Tree
          tone="neutral"
          data={{
            label: "main",
            children: [
              { label: "Hero" },
              { label: "Feature List" },
              { label: "Promo" },
            ],
          }}
        />
        <P>Layout Service exposes this information.</P>
        <P>Angular then receives something conceptually similar to:</P>
        <Code>{`
{
  "placeholders": {
    "main": [
      {
        "componentName": "Hero"
      },
      {
        "componentName": "FeatureList"
      },
      {
        "componentName": "Promo"
      }
    ]
  }
}
        `}</Code>
        <P>The Angular application doesn&apos;t need to manually say:</P>
        <Code>{`
<app-hero></app-hero>
<app-feature-list></app-feature-list>
<app-promo></app-promo>
        `}</Code>
        <P>
          Instead, the JSS placeholder mechanism dynamically renders the
          components defined by Sitecore.
        </P>

        <H2>7. How Angular Uses a Placeholder</H2>
        <P>A simplified Angular layout can look like:</P>
        <Code>{`
<div class="page">

  <header>
    <!-- Header -->
  </header>

  <main>
    <sc-placeholder
      name="main"
      [rendering]="route">
    </sc-placeholder>
  </main>

  <footer>
    <!-- Footer -->
  </footer>

</div>
        `}</Code>
        <P>The placeholder receives the Sitecore route/rendering data.</P>
        <P>
          JSS then looks at the renderings assigned to the <IC>main</IC>{" "}
          placeholder.
        </P>
        <P>Conceptually:</P>
        <Flow
          steps={[
            { title: "sc-placeholder" },
            { title: "Read “main”" },
            {
              title: "Find renderings",
              items: ["Hero", "FeatureList", "Promo"],
            },
            { title: "Component Factory" },
            { title: "Angular Components" },
          ]}
        />
        <Callout>
          This is the mechanism that makes Sitecore&apos;s drag-and-drop page
          composition possible in a headless Angular application.
        </Callout>

        <H2>8. How Does Sitecore Tell Angular Which Component to Render?</H2>
        <P>This is where component mapping comes into the picture.</P>
        <P>Suppose Sitecore sends:</P>
        <Code>{`
{
  "componentName": "Hero"
}
        `}</Code>
        <P>Angular needs to know:</P>
        <Flow
          bare
          size="sm"
          steps={[{ title: "Hero" }, { title: "HeroComponent" }]}
        />
        <P>
          The JSS Angular application maintains the relationship between
          Sitecore rendering names and Angular components.
        </P>
        <P>Conceptually:</P>
        <Code>{`
const componentMap = {
  Hero: HeroComponent,
  ContentBlock: ContentBlockComponent,
  PromoBanner: PromoBannerComponent
};
        `}</Code>
        <P>
          The exact registration API depends on your JSS version, but the
          architectural idea is:
        </P>
        <Flow
          bare
          size="sm"
          tone="neutral"
          steps={[
            { title: "Sitecore Rendering Name" },
            { title: "JSS Component Map" },
            { title: "Angular Component" },
          ]}
        />
        <P>This is why a rendering-name mismatch can cause a component to fail to render.</P>
        <P>For example:</P>
        <Code>{`
Sitecore:
ProductHero

Angular:
ProductHeroComponent
        `}</Code>
        <P>
          The mapping needs to associate the Sitecore rendering name with the
          Angular implementation.
        </P>

        <H2>9. Where Does Component Content Come From?</H2>
        <P>Now let&apos;s make the example more realistic.</P>
        <P>Suppose our Hero component contains:</P>
        <List items={["Title", "Description", "Image", "CTA"]} />
        <P>In Sitecore:</P>
        <Tree
          data={{
            label: "Hero Datasource",
            children: [
              { label: "Title" },
              { label: "Description" },
              { label: "Image" },
              { label: "CTA" },
            ],
          }}
        />
        <P>The Layout Service response can include these fields as part of the rendering data.</P>
        <P>A simplified example:</P>
        <Code>{`
{
  "componentName": "Hero",
  "fields": {
    "Title": {
      "value": "Build Better Digital Experiences"
    },
    "Description": {
      "value": "Create modern experiences with Sitecore."
    },
    "CTA": {
      "value": "Learn More"
    }
  }
}
        `}</Code>
        <P>Angular receives this data through the rendering object.</P>

        <H2>10. Angular Component Example</H2>
        <P>A simplified Hero component could look like this:</P>
        <Code>{`
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  @Input() rendering: any;
}
        `}</Code>
        <P>Then the template:</P>
        <Code>{`
<section class="hero">

  <h1>
    {{ rendering?.fields?.Title?.value }}
  </h1>

  <p>
    {{ rendering?.fields?.Description?.value }}
  </p>

  <a href="#">
    {{ rendering?.fields?.CTA?.value }}
  </a>

</section>
        `}</Code>
        <P>The flow is:</P>
        <Flow
          steps={[
            { title: "Sitecore Field" },
            { title: "Layout Service" },
            { title: "JSON", tone: "neutral" },
            { title: "JSS Rendering Object" },
            { title: "@Input()" },
            { title: "Angular Template" },
          ]}
        />

        <H2>11. Why Should We Use Sitecore Field Helpers?</H2>
        <P>
          In a real Sitecore JSS application, you should generally use the
          JSS field-rendering components/helpers rather than treating every
          field as a plain string.
        </P>
        <P>For example, Sitecore fields can contain more than just their displayed value.</P>
        <P>An image field may contain:</P>
        <List items={["Image URL", "Alt text", "Dimensions", "Other metadata"]} />
        <P>A link field may contain:</P>
        <List items={["URL", "Link text", "Target", "Attributes"]} />
        <P>
          JSS provides field rendering helpers so that Sitecore field data can
          be rendered appropriately.
        </P>
        <P>For example, conceptually:</P>
        <Code>{`
<sc-text
  [field]="rendering.fields.Title">
</sc-text>
        `}</Code>
        <P>For an image:</P>
        <Code>{`
<sc-image
  [media]="rendering.fields.Image">
</sc-image>
        `}</Code>
        <P>And for a link:</P>
        <Code>{`
<sc-link
  [field]="rendering.fields.CTA">
</sc-link>
        `}</Code>
        <P>The exact syntax should be aligned with the JSS Angular version used by your project.</P>
        <Callout>
          The benefit is that Sitecore remains responsible for the semantics
          and metadata of the field while Angular remains responsible for
          presentation.
        </Callout>

        <H2>12. Datasources and Layout Service</H2>
        <P>Now let&apos;s look at an important real-world concept: datasources.</P>
        <P>Suppose you have:</P>
        <Tree
          data={{
            label: "Page",
            children: [
              {
                label: "Hero Rendering",
                children: [
                  {
                    label: "Datasource",
                    children: [
                      { label: "Title" },
                      { label: "Description" },
                      { label: "Image" },
                      { label: "CTA" },
                    ],
                  },
                ],
              },
            ],
          }}
        />
        <P>The rendering itself defines the component.</P>
        <P>The datasource provides the content.</P>
        <P>This gives us:</P>
        <Flow
          bare
          size="sm"
          steps={[
            { title: "Rendering", arrowLabel: "Defines WHAT" },
            { title: "Hero Component", arrowLabel: "Gets content FROM" },
            { title: "Datasource" },
          ]}
        />
        <P>Layout Service brings this information together so the Angular component can render it.</P>
        <P>
          This separation is extremely useful because the same Hero rendering
          can be reused with different datasource items.
        </P>
        <P>For example:</P>
        <Tree
          tone="neutral"
          data={{
            label: "Hero Rendering",
            children: [
              { label: "Homepage Hero" },
              { label: "Product Hero" },
              { label: "Campaign Hero" },
            ],
          }}
        />
        <P>Same Angular component.</P>
        <P>Different Sitecore content.</P>

        <H2>13. Rendering Parameters</H2>
        <P>Sitecore components can also have rendering parameters.</P>
        <P>For example:</P>
        <Tree
          data={{
            label: "Hero",
            children: [
              { label: "Datasource" },
              {
                label: "Rendering Parameters",
                children: [
                  { label: "Theme = Dark" },
                  { label: "Alignment = Center" },
                  { label: "Size = Large" },
                ],
              },
            ],
          }}
        />
        <Callout>
          <strong>The datasource answers:</strong> What content should be
          displayed?
          <br />
          <strong>Rendering parameters answer:</strong> How should this
          particular rendering behave?
        </Callout>
        <P>A simplified representation could look like:</P>
        <Code>{`
{
  "componentName": "Hero",
  "fields": {
    "Title": {
      "value": "Welcome"
    }
  },
  "params": {
    "theme": "dark",
    "alignment": "center"
  }
}
        `}</Code>
        <P>Angular can then use these parameters to control the presentation.</P>
        <P>For example:</P>
        <Code>{`
get theme(): string {
  return this.rendering?.params?.theme || 'default';
}
        `}</Code>
        <P>And:</P>
        <Code>{`
<section
  class="hero"
  [class.dark]="theme === 'dark'">
</section>
        `}</Code>
        <Callout>
          This is another example of Sitecore controlling page composition
          while Angular controls the UI implementation.
        </Callout>

        <H2>14. The Complete Example</H2>
        <P>Let&apos;s put everything together.</P>
        <P>Imagine Sitecore contains:</P>
        <Tree
          data={{
            label: "Home",
            children: [
              {
                label: "main",
                children: [
                  { label: "Hero", value: "Datasource: Home Hero" },
                  { label: "ContentBlock", value: "Datasource: Introduction" },
                  {
                    label: "PromoBanner",
                    value: "Datasource: Special Offer",
                  },
                ],
              },
            ],
          }}
        />
        <P>The data flow becomes:</P>
        <DataFlowDiagram />
        <P>This is the heart of Sitecore JSS.</P>

        <H2>15. REST Layout Service</H2>
        <P>One way to consume Layout Service is through its REST API.</P>
        <P>Conceptually:</P>
        <Flow
          steps={[
            { title: "Angular", arrowLabel: "HTTP GET" },
            { title: "Layout Service" },
            { title: "Sitecore" },
            { title: "Layout JSON", tone: "neutral" },
          ]}
        />
        <P>A simplified request might look conceptually like:</P>
        <Code>{`/sitecore/api/layout/render/jss`}</Code>
        <P>
          with the appropriate site, language, route and other configuration
          required by the application.
        </P>
        <P>The exact endpoint and parameters depend on your Sitecore/JSS setup.</P>
        <Callout>
          The important point is that the frontend is requesting layout data,
          not an HTML page.
        </Callout>

        <H2>16. GraphQL Layout Service</H2>
        <P>GraphQL provides another approach for JSS layout data.</P>
        <P>The architecture becomes:</P>
        <Flow
          steps={[
            { title: "Angular" },
            { title: "GraphQL Client" },
            { title: "GraphQL Layout Service" },
            { title: "Sitecore" },
            { title: "GraphQL Response", tone: "neutral" },
          ]}
        />
        <P>A simplified conceptual query could look like:</P>
        <Code>{`
query {
  layout(site: "my-site", route: "/products", language: "en") {
    item {
      name
    }
  }
}
        `}</Code>
        <P>
          The exact query shape depends on the Sitecore version, GraphQL
          endpoint and JSS configuration.
        </P>
        <P>This is an important distinction:</P>
        <Callout>
          GraphQL is not replacing the concept of Layout Service. It can be a
          delivery mechanism for retrieving layout data.
        </Callout>
        <P>
          Sitecore documentation provides specific GraphQL Layout Service
          support for JSS applications.
        </P>

        <H2>17. Layout Service and Experience Edge</H2>
        <P>
          For modern headless architectures, the delivery flow can also
          involve Sitecore Experience Edge.
        </P>
        <P>A simplified architecture looks like:</P>
        <Flow
          steps={[
            { title: "Sitecore", arrowLabel: "Publish" },
            { title: "Experience Edge", arrowLabel: "GraphQL" },
            { title: "Angular / JSS" },
            { title: "Browser" },
          ]}
        />
        <P>This allows content to be delivered through a scalable headless delivery platform.</P>
        <P>
          Sitecore documentation describes Experience Edge as a headless
          content delivery service and documents its use with JSS
          applications.
        </P>

        <H2>18. What Happens When a Component Doesn&apos;t Render?</H2>
        <P>This is where understanding Layout Service becomes extremely valuable.</P>
        <P>Suppose you add a Hero component in Sitecore but nothing appears on the website.</P>
        <Callout>Don&apos;t immediately start changing Angular code.</Callout>
        <P>Instead, follow the data flow.</P>
        <Flow
          steps={[
            { title: "Component Not Rendering", tone: "bad" },
            { title: "Is it added to Sitecore?" },
            { title: "Is it inside the expected placeholder?" },
            { title: "Does Layout Service return it?" },
            { title: "Is componentName correct?" },
            { title: "Is Angular mapping registered?" },
            { title: "Does Angular receive rendering data?" },
            { title: "Does the component template work?", tone: "good" },
          ]}
        />
        <P>This gives you a systematic debugging approach.</P>

        <H2>19. Debugging Using Browser DevTools</H2>
        <P>Open the browser&apos;s Network tab.</P>
        <P>Find the Layout Service request. Then inspect the response.</P>
        <P>Look for:</P>
        <List
          items={[
            "route",
            "placeholders",
            "componentName",
            "fields",
            "datasource",
            "params",
          ]}
        />
        <P>For example:</P>
        <Code>{`
{
  "componentName": "Hero",
  "fields": {
    "Title": {
      "value": "Welcome"
    }
  }
}
        `}</Code>
        <P>
          If Hero isn&apos;t present in the response, the problem is likely
          before Angular rendering.
        </P>
        <P>If Hero is present but the UI is missing, investigate:</P>
        <Flow
          steps={[
            { title: "Component Mapping" },
            { title: "Angular Component" },
            { title: "Template" },
            { title: "CSS / Runtime Error", tone: "bad" },
          ]}
        />
        <P>This distinction can dramatically reduce debugging time.</P>

        <H2>20. A Practical Debugging Matrix</H2>
        <Table
          head={["Problem", "Where to Check"]}
          rows={[
            ["Page not loading", "Routing / Layout Service"],
            ["Component missing from response", "Sitecore layout"],
            ["Wrong component", "Rendering name / mapping"],
            ["Fields empty", "Datasource / field configuration"],
            ["Component exists but doesn't render", "Angular mapping"],
            ["Image incorrect", "JSS image field rendering"],
            ["Link incorrect", "JSS link field rendering"],
            ["Styling incorrect", "Angular CSS/SCSS"],
            ["Arabic content missing", "Language / dictionary / datasource"],
            ["Wrong page content", "Site / language / route context"],
          ]}
        />
        <Callout>The key is to determine which layer owns the problem.</Callout>

        <H2>21. A Useful Mental Model</H2>
        <P>Whenever you work with Sitecore JSS, think in terms of four layers.</P>
        <Flow
          steps={[
            {
              badge: "1",
              title: "CONTENT",
              items: ["What content exists?"],
            },
            {
              badge: "2",
              title: "COMPOSITION",
              items: [
                "Where is it placed?",
                "Which rendering?",
                "Which placeholder?",
              ],
            },
            {
              badge: "3",
              title: "DELIVERY",
              items: ["REST / GraphQL", "Layout Service"],
            },
            {
              badge: "4",
              title: "PRESENTATION",
              items: ["Angular Component", "HTML / CSS / Interaction"],
            },
          ]}
        />
        <P>When something goes wrong, identify which layer is failing.</P>

        <H2>22. Key Takeaways</H2>
        <P>After understanding Layout Service, the Sitecore + Angular architecture becomes much clearer.</P>
        <P>Remember these five concepts:</P>

        <H3>1. Sitecore owns content</H3>
        <P>Sitecore manages:</P>
        <List
          items={[
            "Content",
            "Templates",
            "Datasources",
            "Languages",
            "Publishing",
          ]}
        />

        <H3>2. Sitecore owns page composition</H3>
        <P>Sitecore determines:</P>
        <List
          items={["Layout", "Placeholders", "Renderings", "Rendering Parameters"]}
        />

        <H3>3. Layout Service delivers the structure</H3>
        <P>
          The Layout Service transforms Sitecore&apos;s page composition into
          data that the frontend can consume.
        </P>

        <H3>4. JSS connects Sitecore to Angular</H3>
        <P>JSS handles concepts such as:</P>
        <List
          items={[
            "Routing",
            "Placeholders",
            "Component Mapping",
            "Field Rendering",
            "Layout Data",
          ]}
        />

        <H3>5. Angular owns the presentation</H3>
        <P>Angular determines:</P>
        <List
          items={[
            "HTML",
            "CSS",
            "Interaction",
            "Application Logic",
            "Client-side Behavior",
          ]}
        />

        <H2>23. Final Architecture</H2>
        <P>We can now represent the entire architecture in one diagram:</P>
        <FinalArchitectureDiagram />
        <P>
          Once you understand this flow, Sitecore JSS stops looking like a
          collection of separate APIs and starts looking like a single
          data-driven rendering system.
        </P>
        <P>The most important idea is:</P>
        <Callout>
          Sitecore defines the page. Layout Service describes the page. JSS
          connects the page to Angular. Angular renders the page.
        </Callout>

        <H2>Conclusion</H2>
        <P>
          Sitecore Layout Service is the bridge between the Sitecore content
          and layout management system and a headless Angular application.
        </P>
        <P>When a user requests a page, the application doesn&apos;t simply ask Sitecore for HTML.</P>
        <P>Instead, the application requests structured layout information.</P>
        <P>Sitecore determines:</P>
        <List
          items={[
            "Which page was requested",
            "Which renderings belong to the page",
            "Which placeholders contain those renderings",
            "Which datasource provides their content",
            "Which rendering parameters are configured",
          ]}
        />
        <P>The Layout Service exposes that information.</P>
        <P>JSS consumes it.</P>
        <P>
          Angular maps the Sitecore renderings to Angular components and
          renders the final user experience.
        </P>
        <P>Understanding this flow is essential before moving into more advanced Sitecore development.</P>
        <P>In the next article, we will take the next step:</P>
        <Callout>
          <Link
            href="/blog/sitecore-graphql-with-angular"
            className="font-semibold text-accent underline underline-offset-2 hover:opacity-80"
          >
            Sitecore GraphQL with Angular: From REST to GraphQL
          </Link>
        </Callout>
        <P>
          We will look at how GraphQL works with Sitecore JSS, how to
          structure queries, how Angular consumes them, and when GraphQL is a
          better choice than REST.
        </P>
      </div>
      </article>
    </div>
  );
}
