function DevOpsCopilotArt() {
  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block size-full"
    >
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A1F24" />
          <stop offset="100%" stopColor="#243036" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#g1)" />
      <g stroke="#5C7686" strokeWidth="1" opacity="0.5">
        <path d="M40 60 L160 60 L160 120 L280 120" fill="none" />
        <path d="M40 160 L120 160 L120 100 L360 100" fill="none" />
        <circle cx="40" cy="60" r="4" fill="#8FB2A6" stroke="none" />
        <circle cx="280" cy="120" r="4" fill="#8FB2A6" stroke="none" />
        <circle cx="360" cy="100" r="4" fill="#8FB2A6" stroke="none" />
      </g>
      <text
        x="40"
        y="205"
        fill="#8FB2A6"
        fontFamily="var(--font-ibm-plex-mono), monospace"
        fontSize="13"
      >
        agent.route(task) →
      </text>
    </svg>
  );
}

function AuthApiArt() {
  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block size-full"
    >
      <defs>
        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A1F24" />
          <stop offset="100%" stopColor="#20302C" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#g2)" />
      <g opacity="0.6">
        <rect
          x="40"
          y="50"
          width="130"
          height="26"
          rx="3"
          fill="none"
          stroke="#5C7686"
        />
        <rect
          x="40"
          y="88"
          width="90"
          height="26"
          rx="3"
          fill="none"
          stroke="#5C7686"
        />
        <rect
          x="40"
          y="126"
          width="150"
          height="26"
          rx="3"
          fill="none"
          stroke="#8FB2A6"
        />
        <text
          x="52"
          y="67"
          fill="#8FB2A6"
          fontFamily="var(--font-ibm-plex-mono), monospace"
          fontSize="11"
        >
          POST /auth/login
        </text>
        <text
          x="52"
          y="105"
          fill="#909A9C"
          fontFamily="var(--font-ibm-plex-mono), monospace"
          fontSize="11"
        >
          GET /me
        </text>
        <text
          x="52"
          y="143"
          fill="#E3E6E6"
          fontFamily="var(--font-ibm-plex-mono), monospace"
          fontSize="11"
        >
          200 OK · token issued
        </text>
      </g>
    </svg>
  );
}

const PROJECTS = [
  {
    title: "DevOps Copilot Agent",
    desc: "A FastAPI-based agent with dynamic tool-calling — reads infra state, proposes fixes, and executes approved actions through a defined tool interface.",
    tags: ["FastAPI", "Tool-calling", "Docker"],
    href: "#",
    Art: DevOpsCopilotArt,
  },
  {
    title: "Auth-Ready API Starter",
    desc: "A backend boilerplate with JWT auth, SQLAlchemy models, and Redis-backed session/rate limiting — the scaffolding I reach for on every new API.",
    tags: ["FastAPI", "JWT", "PostgreSQL", "Redis"],
    href: "#",
    Art: AuthApiArt,
  },
] as const;

export function Projects() {
  return (
    <section className="py-[72px]" id="projects">
      <div className="mx-auto max-w-245 px-7">
        <p className="mb-[22px] flex items-center gap-2.5 text-xs tracking-[0.06em] text-slate-blue">
          <span className="inline-block h-px w-[18px] bg-slate-blue" />
          project
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <a
              className="block overflow-hidden rounded-sm border border-line bg-bg-raised text-inherit no-underline transition-[border-color,transform] duration-150 ease-in-out hover:-translate-y-0.5 hover:border-sage-dim"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              key={project.title}
            >
              <div className="block aspect-[5/3] w-full border-b border-line">
                <project.Art />
              </div>
              <div className="px-5 pb-5 pt-[18px]">
                <p className="mb-2 text-[15px] font-medium text-foreground">
                  {project.title}
                </p>
                <p className="mb-3.5 text-[13px] leading-[1.6] text-text-dim">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      className="rounded-[20px] border border-sage-dim px-2.5 py-[3px] text-[11px] text-sage"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
