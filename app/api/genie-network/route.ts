// app/api/genie-network/route.ts
import { NextResponse } from "next/server";
import { postToXano } from "../../lib/xanoWebsite";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,       // this MUST match Xano
      email,
      phone,
      city,
      vibe,
    } = body ?? {};

    // Payload must match exactly what Xano expects
    const payload = {
      name,               // 🔥 changed from full_name → name
      email,
      phone: phone || "",
      city,
      vibe: vibe || "",
      source: "website_join_genie_network",
    };

    const result = await postToXano("/genie_network_signup", payload);

    return NextResponse.json(result ?? { ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("Genie Network signup error:", err);
    return NextResponse.json(
      { message: err?.message || "Failed to submit Genie Network signup" },
      { status: 500 }
    );
  }
}
