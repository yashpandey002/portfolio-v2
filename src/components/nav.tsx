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
    <>
      <nav className="sticky top-0 z-50 border-b border-line bg-background">
        <div className="mx-auto flex max-w-245 items-center justify-between px-7 py-5.5">
          <Link href="/">
            <div className="text-[17px] font-medium tracking-[0.04em] text-text-dim transition-all duration-150 hover:text-sage md:text-base">
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
            <div className="hidden md:block">
              <SocialLinks
                className="sm:ml-1 sm:border-l sm:border-line sm:pl-5"
                iconSize={18}
              />
            </div>

            <a
              className="hidden rounded-sm border border-sage bg-sage px-3.5 py-1.5 text-[12.5px] text-background no-underline transition-[border-color,background-color] duration-150 ease-in-out hover:border-sage-hover hover:bg-sage-hover"
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
              {open ? <LuX size={24} /> : <LuMenu size={24} />}
            </button>
          </div>
        </div>

        <div
          className={`absolute right-4 top-full z-50 mt-2 w-48 rounded-xl border border-line bg-bg-raised md:hidden ${open ? "block" : "hidden"}`}
          id="mobile-nav"
        >
          <div className="flex flex-col px-4 py-3">
            {links.map(({ href, label }) => (
              <a
                key={label}
                className="py-2.5 text-[13px] text-foreground no-underline transition-colors duration-150 hover:text-sage"
                href={href}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="border-t border-line px-4 py-3">
            <SocialLinks iconSize={16} />
          </div>
        </div>
      </nav>

      {open ? (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
          type="button"
        />
      ) : null}
    </>
  );
}
