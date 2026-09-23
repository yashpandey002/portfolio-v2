"use client";

import { useEffect, useRef } from "react";

type Contact = "left" | "right" | "head";

const SEQUENCE: Contact[] = [
  "left",
  "right",
  "left",
  "head",
  "right",
  "left",
  "right",
  "head",
];

export function JuggleSvg() {
  const ballRef = useRef<SVGGElement>(null);
  const leftLegRef = useRef<SVGGElement>(null);
  const rightLegRef = useRef<SVGGElement>(null);
  const upperRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const ball = ballRef.current;
    const leftLeg = leftLegRef.current;
    const rightLeg = rightLegRef.current;
    const upper = upperRef.current;
    if (!ball || !leftLeg || !rightLeg || !upper) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const LEFT = { x: 142, y: 229 };
    const RIGHT = { x: 178, y: 229 };
    const HEAD = { x: 160, y: 154 };
    const ARC = 48;
    const HOP_DURATION = 520;
    const PAUSE = 80;

    function point(c: Contact) {
      if (c === "left") return LEFT;
      if (c === "right") return RIGHT;
      return HEAD;
    }

    function kick(c: Contact) {
      const el = c === "left" ? leftLeg : c === "right" ? rightLeg : upper;
      if (!el || !el.animate) return;
      const deg = c === "left" ? 18 : c === "right" ? -18 : -10;
      el.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: `rotate(${deg}deg)`, offset: 0.35 },
          { transform: "rotate(0deg)" },
        ],
        { duration: 280, easing: "ease-out" },
      );
    }

    function setBall(x: number, y: number) {
      if (!ball) return;
      ball.setAttribute(
        "transform",
        `translate(${x.toFixed(1)},${y.toFixed(1)})`,
      );
    }

    let index = 0;
    let phaseStart: number | null = null;
    let rafId = 0;
    let from = SEQUENCE[0];
    let to = SEQUENCE[1];
    kick(from);
    setBall(point(from).x, point(from).y);

    function frame(now: number) {
      if (phaseStart === null) phaseStart = now;
      const elapsed = now - phaseStart;

      if (elapsed < PAUSE) {
        const p = point(from);
        setBall(p.x, p.y);
      } else {
        const t = Math.min((elapsed - PAUSE) / HOP_DURATION, 1);
        const a = point(from);
        const b = point(to);
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t - ARC * 4 * t * (1 - t);
        setBall(x, y);

        if (t >= 1) {
          kick(to);
          index = (index + 1) % SEQUENCE.length;
          from = to;
          to = SEQUENCE[(index + 1) % SEQUENCE.length];
          phaseStart = now;
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <svg
      aria-hidden="true"
      className="block aspect-320/280 h-auto w-full max-w-70 shrink-0"
      id="juggle-svg"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 320 280"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="juggle-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#171B1F" />
          <stop offset="60%" stopColor="#1E262B" />
          <stop offset="100%" stopColor="#2E332F" />
        </linearGradient>
      </defs>

      <rect fill="url(#juggle-sky)" height="280" width="320" />

      <g fill="#8FB2A6" opacity="0.45">
        <circle cx="48" cy="32" r="1.3" />
        <circle cx="92" cy="58" r="1.1" />
        <circle cx="230" cy="28" r="1.2" />
        <circle cx="270" cy="52" r="1.1" />
        <circle cx="160" cy="42" r="1.0" />
      </g>

      <rect fill="#151C18" height="40" width="320" y="240" />
      <ellipse
        cx="160"
        cy="248"
        fill="none"
        opacity="0.3"
        rx="48"
        ry="10"
        stroke="#8FB2A6"
        strokeWidth="1.2"
      />

      <g id="juggle-player" transform="translate(160,0)">
        <g className="leg-left" ref={leftLegRef}>
          <path
            d="M-8,200 L-18,240"
            stroke="#12161A"
            strokeLinecap="round"
            strokeWidth="7"
          />
        </g>
        <g className="leg-right" ref={rightLegRef}>
          <path
            d="M8,200 L18,240"
            stroke="#12161A"
            strokeLinecap="round"
            strokeWidth="7"
          />
        </g>

        <g className="upper-body" ref={upperRef}>
          <path
            d="M-8,186 L-22,176 M8,186 L22,176"
            stroke="#1B2126"
            strokeLinecap="round"
            strokeWidth="5.5"
          />
          <rect
            fill="#1B2126"
            height="24"
            opacity="0.95"
            rx="5"
            stroke="#8FB2A6"
            strokeWidth="1.2"
            width="16"
            x="-8"
            y="182"
          />
          <circle
            cx="0"
            cy="168"
            fill="#1B2126"
            r="12"
            stroke="#8FB2A6"
            strokeWidth="1.2"
          />
        </g>
      </g>

      <g id="juggle-ball" ref={ballRef} transform="translate(142,229)">
        <circle fill="#1B2126" r="11" stroke="#8FB2A6" strokeWidth="1.4" />
        <polygon
          fill="#8FB2A6"
          opacity="0.9"
          points="0,-5 4.8,-1.2 2.8,4 -2.8,4 -4.8,-1.2"
        />
        <g fill="none" opacity="0.6" stroke="#8FB2A6" strokeWidth="0.9">
          <path d="M0,-5 L0,-10" />
          <path d="M4.8,-1.2 L9.5,-3.2" />
          <path d="M2.8,4 L6.5,8.5" />
          <path d="M-2.8,4 L-6.5,8.5" />
          <path d="M-4.8,-1.2 L-9.5,-3.2" />
        </g>
      </g>
    </svg>
  );
}
