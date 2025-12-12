// app/api/contact-message/route.ts
import { NextResponse } from "next/server";
import { postToXano } from "../../lib/xanoWebsite";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    // Basic validation – all required for Contact
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const payload = {
      name,
      email,
      subject,
      message,
      source: "website_contact",
    };

    // Call Xano Website_Intake/contact_message
    const data = await postToXano("/contact_message", payload);

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("Contact message error:", err);

    return NextResponse.json(
      { message: err?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
