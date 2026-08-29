import Link from "next/link";
import { HoverStage } from "@/components/HoverStage";
import { OrbCanvas } from "@/components/OrbCanvas";
import { ParticleField } from "@/components/ParticleField";
import { WebGpuBadge } from "@/components/WebGpuBadge";

const modules = [
  { title: "CRM orbit", kicker: "Pipeline", body: "Accounts, stages, and deal gravity in a glass board that tilts with the cursor.", accent: "#e7c592" },
  { title: "Time lattice", kicker: "Calendar", body: "A week of calls, demos, and chain audits arranged like a film slate.", accent: "#7ee0ff" },
  { title: "Sealed channel", kicker: "Messenger", body: "AES-GCM in the browser. Ciphertext hits the API. The passphrase never does.", accent: "#b59cff" },
  { title: "Chain gate", kicker: "Web3", body: "Wallet session, network badge, and a signature ritual without locking you to one kit.", accent: "#ff8aa8" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="grain" />
      <div className="aurora" />
      <ParticleField />
      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-8">
        <header className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.34em] text-[#e7c592]">Emergent OS</p>
          <div className="flex items-center gap-3">
            <WebGpuBadge />
            <Link href="/app" className="rounded-full bg-white px-4 py-2 text-sm text-black">Enter deck</Link>
          </div>
        </header>
        <section className="mt-16 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-white/45">Cinematic SaaS template</p>
            <h1 className="gold-text mt-4 max-w-xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">A command surface that feels directed, not designed.</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/60">Front and back end in one Next.js codebase. JSON CRM database, calendar API, encrypted messenger, Web3 session, and a 3D hover studio ready for Spline, Framer motion, and WebGPU.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/app" className="rounded-full bg-[#e7c592] px-5 py-3 text-sm text-black">Launch command deck</Link>
              <Link href="/app/studio" className="rounded-full border border-white/15 px-5 py-3 text-sm text-white/80">Open 3D studio</Link>
            </div>
          </div>
          <div className="glass relative h-[420px] overflow-hidden rounded-[32px]">
            <div className="scanline" />
            <OrbCanvas />
          </div>
        </section>
        <section className="mt-20 grid gap-5 md:grid-cols-2">
          {modules.map((item) => <HoverStage key={item.title} {...item} />)}
        </section>
      </div>
    </div>
  );
}
