import Link from "next/link";
import TableOfContents from "@/components/TableOfContents";

export const metadata = {
  title: "Sitecore GraphQL with Angular",
  description: "Querying Sitecore content via GraphQL from an Angular app.",
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const SECTION_OUTLINE = [
  "1. What Is GraphQL?",
  "2. REST vs GraphQL",
  "3. Where Does GraphQL Fit in Sitecore JSS?",
  "4. Three Important GraphQL Approaches",
  "5. GraphQL Layout Service",
  "6. Angular and GraphQL Layout Data",
  "7. Example: Sitecore Page",
  "8. Connected GraphQL",
  "9. Angular Connected GraphQL Example",
  "10. Why Would We Use Connected GraphQL?",
  "11. Integrated GraphQL",
  [
    "12. Connected vs Integrated GraphQL",
    ["Connected GraphQL", "Integrated GraphQL"],
  ],
  "13. When Should We Use Integrated GraphQL?",
  "14. Example: Related Articles Component",
  "15. Why Data Shaping Matters",
  "16. GraphQL Query Example",
  "17. Create a TypeScript Model",
  "18. Angular Service Architecture",
  "19. GraphQL Error Handling",
  "20. GraphQL Variables",
  "21. Avoid Over-Fetching",
  "22. Avoid the “One Giant Query”",
  "23. Integrated GraphQL vs Connected GraphQL",
  "24. When Should You Use What?",
  "25. GraphQL and Experience Edge",
  "26. Security Considerations",
  [
    "27. Performance Considerations",
    [
      "Query size",
      "Number of requests",
      "Query complexity",
      "Caching",
      "Initial rendering",
      "Repeated components",
    ],
  ],
  "28. Debugging GraphQL",
  "29. A Real-World Architecture",
  "30. Recommended Angular Project Structure",
  "31. GraphQL Fragments",
  "32. Don't Introduce GraphQL Just Because It Is Modern",
  [
    "33. Common Mistakes",
    [
      "Mistake 1: Thinking GraphQL Automatically Improves Performance",
      "Mistake 2: Putting Queries Directly in Components",
      "Mistake 3: Returning Raw GraphQL Responses Everywhere",
      "Mistake 4: Using Integrated GraphQL for Everything",
      "Mistake 5: Ignoring Query Complexity",
    ],
  ],
  [
    "34. My Recommended Strategy for Angular + Sitecore",
    ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
  ],
  "35. Final Architecture",
  [
    "36. Key Takeaways",
    [
      "1. GraphQL is a data-fetching approach",
      "2. JSS supports GraphQL for layout and other supported data scenarios",
      "3. GraphQL Layout Service and custom GraphQL are different concepts",
      "4. Integrated and connected GraphQL solve different problems",
      "5. Don't use GraphQL everywhere",
    ],
  ],
  "Conclusion",
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

function RealWorldArchitectureDiagram() {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-accent/15 bg-accent/[.02] p-4 dark:bg-accent/[.04]">
      <svg
        viewBox="0 0 640 420"
        className="mx-auto min-w-[560px]"
        role="img"
        aria-label="Angular branches into Layout Service and Application Services. Layout Service flows into Sitecore. Application Services branches into GraphQL and REST API. Sitecore, GraphQL and REST API all merge into Data Models, which flows into Angular Components."
      >
        <g className="text-accent/35" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M320,60 V80 M140,80 H470 M140,80 V100 M470,80 V100 M140,140 V220 M470,140 V180 M400,180 H540 M400,180 V220 M540,180 V220 M140,260 V280 M400,260 V280 M540,260 V280 M140,280 H540 M320,280 V300 M320,340 V360" />
        </g>
        <ArchNode x={245} y={20} w={150} h={40} label="Angular" accent />
        <ArchNode x={70} y={100} w={140} h={40} label="Layout Service" />
        <ArchNode x={380} y={100} w={180} h={40} label="Application Services" />
        <ArchNode x={70} y={220} w={140} h={40} label="Sitecore" />
        <ArchNode x={340} y={220} w={120} h={40} label="GraphQL" />
        <ArchNode x={480} y={220} w={120} h={40} label="REST API" />
        <ArchNode x={245} y={300} w={150} h={40} label="Data Models" accent />
        <ArchNode x={220} y={360} w={200} h={40} label="Angular Components" />
      </svg>
    </div>
  );
}

function GraphQLFinalArchitectureDiagram() {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-accent/15 bg-accent/[.02] p-4 dark:bg-accent/[.04]">
      <svg
        viewBox="0 0 640 640"
        className="mx-auto min-w-[560px]"
        role="img"
        aria-label="Sitecore branches into Content and Layout, merging into the JSS Layout API. That branches into REST and GraphQL. REST flows into Layout Service. GraphQL branches into Integrated GraphQL and Connected GraphQL. Layout Service, Integrated GraphQL and Connected GraphQL all merge into Angular Services, then Angular Components, then the Browser."
      >
        <g className="text-accent/35" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M320,60 V80 M190,80 H450 M190,80 V100 M450,80 V100 M190,140 V160 M450,140 V160 M190,160 H450 M320,160 V180 M320,220 V240 M165,240 H475 M165,240 V260 M475,240 V260 M165,300 V380 M475,300 V340 M395,340 H555 M395,340 V380 M555,340 V380 M165,420 V440 M395,420 V440 M555,420 V440 M165,440 H555 M320,440 V460 M320,500 V520 M320,560 V580" />
        </g>
        <ArchNode x={245} y={20} w={150} h={40} label="SITECORE" accent />
        <ArchNode x={120} y={100} w={140} h={40} label="Content" />
        <ArchNode x={380} y={100} w={140} h={40} label="Layout" />
        <ArchNode x={230} y={180} w={180} h={40} label="JSS Layout API" accent />
        <ArchNode x={95} y={260} w={140} h={40} label="REST" />
        <ArchNode x={405} y={260} w={140} h={40} label="GraphQL" />
        <ArchNode x={95} y={380} w={140} h={40} label="Layout Service" />
        <ArchNode x={320} y={380} w={150} h={40} label="Integrated GraphQL" />
        <ArchNode x={480} y={380} w={150} h={40} label="Connected GraphQL" />
        <ArchNode x={245} y={460} w={150} h={40} label="Angular Services" accent />
        <ArchNode x={220} y={520} w={200} h={40} label="Angular Components" />
        <ArchNode x={250} y={580} w={140} h={40} label="Browser" accent />
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
        Sitecore GraphQL with Angular: From REST to GraphQL
      </h1>
      <div className="mt-4 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-accent"
        />
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          2026-09-03
        </p>
      </div>
      <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-fuchsia-500" />

      <div className="mt-8 max-w-none">
        <P>
          In the first two articles of this series, we looked at the
          architecture of{" "}
          <Link
            href="/blog/understanding-sitecore-jss-architecture-with-angular"
            className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
          >
            Sitecore JSS with Angular
          </Link>{" "}
          and then explored how the{" "}
          <Link
            href="/blog/how-sitecore-layout-service-works-with-angular"
            className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
          >
            Sitecore Layout Service
          </Link>{" "}
          delivers page layout and component data to an Angular application.
        </P>
        <P>Now let&apos;s take the next step:</P>
        <Callout>
          <strong>GraphQL.</strong>
        </Callout>
        <P>
          GraphQL has become an important part of modern Sitecore headless
          development. Sitecore JSS provides GraphQL services and clients,
          and the JSS Layout API can retrieve layout information through
          GraphQL as well as REST.
        </P>
        <P>But there is an important distinction:</P>
        <Callout>
          Using GraphQL with Sitecore is not simply about replacing a REST
          URL with a GraphQL URL.
        </Callout>
        <P>
          There are different ways GraphQL can participate in a JSS
          application, and choosing the right approach depends on what your
          component needs.
        </P>
        <P>In this article, we&apos;ll explore:</P>
        <List
          items={[
            "What GraphQL is",
            "REST vs GraphQL in Sitecore",
            "How GraphQL fits into JSS",
            "GraphQL Layout Service",
            "Connected GraphQL",
            "Integrated GraphQL",
            "Angular implementation",
            "Datasource queries",
            "Query optimization",
            "Error handling",
            "When to use each approach",
            "Common mistakes",
            "A practical architecture",
          ]}
        />

        <H2>1. What Is GraphQL?</H2>
        <P>Before looking at Sitecore, let&apos;s quickly understand GraphQL.</P>
        <P>With a traditional REST API, the server generally determines the shape of the response.</P>
        <P>For example:</P>
        <Code>{`GET /api/products/123`}</Code>
        <P>The response might contain:</P>
        <Code>{`
{
  "id": "123",
  "name": "Product A",
  "description": "Product description",
  "price": 100,
  "category": "Electronics",
  "createdDate": "2026-01-01",
  "updatedDate": "2026-01-10"
}
        `}</Code>
        <P>But your Angular component might only need:</P>
        <Code>{`
name
price
        `}</Code>
        <P>You still received the other fields.</P>
        <P>GraphQL takes a different approach.</P>
        <P>The client describes the data it needs.</P>
        <Code>{`
query {
  product {
    name
    price
  }
}
        `}</Code>
        <P>The response contains the requested fields.</P>
        <Code>{`
{
  "data": {
    "product": {
      "name": "Product A",
      "price": 100
    }
  }
}
        `}</Code>
        <P>This gives frontend developers more control over the shape of the data they consume.</P>

        <H2>2. REST vs GraphQL</H2>
        <P>Let&apos;s compare the two.</P>
        <Table
          head={["REST", "GraphQL"]}
          rows={[
            ["Multiple endpoints", "Usually a GraphQL endpoint"],
            ["Server determines response structure", "Client specifies requested fields"],
            ["Can lead to over-fetching", "Can reduce unnecessary fields"],
            ["Simple HTTP model", "Query-based model"],
            ["Easy to understand initially", "Requires schema/query understanding"],
            [
              "Different resources often use different endpoints",
              "Related data can often be requested together",
            ],
          ]}
        />
        <P>But GraphQL isn&apos;t automatically better for every situation.</P>
        <P>The right question is:</P>
        <Callout>Does GraphQL solve a real problem in this application?</Callout>
        <P>That question becomes especially important in Sitecore.</P>

        <H2>3. Where Does GraphQL Fit in Sitecore JSS?</H2>
        <P>Let&apos;s revisit the architecture from Blog 2.</P>
        <P>With REST:</P>
        <Flow
          steps={[
            { title: "Angular" },
            { title: "REST Layout Service" },
            { title: "Sitecore" },
            { title: "Layout JSON", tone: "neutral" },
            { title: "Angular Components" },
          ]}
        />
        <P>With GraphQL:</P>
        <Flow
          steps={[
            { title: "Angular" },
            { title: "GraphQL" },
            { title: "Sitecore GraphQL Endpoint" },
            { title: "GraphQL Response", tone: "neutral" },
            { title: "Angular Components" },
          ]}
        />
        <P>
          Sitecore&apos;s JSS ecosystem supports GraphQL services for
          scenarios including layout and dictionary data. Current Sitecore
          documentation also describes Experience Edge for XM and the
          Sitecore Edge Preview GraphQL endpoint as supported GraphQL
          endpoints for JSS scenarios.
        </P>
        <P>
          The JSS Layout API abstracts the underlying data-fetching
          implementation, so applications can consume layout information
          without having to implement every low-level detail themselves.
        </P>

        <H2>4. Three Important GraphQL Approaches</H2>
        <P>When discussing GraphQL with Sitecore JSS, I find it useful to separate three concepts.</P>
        <Tree
          data={{
            label: "Sitecore + GraphQL",
            children: [
              {
                label: "GraphQL Layout Service",
                children: [{ label: "Layout" }],
              },
              {
                label: "Connected GraphQL",
                children: [{ label: "Custom Data" }],
              },
              {
                label: "Integrated GraphQL",
                children: [{ label: "Component Data" }],
              },
            ],
          }}
        />
        <P>These approaches solve different problems.</P>
        <P>Let&apos;s look at each one.</P>

        <H2>5. GraphQL Layout Service</H2>
        <P>The first approach is using GraphQL as the delivery mechanism for layout data.</P>
        <P>Conceptually:</P>
        <Flow
          steps={[
            { title: "Angular" },
            {
              title: "GraphQL Layout Service",
            },
            {
              title: "Sitecore",
              items: ["Route", "Placeholders", "Renderings", "Component Data"],
            },
            { title: "GraphQL Response", tone: "neutral" },
          ]}
        />
        <P>
          Sitecore provides a <IC>GraphQLLayoutService</IC> abstraction for
          fetching layout data. The current JSS documentation shows
          configuring this service with a GraphQL client factory and then
          calling <IC>fetchLayoutData()</IC>.
        </P>
        <P>A simplified example:</P>
        <Code>{`
import { GraphQLLayoutService } from '@sitecore-jss/sitecore-jss';

export const layoutService = new GraphQLLayoutService({
  clientFactory,
  siteName: 'my-site'
});
        `}</Code>
        <P>Then:</P>
        <Code>{`
layoutService
  .fetchLayoutData('en')
  .then(data => {
    console.log(data);
  });
        `}</Code>
        <P>The exact configuration varies by Sitecore/JSS version and application architecture.</P>
        <P>The important concept is:</P>
        <Flow
          bare
          size="sm"
          tone="neutral"
          steps={[
            { title: "GraphQL" },
            { title: "Layout Service" },
            { title: "Sitecore Page Layout" },
          ]}
        />

        <H2>6. Angular and GraphQL Layout Data</H2>
        <P>
          In an Angular JSS application, the layout data eventually feeds the
          same rendering architecture we discussed in the previous article.
        </P>
        <Flow
          steps={[
            { title: "Sitecore" },
            { title: "GraphQL Layout Service" },
            { title: "Layout Data", tone: "neutral" },
            { title: "JSS Angular" },
            { title: "Placeholder" },
            { title: "Component Mapping" },
            { title: "Angular Component" },
          ]}
        />
        <P>The Angular application doesn&apos;t need to understand how Sitecore internally stores the page.</P>
        <P>It consumes the layout contract.</P>

        <H2>7. Example: Sitecore Page</H2>
        <P>Suppose our Sitecore page looks like this:</P>
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
        <P>The Angular application eventually needs information such as:</P>
        <Tree
          tone="neutral"
          data={{
            label: "main",
            children: [
              { label: "Hero" },
              { label: "FeatureList" },
              { label: "PromoBanner" },
            ],
          }}
        />
        <P>GraphQL can be used to retrieve the layout information required by the JSS application.</P>
        <P>The resulting flow is:</P>
        <Flow
          steps={[
            { title: "Sitecore Page" },
            { title: "GraphQL Layout Service" },
            { title: "Layout Data", tone: "neutral" },
            { title: "Angular Placeholder" },
            { title: "Dynamic Components" },
          ]}
        />
        <P>This is closely related to the Layout Service architecture from Blog 2.</P>
        <P>The major difference is how the data is delivered.</P>

        <H2>8. Connected GraphQL</H2>
        <P>Now let&apos;s look at another approach.</P>
        <P>Imagine your component needs additional data that isn&apos;t simply the standard layout/datasource data.</P>
        <P>For example, you have a Product component that needs:</P>
        <List
          items={[
            "Sitecore Content",
            "Product API",
            "Related Products",
            "Category Information",
          ]}
        />
        <P>
          Instead of putting all of that into the initial Layout Service
          response, you might execute a separate GraphQL query from the
          application.
        </P>
        <P>Conceptually:</P>
        <Tree
          data={{
            label: "Angular",
            children: [
              { label: "Layout Service" },
              {
                label: "GraphQL API",
                children: [{ label: "Additional Data" }],
              },
            ],
          }}
        />
        <P>
          This is often referred to as <strong>connected GraphQL</strong> in
          JSS discussions.
        </P>
        <P>
          Sitecore&apos;s documentation describes connected GraphQL as making
          direct HTTP requests to a Sitecore GraphQL endpoint using a
          GraphQL client library.
        </P>

        <H2>9. Angular Connected GraphQL Example</H2>
        <P>Suppose we have an Angular service:</P>
        <Code>{`
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts() {
    // GraphQL request
  }

}
        `}</Code>
        <P>A GraphQL query might look like:</P>
        <Code>{`
query GetProducts {
  products {
    items {
      id
      name
      price
    }
  }
}
        `}</Code>
        <P>The Angular service can send the query through a GraphQL client.</P>
        <P>
          The exact client configuration depends on the application. Modern
          Sitecore JSS Angular applications can use GraphQL tooling such as
          Apollo Angular where appropriate; current JSS Angular upgrade
          documentation, for example, lists <IC>apollo-angular</IC> and{" "}
          <IC>graphql</IC> among the relevant dependencies in the Angular JSS
          stack.
        </P>

        <H2>10. Why Would We Use Connected GraphQL?</H2>
        <P>Consider a component that initially renders:</P>
        <Code>{`
Product Name
Product Image
Product Description
        `}</Code>
        <P>Then, after the user selects a category:</P>
        <Code>{`Fetch related products`}</Code>
        <P>The second request is state-driven.</P>
        <P>That makes connected GraphQL a better fit than trying to include everything in the initial layout request.</P>
        <P>The flow becomes:</P>
        <Flow
          steps={[
            { title: "Initial Page" },
            { title: "Layout Service" },
            { title: "Render Component" },
            { title: "User Interaction" },
            { title: "GraphQL Request" },
            { title: "Updated Data", tone: "good" },
          ]}
        />
        <P>This is particularly useful for dynamic experiences.</P>

        <H2>11. Integrated GraphQL</H2>
        <P>Now we reach one of the most interesting Sitecore JSS concepts:</P>
        <Callout>
          <strong>Integrated GraphQL.</strong>
        </Callout>
        <P>With integrated GraphQL, a GraphQL query can be associated with a Sitecore rendering.</P>
        <P>
          The query executes as part of the layout data process, and the
          resulting data becomes part of the component&apos;s layout data.
        </P>
        <P>
          Sitecore describes this as reshaping the component data returned
          by Layout Service into the result of a GraphQL query.
        </P>
        <P>Conceptually:</P>
        <Flow
          steps={[
            { title: "Sitecore Rendering" },
            { title: "Integrated GraphQL Query" },
            { title: "Layout Service" },
            { title: "Component Data", tone: "neutral" },
            { title: "Angular" },
          ]}
        />
        <P>This is different from connected GraphQL.</P>

        <H2>12. Connected vs Integrated GraphQL</H2>
        <P>This distinction is extremely important.</P>

        <H3>Connected GraphQL</H3>
        <Flow
          steps={[
            { title: "Angular" },
            { title: "GraphQL Client" },
            { title: "GraphQL Endpoint" },
            { title: "Data", tone: "neutral" },
          ]}
        />
        <P>The Angular application makes the query.</P>

        <H3>Integrated GraphQL</H3>
        <Flow
          steps={[
            { title: "Sitecore Rendering" },
            { title: "GraphQL Query" },
            { title: "Layout Service" },
            { title: "Component Data", tone: "neutral" },
            { title: "Angular" },
          ]}
        />
        <P>Sitecore executes the query as part of the layout process.</P>

        <H2>13. When Should We Use Integrated GraphQL?</H2>
        <P>Integrated GraphQL can be useful when a component needs data that goes beyond the standard datasource fields.</P>
        <P>For example:</P>
        <Tree
          data={{
            label: "Datasource",
            children: [
              { label: "Title" },
              { label: "Description" },
              {
                label: "Related Items",
                children: [
                  { label: "Item A" },
                  { label: "Item B" },
                  { label: "Item C" },
                ],
              },
            ],
          }}
        />
        <P>A standard datasource response may not provide exactly the shape your component needs.</P>
        <P>An integrated GraphQL query can shape the data specifically for that component.</P>
        <P>
          Sitecore recommends integrated GraphQL when a component requires
          more data than its normal datasource template fields provide, or
          when you want to avoid adding a client-side GraphQL dependency.
        </P>

        <H2>14. Example: Related Articles Component</H2>
        <P>Imagine a Sitecore component called:</P>
        <Code>{`RelatedArticles`}</Code>
        <P>Its datasource contains:</P>
        <List items={["Title", "Article IDs"]} />
        <P>But the frontend needs:</P>
        <List items={["Title", "URL", "Image", "Author", "Publication Date"]} />
        <P>
          Instead of returning a large datasource structure, the component
          can use an integrated GraphQL query to shape the data it needs.
        </P>
        <P>Conceptually:</P>
        <Code>{`
query RelatedArticles(
  $datasource: String!
) {
  item(path: $datasource) {
    children {
      results {
        name
        url {
          path
        }
        fields {
          name
          value
        }
      }
    }
  }
}
        `}</Code>
        <P>The exact schema depends on your Sitecore GraphQL endpoint.</P>
        <P>The important architectural idea is:</P>
        <Flow
          steps={[
            { title: "Sitecore" },
            { title: "Component GraphQL Query" },
            { title: "Precisely Shaped Component Data", tone: "good" },
            { title: "Angular" },
          ]}
        />

        <H2>15. Why Data Shaping Matters</H2>
        <P>Imagine a component only needs:</P>
        <Code>{`
{
  "title": "Product A",
  "image": "/images/product-a.jpg",
  "url": "/products/product-a"
}
        `}</Code>
        <P>But the API returns:</P>
        <Code>{`
{
  "title": "...",
  "description": "...",
  "metadata": "...",
  "author": "...",
  "created": "...",
  "updated": "...",
  "permissions": "...",
  "relatedItems": "...",
  "marketingData": "..."
}
        `}</Code>
        <P>The component now receives much more information than it needs.</P>
        <P>GraphQL gives you an opportunity to define a more focused data contract.</P>
        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Flow bare size="sm" tone="bad" steps={[{ title: "All Data" }, { title: "Large Response" }]} />
          <Flow
            bare
            size="sm"
            tone="good"
            steps={[
              { title: "Required Data" },
              { title: "Focused Query" },
              { title: "Angular Component" },
            ]}
          />
        </div>
        <P>
          However, query efficiency matters. A poorly designed GraphQL query
          can be more expensive than a simple REST request.
        </P>
        <Callout>GraphQL is a tool—not automatically a performance solution.</Callout>

        <H2>16. GraphQL Query Example</H2>
        <P>Let&apos;s create a simple conceptual query.</P>
        <P>Suppose our component needs:</P>
        <List items={["Product name", "Product description", "Product image"]} />
        <P>We could request:</P>
        <Code>{`
query Product($path: String!) {
  item(path: $path) {
    name
    fields {
      name
      value
    }
  }
}
        `}</Code>
        <P>The response could look like:</P>
        <Code>{`
{
  "data": {
    "item": {
      "name": "Product A",
      "fields": [
        {
          "name": "Title",
          "value": "Product A"
        },
        {
          "name": "Description",
          "value": "Product description"
        }
      ]
    }
  }
}
        `}</Code>
        <P>Angular can then transform the result into a component-friendly model.</P>

        <H2>17. Create a TypeScript Model</H2>
        <P>Instead of passing raw GraphQL data throughout the application, define a model.</P>
        <Code>{`
export interface Product {
  name: string;
  description: string;
  imageUrl?: string;
}
        `}</Code>
        <P>Then map the response:</P>
        <Code>{`
function mapProduct(data: any): Product {
  return {
    name: data.name,
    description: data.fields?.find(
      (field: any) => field.name === 'Description'
    )?.value
  };
}
        `}</Code>
        <P>Now the component works with:</P>
        <Code>{`Product`}</Code>
        <P>instead of:</P>
        <Code>{`GraphQLResponse`}</Code>
        <P>This separation is especially useful in larger Angular applications.</P>

        <H2>18. Angular Service Architecture</H2>
        <P>I recommend keeping GraphQL calls outside components.</P>
        <P>Avoid:</P>
        <Tree
          tone="bad"
          data={{
            label: "ProductComponent",
            children: [
              { label: "GraphQL Query" },
              { label: "Response Mapping" },
              { label: "Error Handling" },
              { label: "UI" },
            ],
          }}
        />
        <P>Instead:</P>
        <Flow
          tone="good"
          steps={[
            { title: "ProductComponent" },
            { title: "ProductService" },
            { title: "GraphQL Client" },
            { title: "Sitecore" },
          ]}
        />
        <P>Example:</P>
        <Code>{`
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProduct(path: string) {
    // execute GraphQL query
    // map response
    // return Product
  }

}
        `}</Code>
        <P>Then:</P>
        <Code>{`
export class ProductComponent {

  product$ = this.productService.getProduct(
    '/sitecore/content/MySite/Home/Product'
  );

  constructor(
    private productService: ProductService
  ) {}

}
        `}</Code>
        <P>And:</P>
        <Code>{`
<div *ngIf="product$ | async as product">

  <h2>{{ product.name }}</h2>

  <p>{{ product.description }}</p>

</div>
        `}</Code>
        <P>The component remains focused on presentation.</P>

        <H2>19. GraphQL Error Handling</H2>
        <P>GraphQL introduces another consideration.</P>
        <P>An HTTP request can return successfully while the GraphQL response contains errors.</P>
        <P>For example:</P>
        <Code>{`
{
  "data": null,
  "errors": [
    {
      "message": "Field not found"
    }
  ]
}
        `}</Code>
        <P>Therefore, don&apos;t assume:</P>
        <Code>{`HTTP 200 = everything succeeded`}</Code>
        <P>Your GraphQL layer should handle:</P>
        <Tree
          tone="bad"
          data={{
            label: "Network Error",
            children: [
              { label: "Authentication" },
              { label: "Timeout" },
              { label: "Server Error" },
            ],
          }}
        />
        <Tree
          tone="bad"
          data={{
            label: "GraphQL Error",
            children: [
              { label: "Invalid Query" },
              { label: "Missing Field" },
              { label: "Authorization" },
              { label: "Resolver Error" },
            ],
          }}
        />
        <P>A centralized error strategy is preferable.</P>

        <H2>20. GraphQL Variables</H2>
        <P>Avoid building queries by concatenating strings.</P>
        <P>For example, avoid:</P>
        <Code>{`
const query = \`
  query {
    item(path: "\${path}") {
      name
    }
  }
\`;
        `}</Code>
        <P>Instead, use variables.</P>
        <Code>{`
query GetItem($path: String!) {
  item(path: $path) {
    name
  }
}
        `}</Code>
        <P>Then:</P>
        <Code>{`
const variables = {
  path: '/sitecore/content/MySite/Home'
};
        `}</Code>
        <P>This makes the query easier to reuse and maintain.</P>

        <H2>21. Avoid Over-Fetching</H2>
        <P>One of the biggest advantages of GraphQL is that the client can request specific fields.</P>
        <P>For example, don&apos;t request:</P>
        <Code>{`
query {
  item {
    *
  }
}
        `}</Code>
        <P>when the component only needs:</P>
        <Code>{`
query {
  item {
    name
  }
}
        `}</Code>
        <P>A good GraphQL query should answer:</P>
        <Callout>What is the minimum data this component needs?</Callout>
        <P>This is particularly important for components rendered repeatedly.</P>
        <P>For example:</P>
        <Tree
          data={{
            label: "Product Listing",
            children: [
              { label: "Product Card" },
              { label: "Product Card" },
              { label: "Product Card" },
              { label: "Product Card" },
              { label: "Product Card" },
            ],
          }}
        />
        <P>If each card retrieves unnecessary data, the total payload can grow quickly.</P>

        <H2>22. Avoid the “One Giant Query”</H2>
        <P>Another common mistake is creating one enormous GraphQL query for the entire application.</P>
        <P>For example:</P>
        <Tree
          data={{
            label: "Home Page",
            children: [
              { label: "Header" },
              { label: "Hero" },
              { label: "Navigation" },
              { label: "Product List" },
              { label: "Recommendations" },
              { label: "Footer" },
              { label: "Analytics" },
            ],
          }}
        />
        <P>and trying to retrieve everything with:</P>
        <Code>{`ONE HUGE GRAPHQL QUERY`}</Code>
        <P>This can make the system difficult to:</P>
        <List items={["Maintain", "Debug", "Cache", "Optimize", "Change"]} />
        <P>Instead, think about data ownership.</P>
        <MappingList
          pairs={[
            { from: "Header", to: "Header Data" },
            { from: "Hero", to: "Hero Data" },
            { from: "Product List", to: "Product Data" },
            { from: "Footer", to: "Footer Data" },
          ]}
        />
        <P>Keep queries close to the component/data responsibility where appropriate.</P>

        <H2>23. Integrated GraphQL vs Connected GraphQL</H2>
        <P>Let&apos;s compare them directly.</P>
        <Table
          head={["Feature", "Integrated GraphQL", "Connected GraphQL"]}
          rows={[
            ["Query executed", "During layout/data generation", "From application"],
            ["Client-side GraphQL library required", "No", "Usually yes"],
            ["Part of initial layout data", "Yes", "Not necessarily"],
            ["Good for component-specific data", "Yes", "Yes"],
            ["Dynamic state-driven requests", "Not ideal", "Good"],
            ["Mutations", "Not supported", "Better suited"],
            ["Subscriptions", "Not supported", "Better suited"],
            ["Pagination/cursors", "Not recommended", "Better suited"],
            ["Long-running query", "Can delay rendering", "Can be deferred"],
          ]}
        />
        <P>
          Sitecore&apos;s current documentation specifically recommends
          avoiding integrated GraphQL for cases involving mutations,
          subscriptions, pagination/cursors, or additional queries triggered
          by client-side state changes; connected GraphQL is better suited
          to those scenarios.
        </P>

        <H2>24. When Should You Use What?</H2>
        <P>My practical decision tree would be:</P>
        <Tree
          data={{
            label: "Do you need Sitecore layout data?",
            children: [
              {
                label: "YES",
                children: [
                  {
                    label: "Use JSS Layout API (REST / GraphQL)",
                    children: [
                      {
                        label: "Only standard layout/data",
                        children: [{ label: "Standard Layout Data" }],
                      },
                      {
                        label: "Custom component data required? (YES)",
                        children: [
                          {
                            label: "Static during initial load?",
                            children: [{ label: "Integrated GraphQL" }],
                          },
                          {
                            label: "Dynamic / state-driven?",
                            children: [{ label: "Connected GraphQL" }],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          }}
        />
        <P>This is not a strict rule, but it is a useful starting point.</P>

        <H2>25. GraphQL and Experience Edge</H2>
        <P>
          For modern Sitecore headless architectures, GraphQL becomes
          especially relevant with Experience Edge.
        </P>
        <P>A simplified architecture:</P>
        <Flow
          steps={[
            { title: "Sitecore", arrowLabel: "Publish" },
            { title: "Experience Edge", arrowLabel: "GraphQL API" },
            { title: "Angular / JSS" },
            { title: "Browser" },
          ]}
        />
        <P>
          Sitecore documents Experience Edge for XM as a read-only GraphQL
          schema designed for common headless content-delivery scenarios.
        </P>
        <P>
          This architecture is particularly useful when the frontend is
          decoupled from the Sitecore content management environment.
        </P>

        <H2>26. Security Considerations</H2>
        <P>GraphQL does not eliminate security concerns.</P>
        <P>You still need to consider:</P>
        <List
          items={[
            "API authentication",
            "API keys",
            "Permissions",
            "Environment configuration",
            "Query complexity",
            "Rate limiting",
            "Sensitive data exposure",
          ]}
        />
        <Callout>Never put secrets into Angular code simply because you&apos;re using GraphQL.</Callout>
        <P>Remember:</P>
        <Flow
          bare
          size="sm"
          tone="bad"
          steps={[
            { title: "Angular" },
            { title: "Browser" },
            { title: "Anything shipped to browser" },
            { title: "Potentially visible to users" },
          ]}
        />
        <P>Client-side configuration should therefore be treated as public.</P>
        <P>Sensitive operations should remain server-side.</P>

        <H2>27. Performance Considerations</H2>
        <P>
          GraphQL can improve data efficiency, but performance depends on the
          query and backend implementation.
        </P>
        <P>Consider:</P>

        <H3>Query size</H3>
        <P>Request only what is required.</P>

        <H3>Number of requests</H3>
        <P>Avoid unnecessarily splitting data into many requests.</P>

        <H3>Query complexity</H3>
        <P>A small-looking GraphQL query can still trigger expensive backend operations.</P>

        <H3>Caching</H3>
        <P>Consider caching strategies at the appropriate layer.</P>

        <H3>Initial rendering</H3>
        <P>Don&apos;t block initial rendering with expensive queries when the data can be loaded later.</P>

        <H3>Repeated components</H3>
        <P>Be especially careful with GraphQL queries executed for many instances of the same component.</P>
        <P>For example:</P>
        <Flow
          bare
          size="sm"
          tone="bad"
          steps={[{ title: "100 Product Cards" }, { title: "100 GraphQL Requests" }]}
        />
        <P>is usually a warning sign.</P>
        <P>Prefer a query/data model that can retrieve the required collection efficiently.</P>

        <H2>28. Debugging GraphQL</H2>
        <P>When a GraphQL-driven component doesn&apos;t work, use this flow:</P>
        <Flow
          steps={[
            { title: "Component Not Working", tone: "bad" },
            { title: "Is GraphQL Request Sent?" },
            { title: "Check Network Tab" },
            { title: "Is Query Correct?" },
            { title: "Check GraphQL Variables" },
            { title: "Check Response", items: ["data", "errors"] },
            { title: "Check Angular Mapping" },
            { title: "Check Component Model" },
            { title: "Check Template", tone: "good" },
          ]}
        />
        <P>If possible, test the query independently using the GraphQL tooling available for your Sitecore environment.</P>
        <P>This helps separate:</P>
        <Code>{`Sitecore / GraphQL Problem`}</Code>
        <P>from:</P>
        <Code>{`Angular Problem`}</Code>

        <H2>29. A Real-World Architecture</H2>
        <P>For a larger Angular + Sitecore application, I would structure the data layer like this:</P>
        <RealWorldArchitectureDiagram />
        <P>This architecture keeps responsibilities separated.</P>

        <H2>30. Recommended Angular Project Structure</H2>
        <P>A practical project structure could look like:</P>
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
                      { label: "hero" },
                      { label: "product-list" },
                      { label: "related-articles" },
                    ],
                  },
                  {
                    label: "services",
                    children: [
                      {
                        label: "sitecore",
                        children: [{ label: "layout.service.ts" }],
                      },
                      {
                        label: "graphql",
                        children: [
                          { label: "graphql-client.service.ts" },
                          { label: "product.service.ts" },
                          { label: "article.service.ts" },
                        ],
                      },
                    ],
                  },
                  {
                    label: "models",
                    children: [
                      { label: "product.model.ts" },
                      { label: "article.model.ts" },
                    ],
                  },
                  { label: "shared" },
                ],
              },
              {
                label: "graphql",
                children: [
                  {
                    label: "queries",
                    children: [
                      { label: "product.graphql" },
                      { label: "articles.graphql" },
                    ],
                  },
                  {
                    label: "fragments",
                    children: [{ label: "product.fragment.graphql" }],
                  },
                ],
              },
            ],
          }}
        />
        <P>The exact structure should be adapted to your project, but the principle is important:</P>
        <Callout>Keep GraphQL infrastructure separate from presentation components.</Callout>

        <H2>31. GraphQL Fragments</H2>
        <P>As an application grows, fragments can make queries easier to maintain.</P>
        <P>For example:</P>
        <Code>{`
fragment ProductFields on Product {
  id
  name
  price
  image
}
        `}</Code>
        <P>Then:</P>
        <Code>{`
query GetProducts {
  products {
    items {
      ...ProductFields
    }
  }
}
        `}</Code>
        <P>This helps maintain consistency when the same data structure is needed in multiple queries.</P>

        <H2>32. Don&apos;t Introduce GraphQL Just Because It Is Modern</H2>
        <P>This is perhaps the most important lesson.</P>
        <P>GraphQL is powerful, but introducing it everywhere can also add complexity.</P>
        <P>Before using GraphQL, ask:</P>
        <Flow
          bare
          size="sm"
          tone="neutral"
          steps={[
            { title: "Do I need flexible data selection?" },
            { title: "Do I need related/nested data?" },
            { title: "Do I need a custom data shape?" },
            { title: "Do I need client-driven queries?" },
            { title: "Would GraphQL simplify the problem?" },
          ]}
        />
        <P>If the answer is no, the standard Layout Service response may already be sufficient.</P>
        <P>
          Sitecore&apos;s documentation similarly recommends integrated
          GraphQL selectively—for example, when standard datasource fields
          are insufficient—and advises against it for scenarios better
          handled by connected GraphQL.
        </P>

        <H2>33. Common Mistakes</H2>

        <H3>Mistake 1: Thinking GraphQL Automatically Improves Performance</H3>
        <P>GraphQL can reduce unnecessary data transfer, but a complex query can still be expensive.</P>
        <P>Think:</P>
        <Flow
          bare
          size="sm"
          steps={[
            { title: "Better Query", arrowLabel: "+" },
            { title: "Better Backend", arrowLabel: "+" },
            { title: "Better Caching", arrowLabel: "=" },
            { title: "Better Performance", tone: "good" },
          ]}
        />

        <H3>Mistake 2: Putting Queries Directly in Components</H3>
        <P>Avoid turning components into API clients.</P>
        <P>Prefer:</P>
        <Flow bare size="sm" tone="good" steps={[{ title: "Component" }, { title: "Service" }, { title: "GraphQL" }]} />

        <H3>Mistake 3: Returning Raw GraphQL Responses Everywhere</H3>
        <P>Instead of:</P>
        <Code>{`component.data.graphql.data.item.fields`}</Code>
        <P>create application models.</P>
        <Code>{`
Product {
  name
  price
  image
}
        `}</Code>
        <P>This keeps components cleaner.</P>

        <H3>Mistake 4: Using Integrated GraphQL for Everything</H3>
        <P>Integrated GraphQL is useful, but it is not the answer to every data problem.</P>
        <P>
          For dynamic state-driven queries, mutations, subscriptions, or
          pagination scenarios, connected GraphQL is generally more
          appropriate.
        </P>

        <H3>Mistake 5: Ignoring Query Complexity</H3>
        <P>A GraphQL query can look small while causing significant backend work.</P>
        <P>Always consider:</P>
        <Flow
          bare
          size="sm"
          tone="neutral"
          steps={[
            { title: "Query" },
            { title: "Resolvers" },
            { title: "Backend Operations" },
            { title: "Response" },
          ]}
        />
        <P>Not just the number of lines in the query.</P>

        <H2>34. My Recommended Strategy for Angular + Sitecore</H2>
        <P>For an Angular + Sitecore project, I would generally start with:</P>

        <H3>Step 1</H3>
        <P>Use the standard JSS Layout API for page composition.</P>
        <Flow bare size="sm" steps={[{ title: "Sitecore" }, { title: "Layout Service" }, { title: "Angular" }]} />

        <H3>Step 2</H3>
        <P>Use standard datasource fields whenever possible.</P>
        <Flow bare size="sm" steps={[{ title: "Datasource" }, { title: "Layout Data" }, { title: "Component" }]} />

        <H3>Step 3</H3>
        <P>
          Introduce integrated GraphQL when a component needs a custom data
          shape that the standard layout output doesn&apos;t provide.
        </P>
        <Flow
          bare
          size="sm"
          steps={[
            { title: "Datasource" },
            { title: "Integrated GraphQL" },
            { title: "Component-specific Data" },
          ]}
        />

        <H3>Step 4</H3>
        <P>Use connected GraphQL when data needs to be retrieved dynamically after the page is loaded.</P>
        <Flow
          bare
          size="sm"
          steps={[
            { title: "User Interaction" },
            { title: "Angular Service" },
            { title: "GraphQL" },
            { title: "Updated UI", tone: "good" },
          ]}
        />

        <H3>Step 5</H3>
        <P>
          For modern headless delivery, evaluate Experience Edge and its
          GraphQL endpoint according to the Sitecore architecture
          you&apos;re targeting.
        </P>

        <H2>35. Final Architecture</H2>
        <P>Putting everything together:</P>
        <GraphQLFinalArchitectureDiagram />

        <H2>36. Key Takeaways</H2>
        <P>After working through GraphQL with Sitecore JSS, there are a few concepts worth remembering.</P>

        <H3>1. GraphQL is a data-fetching approach</H3>
        <P>It doesn&apos;t replace the overall JSS architecture.</P>

        <H3>2. JSS supports GraphQL for layout and other supported data scenarios</H3>
        <P>The JSS Layout API abstracts REST and GraphQL delivery mechanisms.</P>

        <H3>3. GraphQL Layout Service and custom GraphQL are different concepts</H3>
        <P>One focuses on retrieving layout data; the other can retrieve additional application/component data.</P>

        <H3>4. Integrated and connected GraphQL solve different problems</H3>
        <P>
          <strong>Integrated</strong>
        </P>
        <Flow bare size="sm" tone="neutral" steps={[{ title: "Sitecore" }, { title: "Layout" }, { title: "Component" }]} />
        <P>
          <strong>Connected</strong>
        </P>
        <Flow bare size="sm" tone="neutral" steps={[{ title: "Angular" }, { title: "GraphQL" }, { title: "Component" }]} />

        <H3>5. Don&apos;t use GraphQL everywhere</H3>
        <P>Use it where it provides a meaningful benefit.</P>

        <H2>Conclusion</H2>
        <P>GraphQL gives Sitecore + Angular developers a powerful way to build more controlled and flexible data flows.</P>
        <P>But the real value doesn&apos;t come from simply replacing REST with GraphQL.</P>
        <P>
          It comes from understanding <strong>where GraphQL belongs in the architecture</strong>.
        </P>
        <P>A well-designed Sitecore + Angular application might use:</P>
        <MappingList
          pairs={[
            { from: "Layout Service", to: "Page Composition" },
            { from: "Integrated GraphQL", to: "Component-specific data" },
            { from: "Connected GraphQL", to: "Dynamic application data" },
          ]}
        />
        <P>
          Once these responsibilities are separated, the architecture becomes
          easier to reason about, test, optimize, and maintain.
        </P>
        <P>The most important question isn&apos;t:</P>
        <Callout>&ldquo;Should we use GraphQL?&rdquo;</Callout>
        <P>It is:</P>
        <Callout>
          <strong>
            &ldquo;What data does this component actually need, when does it
            need it, and which part of the architecture should provide
            it?&rdquo;
          </strong>
        </Callout>
        <P>
          That mindset leads to better Sitecore solutions than adopting a
          technology simply because it is newer.
        </P>

        <H2>What&apos;s Next?</H2>
        <P>In the next article, we&apos;ll move from data delivery to component architecture:</P>
        <Callout>
          <Link
            href="/blog/building-reusable-sitecore-components-with-angular-jss"
            className="font-semibold text-accent underline underline-offset-2 hover:opacity-80"
          >
            Building Reusable Sitecore Components with Angular JSS
          </Link>
        </Callout>
        <P>We&apos;ll build a reusable component from scratch and explore:</P>
        <List
          items={[
            "Sitecore rendering definitions",
            "Datasource templates",
            "Angular components",
            "JSS component registration",
            "Sitecore fields",
            "Rendering parameters",
            "Reusable components",
            "Component composition",
            "Authoring considerations",
            "Responsive design",
            "A complete GitHub POC",
          ]}
        />
      </div>
      </article>
    </div>
  );
}
