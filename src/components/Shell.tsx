"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/app", label: "Deck" },
  { href: "/app/crm", label: "CRM" },
  { href: "/app/calendar", label: "Calendar" },
  { href: "/app/inbox", label: "Sealed inbox" },
  { href: "/app/web3", label: "Web3" },
  { href: "/app/studio", label: "3D studio" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="min-h-screen bg-[#05060a] text-[#f4f1ea]">
      <div className="grain" />
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-white/8 p-6 lg:border-b-0 lg:border-r">
          <Link href="/" className="block text-sm uppercase tracking-[0.32em] text-[#e7c592]">Emergent OS</Link>
          <p className="mt-3 text-xs leading-5 text-white/40">Cinematic command surface for pipeline, time, sealed chat, and chain.</p>
          <nav className="mt-8 grid gap-1">
            {links.map((link) => {
              const active = path === link.href;
              return (
                <Link key={link.href} href={link.href} className={`rounded-2xl px-4 py-3 text-sm transition ${active ? "bg-white/10 text-white" : "text-white/55 hover:bg-white/5 hover:text-white"}`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="relative p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
