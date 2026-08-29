import { NextResponse } from "next/server";
import { uid } from "@/lib/id";
import { readDb, writeDb } from "@/lib/store";
import type { Contact } from "@/lib/types";

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.contacts);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Contact>;
  if (!body.name || !body.email) {
    return NextResponse.json({ error: "name and email required" }, { status: 400 });
  }
  const db = await readDb();
  const contact: Contact = {
    id: uid("c"),
    name: body.name,
    email: body.email,
    company: body.company ?? "Independent",
    stage: body.stage ?? "lead",
    value: Number(body.value ?? 0),
    lastTouch: new Date().toISOString().slice(0, 10),
  };
  db.contacts.unshift(contact);
  await writeDb(db);
  return NextResponse.json(contact, { status: 201 });
}
