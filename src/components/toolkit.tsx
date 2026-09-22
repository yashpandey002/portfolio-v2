const TOOLKIT = [
  { k: "languages", v: "Python, Typescript" },
  { k: "backend", v: "Node.js, FastAPI, Next.js, Hono, Express" },
  { k: "frontend", v: "React, Tailwind CSS, Shadcn UI" },
  { k: "data", v: "PostgreSQL, Redis" },
  { k: "tooling", v: "Docker" },
  { k: "observability", v: "Uptrace" },
] as const;

export function Toolkit() {
  return (
    <section className="py-10 sm:py-18" id="toolkit">
      <div className="mx-auto max-w-245 px-7">
        <p className="mb-5.5 flex items-center gap-2.5 text-xs tracking-[0.06em] text-slate-blue">
          <span className="inline-block h-px w-4.5 bg-slate-blue" />
          toolkit
        </p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {TOOLKIT.map((row) => (
            <div
              className="flex justify-between border-b border-line py-2.5 text-[13.5px]"
              key={row.k}
            >
              <span className="text-text-faint">{row.k}</span>
              <span className="text-right text-foreground">{row.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
