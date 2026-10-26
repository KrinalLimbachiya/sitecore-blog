import Link from "next/link";
import TableOfContents from "@/components/TableOfContents";

export const metadata = {
  title: "Understanding Sitecore JSS Architecture with Angular",
  description:
    "A look at how Sitecore JSS is structured when paired with Angular.",
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const SECTION_OUTLINE = [
  "1. The Big Picture",
  "2. Traditional Sitecore vs Headless Sitecore",
  "3. The Main Building Blocks",
  "4. What Is the Sitecore Layout Service?",
  [
    "5. The Complete Request Flow",
    [
      "Step 1: Angular Receives the Route",
      "Step 2: Sitecore Resolves the Page",
      "Step 3: Angular Receives the Layout Data",
      "Step 4: Component Mapping",
      "Step 5: Placeholders Render Components",
    ],
  ],
  "6. Creating a Simple JSS Angular Component",
  "7. Understanding the Data Flow",
  "8. Where Does GraphQL Fit In?",
  "9. REST vs GraphQL",
  "10. A Practical Example",
  "11. Suggested Angular Project Structure",
  "12. Recommended Architecture Pattern",
  "13. Common Mistakes",
  "14. Debugging the Architecture",
  "15. The Most Important Architecture Concept",
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

const FLOW_TONES = {
  accent: {
    border: "border-accent/25",
    bg: "bg-accent/[.05] dark:bg-accent/[.09]",
    badge: "bg-accent text-accent-foreground",
    text: "text-zinc-900 dark:text-zinc-50",
    chip: "border-accent/25 bg-accent/[.06] text-zinc-800 dark:bg-accent/[.1] dark:text-zinc-100",
    line: "text-accent/40",
  },
  fuchsia: {
    border: "border-fuchsia-500/30",
    bg: "bg-fuchsia-500/[.06] dark:bg-fuchsia-500/[.12]",
    badge: "bg-fuchsia-500 text-white",
    text: "text-fuchsia-950 dark:text-fuchsia-100",
    chip: "border-fuchsia-500/30 bg-fuchsia-500/[.08] text-fuchsia-950 dark:text-fuchsia-100",
    line: "text-fuchsia-500/45",
  },
  good: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/[.06] dark:bg-emerald-500/[.12]",
    badge: "bg-emerald-500 text-white",
    text: "text-emerald-950 dark:text-emerald-100",
    chip: "border-emerald-500/30 bg-emerald-500/[.08] text-emerald-950 dark:text-emerald-100",
    line: "text-emerald-500/50",
  },
  bad: {
    border: "border-rose-500/30",
    bg: "bg-rose-500/[.06] dark:bg-rose-500/[.12]",
    badge: "bg-rose-500 text-white",
    text: "text-rose-950 dark:text-rose-100",
    chip: "border-rose-500/30 bg-rose-500/[.08] text-rose-950 dark:text-rose-100",
    line: "text-rose-500/50",
  },
  neutral: {
    border: "border-zinc-300 dark:border-zinc-700",
    bg: "bg-zinc-100/70 dark:bg-zinc-800/50",
    badge: "bg-zinc-500 text-white",
    text: "text-zinc-700 dark:text-zinc-200",
    chip: "border-zinc-300 bg-zinc-100/70 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200",
    line: "text-zinc-400/60",
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

function FlowGrid({ columns, tone = "bad" }) {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {columns.map((steps, i) => (
        <Flow key={i} steps={steps} tone={tone} size="sm" bare />
      ))}
    </div>
  );
}

function TreeItem({ node, isLast, isRoot, tone = "accent" }) {
  const t = FLOW_TONES[tone];
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
        className={`inline-flex flex-wrap items-baseline gap-x-2 rounded-lg border px-3 py-1.5 ${t.chip}`}
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

function Tree({ data, tone = "accent", bare = false }) {
  return (
    <div className={`overflow-x-auto ${bare ? "" : "my-6"}`}>
      <ul className="min-w-max text-sm">
        <TreeItem node={data} isRoot tone={tone} />
      </ul>
    </div>
  );
}

function TreeGroup({ trees, tone = "good" }) {
  return (
    <div className="my-6 flex flex-col gap-4">
      {trees.map((data, i) => (
        <Tree key={i} data={data} tone={tone} bare />
      ))}
    </div>
  );
}

function MappingList({ intro, pairs }) {
  return (
    <div className="my-6 flex flex-col items-center">
      {intro?.map((title, i) => (
        <div key={`intro-${i}`} className="flex w-full flex-col items-center">
          <FlowNode title={title} />
          <FlowArrow />
        </div>
      ))}
      <div className="flex w-full flex-col gap-3">
        {pairs.map((pair, i) => (
          <div key={i} className="flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-lg border border-accent/25 bg-accent/[.05] px-3 py-1.5 text-[13px] font-semibold text-zinc-800 dark:bg-accent/[.09] dark:text-zinc-100">
              {pair.from}
            </span>
            <svg
              width="22"
              height="14"
              viewBox="0 0 22 14"
              fill="none"
              aria-hidden="true"
              className="shrink-0 text-accent/50"
            >
              <path
                d="M0 7H19M19 7L13 1M19 7L13 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="rounded-lg border border-accent/25 bg-accent/[.09] px-3 py-1.5 text-[13px] font-semibold text-accent">
              {pair.to}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EqualsCompare({ left, right }) {
  return (
    <div className="my-6 flex flex-wrap items-center justify-center gap-3">
      <span className="rounded-lg border border-accent/25 bg-accent/[.05] px-4 py-2 text-sm font-semibold text-zinc-800 dark:bg-accent/[.09] dark:text-zinc-100">
        {left}
      </span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-base font-bold text-accent">
        =
      </span>
      <span className="rounded-lg border border-accent/25 bg-accent/[.05] px-4 py-2 text-sm font-semibold text-zinc-800 dark:bg-accent/[.09] dark:text-zinc-100">
        {right}
      </span>
    </div>
  );
}

function PageMockup() {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-accent/20 shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-accent/15 bg-accent/[.05] px-4 py-2.5 dark:bg-accent/[.08]">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 text-[11px] text-zinc-400">example.com</span>
      </div>
      <div className="space-y-4 bg-white p-5 dark:bg-zinc-950">
        <div className="rounded-lg bg-gradient-to-r from-accent to-fuchsia-500 px-5 py-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
            Hero
          </p>
          <p className="mt-1 text-lg font-bold text-white">Welcome to Site</p>
        </div>
        <div className="rounded-lg border border-accent/20 bg-accent/[.04] p-4 dark:bg-accent/[.07]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-accent">
            Feature List
          </p>
          <ul className="mt-2 grid grid-cols-1 gap-2 text-[12.5px] text-zinc-700 sm:grid-cols-3 dark:text-zinc-300">
            {["Fast", "Scalable", "Flexible"].map((f) => (
              <li key={f} className="flex items-center gap-1.5">
                <span className="text-emerald-500">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-accent/20 bg-accent/[.04] px-4 py-3 dark:bg-accent/[.07]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-accent">
            Promo Banner
          </p>
          <span className="rounded-full bg-accent px-3 py-1 text-[12px] font-semibold text-accent-foreground">
            Learn More →
          </span>
        </div>
      </div>
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

function ArchitectureDiagram() {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-accent/15 bg-accent/[.02] p-4 dark:bg-accent/[.04]">
      <svg
        viewBox="0 0 640 380"
        className="mx-auto min-w-[560px]"
        role="img"
        aria-label="Angular Application splits into Components, Services and Shared. Services flows through the Sitecore Layer into either REST or GraphQL. All branches converge back into Sitecore."
      >
        <g className="text-accent/35" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M320,60 V80 M115,80 H525 M115,80 V100 M320,80 V100 M525,80 V100" />
          <path d="M320,140 V180" />
          <path d="M320,220 V240 M270,240 H370 M270,240 V260 M370,240 V260" />
          <path d="M115,140 V300 M270,296 V300 M370,296 V300 M525,140 V300 M115,300 H525 M320,300 V320" />
        </g>
        <ArchNode x={220} y={20} w={200} h={40} label="Angular Application" />
        <ArchNode x={40} y={100} w={150} h={40} label="Components" />
        <ArchNode x={245} y={100} w={150} h={40} label="Services" />
        <ArchNode x={450} y={100} w={150} h={40} label="Shared" />
        <ArchNode x={245} y={180} w={150} h={40} label="Sitecore Layer" accent />
        <ArchNode x={235} y={260} w={70} h={36} label="REST" />
        <ArchNode x={320} y={260} w={100} h={36} label="GraphQL" />
        <ArchNode x={240} y={320} w={160} h={40} label="Sitecore" accent />
      </svg>
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
        Understanding Sitecore JSS Architecture with Angular: A Complete
        Guide
      </h1>
      <div className="mt-4 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-accent"
        />
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          2026-09-01
        </p>
      </div>
      <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-fuchsia-500" />

      <div className="mt-8 max-w-none">
        <P>
          Modern web applications are moving toward headless architectures
          where content management and frontend presentation are separated.
        </P>
        <P>
          Sitecore JSS allows developers to build frontend applications using
          modern JavaScript frameworks while Sitecore continues to manage
          content, layouts, renderings, personalization, and publishing.
        </P>
        <P>
          For Angular developers, however, one of the biggest challenges is
          understanding what actually happens between a user requesting a
          page and Angular rendering Sitecore components.
        </P>
        <P>Questions such as these are very common:</P>
        <List
          items={[
            "How does Angular know which Sitecore component to render?",
            "Where does the page layout come from?",
            "What exactly does the Sitecore Layout Service return?",
            "How do placeholders work?",
            "How does routing connect to Sitecore content?",
            "Where does GraphQL fit into the architecture?",
          ]}
        />
        <P>
          In this article, we will walk through the complete Sitecore JSS +
          Angular architecture and follow the flow from a browser request to
          the final rendered page.
        </P>

        <H2>1. The Big Picture</H2>
        <P>At a high level, a Sitecore JSS Angular application looks like this:</P>
        <Flow
          steps={[
            { title: "Browser", items: ["Angular Application"] },
            {
              title: "JSS Data Layer",
              items: ["REST / GraphQL"],
              arrowLabel: "Request Page Data",
            },
            {
              title: "Sitecore",
              items: [
                "Routes",
                "Layouts",
                "Placeholders",
                "Renderings",
                "Datasource Content",
              ],
            },
            { title: "JSON / GraphQL Response", tone: "neutral" },
            { title: "Angular Components" },
          ]}
        />
        <P>The important concept is this:</P>
        <Callout>
          Sitecore decides <strong>what content and components belong on the
          page</strong>, while Angular is responsible for{" "}
          <strong>rendering those components in the browser</strong>.
        </Callout>
        <P>
          The Sitecore Layout Service exposes layout information as
          structured JSON, allowing a decoupled frontend to consume the page
          structure and component data. JSS can retrieve this data through
          REST or GraphQL-based approaches.
        </P>

        <H2>2. Traditional Sitecore vs Headless Sitecore</H2>
        <P>
          Before understanding JSS, it helps to compare traditional Sitecore
          rendering with a headless approach.
        </P>
        <H3>Traditional Architecture</H3>
        <Flow
          steps={[
            { title: "Browser" },
            {
              title: "Sitecore",
              items: ["Content", "Rendering", "Razor Views", "HTML"],
            },
            { title: "Browser (receives final HTML)" },
          ]}
        />
        <P>In a traditional architecture, Sitecore manages both:</P>
        <List items={["Content", "HTML rendering"]} />
        <P>The browser receives the final HTML.</P>

        <H3>Headless Architecture with Angular</H3>
        <Flow
          steps={[
            { title: "Browser" },
            {
              title: "Angular Application",
              arrowLabel: "Fetch Content + Layout",
            },
            {
              title: "Sitecore APIs",
              items: ["Content", "Route", "Layout", "Component Data"],
            },
            { title: "JSON / GraphQL Response", tone: "neutral" },
            { title: "Angular Renders UI" },
          ]}
        />
        <P>Here, the responsibilities are separated.</P>
        <Table
          head={["Sitecore", "Angular"]}
          rows={[
            ["Content management", "UI rendering"],
            ["Page structure", "Components"],
            ["Renderings", "Styling"],
            ["Placeholders", "User interaction"],
            ["Datasources", "Application behavior"],
            ["Publishing", "Frontend presentation"],
          ]}
        />
        <P>This separation is one of the core ideas behind Sitecore JSS.</P>

        <H2>3. The Main Building Blocks</H2>
        <P>To understand the architecture, let&apos;s look at the major pieces involved.</P>
        <Flow
          steps={[
            { title: "Sitecore Item" },
            { title: "Sitecore Route" },
            { title: "Layout" },
            { title: "Placeholder" },
            { title: "Rendering" },
            { title: "Angular Component" },
          ]}
        />
        <P>Let&apos;s explore each layer.</P>

        <H3>3.1 Sitecore Content Item</H3>
        <P>A Sitecore item contains content.</P>
        <P>For example:</P>
        <Tree
          data={{
            label: "Home",
            children: [
              { label: "Hero Title", value: "Welcome to Our Website" },
              {
                label: "Hero Description",
                value: "We build modern digital experiences.",
              },
              { label: "CTA Text", value: "Learn More" },
            ],
          }}
        />
        <P>
          Angular should not need to know where this content is stored in
          the Sitecore tree.
        </P>
        <P>Instead, Angular receives structured data.</P>
        <P>For example:</P>
        <Code>{`
{
  "fields": {
    "Title": {
      "value": "Welcome to Our Website"
    },
    "Description": {
      "value": "We build modern digital experiences."
    },
    "CTA": {
      "value": "Learn More"
    }
  }
}
        `}</Code>
        <P>
          This keeps the frontend focused on rendering instead of directly
          accessing the Sitecore content database.
        </P>

        <H2>4. What Is the Sitecore Layout Service?</H2>
        <P>
          The Layout Service is one of the most important concepts in
          Sitecore headless development.
        </P>
        <P>It provides information about:</P>
        <List
          items={[
            "The current route",
            "The layout",
            "Placeholders",
            "Components assigned to those placeholders",
            "Datasource content",
            "Context information",
          ]}
        />
        <P>For example, imagine a page with this structure:</P>
        <Tree
          data={{
            label: "Home Page",
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
        <P>The Layout Service can return this information in a structured response.</P>
        <P>A simplified response might look like this:</P>
        <Code>{`
{
  "sitecore": {
    "route": {
      "name": "home",
      "placeholders": {
        "main": [
          {
            "componentName": "Hero",
            "fields": {
              "Title": {
                "value": "Welcome"
              }
            }
          },
          {
            "componentName": "ContentBlock",
            "fields": {
              "Content": {
                "value": "This is the content."
              }
            }
          }
        ]
      }
    }
  }
}
        `}</Code>
        <P>
          The Layout Service is designed to expose Sitecore layout
          information as JSON and can be consumed by decoupled frontend
          applications.
        </P>

        <H2>5. The Complete Request Flow</H2>
        <P>Now let&apos;s follow the complete flow.</P>
        <P>Suppose a user opens:</P>
        <Code>{`https://example.com/products`}</Code>
        <P>The architecture flow can be represented as follows:</P>
        <Flow
          steps={[
            { badge: "1", title: "Browser Request" },
            { badge: "2", title: "Angular Router" },
            { badge: "3", title: "JSS Route Resolution" },
            { badge: "4", title: "Layout Service Request" },
            { badge: "5", title: "Sitecore Finds Route" },
            {
              badge: "6",
              title: "Sitecore Resolves",
              items: ["Layout", "Placeholders", "Renderings", "Datasources"],
            },
            { badge: "7", title: "Layout Data Returned" },
            { badge: "8", title: "Angular Placeholder" },
            { badge: "9", title: "Component Mapping" },
            { badge: "10", title: "Angular Components Render" },
          ]}
        />
        <P>Let&apos;s break this down further.</P>

        <H3>Step 1: Angular Receives the Route</H3>
        <P>A user opens:</P>
        <Code>{`/products`}</Code>
        <P>Angular needs to determine what to display.</P>
        <P>A normal Angular application might define routes like this:</P>
        <Code>{`
const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  }
];
        `}</Code>
        <P>
          However, a Sitecore application can have a large number of routes
          managed directly from Sitecore.
        </P>
        <P>For example:</P>
        <Tree
          tone="neutral"
          data={{
            label: "Sitecore Routes",
            children: [
              { label: "/" },
              { label: "/about" },
              {
                label: "/products",
                children: [
                  { label: "/products/product-a" },
                  { label: "/products/product-b" },
                ],
              },
              { label: "/services" },
              { label: "/contact" },
            ],
          }}
        />
        <P>Hardcoding every Sitecore route inside Angular would not be practical.</P>
        <P>This is where JSS dynamic routing becomes important.</P>
        <P>
          The Angular JSS sample uses routing based on route data from the
          Layout Service, allowing Sitecore-managed routes to drive page
          rendering.
        </P>
        <P>Conceptually:</P>
        <Flow
          steps={[
            { title: "Angular URL" },
            { title: "JSS Route Resolver" },
            { title: "Determine Sitecore Route" },
            { title: "Request Layout Data" },
          ]}
        />

        <H3>Step 2: Sitecore Resolves the Page</H3>
        <P>Once Sitecore receives the route information, it identifies the requested item.</P>
        <P>For example:</P>
        <Code>{`/products`}</Code>
        <P>Could map to:</P>
        <Code>{`/sitecore/content/MyWebsite/Home/Products`}</Code>
        <P>Sitecore then determines:</P>
        <Tree
          data={{
            label: "Products Page",
            children: [
              { label: "Layout" },
              {
                label: "main Placeholder",
                children: [
                  { label: "ProductHero" },
                  { label: "ProductList" },
                  { label: "CTA" },
                ],
              },
              {
                label: "footer Placeholder",
                children: [{ label: "Footer" }],
              },
            ],
          }}
        />
        <P>The result is sent to the Angular application as layout data.</P>

        <H3>Step 3: Angular Receives the Layout Data</H3>
        <P>Now Angular receives information similar to:</P>
        <Code>{`
{
  "route": {
    "name": "products",
    "placeholders": {
      "main": [
        {
          "componentName": "ProductHero"
        },
        {
          "componentName": "ProductList"
        },
        {
          "componentName": "CTA"
        }
      ]
    }
  }
}
        `}</Code>
        <P>At this point, Angular knows something important:</P>
        <Callout>
          Sitecore wants three components to appear inside the{" "}
          <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.9em] text-accent">
            main
          </code>{" "}
          placeholder.
        </Callout>
        <P>But Angular still needs to answer:</P>
        <Callout>
          What Angular component should render{" "}
          <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.9em] text-accent">
            ProductHero
          </code>
          ?
        </Callout>
        <P>That is where component mapping comes in.</P>

        <H3>Step 4: Component Mapping</H3>
        <P>Imagine Sitecore returns:</P>
        <Code>{`
{
  "componentName": "Hero"
}
        `}</Code>
        <P>Angular needs to map that Sitecore rendering to an Angular component.</P>
        <P>Conceptually:</P>
        <Flow
          steps={[
            { title: "Sitecore Rendering", arrowLabel: '"Hero"' },
            { title: "Component Mapping" },
            { title: "HeroComponent" },
          ]}
        />
        <P>For example:</P>
        <Code>{`
const components = {
  Hero: HeroComponent,
  ContentBlock: ContentBlockComponent,
  PromoBanner: PromoBannerComponent
};
        `}</Code>
        <P>
          Or, depending on the JSS Angular implementation, components can be
          registered with JSS infrastructure.
        </P>
        <P>For example:</P>
        <Code>{`
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';

JssModule.withComponents([
  {
    name: 'Hero',
    type: HeroComponent
  },
  {
    name: 'ContentBlock',
    type: ContentBlockComponent
  }
]);
        `}</Code>
        <P>
          The JSS infrastructure uses component registration or a component
          factory pattern to associate Sitecore rendering names with
          frontend implementations.
        </P>
        <P>This mapping is extremely important.</P>
        <P>If Sitecore contains:</P>
        <Code>{`Hero`}</Code>
        <P>
          But Angular does not have a corresponding mapping, the application
          cannot render that component correctly.
        </P>

        <H3>Step 5: Placeholders Render Components</H3>
        <P>
          Placeholders are the bridge between the Sitecore page structure
          and Angular components.
        </P>
        <P>Imagine this Sitecore structure:</P>
        <Tree
          data={{
            label: "Home Page",
            children: [
              {
                label: "main Placeholder",
                children: [
                  { label: "Hero" },
                  { label: "Content Block" },
                  { label: "Promo Banner" },
                ],
              },
            ],
          }}
        />
        <P>In Angular, a JSS placeholder can look like this:</P>
        <Code>{`
<sc-placeholder
  name="main"
  [rendering]="route">
</sc-placeholder>
        `}</Code>
        <P>The placeholder receives route data.</P>
        <P>Then the JSS infrastructure dynamically determines which components should be rendered.</P>
        <P>Conceptually:</P>
        <MappingList
          intro={["<sc-placeholder>", "Layout Data"]}
          pairs={[
            { from: "Hero", to: "HeroComponent" },
            { from: "ContentBlock", to: "ContentBlockComponent" },
            { from: "PromoBanner", to: "PromoBannerComponent" },
          ]}
        />
        <P>
          The <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.9em] text-accent">sc-placeholder</code> component
          in JSS for Angular dynamically renders components based on
          rendering data returned from Sitecore.
        </P>

        <H2>6. Creating a Simple JSS Angular Component</H2>
        <P>Let&apos;s create a simple Hero component.</P>
        <H3>hero.component.ts</H3>
        <Code>{`
import { Component, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  @Input() rendering!: ComponentRendering;
}
        `}</Code>
        <P>The component receives rendering data.</P>
        <H3>hero.component.html</H3>
        <Code>{`
<section class="hero">
  <h1>
    {{ rendering.fields?.Title?.value }}
  </h1>

  <p>
    {{ rendering.fields?.Description?.value }}
  </p>
</section>
        `}</Code>
        <P>The data flow is:</P>
        <Flow
          steps={[
            { title: "Sitecore Datasource" },
            { title: "Layout Service" },
            { title: "Rendering Data" },
            { title: "HeroComponent" },
            { title: "Angular Template" },
          ]}
        />
        <P>
          This is one of the main architectural differences between a
          regular Angular application and a Sitecore JSS application.
        </P>
        <P>In a regular application, developers often directly control component instantiation.</P>
        <P>
          With JSS, components are typically driven by the Sitecore layout
          data and dynamically associated with the corresponding frontend
          implementation.
        </P>

        <H2>7. Understanding the Data Flow</H2>
        <P>Let&apos;s visualize the full content flow.</P>
        <Flow
          steps={[
            {
              title: "Sitecore CMS",
              items: [
                "Content",
                "Templates",
                "Datasources",
                "Renderings",
                "Placeholders",
              ],
              arrowLabel: "Layout Data",
            },
            {
              title: "Layout API / GraphQL",
              items: [
                "Route",
                "Placeholders",
                "Component Names",
                "Fields",
              ],
            },
            {
              title: "Angular JSS Layer",
              items: [
                "Routing",
                "JSS Context",
                "Component Mapping",
                "Placeholder Rendering",
              ],
            },
            {
              title: "Angular Components",
              items: ["Hero", "Content Block", "Product List", "Footer"],
            },
          ]}
        />

        <H2>8. Where Does GraphQL Fit In?</H2>
        <P>Sitecore JSS applications can retrieve layout and content data using REST or GraphQL.</P>
        <P>
          For GraphQL-based applications, the JSS data layer can use the
          GraphQL Layout Service to retrieve layout information. Sitecore
          also supports GraphQL querying for layout and dictionary-related
          data in JSS applications.
        </P>
        <P>The architecture becomes:</P>
        <Flow
          steps={[
            { title: "Angular" },
            { title: "GraphQL Client" },
            { title: "GraphQL Endpoint" },
            { title: "Sitecore Content + Layout" },
            { title: "GraphQL Response", tone: "neutral" },
            { title: "Angular Components" },
          ]}
        />
        <P>A simplified GraphQL query might look like:</P>
        <Code>{`
query GetPage {
  item(path: "/sitecore/content/MyWebsite/Home") {
    name
    fields {
      name
      value
    }
  }
}
        `}</Code>
        <P>
          For JSS applications, GraphQL can also be used for layout data
          rather than manually creating a query for every page.
        </P>
        <P>For example:</P>
        <Code>{`
import { GraphQLLayoutService } from '@sitecore-jss/sitecore-jss';

export const layoutService = new GraphQLLayoutService({
  clientFactory,
  siteName: config.sitecoreSiteName
});
        `}</Code>
        <P>The application can then fetch layout data through the configured service.</P>
        <Code>{`const data = await layoutService.fetchLayoutData('en');`}</Code>
        <P>
          The exact configuration depends on the Sitecore and JSS version
          being used, so it is important to follow the SDK documentation for
          your project version.
        </P>

        <H2>9. REST vs GraphQL</H2>
        <P>Both approaches can be useful.</P>
        <Table
          head={["REST Layout Service", "GraphQL"]}
          rows={[
            ["Traditional API approach", "Flexible query approach"],
            ["JSON response", "Query-based response"],
            ["Simple setup", "More control over requested data"],
            [
              "Layout Service endpoint",
              "Layout, dictionary and other supported GraphQL scenarios",
            ],
            [
              "Good for straightforward implementations",
              "Useful for modern headless architectures",
            ],
          ]}
        />
        <P>
          The JSS Layout API abstracts data fetching and supports REST and
          GraphQL endpoint options, including Experience Edge-related
          GraphQL delivery scenarios.
        </P>
        <P>My recommendation is:</P>
        <List
          items={[
            "Understand the REST Layout Service first.",
            "Learn how layout data is structured.",
            "Then move to GraphQL.",
            "Use GraphQL when its flexibility and delivery architecture provide a clear benefit.",
          ]}
        />
        <P>
          Understanding the architecture is more important than choosing a
          technology simply because it is newer.
        </P>

        <H2>10. A Practical Example</H2>
        <P>Let&apos;s imagine we have this page:</P>
        <Tree
          data={{
            label: "Home",
            children: [
              {
                label: "main",
                children: [
                  { label: "Hero" },
                  { label: "FeatureList" },
                  { label: "PromoBanner" },
                ],
              },
            ],
          }}
        />

        <H3>Step 1: Sitecore defines the page</H3>
        <Tree
          data={{
            label: "Home",
            children: [
              {
                label: "main Placeholder",
                children: [
                  { label: "Hero" },
                  { label: "FeatureList" },
                  { label: "PromoBanner" },
                ],
              },
            ],
          }}
        />

        <H3>Step 2: Layout Service returns data</H3>
        <Code>{`
{
  "placeholders": {
    "main": [
      {
        "componentName": "Hero",
        "fields": {
          "Title": {
            "value": "Welcome"
          }
        }
      },
      {
        "componentName": "FeatureList"
      },
      {
        "componentName": "PromoBanner"
      }
    ]
  }
}
        `}</Code>

        <H3>Step 3: Angular receives the route</H3>
        <Code>{`
export class LayoutComponent {
  route: any;
}
        `}</Code>

        <H3>Step 4: Angular renders the placeholder</H3>
        <Code>{`
<sc-placeholder
  name="main"
  [rendering]="route">
</sc-placeholder>
        `}</Code>

        <H3>Step 5: JSS maps components</H3>
        <MappingList
          pairs={[
            { from: "Hero", to: "HeroComponent" },
            { from: "FeatureList", to: "FeatureListComponent" },
            { from: "PromoBanner", to: "PromoBannerComponent" },
          ]}
        />

        <H3>Step 6: Angular renders the final page</H3>
        <PageMockup />

        <H2>11. Suggested Angular Project Structure</H2>
        <P>
          For a maintainable Sitecore JSS Angular application, I recommend
          organizing the application clearly.
        </P>
        <Tree
          tone="neutral"
          data={{
            label: "src",
            children: [
              {
                label: "app",
                children: [
                  {
                    label: "components",
                    children: [
                      {
                        label: "hero",
                        children: [
                          { label: "hero.component.ts" },
                          { label: "hero.component.html" },
                          { label: "hero.component.scss" },
                        ],
                      },
                      { label: "content-block" },
                      { label: "promo-banner" },
                    ],
                  },
                  {
                    label: "services",
                    children: [
                      { label: "sitecore-data.service.ts" },
                      { label: "graphql.service.ts" },
                    ],
                  },
                  {
                    label: "routing",
                    children: [{ label: "routing.module.ts" }],
                  },
                  { label: "shared" },
                  { label: "app.module.ts" },
                ],
              },
              { label: "environments" },
              { label: "assets" },
            ],
          }}
        />
        <P>The exact generated structure can vary by JSS version, but the key principle remains the same:</P>
        <Callout>
          Keep Sitecore integration, business logic, and UI components
          clearly separated.
        </Callout>

        <H2>12. Recommended Architecture Pattern</H2>
        <P>For larger projects, I recommend the following approach:</P>
        <ArchitectureDiagram />
        <P>A component should primarily focus on:</P>
        <List
          items={["Receiving data", "Displaying data", "Handling UI interaction"]}
        />
        <P>For example:</P>
        <Code>{`
@Component({
  selector: 'app-product-card'
})
export class ProductCardComponent {
  @Input() rendering: any;
}
        `}</Code>
        <P>Avoid placing large amounts of Sitecore-specific API logic directly inside every component.</P>
        <P>Instead:</P>
        <Flow
          steps={[
            { title: "Component" },
            { title: "Service" },
            { title: "Sitecore / GraphQL API" },
          ]}
        />
        <P>This makes the application easier to test and maintain.</P>

        <H2>13. Common Mistakes</H2>

        <H3>Mistake 1: Treating JSS Like a Normal Angular App</H3>
        <P>A normal Angular application might manually define all page components.</P>
        <P>A JSS application is different because the page composition can come from Sitecore.</P>
        <P>Instead of:</P>
        <Tree
          tone="bad"
          data={{
            label: "Angular",
            children: [{ label: "decides every page component" }],
          }}
        />
        <P>Think:</P>
        <TreeGroup
          tone="good"
          trees={[
            {
              label: "Sitecore",
              children: [{ label: "decides page composition" }],
            },
            {
              label: "Angular",
              children: [{ label: "renders the mapped components" }],
            },
          ]}
        />

        <H3>Mistake 2: Putting API Calls Inside Every Component</H3>
        <P>Avoid:</P>
        <FlowGrid
          columns={[
            [{ title: "HeroComponent" }, { title: "API Call" }],
            [{ title: "ProductComponent" }, { title: "API Call" }],
            [{ title: "BannerComponent" }, { title: "API Call" }],
          ]}
        />
        <P>Prefer:</P>
        <Flow
          tone="good"
          steps={[
            { title: "Component" },
            { title: "Application / Data Service" },
            { title: "Sitecore API" },
          ]}
        />

        <H3>Mistake 3: Not Understanding Placeholders</H3>
        <P>A placeholder is not just a container in HTML.</P>
        <P>In JSS, it represents a connection between:</P>
        <Flow
          steps={[
            { title: "Sitecore Page Structure" },
            { title: "Layout Data", tone: "neutral" },
            { title: "Angular Rendering" },
          ]}
        />
        <P>Understanding placeholders makes debugging much easier.</P>

        <H3>Mistake 4: Component Name Mismatches</H3>
        <P>If Sitecore sends:</P>
        <Code>{`ProductHero`}</Code>
        <P>But Angular registers:</P>
        <Code>{`HeroComponent`}</Code>
        <P>Without a correct mapping, the rendering cannot be resolved.</P>
        <P>Always verify:</P>
        <EqualsCompare
          left="Sitecore Rendering Name"
          right="Angular JSS Registration"
        />

        <H2>14. Debugging the Architecture</H2>
        <P>When a component does not render, I recommend following this flow.</P>
        <Flow
          steps={[
            { title: "Component Not Visible", tone: "bad" },
            { title: "Is the component added in Sitecore?" },
            { title: "Is it inside the correct placeholder?" },
            { title: "Does Layout Service return it?" },
            { title: "Is the component name correct?" },
            { title: "Is Angular component mapping available?" },
            { title: "Does the component receive rendering data?" },
            { title: "Check Angular console", tone: "good" },
          ]}
        />
        <P>This simple flow can save a significant amount of debugging time.</P>

        <H2>15. The Most Important Architecture Concept</H2>
        <P>If you remember only one thing from this article, remember this:</P>
        <Flow
          steps={[
            { title: "Sitecore", tone: "accent", arrowLabel: "Decides" },
            { title: "WHAT should appear", tone: "accent" },
            { title: "Layout Data", tone: "neutral" },
            { title: "Angular", tone: "fuchsia", arrowLabel: "Decides" },
            { title: "HOW it should appear", tone: "fuchsia" },
          ]}
        />
        <P>Sitecore controls the content and composition.</P>
        <P>Angular controls the frontend experience.</P>
        <P>That separation is the foundation of the Sitecore JSS architecture.</P>

        <H2>Conclusion</H2>
        <P>
          Sitecore JSS with Angular can initially feel complicated because
          multiple systems work together:
        </P>
        <List
          items={[
            "Angular routing",
            "JSS routing",
            "Sitecore routes",
            "Layout Service",
            "Placeholders",
            "Renderings",
            "Component mapping",
            "REST or GraphQL delivery",
          ]}
        />
        <P>However, once the request flow is understood, the architecture becomes much easier to work with.</P>
        <P>The complete flow can be summarized as:</P>
        <Flow
          steps={[
            { title: "User Request" },
            { title: "Angular Routing" },
            { title: "JSS Route Resolution" },
            { title: "Sitecore Route" },
            { title: "Layout Service / GraphQL" },
            { title: "Layout JSON", tone: "neutral" },
            { title: "Placeholder" },
            { title: "Component Mapping" },
            { title: "Angular Components" },
            { title: "Final Page", tone: "good" },
          ]}
        />
        <P>
          Understanding this flow is essential before moving into more
          advanced topics such as:
        </P>
        <List
          items={[
            "Sitecore GraphQL",
            "Experience Edge",
            "XM Cloud",
            "Integrated GraphQL",
            "Personalization",
            "Multi-site architecture",
            "Performance optimization",
            "Component-driven design",
          ]}
        />
        <P>In the next article, I will go deeper into one of the most important parts of this architecture:</P>
        <Callout>
          <Link
            href="/blog/how-sitecore-layout-service-works-with-angular"
            className="font-semibold text-accent underline underline-offset-2 hover:opacity-80"
          >
            How Sitecore Layout Service Works with Angular: Request,
            Response, Placeholders and Component Rendering.
          </Link>
        </Callout>
      </div>
      </article>
    </div>
  );
}
