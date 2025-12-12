import { NextRequest, NextResponse } from "next/server";
import { postToXano } from "../../lib/xanoWebsite";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const venue_name = String(body.venue_name || "").trim();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const city = String(body.city || "").trim();

    if (!venue_name) {
      return NextResponse.json(
        { message: "Venue name is required." },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { message: "Contact name is required." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    if (!city) {
      return NextResponse.json(
        { message: "City is required." },
        { status: 400 }
      );
    }

    const payload = {
      venue_name,
      name,
      email,
      city,
      phone: body.phone ?? "",
      venue_type: body.venue_type ?? "",
      website: body.website ?? "",
      best_nights: body.best_nights ?? "",
      main_goal: body.main_goal ?? "",
      notes: body.notes ?? "",
      source: body.source ?? "website_vendor_waitlist",
    };

    const result = await postToXano("/vendor_waitlist_signup", payload);

    return NextResponse.json(result ?? { ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("Vendor waitlist error:", err);
    return NextResponse.json(
      { message: err?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}


