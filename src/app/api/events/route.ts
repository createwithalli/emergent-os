import { NextResponse } from "next/server";
import { uid } from "@/lib/id";
import { readDb, writeDb } from "@/lib/store";
import type { CalendarEvent } from "@/lib/types";

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.events);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<CalendarEvent>;
  if (!body.title || !body.day) {
    return NextResponse.json({ error: "title and day required" }, { status: 400 });
  }
  const db = await readDb();
  const event: CalendarEvent = {
    id: uid("e"),
    title: body.title,
    day: body.day,
    time: body.time ?? "12:00",
    kind: body.kind ?? "internal",
  };
  db.events.push(event);
  await writeDb(db);
  return NextResponse.json(event, { status: 201 });
}
