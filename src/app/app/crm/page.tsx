"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Contact } from "@/lib/types";

export default function CrmPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  async function load() {
    setContacts(await (await fetch("/api/contacts")).json());
  }
  useEffect(() => { load(); }, []);
  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await fetch("/api/contacts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, company, value: 18000, stage: "lead" }) });
    setName(""); setEmail(""); setCompany("");
    await load();
  }
  const total = contacts.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/40">CRM database</p>
        <h1 className="mt-2 text-4xl font-semibold">Pipeline gravity</h1>
        <p className="mt-2 text-sm text-white/50">${total.toLocaleString()} across {contacts.length} accounts</p>
      </div>
      <form onSubmit={onSubmit} className="glass grid gap-3 rounded-3xl p-4 md:grid-cols-4">
        <input className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
        <button className="rounded-2xl bg-[#e7c592] px-4 py-3 text-sm text-black">Add account</button>
      </form>
      <div className="grid gap-3">
        {contacts.map((contact) => (
          <article key={contact.id} className="glass flex flex-wrap items-center justify-between gap-3 rounded-3xl p-5">
            <div>
              <p className="text-lg">{contact.name}</p>
              <p className="text-sm text-white/45">{contact.company} · {contact.email}</p>
            </div>
            <div className="text-right">
              <p className="text-[#e7c592]">${contact.value.toLocaleString()}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">{contact.stage}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
