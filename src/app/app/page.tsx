import Link from "next/link";
import { HoverStage } from "@/components/HoverStage";
import { OrbCanvas } from "@/components/OrbCanvas";

export default function DeckPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">Command deck</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Saturday orbit</h1>
        </div>
        <p className="text-sm text-white/45">Four modules. One cinematic operating surface.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          <HoverStage title="Pipeline heat" kicker="CRM" body="$502k live across four accounts. Negotiation is the loudest node." accent="#e7c592" />
          <HoverStage title="Next slate" kicker="Calendar" body="Demo Monday. Wallet audit Tuesday. Close call Wednesday." accent="#7ee0ff" />
          <HoverStage title="Sealed ops" kicker="Inbox" body="Messages can leave the browser as AES-GCM only." accent="#b59cff" />
          <HoverStage title="Chain posture" kicker="Web3" body="Connect injected wallets or mint a local session for demos." accent="#ff8aa8" />
        </div>
        <div className="glass h-[420px] overflow-hidden rounded-[28px]">
          <OrbCanvas />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        <Link className="rounded-full bg-white px-4 py-2 text-black" href="/app/crm">Open CRM</Link>
        <Link className="rounded-full border border-white/15 px-4 py-2" href="/app/inbox">Open sealed inbox</Link>
      </div>
    </div>
  );
}
