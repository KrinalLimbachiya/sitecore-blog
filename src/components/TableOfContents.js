"use client";

import { useEffect, useRef, useState } from "react";

function linkClass(active) {
  return (
    "block py-1.5 text-sm transition-colors " +
    (active
      ? "font-medium text-accent"
      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white")
  );
}

function childLinkClass(active) {
  return (
    "flex items-center gap-2 py-1 text-[13px] transition-colors " +
    (active
      ? "font-medium text-accent"
      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white")
  );
}

export default function TableOfContents({ sections }) {
  const flat = sections.flatMap((section) => [
    section,
    ...(section.children ?? []),
  ]);
  const [activeId, setActiveId] = useState(flat[0]?.id);
  const [indicator, setIndicator] = useState(null);
  const containerRef = useRef(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const headingEls = flat
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function measure() {
      const el = linkRefs.current[activeId];
      if (el) {
        setIndicator({ top: el.offsetTop, height: el.offsetHeight });
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeId]);

  return (
    <nav
      aria-label="Table of contents"
      className="toc-scroll sticky top-24 hidden max-h-[calc(100vh-7rem)] w-[240px] shrink-0 overflow-y-auto pr-2 lg:block"
    >
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
          On this page
        </p>
        <span className="text-xs font-medium text-accent">
          {sections.length} topics
        </span>
      </div>

      <div ref={containerRef} className="relative mt-4">
        <div className="absolute inset-y-0 left-0 w-px bg-black/10 dark:bg-white/10" />
        {indicator && (
          <span
            aria-hidden="true"
            style={{ top: indicator.top, height: indicator.height }}
            className="absolute left-0 w-[3px] rounded-full bg-gradient-to-b from-accent to-fuchsia-500 shadow-[0_0_8px_-1px_var(--accent)] transition-[top,height] duration-300 ease-out"
          />
        )}
        <ul className="space-y-0.5 pl-4">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                ref={(el) => {
                  linkRefs.current[section.id] = el;
                }}
                href={`#${section.id}`}
                className={linkClass(activeId === section.id)}
              >
                {section.title}
              </a>
              {section.children && (
                <ul className="mb-1 mt-0.5 space-y-0.5 pl-3">
                  {section.children.map((child) => (
                    <li key={child.id}>
                      <a
                        ref={(el) => {
                          linkRefs.current[child.id] = el;
                        }}
                        href={`#${child.id}`}
                        className={childLinkClass(activeId === child.id)}
                      >
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 shrink-0 rounded-full bg-current opacity-50"
                        />
                        {child.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
