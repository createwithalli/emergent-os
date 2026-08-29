"use client";

import { useState } from "react";
import { OrbCanvas } from "./OrbCanvas";

export function SplineSlot({ scene = "" }: { scene?: string }) {
  const [url, setUrl] = useState(scene);
  return (
    <div className="glass overflow-hidden rounded-[28px]">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">Spline / WebGPU slot</p>
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste a public Spline scene URL" className="w-full max-w-md rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/70" />
      </div>
      {url ? <iframe title="Spline scene" src={url} className="h-[420px] w-full border-0 bg-black" allow="autoplay" /> : <div className="h-[320px]"><OrbCanvas /></div>}
      <p className="px-5 py-3 text-xs text-white/40">Export a scene from spline.design as a public viewer URL and paste it here.</p>
    </div>
  );
}
