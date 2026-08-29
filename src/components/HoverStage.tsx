"use client";

import { useRef } from "react";

type Props = { title: string; kicker?: string; body: string; accent?: string };

export function HoverStage({ title, kicker, body, accent = "#7ee0ff" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    node.style.transform = `perspective(1100px) rotateX(${(0.5 - y) * 14}deg) rotateY(${(x - 0.5) * 18}deg) translateZ(18px)`;
    node.style.setProperty("--mx", `${x * 100}%`);
    node.style.setProperty("--my", `${y * 100}%`);
  }
  function onLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="group relative overflow-hidden rounded-3xl p-6" style={{ transformStyle: "preserve-3d", transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)", background: "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${accent}33, transparent 42%)` }} />
      <div className="relative" style={{ transform: "translateZ(40px)" }}>
        {kicker ? <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-white/45">{kicker}</p> : null}
        <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">{body}</p>
        <div className="mt-6 h-24 rounded-2xl" style={{ background: `linear-gradient(135deg, ${accent}22, transparent 55%), radial-gradient(circle at 70% 40%, ${accent}55, transparent 46%)` }} />
      </div>
    </div>
  );
}
