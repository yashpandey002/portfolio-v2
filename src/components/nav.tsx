"use client";

import Link from "next/link";
import { useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { SocialLinks } from "./social-links";

const links = [
  { href: "#experience", label: "Experience" },
  // { href: "#projects", label: "project" },
  { href: "#about", label: "About Me" },
  { href: "#contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-line">
      <div className="mx-auto flex max-w-245 items-center justify-between px-7 py-5.5">
        <Link href="/">
          <div className="font-medium tracking-[0.04em] text-text-dim hover:text-sage transition-all duration-150">
            YP()
          </div>
        </Link>

        <div className="flex items-center gap-3.5 sm:gap-5">
          <div className="hidden items-center gap-6 text-[13px] text-text-dim md:flex">
            {links.map(({ href, label }) => (
              <a
                key={label}
                className="no-underline transition-colors duration-150 hover:text-sage"
                href={href}
              >
                {label}
              </a>
            ))}
          </div>
          <div>
            <SocialLinks
              className="sm:ml-1 sm:border-l sm:border-line sm:pl-5"
              iconSize={18}
            />
          </div>

          <a
            className="rounded-sm border border-sage bg-sage px-3.5 py-1.5 text-[12.5px] text-background no-underline transition-[border-color,background-color] duration-150 ease-in-out hover:border-sage-hover hover:bg-sage-hover hidden"
            href="/resume.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            Resume
          </a>

          <button
            aria-controls="mobile-nav"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center text-text-dim transition-colors duration-150 hover:text-sage md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            type="button"
          >
            {open ? <LuX size={20} /> : <LuMenu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`border-t border-line md:hidden ${open ? "block" : "hidden"}`}
        id="mobile-nav"
      >
        <div className="mx-auto flex max-w-245 flex-col gap-1 px-7 py-3">
          {links.map(({ href, label }) => (
            <a
              key={label}
              className="py-2.5 text-[13px] text-text-dim no-underline transition-colors duration-150 hover:text-sage"
              href={href}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
