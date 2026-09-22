"use client";

import { useState } from "react";

export function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-18" id="about">
      <div className="mx-auto max-w-245 px-7">
        <p className="mb-5.5 flex items-center gap-2.5 text-xs tracking-[0.06em] text-slate-blue">
          <span className="inline-block h-px w-4.5 bg-slate-blue" />
          about me
        </p>
        <div className="relative">
          <div
            className={`text-[15px] leading-[1.85] text-text-dim [&_p]:mb-4.5 [&_p]:last:mb-0 ${
              expanded ? "" : "max-md:max-h-100 max-md:overflow-hidden"
            }`}
          >
            <p>
              Hey, I&apos;m Yash, a software developer based in Bengaluru, India.
            </p>
            <p>
              I love solving real-world problems, or at least trying to. I’ve
              always been curious about why things work the way they do and loved
              going down the rabbit hole. I think that is what eventually pulled
              me toward computer science.
            </p>
            <p>
              One of the first programs I built was a simple marks calculator for
              my mom, who used to manually calculate and maintain her students’
              marks on paper. I wrote a small Python program in a Jupyter Notebook
              to keep track of the marks and calculate the totals, and it made me
              realize for the first time how programming could be a tool to solve
              real problems.
            </p>
            <p>
              Since then, I’ve been learning and working continuously, trying to
              understand what happens beneath the abstractions—from building web
              applications to learning more about systems and the fundamentals of
              computer science.
            </p>
          </div>
          {!expanded && (
            <div className="absolute inset-x-0 bottom-0 flex justify-center md:hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-22 bg-linear-to-t from-background from-35% to-transparent"
              />
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="relative rounded-full border border-line bg-bg-raised px-4 py-1.5 text-[13px] text-foreground"
              >
                Read more
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
