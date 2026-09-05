"use client";

import { useEffect, useRef } from "react";

type Side = "A" | "B";

function StadiumLight({
  x,
  tilt,
  ladderSide,
}: {
  x: number;
  tilt: number;
  ladderSide: "left" | "right";
}) {
  const cols = 5;
  const rows = 4;
  const bulbR = 3.2;
  const gapX = 11;
  const gapY = 10;
  const gridW = (cols - 1) * gapX;
  const gridH = (rows - 1) * gapY;
  const frameW = gridW + 22;
  const frameH = gridH + 18;
  const ladderX = ladderSide === "right" ? 7 : -13;

  const bulbs = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const bx = -gridW / 2 + col * gapX;
      const by = -gridH / 2 + row * gapY;
      bulbs.push(
        <g key={`${row}-${col}`}>
          <circle cx={bx} cy={by} r={bulbR + 1.5} fill="url(#lampHalo)" />
          <circle cx={bx} cy={by} r={bulbR} fill="#FFF6E4" />
          <circle cx={bx} cy={by} r={1.2} fill="#FFFFFF" opacity="0.9" />
        </g>,
      );
    }
  }

  const rungs = [];
  for (let y = 78; y <= 230; y += 14) {
    rungs.push(<line key={y} x1={ladderX} y1={y} x2={ladderX + 6} y2={y} />);
  }

  return (
    <g transform={`translate(${x},0)`}>
      <ellipse
        cx="0"
        cy="72"
        rx="78"
        ry="48"
        fill="url(#bulb)"
        opacity="0.85"
      />
      <rect x="-48" y="55" width="96" height="150" fill="url(#glow)" />

      <rect x="-3.5" y="58" width="7" height="197" rx="1" fill="#2A3138" />
      <rect x="-5" y="248" width="10" height="7" rx="1" fill="#1B2126" />

      <g stroke="#3A444C" strokeWidth="1.1" fill="none" strokeLinecap="round">
        <line x1={ladderX} y1="72" x2={ladderX} y2="238" />
        <line x1={ladderX + 6} y1="72" x2={ladderX + 6} y2="238" />
        {rungs}
      </g>

      <g fill="none" stroke="#12161A" strokeWidth="5" strokeLinecap="round">
        <line x1="0" y1="250" x2="-30" y2="320" />
        <line x1="0" y1="250" x2="30" y2="320" />
        <line x1="0" y1="145" x2="-24" y2="250" />
        <line x1="0" y1="145" x2="24" y2="250" />
      </g>

      <g transform={`translate(0,48) rotate(${tilt})`}>
        <line
          x1={-frameW / 2 + 4}
          y1={-frameH / 2 - 2}
          x2={-frameW / 2 + 4}
          y2={-frameH / 2 - 18}
          stroke="#12161A"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1={frameW / 2 - 4}
          y1={-frameH / 2 - 2}
          x2={frameW / 2 - 4}
          y2={-frameH / 2 - 18}
          stroke="#12161A"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="0" cy={-frameH / 2 - 4} r="2" fill="#C45C5C" />

        <rect
          x={-frameW / 2}
          y={-frameH / 2}
          width={frameW}
          height={frameH}
          rx="2"
          fill="#12161A"
        />
        <rect
          x={-frameW / 2 + 3}
          y={-frameH / 2 + 3}
          width={frameW - 6}
          height={frameH - 6}
          rx="1"
          fill="#1A1F24"
        />

        <g>{bulbs}</g>
      </g>
    </g>
  );
}

export function PitchSvg() {
  const ballRef = useRef<SVGGElement>(null);
  const upperARef = useRef<SVGGElement>(null);
  const upperBRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const ballEl = ballRef.current;
    const upperA = upperARef.current;
    const upperB = upperBRef.current;
    if (!ballEl || !upperA || !upperB) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ball: SVGGElement = ballEl;
    const playerA: SVGGElement = upperA;
    const playerB: SVGGElement = upperB;

    const PLAYER_A_X = 480;
    const PLAYER_B_X = 720;
    const HEAD_Y = 200;
    const GROUND_Y = 255;
    const BALL_R = 14;
    const GROUND_TARGET_Y = GROUND_Y - BALL_R;
    const ARC_HEIGHT = 90;
    const TOTAL_PASSES = 9;
    const PASS_DURATION = 820;
    const FALL_DURATION = 620;
    const BOUNCE_DURATION = 320;
    const PAUSE_DURATION = 950;
    const RESET_DURATION = 520;

    function headX(side: Side) {
      return side === "A" ? PLAYER_A_X : PLAYER_B_X;
    }
    function other(side: Side): Side {
      return side === "A" ? "B" : "A";
    }
    function upperFor(side: Side) {
      return side === "A" ? playerA : playerB;
    }

    function bob(side: Side) {
      const el = upperFor(side);
      if (!el.animate) return;
      el.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(-9deg)", offset: 0.35 },
          { transform: "rotate(0deg)" },
        ],
        { duration: 300, easing: "ease-out" },
      );
    }

    function setBall(x: number, y: number) {
      ball.setAttribute(
        "transform",
        `translate(${x.toFixed(1)},${y.toFixed(1)})`,
      );
    }

    let phase: "passing" | "falling" | "bounce" | "pause" | "reset" = "passing";
    let phaseStart: number | null = null;
    let passIndex = 0;
    let fromSide: Side = "A";
    let restSide: Side = "A";
    let landX = PLAYER_A_X;
    let rafId = 0;

    bob("A");

    function frame(now: number) {
      if (phaseStart === null) phaseStart = now;
      const elapsed = now - phaseStart;

      if (phase === "passing") {
        const t = Math.min(elapsed / PASS_DURATION, 1);
        const xs = headX(fromSide);
        const xe = headX(other(fromSide));
        const x = xs + (xe - xs) * t;
        const y = HEAD_Y - ARC_HEIGHT * 4 * t * (1 - t);
        setBall(x, y);
        if (t >= 1) {
          const arriving = other(fromSide);
          passIndex++;
          if (passIndex >= TOTAL_PASSES) {
            phase = "falling";
            phaseStart = now;
            restSide = arriving;
          } else {
            bob(arriving);
            fromSide = arriving;
            phaseStart = now;
          }
        }
      } else if (phase === "falling") {
        const t2 = Math.min(elapsed / FALL_DURATION, 1);
        const xs2 = headX(restSide);
        const xe2 = xs2 + (restSide === "A" ? 22 : -22);
        const x2 = xs2 + (xe2 - xs2) * t2;
        const y2 = HEAD_Y + (GROUND_TARGET_Y - HEAD_Y) * t2 * t2;
        setBall(x2, y2);
        if (t2 >= 1) {
          landX = x2;
          phase = "bounce";
          phaseStart = now;
        }
      } else if (phase === "bounce") {
        const t3 = Math.min(elapsed / BOUNCE_DURATION, 1);
        const hop = 28 * 4 * t3 * (1 - t3);
        setBall(landX, GROUND_TARGET_Y - hop);
        if (t3 >= 1) {
          phase = "pause";
          phaseStart = now;
        }
      } else if (phase === "pause") {
        setBall(landX, GROUND_TARGET_Y);
        if (elapsed >= PAUSE_DURATION) {
          phase = "reset";
          phaseStart = now;
        }
      } else if (phase === "reset") {
        const t4 = Math.min(elapsed / RESET_DURATION, 1);
        const xe4 = headX(restSide);
        const x4 = landX + (xe4 - landX) * t4;
        const y4 =
          GROUND_TARGET_Y +
          (HEAD_Y - GROUND_TARGET_Y) * t4 -
          40 * 4 * t4 * (1 - t4);
        setBall(x4, y4);
        if (t4 >= 1) {
          fromSide = restSide;
          passIndex = 0;
          phase = "passing";
          phaseStart = now;
          bob(restSide);
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <svg
      id="pitch-svg"
      viewBox="0 0 1200 320"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block aspect-[1200/320] h-auto w-full shrink-0"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#171B1F" />
          <stop offset="55%" stopColor="#1E262B" />
          <stop offset="100%" stopColor="#2E332F" />
        </linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8D4B0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#E8D4B0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="bulb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF1D6" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#E8D4B0" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#E8D4B0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lampHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF8EC" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFF8EC" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="320" fill="url(#sky)" />

      <g fill="#8FB2A6" opacity="0.5">
        <circle cx="350" cy="35" r="1.4" />
        <circle cx="440" cy="62" r="1.2" />
        <circle cx="520" cy="28" r="1.3" />
        <circle cx="670" cy="48" r="1.2" />
        <circle cx="750" cy="24" r="1.4" />
        <circle cx="600" cy="78" r="1.1" />
      </g>

      <g transform="translate(600,42)" opacity="0.8">
        <circle cx="0" cy="0" r="16" fill="#E3E6E6" />
        <circle cx="6" cy="-5" r="14" fill="#171B1F" />
      </g>

      <StadiumLight x={78} tilt={-7} ladderSide="right" />
      <StadiumLight x={1122} tilt={7} ladderSide="left" />

      <rect x="0" y="255" width="1200" height="65" fill="#151C18" />
      <line
        x1="600"
        y1="255"
        x2="600"
        y2="320"
        stroke="#8FB2A6"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <ellipse
        cx="600"
        cy="285"
        rx="52"
        ry="14"
        fill="none"
        stroke="#8FB2A6"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <rect
        x="150"
        y="238"
        width="140"
        height="18"
        fill="none"
        stroke="#8FB2A6"
        strokeWidth="1.2"
        opacity="0.28"
      />
      <rect
        x="910"
        y="238"
        width="140"
        height="18"
        fill="none"
        stroke="#8FB2A6"
        strokeWidth="1.2"
        opacity="0.28"
      />

      <g fill="none" stroke="#A7C2B8" strokeWidth="2" opacity="0.6">
        <path d="M225,255 L225,185 L290,185 L290,255" />
        <path d="M225,185 L206,210 L206,255" />
        <path d="M290,185 L309,210 L309,255" />
        <path d="M910,255 L910,185 L975,185 L975,255" />
        <path d="M910,185 L891,210 L891,255" />
        <path d="M975,185 L994,210 L994,255" />
      </g>

      <g id="playerA" transform="translate(480,0)">
        <path
          d="M-9,228 L-13,255 M9,228 L13,255"
          stroke="#12161A"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <g className="upper-body" ref={upperARef}>
          <path
            d="M-8,214 L-22,204 M8,214 L22,204"
            stroke="#1B2126"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <rect
            x="-8"
            y="210"
            width="16"
            height="22"
            rx="5"
            fill="#1B2126"
            stroke="#8FB2A6"
            strokeWidth="1.2"
            opacity="0.95"
          />
          <circle
            cx="0"
            cy="200"
            r="11"
            fill="#1B2126"
            stroke="#8FB2A6"
            strokeWidth="1.2"
          />
        </g>
      </g>

      <g id="playerB" transform="translate(720,0)">
        <path
          d="M-9,228 L-13,255 M9,228 L13,255"
          stroke="#12161A"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <g className="upper-body" ref={upperBRef}>
          <path
            d="M-8,214 L-22,204 M8,214 L22,204"
            stroke="#1B2126"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <rect
            x="-8"
            y="210"
            width="16"
            height="22"
            rx="5"
            fill="#1B2126"
            stroke="#8FB2A6"
            strokeWidth="1.2"
            opacity="0.95"
          />
          <circle
            cx="0"
            cy="200"
            r="11"
            fill="#1B2126"
            stroke="#8FB2A6"
            strokeWidth="1.2"
          />
        </g>
      </g>

      <g id="ball" ref={ballRef} transform="translate(480,200)">
        <circle r="14" fill="#1B2126" stroke="#8FB2A6" strokeWidth="1.5" />
        <polygon
          points="0,-6 6,-1.5 3.5,5 -3.5,5 -6,-1.5"
          fill="#8FB2A6"
          opacity="0.9"
        />
        <g stroke="#8FB2A6" strokeWidth="1" opacity="0.6" fill="none">
          <path d="M0,-6 L0,-13" />
          <path d="M6,-1.5 L12,-4" />
          <path d="M3.5,5 L8,11" />
          <path d="M-3.5,5 L-8,11" />
          <path d="M-6,-1.5 L-12,-4" />
        </g>
      </g>
    </svg>
  );
}
