"use client";

import { useState } from "react";
import { LuMail } from "react-icons/lu";
import { JuggleSvg } from "./juggle-svg";

const EMAIL = "pandeyyash002@gmail.com";
const twitterHref = "https://x.com/pandeyyash_";
const linkedinHref = "https://www.linkedin.com/in/pandeyyash";

function EmailCopyButton() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group relative inline-flex">
      <span
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2.5 -translate-x-1/2 whitespace-nowrap rounded-sm bg-foreground px-2.5 py-1.5 text-[11px] text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        role="tooltip"
      >
        {copied ? "Copied!" : "Click to copy"}
        <span
          aria-hidden
          className="absolute top-full left-1/2 -mt-px -translate-x-1/2 border-4 border-transparent border-t-foreground"
        />
      </span>
      <button
        aria-label={`Copy ${EMAIL} to clipboard`}
        className="inline-flex cursor-pointer items-center gap-3 rounded-sm border border-line px-3.5 py-2.5 text-[13px] text-text-dim transition-[border-color,color] duration-150 hover:border-text-faint hover:text-foreground"
        onClick={copyEmail}
        type="button"
      >
        <LuMail size={15} strokeWidth={1.75} />
        <span className="h-4 w-px bg-line" />
        <span>{EMAIL}</span>
      </button>
    </div>
  );
}

export function Contact() {
  return (
    <section className="py-14 sm:py-28" id="contact">
      <div className="mx-auto max-w-245 px-7">
        <div className="rounded-sm border border-line">
          <div className="flex flex-col items-start gap-10 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
            <div className="max-w-125">
              <h2 className="mb-3.5 font-sans text-[28px] font-medium leading-[1.2] tracking-[-0.01em] text-foreground sm:text-[34px]">
                Let&apos;s Be In Touch
              </h2>
              <p className="mb-7 text-[15px] leading-[1.85] text-text-dim">
                Feel free to reach out to me via{" "}
                <a
                  className="font-medium text-foreground underline decoration-line underline-offset-3 transition-colors duration-150 hover:text-sage hover:decoration-sage"
                  href={twitterHref}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Twitter
                </a>{" "}
                or{" "}
                <a
                  className="font-medium text-foreground underline decoration-line underline-offset-3 transition-colors duration-150 hover:text-sage hover:decoration-sage"
                  href={linkedinHref}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>{" "}
                if you have a question, or just want to say hi!
              </p>
              <EmailCopyButton />
            </div>

            <div className="hidden w-full overflow-hidden rounded-[14px] bg-bg-raised lg:block lg:w-auto lg:min-w-70">
              <JuggleSvg />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
