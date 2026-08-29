"use client";

import { FormEvent, useEffect, useState } from "react";
import { seal, unseal } from "@/lib/client-crypto";
import type { Message } from "@/lib/types";

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [passphrase, setPassphrase] = useState("emergent-demo-key");
  const [lock, setLock] = useState(true);
  const [opened, setOpened] = useState<Record<string, string>>({});
  async function load() { setMessages(await (await fetch("/api/messages")).json()); }
  useEffect(() => { load(); }, []);
  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (lock) {
      const sealed = await seal(draft, passphrase);
      await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...sealed, encrypted: true, from: "You", thread: "ops" }) });
    } else {
      await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body: draft, encrypted: false, from: "You", thread: "ops" }) });
    }
    setDraft("");
    await load();
  }
  async function openMessage(message: Message) {
    if (!message.encrypted || !message.cipher || !message.iv) return;
    try {
      setOpened((prev) => ({ ...prev, [message.id]: await unseal(message.cipher!, message.iv!, passphrase) }));
    } catch {
      setOpened((prev) => ({ ...prev, [message.id]: "Cannot unseal with this passphrase." }));
    }
  }
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/40">Encrypted messenger</p>
        <h1 className="mt-2 text-4xl font-semibold">Sealed channel</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/50">Encryption happens in the browser with Web Crypto AES-GCM. The API stores ciphertext and IV only.</p>
      </div>
      <div className="glass space-y-4 rounded-[28px] p-5">
        {messages.map((message) => (
          <div key={message.id} className={`max-w-xl rounded-3xl px-4 py-3 ${message.from === "You" ? "ml-auto bg-[#e7c592]/15" : "bg-white/5"}`}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">{message.from} · {message.at}</p>
            {message.encrypted ? (
              <div className="mt-2">
                <p className="break-all font-mono text-xs text-[#b59cff]">{opened[message.id] ?? message.cipher}</p>
                <button className="mt-2 text-xs text-white/60 underline" onClick={() => openMessage(message)}>Unseal locally</button>
              </div>
            ) : (
              <p className="mt-2 text-sm">{message.body}</p>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="glass space-y-3 rounded-3xl p-4">
        <textarea className="h-24 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a sealed note" required />
        <div className="flex flex-wrap items-center gap-3">
          <input className="rounded-2xl border border-white/10 bg-black/30 px-4 py-2 text-sm" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} />
          <label className="text-sm text-white/60"><input type="checkbox" checked={lock} onChange={(e) => setLock(e.target.checked)} className="mr-2" />Seal before send</label>
          <button className="rounded-full bg-[#b59cff] px-4 py-2 text-sm text-black">Transmit</button>
        </div>
      </form>
    </div>
  );
}
