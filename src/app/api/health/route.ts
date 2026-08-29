import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    product: "Emergent OS",
    modules: ["crm", "calendar", "inbox", "web3", "studio"],
    time: new Date().toISOString(),
  });
}
