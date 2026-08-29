"use client";

import { useEffect, useState } from "react";

export function WebGpuBadge() {
  const [label, setLabel] = useState("Detecting renderer");
  useEffect(() => {
    const gpu = (navigator as Navigator & { gpu?: unknown }).gpu;
    setLabel(gpu ? "WebGPU ready" : "WebGL fallback");
  }, []);
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/60">
      {label}
    </span>
  );
}
