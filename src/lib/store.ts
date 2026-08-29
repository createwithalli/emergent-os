import { promises as fs } from "fs";
import path from "path";
import type { CalendarEvent, Contact, Message } from "./types";

export type Database = { contacts: Contact[]; events: CalendarEvent[]; messages: Message[] };

const file = path.join(process.env.VERCEL ? "/tmp" : process.cwd(), process.env.VERCEL ? "emergent-db.json" : path.join("data", "db.json"));

const seed: Database = {
  contacts: [
    { id: "c1", name: "Amara Sol", email: "amara@lumen.studio", company: "Lumen Studio", stage: "negotiation", value: 84000, lastTouch: "2026-08-28" },
    { id: "c2", name: "Kai Mercer", email: "kai@orbit.vc", company: "Orbit Ventures", stage: "warm", value: 250000, lastTouch: "2026-08-27" },
    { id: "c3", name: "Noor Hale", email: "noor@cipher.labs", company: "Cipher Labs", stage: "lead", value: 42000, lastTouch: "2026-08-26" },
    { id: "c4", name: "Ellis Voss", email: "ellis@northframe.io", company: "Northframe", stage: "closed", value: 126000, lastTouch: "2026-08-20" },
  ],
  events: [
    { id: "e1", title: "Product orbit review", day: "2026-08-31", time: "10:00", kind: "internal" },
    { id: "e2", title: "Cipher Labs demo", day: "2026-09-01", time: "14:30", kind: "demo" },
    { id: "e3", title: "Wallet connect audit", day: "2026-09-02", time: "09:15", kind: "web3" },
    { id: "e4", title: "Amara close call", day: "2026-09-03", time: "16:00", kind: "call" },
  ],
  messages: [
    { id: "m1", thread: "ops", from: "Emergent", body: "Command deck is live. Pipeline, calendar, and sealed channel are synced.", encrypted: false, at: "09:02" },
    { id: "m2", thread: "ops", from: "You", body: "Seal the next note. I want ciphertext only in transit.", encrypted: false, at: "09:04" },
  ],
};

async function ensure() {
  await fs.mkdir(path.dirname(file), { recursive: true });
  try {
    await fs.access(file);
  } catch {
    await fs.writeFile(file, JSON.stringify(seed, null, 2));
  }
}

export async function readDb(): Promise<Database> {
  await ensure();
  return JSON.parse(await fs.readFile(file, "utf8")) as Database;
}

export async function writeDb(next: Database) {
  await ensure();
  await fs.writeFile(file, JSON.stringify(next, null, 2));
}
