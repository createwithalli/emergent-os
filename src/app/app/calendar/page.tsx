"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { CalendarEvent } from "@/lib/types";

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("2026-09-04");
  const [time, setTime] = useState("11:00");
  async function load() { setEvents(await (await fetch("/api/events")).json()); }
  useEffect(() => { load(); }, []);
  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, day, time, kind: "call" }) });
    setTitle("");
    await load();
  }
  const days = useMemo(() => {
    const start = new Date("2026-08-31");
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d.toISOString().slice(0, 10);
    });
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/40">Calendar</p>
        <h1 className="mt-2 text-4xl font-semibold">Week slate</h1>
      </div>
      <form onSubmit={onSubmit} className="glass grid gap-3 rounded-3xl p-4 md:grid-cols-5">
        <input className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm md:col-span-2" placeholder="Event title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="date" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm" value={day} onChange={(e) => setDay(e.target.value)} />
        <input type="time" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm" value={time} onChange={(e) => setTime(e.target.value)} />
        <button className="rounded-2xl bg-[#7ee0ff] px-4 py-3 text-sm text-black">Add to slate</button>
      </form>
      <div className="grid gap-3 md:grid-cols-7">
        {days.map((date) => (
          <section key={date} className="glass min-h-48 rounded-3xl p-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">{date.slice(5)}</p>
            <div className="mt-3 space-y-2">
              {events.filter((item) => item.day === date).map((item) => (
                <div key={item.id} className="rounded-2xl bg-white/5 p-2 text-xs">
                  <p>{item.title}</p>
                  <p className="text-white/40">{item.time} · {item.kind}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
