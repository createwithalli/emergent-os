import { NextResponse } from "next/server";
import { uid } from "@/lib/id";
import { readDb, writeDb } from "@/lib/store";
import type { Message } from "@/lib/types";

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.messages);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Message>;
  if (!body.body && !body.cipher) {
    return NextResponse.json({ error: "message required" }, { status: 400 });
  }
  const db = await readDb();
  const message: Message = {
    id: uid("m"),
    thread: body.thread ?? "ops",
    from: body.from ?? "You",
    body: body.encrypted ? "" : (body.body ?? ""),
    cipher: body.cipher,
    iv: body.iv,
    encrypted: Boolean(body.encrypted),
    at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
  db.messages.push(message);
  await writeDb(db);
  return NextResponse.json(message, { status: 201 });
}
