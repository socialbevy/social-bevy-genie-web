// app/api/weekly-picks/route.ts
import { NextRequest, NextResponse } from "next/server";
import { postToXano } from "../../lib/xanoWebsite";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const contact_value = String(body?.contact_value ?? "").trim();
    const contact_type = body?.contact_type ?? "unknown";
    const city = body?.city ?? "";
    const source = body?.source ?? "website_home_weekly_picks";

    // Only require contact_value
    if (!contact_value) {
      return NextResponse.json(
        { message: "Contact value is required." },
        { status: 400 }
      );
    }

    // Payload going to Xano
    const payload = {
      contact_value,
      contact_type,
      city,
      source,
    };

    const data = await postToXano("/weekly_pick_signup", payload);

    // Success – echo Xano response back to the client
    return NextResponse.json(
      {
        message: "Signup successful.",
        data,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Weekly picks API route error:", err);

    const message =
      typeof err?.message === "string"
        ? err.message
        : "Failed to submit weekly picks signup.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
