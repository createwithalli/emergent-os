import { HoverStage } from "@/components/HoverStage";
import { OrbCanvas } from "@/components/OrbCanvas";
import { SplineSlot } from "@/components/SplineSlot";
import { WebGpuBadge } from "@/components/WebGpuBadge";

export default function StudioPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">3D studio</p>
          <h1 className="mt-2 text-4xl font-semibold">Hover, orbit, emerge</h1>
        </div>
        <WebGpuBadge />
      </div>
      <div className="glass h-[360px] overflow-hidden rounded-[28px]"><OrbCanvas /></div>
      <div className="grid gap-5 md:grid-cols-3">
        <HoverStage title="Glass shard" kicker="Hover" body="Perspective tilt with a moving specular well." accent="#e7c592" />
        <HoverStage title="Aurora plate" kicker="Hover" body="Cyan wash that follows the pointer like a follow-spot." accent="#7ee0ff" />
        <HoverStage title="Signal core" kicker="Hover" body="Violet core for encrypted states and chain alerts." accent="#b59cff" />
      </div>
      <SplineSlot />
    </div>
  );
}
