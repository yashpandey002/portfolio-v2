const ENTRIES = [
  {
    org: "Dhimath",
    role: "Fullstack Developer Intern",
    ts: "March 2024 — August 2024",
  },
  {
    org: "Upwork",
    role: "Fullstack Developer (Freelance)",
    ts: "Sep 2024 — Nov 2024",
  },
  {
    org: "Snowmountain AI",
    role: "Fullstack Developer",
    ts: "March 2025 — Present",
  },
] as const;

export function Work() {
  return (
    <section className="py-[72px]" id="experience">
      <div className="mx-auto max-w-245 px-7">
        <p className="mb-[22px] flex items-center gap-2.5 text-xs tracking-[0.06em] text-slate-blue">
          <span className="inline-block h-px w-[18px] bg-slate-blue" />
          experience
        </p>
        {ENTRIES.map((entry) => (
          <div
            className="grid grid-cols-1 gap-1.5 border-b border-line py-[18px] last:border-b-0 sm:grid-cols-[200px_1fr] sm:gap-5"
            key={entry.org}
          >
            <div className="pt-[3px] text-xs text-text-faint">{entry.ts}</div>
            <div>
              <p className="mb-1 text-[14.5px] text-foreground">{entry.org}</p>
              <p className="m-0 text-[13px] text-text-dim">{entry.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
