"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const LEAD = "Custom African fashion:";
const BODY =
  "Garments, bags, and adornments shaped by artisan hands and your exact measurements, bespoke & tailored to your story.";

function typingDelay(char: string | undefined, fast = false): number {
  if (!char) return 40;
  if (char === ":") return 320;
  if (char === ",") return 200;
  if (char === "&") return 140;
  if (char === ".") return 260;
  if (fast) return 38 + Math.floor(Math.random() * 22);
  return 24 + Math.floor(Math.random() * 20);
}

export function HeroContent() {
  const [leadText, setLeadText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [phase, setPhase] = useState<"lead" | "body" | "done">("lead");
  const [showCursor, setShowCursor] = useState(true);
  const [ctaVisible, setCtaVisible] = useState(false);
  const started = useRef(false);

  const finish = useCallback(() => {
    setPhase("done");
    setLeadText(LEAD);
    setBodyText(BODY);
    window.setTimeout(() => setCtaVisible(true), 400);
  }, []);

  useEffect(() => {
    const blink = window.setInterval(() => {
      setShowCursor((visible) => !visible);
    }, 520);
    return () => window.clearInterval(blink);
  }, []);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      finish();
      setCtaVisible(true);
      return;
    }

    let leadIndex = 0;

    function typeLead() {
      if (leadIndex <= LEAD.length) {
        setLeadText(LEAD.slice(0, leadIndex));
        const char = LEAD[leadIndex - 1];
        leadIndex += 1;
        window.setTimeout(typeLead, typingDelay(char, true));
      } else {
        window.setTimeout(() => {
          setPhase("body");
          typeBody();
        }, 480);
      }
    }

    let bodyIndex = 0;

    function typeBody() {
      if (bodyIndex <= BODY.length) {
        setBodyText(BODY.slice(0, bodyIndex));
        const char = BODY[bodyIndex - 1];
        bodyIndex += 1;
        window.setTimeout(typeBody, typingDelay(char));
      } else {
        finish();
      }
    }

    typeLead();
  }, [finish]);

  const cursor = (
    <span
      aria-hidden
      className={`ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] bg-nyuzi-gold shadow-[0_0_12px_rgba(212,168,83,0.65)] transition-opacity duration-100 ${
        showCursor ? "opacity-100" : "opacity-0"
      }`}
    />
  );

  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24 lg:px-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-nyuzi-cream/70">
        Chapter I · Nyuzi
      </p>

      <h1 className="font-[family-name:var(--font-fraunces)] mt-6 max-w-5xl text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-nyuzi-cream">
        <span
          className={`relative inline-block transition-colors duration-500 ${
            phase !== "lead" ? "text-nyuzi-gold" : ""
          }`}
        >
          {leadText}
          {phase === "lead" && cursor}
          {phase !== "lead" && (
            <span
              className="absolute -bottom-1 left-0 h-0.5 bg-nyuzi-gold/70 transition-all duration-700"
              style={{ width: phase === "done" ? "100%" : "85%" }}
            />
          )}
        </span>
        <span className="mt-4 block max-w-4xl text-[clamp(1.35rem,3.8vw,2.75rem)] font-normal leading-snug text-nyuzi-cream/95">
          {bodyText}
          {(phase === "body" || phase === "done") && cursor}
        </span>
      </h1>

      <Link
        href="#shop"
        className={`mt-10 inline-flex items-center justify-center bg-nyuzi-ink px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-nyuzi-cream transition-all duration-700 hover:bg-nyuzi-ink/90 hover:shadow-[0_0_28px_rgba(212,168,83,0.35)] ${
          ctaVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        Sculpt My Silhouette
      </Link>

      <p
        className={`mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-nyuzi-cream/50 transition-all duration-700 delay-200 ${
          ctaVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {phase === "done" ? "Your story · Your fit · Your cloth" : "Composing your fit…"}
      </p>
    </div>
  );
}
