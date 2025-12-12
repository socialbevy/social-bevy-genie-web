"use client";

import { FormEvent, useState } from "react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

async function submitContactForm(payload: unknown) {
  const res = await fetch("/api/contact-message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(json?.message || "Something went wrong");
  }

  return json;
}

export default function ContactPage() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      source: "website_contact",
    };

    try {
      await submitContactForm(payload);
      setStatus("success");
      form.reset();
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err?.message || "Something went wrong");
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* --- Full-page red glow background (Genie style) --- */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[900px] w-[900px] rounded-full bg-red-600/35 blur-[190px]" />
      </div>

      {/* --- Page content --- */}
      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.1fr,0.9fr] items-start">
          {/* LEFT: Copy (mirrors Vendor page vibe) */}
          <div className="space-y-6 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500">
              CONTACT THE GENIE TEAM
            </p>

            <h1 className="text-4xl font-semibold md:text-5xl leading-tight">
              Questions, partnerships,
              <br />
              or media?
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you&apos;re a venue owner, brand partner, media outlet, or
              just Genie-curious, we&apos;d love to hear from you.
            </p>

            <ul className="space-y-3 text-sm text-gray-300">
              <li>• Vendor &amp; partnership inquiries</li>
              <li>• Press &amp; media opportunities</li>
              <li>• Product feedback &amp; feature requests</li>
              <li>• General questions about Genie &amp; Social Bevy</li>
            </ul>

            <p className="text-sm text-gray-500">
              You can also email us directly at{" "}
              <a
                href="mailto:info@socialbevy.com"
                className="text-red-400 hover:text-red-300 underline underline-offset-4"
              >
                info@socialbevy.com
              </a>
              .
            </p>
          </div>

          {/* RIGHT: Contact form card (now wired to backend) */}
          <div className="rounded-3xl border border-white/10 bg-black/70 p-7 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur">
            <h2 className="text-lg font-semibold mb-2">Send us a message</h2>
            <p className="text-sm text-gray-400 mb-4">
              Fill this out and we&apos;ll respond as soon as possible.
            </p>
            <p className="text-xs text-gray-500 mb-6">
              <span className="text-red-400">*</span> All fields are required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-gray-300"
                >
                  Name<span className="text-red-500"> *</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-white/12 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-gray-300"
                >
                  Email<span className="text-red-500"> *</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/12 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="you@example.com"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-gray-300"
                >
                  Subject<span className="text-red-500"> *</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="w-full rounded-xl border border-white/12 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="What would you like to talk about?"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-gray-300"
                >
                  Message<span className="text-red-500"> *</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-xl border border-white/12 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 resize-none"
                  placeholder="Share as much detail as you’d like…"
                />
              </div>

              {/* Submit button + status */}
              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(220,38,38,0.65)] hover:bg-red-500 transition disabled:cursor-not-allowed disabled:bg-red-800"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="mt-3 text-[11px] text-emerald-400 leading-relaxed">
                  Thank you — your message has been sent. We&apos;ll get back to
                  you as soon as we can.
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-[11px] text-red-400 leading-relaxed">
                  {errorMessage || "Something went wrong. Please try again."}
                </p>
              )}
              {status === "idle" && (
                <p className="mt-3 text-[11px] text-gray-500 leading-relaxed">
                  This form sends your message securely to the Genie team.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}