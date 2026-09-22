"use client";

import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

type Entry = {
  org: string;
  role: string;
  ts: string;
  points: string[];
  tags: string[];
};

const ENTRIES: Entry[] = [
  {
    org: "Snowmountain AI",
    role: "Product Engineer",
    ts: "March 2025 — Present",
    points: [
      "Joined Snowmountain AI as the fifth engineer and worked across multiple products, starting with Forecast 360 and later helping build QwikBuild from its early stages. As a product engineer, I work across frontend, backend, infrastructure, developer tooling, and the AI agent stack depending on what the product needs.",
      "Forecast 360: Worked on the banking risk-modeling and forecasting platform, building features across Next.js, TypeScript, tRPC, PostgreSQL, and AWS Amplify. Worked on analytics workflows, database and API performance, search, authentication, UX, and end-to-end testing.",
      "QwikBuild: Joined the product in its early stages as a founding engineer and contribute to the production platform around our agentic app-building system. Work across the agent platform, generated application runtime, APIs, authentication, collaboration, file storage, SEO, admin tools, notifications, and deployment workflows.",
      "Developer tooling and infrastructure: Build and maintain the SDK, deployment tools, and local development workflows used to build, debug, and deploy generated applications. This includes TypeScript and Python tooling, cloud sandboxes, deployment pipelines, workspace syncing, and application build systems.",
      "Across QwikBuild, I work across TypeScript, Python, PostgreSQL, AWS, React, Next.js, Hono, Deno, and AI-agent workflows, taking up problems wherever they sit in the product rather than working within a single part of the stack.",
    ],
    tags: [
      "TypeScript",
      "JavaScript",
      "Python",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "tRPC",
      "AWS Amplify",
      "S3",
      "REST APIs",
      "Authentication",
      "RBAC",
      "Playwright",
      "E2E Testing",
      "Performance Optimization",
      "Cloud Infrastructure",
      "Deployment",
      "SDK Development",
      "CLI Development",
      "AI Agents",
    ],
  },
  {
    org: "Dhimath",
    role: "Fullstack Developer Intern",
    ts: "March 2024 — August 2024",
    points: [
      "Built a remote multiplayer math games platform using Phaser, React, Express, WebSockets, and Redis for desktop and mobile browsers.",
      "Developed real-time multiplayer features with WebSockets and the ws package, including room creation, joining, and moves broadcasting.",
      "Migrated game state to Redis, enabling a stateless architecture to handle large-scale traffic and real-time updates with Redis Pub/Sub.",
      "Created a bot for playing against the computer, enhancing gameplay with adaptive strategies.",
    ],
    tags: ["Phaser", "React", "Express", "WebSockets", "Redis"],
  },
];

function boldProductNames(text: string) {
  return text
    .split(/(Forecast 360|QwikBuild)/g)
    .map((part) =>
      part === "Forecast 360" || part === "QwikBuild" ? (
        <strong key={part}>{part}</strong>
      ) : (
        part
      ),
    );
}

function Points({ points }: { points: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {points.map((point) => (
        <li
          className="flex gap-2.5 text-[13px] leading-[1.65] text-text-dim"
          key={point}
        >
          <span className="mt-2 size-1 shrink-0 rounded-full bg-sage" />
          <span>{boldProductNames(point)}</span>
        </li>
      ))}
    </ul>
  );
}

function ExperienceItem({
  entry,
  open,
  onToggle,
}: {
  entry: Entry;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `experience-${entry.org.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className={`flex w-full flex-col gap-2 p-5 text-left transition-colors duration-150 md:flex-row md:items-center md:justify-between ${open ? "" : "hover:bg-bg-raised"}`}
        onClick={onToggle}
        type="button"
      >
        <div>
          <p className="mb-1 text-[14.5px] text-foreground">{entry.org}</p>
          <p className="m-0 text-[13px] text-text-dim">{entry.role}</p>
        </div>
        <div className="flex w-full items-center justify-between gap-3 md:w-auto">
          <span className="text-xs text-text-faint md:text-[13px]">
            {entry.ts}
          </span>
          <LuChevronDown
            aria-hidden
            className={`text-text-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            size={16}
          />
        </div>
      </button>
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        id={panelId}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-4 px-5 pb-5">
            <Points points={entry.points} />
            {entry.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    className="rounded-[20px] border border-sage-dim px-2.5 py-0.75 text-[11px] text-sage"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const [open, setOpen] = useState<string | null>(ENTRIES[0].org);

  function toggle(org: string) {
    setOpen((prev) => (prev === org ? null : org));
  }

  return (
    <section className="py-10 sm:py-18" id="experience">
      <div className="mx-auto max-w-245 px-7">
        <p className="mb-5.5 flex items-center gap-2.5 text-xs tracking-[0.06em] text-slate-blue">
          <span className="inline-block h-px w-4.5 bg-slate-blue" />
          experience
        </p>
        <div className="overflow-hidden rounded-sm border border-line divide-y divide-line">
          {ENTRIES.map((entry) => (
            <ExperienceItem
              entry={entry}
              key={entry.org}
              onToggle={() => toggle(entry.org)}
              open={open === entry.org}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
