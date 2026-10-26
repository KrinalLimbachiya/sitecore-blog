import Link from "next/link";
import TableOfContents from "@/components/TableOfContents";

export const metadata = {
  title: "Building Reusable Sitecore Components with Angular JSS",
  description: "Patterns for reusable, JSS-friendly Angular components.",
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const SECTION_OUTLINE = [
  "1. What Does “Reusable Component” Mean in Sitecore?",
  "2. Sitecore Rendering vs Angular Component",
  "3. Start With the Content Model",
  "4. Define the Component Contract",
  "5. Component Registration in Angular",
  "6. Creating the Angular Component",
  "7. Rendering Sitecore Fields",
  "8. Complete Hero Example",
  "9. Datasource-Driven Components",
  "10. Reusable Content Card",
  "11. Rendering Parameters",
  "12. Component Variants",
  "13. Placeholder Settings",
  "14. Component Composition",
  "15. Responsive Design",
  "16. Accessibility Should Be Part of the Component",
  "17. RTL and Multilingual Components",
  [
    "18. Sitecore Authoring Experience",
    [
      "What fields are required?",
      "What components can be inserted?",
      "What should authors control?",
    ],
  ],
  "19. Avoid Over-Generic Components",
  "20. Component Folder Structure",
  "21. Recommended Component Architecture",
  [
    "22. Debugging Reusable Components",
    [
      "Step 1 — Check Sitecore",
      "Step 2 — Check Layout Service",
      "Step 3 — Check Angular Mapping",
      "Step 4 — Check Input",
      "Step 5 — Check the Template",
    ],
  ],
  [
    "23. Common Mistakes",
    [
      "Mistake 1 — Hardcoding Sitecore content",
      "Mistake 2 — Creating a component for every small variation",
      "Mistake 3 — Making one component handle everything",
      "Mistake 4 — Ignoring placeholder settings",
      "Mistake 5 — Mixing content and presentation",
      "Mistake 6 — Ignoring accessibility until the end",
    ],
  ],
  "24. Testing Reusable Components",
  "25. A Small GitHub POC",
  "26. Version Compatibility Note",
  "27. From Reusable Components to a Design System",
  "28. The Key Architectural Lesson",
  "29. Final Architecture",
  "30. Conclusion",
  "What's Next?",
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

function OrderedList({ items }) {
  return (
    <ol className="mt-4 list-decimal space-y-1.5 pl-6 text-zinc-700 dark:text-zinc-300">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
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

function MappingList({ pairs }) {
  return (
    <div className="my-6 flex w-full flex-col gap-3">
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
  );
}

function TreeItem({ node, isLast, isRoot, tone = "accent" }) {
  const chip = {
    accent:
      "border-accent/25 bg-accent/[.06] text-zinc-800 dark:bg-accent/[.1] dark:text-zinc-100",
    neutral:
      "border-zinc-300 bg-zinc-100/70 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200",
    bad: "border-rose-500/30 bg-rose-500/[.06] text-rose-950 dark:bg-rose-500/[.12] dark:text-rose-100",
    good: "border-emerald-500/30 bg-emerald-500/[.06] text-emerald-950 dark:bg-emerald-500/[.12] dark:text-emerald-100",
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
        viewBox="0 0 640 720"
        className="mx-auto min-w-[560px]"
        role="img"
        aria-label="Sitecore branches into Templates, Renderings and Datasources, merging into Layout Service, then JSS JSON, then Component Factory. Component Factory branches into Hero, Card and CTA, merging into Angular UI, which branches into Responsive and Accessible, merging into the Final Website."
      >
        <g className="text-accent/35" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M320,60 V80 M130,80 H510 M130,80 V100 M320,80 V100 M510,80 V100 M130,140 V160 M320,140 V160 M510,140 V160 M130,160 H510 M320,160 V180 M320,220 V260 M320,300 V340 M320,380 V400 M130,400 H510 M130,400 V420 M320,400 V420 M510,400 V420 M130,460 V480 M320,460 V480 M510,460 V480 M130,480 H510 M320,480 V500 M320,540 V560 M230,560 H410 M230,560 V580 M410,560 V580 M230,620 V640 M410,620 V640 M230,640 H410 M320,640 V660" />
        </g>
        <ArchNode x={245} y={20} w={150} h={40} label="SITECORE" accent />
        <ArchNode x={60} y={100} w={140} h={40} label="Templates" />
        <ArchNode x={250} y={100} w={140} h={40} label="Renderings" />
        <ArchNode x={440} y={100} w={140} h={40} label="Datasources" />
        <ArchNode x={245} y={180} w={150} h={40} label="Layout Service" accent />
        <ArchNode x={245} y={260} w={150} h={40} label="JSS JSON" accent />
        <ArchNode x={245} y={340} w={150} h={40} label="Component Factory" accent />
        <ArchNode x={60} y={420} w={140} h={40} label="Hero" />
        <ArchNode x={250} y={420} w={140} h={40} label="Card" />
        <ArchNode x={440} y={420} w={140} h={40} label="CTA" />
        <ArchNode x={245} y={500} w={150} h={40} label="Angular UI" accent />
        <ArchNode x={155} y={580} w={150} h={40} label="Responsive" />
        <ArchNode x={335} y={580} w={150} h={40} label="Accessible" />
        <ArchNode x={245} y={660} w={150} h={40} label="Final Website" accent />
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
        Building Reusable Sitecore Components with Angular JSS
      </h1>
      <p className="mt-3 text-sm font-medium text-accent">
        Sitecore + Angular JSS Series — Part 4
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-accent"
        />
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          2026-09-04
        </p>
      </div>
      <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-fuchsia-500" />

      <div className="mt-8 max-w-none">
        <P>
          In the previous articles, we explored how{" "}
          <Link
            href="/blog/understanding-sitecore-jss-architecture-with-angular"
            className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
          >
            Sitecore JSS works with Angular
          </Link>
          , how the{" "}
          <Link
            href="/blog/how-sitecore-layout-service-works-with-angular"
            className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
          >
            Layout Service
          </Link>{" "}
          delivers page composition, and how{" "}
          <Link
            href="/blog/sitecore-graphql-with-angular"
            className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
          >
            GraphQL
          </Link>{" "}
          can be used to retrieve Sitecore data.
        </P>
        <P>The next question naturally becomes:</P>
        <Callout>
          <strong>
            How do we build Sitecore components that are reusable,
            author-friendly, responsive, and easy to maintain in an Angular
            application?
          </strong>
        </Callout>
        <P>This is one of the most important aspects of a headless Sitecore implementation.</P>
        <P>
          A component should not simply be an Angular component that
          displays some HTML. A well-designed Sitecore component should
          provide a clear contract between:
        </P>
        <List
          items={[
            "Sitecore authors",
            "Sitecore content structure",
            "Layout Service",
            "Angular/JSS",
            "Frontend design system",
          ]}
        />
        <P>The goal is to build a component once and allow it to be reused across multiple pages and scenarios.</P>

        <H2>1. What Does “Reusable Component” Mean in Sitecore?</H2>
        <P>Consider a typical website.</P>
        <P>You may have:</P>
        <List
          items={[
            "Hero banners",
            "Content cards",
            "CTA blocks",
            "Image + text sections",
            "Promotional banners",
            "Accordion sections",
            "Contact information",
            "Product cards",
            "Rich text sections",
          ]}
        />
        <P>A common mistake is to build every variation as a completely separate component.</P>
        <P>For example:</P>
        <Code>{`
HomeHero
ProductHero
CampaignHero
ArticleHero
ServiceHero
        `}</Code>
        <P>This can quickly become difficult to maintain.</P>
        <P>Instead, we can create a reusable component:</P>
        <Tree
          data={{
            label: "Hero",
            children: [
              { label: "Title" },
              { label: "Description" },
              { label: "Image" },
              { label: "CTA" },
              { label: "Variant" },
            ],
          }}
        />
        <P>
          The same Angular component can then support different Sitecore
          content and presentation requirements.
        </P>
        <P>Conceptually:</P>
        <Flow
          steps={[
            { title: "Sitecore" },
            { title: "Rendering Definition" },
            { title: "Datasource Item" },
            { title: "Layout Service" },
            { title: "JSON", tone: "neutral" },
            { title: "Angular JSS" },
            { title: "Reusable Component", tone: "good" },
          ]}
        />
        <P>This separation is one of the biggest advantages of a headless architecture.</P>

        <H2>2. Sitecore Rendering vs Angular Component</H2>
        <P>
          One of the most important concepts to understand is that a{" "}
          <strong>Sitecore rendering</strong> and an{" "}
          <strong>Angular component</strong> are related, but they are not
          the same thing.
        </P>
        <P>Think about them as two sides of the same contract.</P>
        <H3>Sitecore side</H3>
        <P>Sitecore defines:</P>
        <List
          items={[
            "Component definition",
            "Datasource",
            "Fields",
            "Placeholder settings",
            "Rendering parameters",
            "Authoring experience",
          ]}
        />
        <H3>Angular side</H3>
        <P>Angular defines:</P>
        <List
          items={[
            "HTML",
            "CSS/SCSS",
            "Component behavior",
            "Accessibility",
            "Responsive behavior",
            "Client-side interactions",
          ]}
        />
        <P>The relationship looks like this:</P>
        <Flow
          steps={[
            {
              title: "Sitecore",
              items: [
                "Rendering Definition",
                "Datasource Template",
                "Placeholder Settings",
                "Rendering Parameters",
              ],
              arrowLabel: "Layout Service",
            },
            {
              title: "JSS JSON",
              items: ["componentName", "fields", "params", "placeholders"],
              arrowLabel: "Component Mapping",
            },
            {
              title: "Angular",
              items: ["HeroComponent", "CardComponent", "CTAComponent"],
            },
          ]}
        />
        <P>This means the Angular component should be designed around the data contract provided by Sitecore.</P>

        <H2>3. Start With the Content Model</H2>
        <P>Before writing Angular code, define what the component actually needs.</P>
        <P>Let&apos;s take a simple Hero component.</P>
        <P>We want:</P>
        <Tree
          data={{
            label: "Hero",
            children: [
              { label: "Title" },
              { label: "Description" },
              { label: "Image" },
              { label: "CTA Text" },
              { label: "CTA Link" },
            ],
          }}
        />
        <P>A corresponding Sitecore datasource template could contain:</P>
        <Tree
          tone="neutral"
          data={{
            label: "Hero Template",
            children: [
              { label: "Title" },
              { label: "Description" },
              { label: "Image" },
              { label: "CTA Text" },
              { label: "CTA Link" },
            ],
          }}
        />
        <P>
          This gives content authors control over the content without
          requiring developers to modify Angular code.
        </P>
        <P>A good rule is:</P>
        <Callout>
          Content should live in Sitecore. Presentation logic should live in
          Angular.
        </Callout>
        <P>
          For example, avoid storing HTML directly in a field just because
          Angular needs to render a particular layout.
        </P>
        <P>Instead of:</P>
        <Code>{`<div class="hero-title">Welcome</div>`}</Code>
        <P>store:</P>
        <Code>{`Title = Welcome`}</Code>
        <P>and allow Angular to control the presentation.</P>

        <H2>4. Define the Component Contract</H2>
        <P>Before implementing the component, define its contract.</P>
        <P>For example:</P>
        <Code>{`
Hero Component

Required:
- Title

Optional:
- Description
- Image
- CTA

Supported variants:
- Default
- Dark
- Full Width
        `}</Code>
        <P>This sounds simple, but it prevents a lot of frontend complexity later.</P>
        <P>A useful component contract might look like:</P>
        <Tree
          data={{
            label: "Hero",
            children: [
              {
                label: "Content",
                children: [
                  { label: "Title" },
                  { label: "Description" },
                  { label: "CTA" },
                ],
              },
              {
                label: "Media",
                children: [{ label: "Image" }],
              },
              {
                label: "Presentation",
                children: [
                  { label: "Variant" },
                  { label: "Alignment" },
                  { label: "Theme" },
                ],
              },
            ],
          }}
        />
        <P>The content and presentation concerns remain separate.</P>

        <H2>5. Component Registration in Angular</H2>
        <P>
          Once the Sitecore rendering is created, the Angular application
          needs to know which Angular component should render it.
        </P>
        <P>A typical JSS component mapping looks like:</P>
        <Code>{`
import { HeroComponent } from './components/hero/hero.component';

export const componentFactory = {
  Hero: HeroComponent
};
        `}</Code>
        <P>
          Depending on the JSS version and application setup, this mapping
          can be registered through the JSS component factory.
        </P>
        <P>The important concept is:</P>
        <Flow bare size="sm" steps={[{ title: "Sitecore component name" }, { title: "Angular component" }]} />
        <P>For example:</P>
        <MappingList
          pairs={[
            { from: "Hero", to: "HeroComponent" },
            { from: "ContentCard", to: "ContentCardComponent" },
            { from: "CTA", to: "CtaComponent" },
          ]}
        />
        <P>This mapping is what allows Layout Service data to become an actual Angular component.</P>

        <H2>6. Creating the Angular Component</H2>
        <P>A basic Angular JSS component could look like this:</P>
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
        <P>The rendering object contains the data provided by Sitecore/JSS.</P>
        <P>For example:</P>
        <Code>{`rendering.fields.Title.value`}</Code>
        <P>could contain the title.</P>
        <P>A more structured model is preferable for larger applications.</P>
        <Code>{`
export interface HeroFields {
  Title: any;
  Description: any;
  Image: any;
  CtaText: any;
  CtaLink: any;
}
        `}</Code>
        <P>Then:</P>
        <Code>{`
export interface HeroRendering {
  fields: HeroFields;
  params?: {
    variant?: string;
    alignment?: string;
  };
}
        `}</Code>
        <P>And the component:</P>
        <Code>{`
export class HeroComponent {
  @Input() rendering!: HeroRendering;
}
        `}</Code>
        <P>This gives the component a much clearer contract.</P>

        <H2>7. Rendering Sitecore Fields</H2>
        <P>JSS provides field rendering helpers so that Sitecore fields can be rendered correctly.</P>
        <P>For example:</P>
        <Code>{`
<h1>
  <span *scText="rendering.fields.Title"></span>
</h1>
        `}</Code>
        <P>For an image:</P>
        <Code>{`
<img
  *scImage="rendering.fields.Image"
  alt=""
/>
        `}</Code>
        <P>For a link:</P>
        <Code>{`
<a *scLink="rendering.fields.CtaLink">
  <span *scText="rendering.fields.CtaText"></span>
</a>
        `}</Code>
        <P>
          The exact helper syntax can vary depending on the JSS version being
          used, so the implementation should always follow the version of{" "}
          <IC>@sitecore-jss/sitecore-jss-angular</IC> used by the project.
        </P>
        <P>
          The important advantage is that JSS field helpers preserve
          Sitecore-aware rendering behavior instead of treating everything as
          plain strings.
        </P>

        <H2>8. Complete Hero Example</H2>
        <P>Let&apos;s combine these concepts.</P>
        <P>
          <strong>hero.component.ts</strong>
        </P>
        <Code>{`
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

  @Input() rendering: any;

  get variant(): string {
    return this.rendering?.params?.variant || 'default';
  }

}
        `}</Code>
        <P>
          <strong>hero.component.html</strong>
        </P>
        <Code>{`
<section
  class="hero"
  [ngClass]="'hero--' + variant"
>

  <div class="hero__content">

    <h1 *scText="rendering.fields.Title"></h1>

    <div
      class="hero__description"
      *scRichText="rendering.fields.Description">
    </div>

    <a
      class="hero__cta"
      *scLink="rendering.fields.CtaLink"
    >
      <span *scText="rendering.fields.CtaText"></span>
    </a>

  </div>

  <div class="hero__media">

    <img
      *scImage="rendering.fields.Image"
      alt=""
    />

  </div>

</section>
        `}</Code>
        <P>The Angular component doesn&apos;t need to know which page contains it.</P>
        <P>It only knows about its contract.</P>
        <P>That is what makes it reusable.</P>

        <H2>9. Datasource-Driven Components</H2>
        <P>
          One of the most powerful patterns in Sitecore is the{" "}
          <strong>datasource-driven component</strong>.
        </P>
        <P>
          Instead of storing component content directly on the page item,
          the component can reference a separate datasource item.
        </P>
        <P>For example:</P>
        <Tree
          data={{
            label: "Home Page",
            children: [
              { label: "Hero Rendering", value: "Datasource → Home Hero" },
              {
                label: "Content Card Rendering",
                value: "Datasource → Product Card 1",
              },
              {
                label: "Content Card Rendering",
                value: "Datasource → Product Card 2",
              },
            ],
          }}
        />
        <P>This creates a clean separation:</P>
        <Flow
          bare
          size="sm"
          tone="neutral"
          steps={[
            { title: "Page" },
            { title: "Presentation" },
            { title: "Rendering" },
            { title: "Datasource" },
            { title: "Content" },
          ]}
        />
        <P>This becomes especially useful when the same content needs to be reused.</P>
        <P>For example:</P>
        <Tree
          data={{
            label: "Global Promotion",
            children: [
              { label: "Home Page" },
              { label: "Product Page" },
              { label: "Campaign Page" },
            ],
          }}
        />
        <P>
          Instead of duplicating the content, multiple renderings can
          reference the same datasource item where appropriate.
        </P>

        <H2>10. Reusable Content Card</H2>
        <P>Let&apos;s create another example.</P>
        <P>A Content Card might contain:</P>
        <List items={["Title", "Description", "Image", "Link"]} />
        <P>The Angular component:</P>
        <Code>{`
@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html'
})
export class ContentCardComponent {

  @Input() rendering: any;

}
        `}</Code>
        <P>Template:</P>
        <Code>{`
<article class="content-card">

  <div class="content-card__image">
    <img
      *scImage="rendering.fields.Image"
      alt=""
    />
  </div>

  <div class="content-card__content">

    <h2>
      <span *scText="rendering.fields.Title"></span>
    </h2>

    <div
      *scRichText="rendering.fields.Description">
    </div>

    <a
      *scLink="rendering.fields.Link"
      class="content-card__link"
    >
      Read more
    </a>

  </div>

</article>
        `}</Code>
        <P>Now the same component can be used for:</P>
        <List
          items={[
            "Product cards",
            "Service cards",
            "Article cards",
            "Campaign cards",
            "Information cards",
          ]}
        />
        <P>without creating five separate Angular components.</P>

        <H2>11. Rendering Parameters</H2>
        <P>Sometimes the content should remain the same but the presentation needs to change.</P>
        <P>For example:</P>
        <Tree
          data={{
            label: "Hero",
            children: [
              { label: "Default" },
              { label: "Dark" },
              { label: "Full Width" },
              { label: "Centered" },
            ],
          }}
        />
        <P>This is where rendering parameters can be useful.</P>
        <P>Conceptually:</P>
        <Tree
          tone="neutral"
          data={{
            label: "Datasource",
            children: [
              { label: "Title" },
              { label: "Description" },
              { label: "Image" },
            ],
          }}
        />
        <Tree
          tone="neutral"
          data={{
            label: "Rendering Parameters",
            children: [
              { label: "Variant = Dark" },
              { label: "Alignment = Center" },
              { label: "Width = Full" },
            ],
          }}
        />
        <P>Angular can then consume those parameters.</P>
        <Code>{`
get variant(): string {
  return this.rendering?.params?.variant || 'default';
}
        `}</Code>
        <P>And:</P>
        <Code>{`
<section
  class="hero"
  [ngClass]="{
    'hero--dark': variant === 'dark',
    'hero--center': rendering?.params?.alignment === 'center',
    'hero--full-width': rendering?.params?.width === 'full'
  }"
>
        `}</Code>
        <P>This is generally cleaner than duplicating the entire component.</P>

        <H2>12. Component Variants</H2>
        <P>
          A reusable component doesn&apos;t mean every variation should be
          handled with hundreds of <IC>if</IC> statements.
        </P>
        <P>Avoid:</P>
        <Code>{`
if (type === 'A') {
  // 100 lines
}

if (type === 'B') {
  // 100 lines
}

if (type === 'C') {
  // 100 lines
}
        `}</Code>
        <P>Instead, keep variants intentionally small.</P>
        <P>For example:</P>
        <Code>{`
<section
  class="hero"
  [class.hero--dark]="variant === 'dark'"
  [class.hero--centered]="variant === 'centered'"
>
        `}</Code>
        <P>The SCSS handles the visual differences:</P>
        <Code>{`
.hero {
  display: flex;

  &--dark {
    // dark variant
  }

  &--centered {
    // centered variant
  }
}
        `}</Code>
        <P>
          If the behavior becomes fundamentally different, it may be better
          to create a separate component rather than forcing everything into
          one.
        </P>
        <P>A useful rule:</P>
        <Callout>
          Reuse the component when the content contract and behavior are
          similar. Create a new component when the behavior or purpose is
          fundamentally different.
        </Callout>

        <H2>13. Placeholder Settings</H2>
        <P>Reusable components become even more powerful when they can contain other components.</P>
        <P>Consider a Promo Section:</P>
        <Tree
          data={{
            label: "Promo Section",
            children: [
              { label: "Title" },
              { label: "Description" },
              {
                label: "Content Placeholder",
                children: [
                  { label: "Card" },
                  { label: "Card" },
                  { label: "CTA" },
                ],
              },
            ],
          }}
        />
        <P>The Sitecore placeholder settings determine which components can be inserted into that placeholder.</P>
        <P>Conceptually:</P>
        <Tree
          tone="neutral"
          data={{
            label: "PromoSection",
            children: [
              {
                label: "promo-content",
                children: [
                  { label: "ContentCard" },
                  { label: "ContentCard" },
                  { label: "CTA" },
                ],
              },
            ],
          }}
        />
        <P>Angular then renders the placeholder dynamically.</P>
        <P>For example:</P>
        <Code>{`
<section class="promo">

  <h2 *scText="rendering.fields.Title"></h2>

  <div class="promo__content">
    <sc-placeholder
      name="promo-content"
      [rendering]="rendering">
    </sc-placeholder>
  </div>

</section>
        `}</Code>
        <P>This is where the combination of Sitecore authoring and Angular rendering becomes particularly powerful.</P>
        <P>Authors control the composition.</P>
        <P>Angular controls the implementation.</P>

        <H2>14. Component Composition</H2>
        <P>
          A mature JSS application should allow components to be composed
          rather than creating large monolithic components.
        </P>
        <P>Avoid:</P>
        <Tree
          tone="bad"
          data={{
            label: "MegaPageComponent",
            children: [
              { label: "Hero" },
              { label: "Cards" },
              { label: "Accordion" },
              { label: "Form" },
              { label: "Map" },
              { label: "Footer" },
              { label: "Everything else" },
            ],
          }}
        />
        <P>Instead:</P>
        <Tree
          tone="good"
          data={{
            label: "Page",
            children: [
              { label: "Hero" },
              {
                label: "Content Section",
                children: [
                  { label: "Card" },
                  { label: "Card" },
                  { label: "CTA" },
                ],
              },
              { label: "Accordion" },
              {
                label: "Contact Section",
                children: [
                  { label: "Map" },
                  { label: "Contact Details" },
                ],
              },
            ],
          }}
        />
        <P>This makes components:</P>
        <List
          items={[
            "Easier to test",
            "Easier to maintain",
            "Easier to reuse",
            "Easier to style",
            "Easier to optimize",
          ]}
        />

        <H2>15. Responsive Design</H2>
        <P>A Sitecore component should not rely on the page to make it responsive.</P>
        <P>The component should have its own responsive behavior.</P>
        <P>For example:</P>
        <Code>{`
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
        `}</Code>
        <P>This means the component remains reusable regardless of where it is placed.</P>
        <P>For a card:</P>
        <Code>{`
.content-card {
  display: flex;
  flex-direction: column;

  &__image {
    width: 100%;
  }
}
        `}</Code>
        <P>Avoid hardcoding page-specific dimensions unless the component contract explicitly requires them.</P>

        <H2>16. Accessibility Should Be Part of the Component</H2>
        <P>Reusable components should include accessibility from the beginning.</P>
        <P>For example, don&apos;t create:</P>
        <Code>{`
<div (click)="open()">
  Open
</div>
        `}</Code>
        <P>when the element is actually a button.</P>
        <P>Prefer:</P>
        <Code>{`
<button
  type="button"
  (click)="open()"
>
  Open
</button>
        `}</Code>
        <P>For images, make sure the Sitecore content model supports appropriate alternative text.</P>
        <P>For links:</P>
        <Code>{`
<a
  *scLink="rendering.fields.CtaLink"
  class="hero__cta"
>
  <span *scText="rendering.fields.CtaText"></span>
</a>
        `}</Code>
        <P>For interactive components, consider:</P>
        <List
          items={[
            "Keyboard navigation",
            "Focus states",
            "ARIA attributes where necessary",
            "Semantic HTML",
            "Screen reader behavior",
            "RTL behavior",
          ]}
        />
        <P>Accessibility should not be treated as a final QA activity.</P>
        <P>It should be part of the component contract.</P>

        <H2>17. RTL and Multilingual Components</H2>
        <P>For multilingual Sitecore applications, component design should avoid assumptions about text direction.</P>
        <P>For example:</P>
        <Code>{`
<section
  class="hero"
  [dir]="currentLanguage?.direction"
>
        `}</Code>
        <P>The component should support:</P>
        <Tree
          tone="neutral"
          data={{
            label: "LTR",
            children: [
              { label: "English" },
              { label: "French" },
              { label: "German" },
            ],
          }}
        />
        <Tree
          tone="neutral"
          data={{
            label: "RTL",
            children: [{ label: "Arabic" }],
          }}
        />
        <P>Avoid hardcoding:</P>
        <Code>{`margin-left: 20px;`}</Code>
        <P>when the intention is actually &ldquo;space before the content.&rdquo;</P>
        <P>Prefer logical properties:</P>
        <Code>{`
margin-inline-start: 20px;
padding-inline-end: 16px;
        `}</Code>
        <P>This allows the browser to handle direction correctly.</P>
        <P>Similarly:</P>
        <Code>{`text-align: start;`}</Code>
        <P>is often preferable to:</P>
        <Code>{`text-align: left;`}</Code>
        <P>for reusable multilingual components.</P>

        <H2>18. Sitecore Authoring Experience</H2>
        <P>A reusable component is successful only if content authors can actually use it.</P>
        <P>Developers should think about:</P>

        <H3>What fields are required?</H3>
        <Table
          head={["Field", "Requirement"]}
          rows={[
            ["Title", "Required"],
            ["Image", "Optional"],
            ["Description", "Optional"],
            ["CTA", "Optional"],
          ]}
        />

        <H3>What components can be inserted?</H3>
        <Tree
          tone="neutral"
          data={{ label: "Hero", children: [{ label: "No child components" }] }}
        />
        <Tree
          tone="neutral"
          data={{
            label: "Content Section",
            children: [
              { label: "Card" },
              { label: "CTA" },
              { label: "Image" },
              { label: "Rich Text" },
            ],
          }}
        />

        <H3>What should authors control?</H3>
        <P>Use rendering parameters for presentation choices such as:</P>
        <List items={["Theme", "Alignment", "Width", "Style"]} />
        <P>Avoid exposing technical implementation details to authors.</P>
        <P>For example, don&apos;t expose:</P>
        <Code>{`CSS class = hero-v3-dark-final`}</Code>
        <P>Instead expose:</P>
        <Code>{`Theme = Dark`}</Code>
        <P>The Sitecore author should work with business concepts, not implementation details.</P>

        <H2>19. Avoid Over-Generic Components</H2>
        <P>There is a common trap when trying to make components reusable.</P>
        <P>Developers sometimes create a component like:</P>
        <Code>{`UniversalContentComponent`}</Code>
        <P>with:</P>
        <List
          items={[
            "40 fields",
            "20 variants",
            "15 configuration options",
            "10 conditional layouts",
          ]}
        />
        <P>This component might technically support everything.</P>
        <P>But it becomes difficult to understand and maintain.</P>
        <P>Instead, prefer:</P>
        <List items={["Hero", "ContentCard", "PromoBanner", "CTA", "Accordion"]} />
        <P>with clear responsibilities.</P>
        <P>A good reusable component should be:</P>
        <Callout>Flexible enough to reuse, but specific enough to understand.</Callout>

        <H2>20. Component Folder Structure</H2>
        <P>A clean Angular project structure could look like:</P>
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
                          { label: "hero.model.ts" },
                        ],
                      },
                      {
                        label: "content-card",
                        children: [
                          { label: "content-card.component.ts" },
                          { label: "content-card.component.html" },
                          { label: "content-card.component.scss" },
                          { label: "content-card.model.ts" },
                        ],
                      },
                      {
                        label: "cta",
                        children: [
                          { label: "cta.component.ts" },
                          { label: "cta.component.html" },
                          { label: "cta.component.scss" },
                        ],
                      },
                    ],
                  },
                  {
                    label: "services",
                    children: [{ label: "sitecore" }],
                  },
                  {
                    label: "shared",
                    children: [{ label: "models" }, { label: "utilities" }],
                  },
                ],
              },
            ],
          }}
        />
        <P>For larger projects, you can also organize components by feature or design-system category.</P>

        <H2>21. Recommended Component Architecture</H2>
        <P>A useful architecture is:</P>
        <Flow
          steps={[
            {
              title: "Sitecore",
              items: ["Templates", "Datasources", "Renderings", "Placeholder Settings"],
            },
            { title: "Layout Service" },
            {
              title: "JSS JSON",
              items: ["fields", "params", "placeholders"],
            },
            { title: "Component Factory" },
          ]}
        />
        <Tree
          data={{
            label: "Component Factory",
            children: [
              {
                label: "HeroComponent",
                children: [{ label: "HTML/SCSS" }],
              },
              {
                label: "CardComponent",
                children: [{ label: "HTML/SCSS" }],
              },
              {
                label: "CtaComponent",
                children: [{ label: "HTML/SCSS" }],
              },
            ],
          }}
        />
        <P>This architecture keeps responsibilities clear.</P>

        <H2>22. Debugging Reusable Components</H2>
        <P>When a component does not render correctly, don&apos;t immediately start debugging the Angular HTML.</P>
        <P>Follow the data flow.</P>

        <H3>Step 1 — Check Sitecore</H3>
        <P>Verify:</P>
        <List
          items={[
            "Rendering exists",
            "Datasource exists",
            "Fields are populated",
            "Rendering is added to the page",
            "Placeholder settings are correct",
          ]}
        />

        <H3>Step 2 — Check Layout Service</H3>
        <P>Open the browser Network tab.</P>
        <P>Find the Layout Service request.</P>
        <P>Look for:</P>
        <Code>{`
{
  "componentName": "Hero",
  "fields": {
    "Title": {},
    "Description": {},
    "Image": {}
  },
  "params": {}
}
        `}</Code>

        <H3>Step 3 — Check Angular Mapping</H3>
        <P>Verify:</P>
        <Flow bare size="sm" steps={[{ title: "Hero" }, { title: "HeroComponent" }]} />

        <H3>Step 4 — Check Input</H3>
        <P>Temporarily inspect:</P>
        <Code>{`
ngOnInit() {
  console.log(this.rendering);
}
        `}</Code>

        <H3>Step 5 — Check the Template</H3>
        <P>Only after confirming the data is available should you investigate:</P>
        <List items={["*scText", "*scImage", "*scLink"]} />
        <P>This approach is much faster than debugging everything at the Angular layer first.</P>

        <H2>23. Common Mistakes</H2>

        <H3>Mistake 1 — Hardcoding Sitecore content</H3>
        <P>Avoid:</P>
        <Code>{`title = 'Welcome to our website';`}</Code>
        <P>when the value should come from Sitecore.</P>
        <P>Prefer:</P>
        <Code>{`rendering.fields.Title`}</Code>

        <H3>Mistake 2 — Creating a component for every small variation</H3>
        <P>Avoid:</P>
        <Code>{`
HeroA
HeroB
HeroC
HeroD
        `}</Code>
        <P>if they share the same content contract.</P>
        <P>Use variants when appropriate.</P>

        <H3>Mistake 3 — Making one component handle everything</H3>
        <P>Avoid:</P>
        <Code>{`UniversalComponent`}</Code>
        <P>with dozens of fields and conditions.</P>
        <P>Keep components focused.</P>

        <H3>Mistake 4 — Ignoring placeholder settings</H3>
        <P>
          A technically correct Angular component can still provide a poor
          Sitecore authoring experience if placeholder settings are
          incorrect.
        </P>

        <H3>Mistake 5 — Mixing content and presentation</H3>
        <P>Don&apos;t use Sitecore fields to store frontend implementation details.</P>
        <P>For example:</P>
        <Code>{`CSSClass = "hero-v2-special"`}</Code>
        <P>is usually a poor content model.</P>
        <P>Prefer:</P>
        <Code>{`Theme = Dark`}</Code>
        <P>and let Angular translate that into styling.</P>

        <H3>Mistake 6 — Ignoring accessibility until the end</H3>
        <P>Reusable components should be accessible by default.</P>

        <H2>24. Testing Reusable Components</H2>
        <P>A reusable component should be tested independently.</P>
        <P>For example:</P>
        <Tree
          data={{
            label: "HeroComponent",
            children: [
              { label: "renders title" },
              { label: "renders description" },
              { label: "renders image" },
              { label: "renders CTA" },
              { label: "handles missing image" },
              { label: "handles missing CTA" },
              { label: "applies variant" },
              { label: "supports RTL" },
              { label: "supports keyboard navigation" },
            ],
          }}
        />
        <P>You should also test the component with realistic Sitecore rendering data.</P>
        <P>For example:</P>
        <Code>{`
const mockRendering = {
  fields: {
    Title: {
      value: 'Welcome'
    },
    Description: {
      value: 'Example description'
    }
  },
  params: {
    variant: 'dark'
  }
};
        `}</Code>
        <P>
          This allows Angular tests to validate the component without
          requiring a complete Sitecore environment for every test.
        </P>

        <H2>25. A Small GitHub POC</H2>
        <P>For this article, a useful POC would contain three reusable components:</P>
        <Tree
          tone="neutral"
          data={{
            label: "sitecore-jss-angular-reusable-components",
            children: [
              { label: "README.md" },
              {
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
                          {
                            label: "content-card",
                            children: [
                              { label: "content-card.component.ts" },
                              { label: "content-card.component.html" },
                              { label: "content-card.component.scss" },
                            ],
                          },
                          {
                            label: "cta",
                            children: [
                              { label: "cta.component.ts" },
                              { label: "cta.component.html" },
                              { label: "cta.component.scss" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                label: "sitecore",
                children: [
                  { label: "templates" },
                  { label: "renderings" },
                  { label: "placeholder-settings" },
                ],
              },
              {
                label: "docs",
                children: [{ label: "architecture.md" }],
              },
            ],
          }}
        />
        <P>The README should explain:</P>
        <OrderedList
          items={[
            "Sitecore content model",
            "Rendering configuration",
            "Datasource configuration",
            "Angular component mapping",
            "Layout Service response",
            "Component rendering",
          ]}
        />
        <P>This turns the article from a theoretical explanation into a practical portfolio project.</P>

        <H2>26. Version Compatibility Note</H2>
        <P>One important point when creating a public GitHub POC is to clearly document the versions.</P>
        <P>For example:</P>
        <Code>{`
Angular: 11.x
Sitecore JSS: <project-compatible-version>
Node.js: <supported-version>
        `}</Code>
        <P>
          Do not copy the latest Sitecore JSS documentation into an Angular
          11 project without checking API/package compatibility.
        </P>
        <P>
          Sitecore JSS and Angular APIs have evolved over time, so the code
          in the POC should explicitly state which versions it targets.
        </P>
        <P>This is especially important if your production project is based on Angular 11.</P>

        <H2>27. From Reusable Components to a Design System</H2>
        <P>Once you have reusable Sitecore components, you can take the architecture one step further.</P>
        <P>For example:</P>
        <Flow
          steps={[
            {
              title: "Design System",
              items: ["Button", "Typography", "Card", "Modal", "Accordion", "Form Controls"],
            },
            {
              title: "Sitecore Components",
              items: ["Hero", "Product Card", "Promo Banner", "Contact Section", "Content Section"],
            },
            { title: "Sitecore Pages" },
          ]}
        />
        <P>This creates consistency between:</P>
        <Flow
          bare
          size="sm"
          tone="neutral"
          steps={[
            { title: "Figma" },
            { title: "Design System" },
            { title: "Angular Components" },
            { title: "Sitecore Components" },
            { title: "Sitecore Pages" },
          ]}
        />
        <P>This is particularly valuable for large enterprise websites.</P>

        <H2>28. The Key Architectural Lesson</H2>
        <P>The most important lesson is that reusability is not only an Angular concern.</P>
        <P>A truly reusable Sitecore component requires coordination between:</P>
        <Flow
          bare
          size="sm"
          tone="neutral"
          steps={[
            { title: "Content Model", arrowLabel: "+" },
            { title: "Rendering Definition", arrowLabel: "+" },
            { title: "Datasource", arrowLabel: "+" },
            { title: "Placeholder Settings", arrowLabel: "+" },
            { title: "Rendering Parameters", arrowLabel: "+" },
            { title: "Angular Component", arrowLabel: "+" },
            { title: "Design System", arrowLabel: "+" },
            { title: "Accessibility" },
          ]}
        />
        <P>If any one of these is poorly designed, the component becomes harder to reuse.</P>

        <H2>29. Final Architecture</H2>
        <P>The complete picture looks like this:</P>
        <FinalArchitectureDiagram />

        <H2>30. Conclusion</H2>
        <P>Building reusable Sitecore components with Angular JSS is more than creating reusable Angular classes.</P>
        <P>
          The real goal is to create a reusable{" "}
          <strong>content-to-component contract</strong>.
        </P>
        <P>Sitecore controls:</P>
        <List
          items={[
            "Content",
            "Datasources",
            "Rendering definitions",
            "Placeholder rules",
            "Authoring configuration",
          ]}
        />
        <P>Angular controls:</P>
        <List
          items={["Rendering", "Behavior", "Styling", "Responsiveness", "Accessibility"]}
        />
        <P>JSS connects the two.</P>
        <P>A good reusable component should be:</P>
        <List
          items={[
            "Focused",
            "Configurable",
            "Datasource-driven",
            "Author-friendly",
            "Responsive",
            "Accessible",
            "Multilingual",
            "Testable",
            "Easy to maintain",
          ]}
        />
        <P>The architectural principle I would keep in mind is:</P>
        <Callout>Build the Sitecore component as a contract, not just as an Angular component.</Callout>
        <P>
          When the content model, rendering definition, datasource, and
          Angular implementation are designed together, the result is a
          system that scales much better than a collection of page-specific
          components.
        </P>

        <H2>What&apos;s Next?</H2>
        <P>
          In the next article, we will move from component development into
          one of the areas developers spend a lot of time on in real
          projects:
        </P>
        <Callout>
          <Link
            href="/blog/debugging-sitecore-jss-angular-applications"
            className="font-semibold text-accent underline underline-offset-2 hover:opacity-80"
          >
            Part 5 — Debugging Sitecore JSS Angular Applications
          </Link>
        </Callout>
        <P>We will look at a practical debugging workflow covering:</P>
        <Flow
          bare
          size="sm"
          tone="neutral"
          steps={[
            { title: "Sitecore" },
            { title: "Layout Service" },
            { title: "JSS JSON" },
            { title: "Component Factory" },
            { title: "Angular" },
            { title: "Browser" },
          ]}
        />
        <P>and investigate common problems such as:</P>
        <List
          items={[
            "Component not rendering",
            "Missing datasource",
            "Incorrect component mapping",
            "Empty fields",
            "Placeholder issues",
            "Rendering parameter problems",
            "Layout Service issues",
            "Client-side Angular errors",
            "Experience Editor problems",
            "Environment-specific issues",
          ]}
        />
      </div>
      </article>
    </div>
  );
}
