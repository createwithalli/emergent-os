"use client";

import { useEffect, useRef } from "react";

export function OrbCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let t = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    const draw = () => {
      t += 0.012;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.52;
      const cy = h * 0.48;
      for (let i = 0; i < 14; i += 1) {
        const p = i / 14;
        const radius = Math.min(w, h) * (0.12 + p * 0.28);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${p > 0.6 ? "126,224,255" : "231,197,146"}, ${0.12 + p * 0.28})`;
        ctx.lineWidth = 1.2 * devicePixelRatio;
        ctx.ellipse(cx, cy, radius * (1 + Math.sin(t + i) * 0.04), radius * 0.38, t * 0.4 + i * 0.18, 0, Math.PI * 2);
        ctx.stroke();
      }
      const g = ctx.createRadialGradient(cx, cy, 8, cx, cy, Math.min(w, h) * 0.22);
      g.addColorStop(0, "rgba(255,246,228,0.95)");
      g.addColorStop(0.35, "rgba(181,156,255,0.55)");
      g.addColorStop(1, "rgba(5,6,10,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.16, 0, Math.PI * 2);
      ctx.fill();
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="h-full w-full" />;
}
