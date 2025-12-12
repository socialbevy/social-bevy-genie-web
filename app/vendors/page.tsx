"use client";

import { FormEvent, useState } from "react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

async function submitVendorForm(payload: unknown) {
  const res = await fetch("/api/vendor-waitlist", {
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

export default function VendorsPage() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      // REQUIRED fields (Option B)
      venue_name: String(formData.get("businessName") || "").trim(),
      name: String(formData.get("contactName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      city: String(formData.get("location") || "").trim(),

      // OPTIONAL fields
      phone: String(formData.get("phone") || "").trim() || null,
      venue_type: String(formData.get("venueType") || "").trim() || null,
      website: String(formData.get("website") || "").trim() || null,
      best_nights: String(formData.get("bestNights") || "").trim() || null,
      main_goal: String(formData.get("mainGoal") || "").trim() || null,
      notes: String(formData.get("notes") || "").trim() || null,
      source: "website_vendor_waitlist",
    };

    try {
      await submitVendorForm(payload);
      setStatus("success");
      form.reset();
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err?.message || "Something went wrong");
    }
  };

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="bg-black">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 md:flex-row md:items-center md:py-32 lg:py-40">
          {/* Left: copy */}
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
              For Venues, Restaurants & Experiences
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Partner with Genie.
              <br />
              Reach the right people at
              <br className="hidden md:block" /> the right time.
            </h1>
            <p className="mt-6 text-lg text-gray-400">
              Genie learns what our members like—then sends them to the spots
              that match their vibe. In Phase 1, we&apos;re inviting a limited
              set of partners to feature offers, events, and weekly picks.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#vendor-form"
                className="rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(220,38,38,0.5)] transition hover:bg-red-500"
              >
                Join the Vendor Waitlist
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-white"
              >
                See How Genie Helps You
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 text-xs text-gray-400">
              <div>
                <p className="text-sm font-semibold text-white">
                  Phase 1: Invite-only
                </p>
                <p>Early partners get prime placement and feature input.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  No setup cost in Phase 1
                </p>
                <p>Simple offers, trackable redemptions, future insights.</p>
              </div>
            </div>
          </div>

          {/* Right: simple stat / card column */}
          <div className="flex flex-1 justify-center md:justify-end">
            <div className="relative w-full max-w-sm rounded-3xl border border-red-900/40 bg-gradient-to-b from-red-950/40 via-black to-black p-6 shadow-[0_0_80px_rgba(220,38,38,0.35)]">
              <div className="mb-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-red-400">
                  What partners get
                </p>
                <p className="mt-2 text-sm text-gray-300">
                  Genie brings you curated, ready-to-spend guests based on their
                  actual preferences.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <VendorStat
                  label="High-intent guests"
                  value="Vibe-matched"
                  hint="People who already want your type of experience."
                />
                <VendorStat
                  label="Placement"
                  value="Featured spots"
                  hint="Be where Genie sends members first."
                />
                <VendorStat
                  label="Phase-1 Advantage"
                  value="Limited partners"
                  hint="Less noise. More attention on your venue."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY GENIE – BENEFITS */}
      <section
        id="why-genie"
        className="border-t border-red-900/30 bg-gradient-to-b from-black via-black to-[#120001]"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Why partner with Genie?
            </h2>
            <p className="mt-4 text-gray-400">
              Instead of shouting into the void on social, Genie quietly sends
              you the right guests—people whose vibe, budget, and timing match
              what you offer.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <BenefitCard
              title="Guests who actually fit"
              description="Genie learns what members like—R&B brunch, chill patios, day parties, date nights—and only recommends you when it makes sense."
            />
            <BenefitCard
              title="Promos that feel premium"
              description="Turn your happy hours, brunches, and specials into member-only perks that feel exclusive, not discounted to death."
            />
            <BenefitCard
              title="Data you can act on"
              description="As the platform grows, you’ll see which offers hit, what nights work, and how Genie is driving traffic to your door."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-t border-red-900/30 bg-black"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-3xl font-semibold md:text-4xl">
              How it works in Phase 1
            </h2>
            <p className="mt-4 text-gray-400">
              We&apos;re keeping it simple to start. You focus on the experience;
              Genie handles the introductions.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <StepCard
              step="01"
              title="Tell us about your spot"
              description="You share your concept, best nights, target crowd, and the kind of energy you want in the room."
            />
            <StepCard
              step="02"
              title="Create a simple offer"
              description="We help you craft a clean, clear perk—think member-only happy hour, brunch, or priority seating."
            />
            <StepCard
              step="03"
              title="Genie sends you people"
              description="Genie suggests your venue when it matches a member’s vibe. You redeem with a simple in-house check."
            />
          </div>
        </div>
      </section>

      {/* WHAT WE BRING / WHAT YOU BRING */}
      <section className="border-t border-red-900/30 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold">What Genie brings</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-300">
                <Bullet>High-intent, vibe-matched guests.</Bullet>
                <Bullet>Premium brand positioning—not coupon-clipper energy.</Bullet>
                <Bullet>Feature placements in weekly picks & curated lists.</Bullet>
                <Bullet>Future analytics on offers, nights, and guest behavior.</Bullet>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">What you bring</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-300">
                <Bullet>A consistent experience you&apos;re proud to showcase.</Bullet>
                <Bullet>
                  A clear offer or perk that Genie can explain in one sentence.
                </Bullet>
                <Bullet>
                  A point of contact who can approve offers and updates.
                </Bullet>
                <Bullet>
                  Honest feedback so we can make the platform work for you.
                </Bullet>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VENDOR FORM / WAITLIST */}
      <section
        id="vendor-form"
        className="border-t border-red-900/40 bg-gradient-to-b from-black via-black to-red-950/40"
      >
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Join the Genie Vendor Waitlist
            </h2>
            <p className="mt-4 text-gray-400">
              Share a few details about your business. We&apos;ll review fit and
              follow up with next steps for Phase 1 access.
            </p>
            <p className="mt-2 text-xs text-gray-500">
              <span className="text-red-400">*</span> indicates required fields.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6 rounded-3xl border border-red-900/40 bg-black/70 p-6 shadow-[0_0_80px_rgba(220,38,38,0.3)] backdrop-blur"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                id="businessName"
                label="Business / Venue Name"
                required
                placeholder="Upper Kirby Social"
              />
              <Field
                id="contactName"
                label="Contact Name"
                required
                placeholder="Full name"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                id="email"
                label="Email"
                type="email"
                required
                placeholder="you@venue.com"
              />
              <Field
                id="phone"
                label="Phone (optional)"
                type="tel"
                placeholder="Best number for follow-up"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                id="location"
                label="City / Neighborhood"
                required
                placeholder="Houston – Midtown, The Heights, etc."
              />
              <div className="flex flex-col gap-2 text-sm">
                <label
                  htmlFor="venueType"
                  className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400"
                >
                  Venue Type
                </label>
                <select
                  id="venueType"
                  name="venueType"
                  className="rounded-xl border border-white/10 bg-black/60 px-3 py-3 text-sm outline-none ring-red-500/60 transition focus:border-red-500 focus:ring-2"
                >
                  <option value="">Select one (optional)</option>
                  <option>Restaurant</option>
                  <option>Brunch / Day Party</option>
                  <option>Lounge / Bar</option>
                  <option>Nightlife / Club</option>
                  <option>Café / Dessert</option>
                  <option>Event Space</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <Field
              id="website"
              label="Website / Instagram"
              placeholder="https://instagram.com/yourvenue"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2 text-sm">
                <label className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                  Best nights or time slots
                </label>
                <input
                  id="bestNights"
                  name="bestNights"
                  type="text"
                  placeholder="e.g., Friday happy hour, Sunday brunch"
                  className="rounded-xl border border-white/10 bg-black/60 px-3 py-3 text-sm outline-none ring-red-500/60 transition focus:border-red-500 focus:ring-2"
                />
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <label className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                  What&apos;s your main goal?
                </label>
                <select
                  id="mainGoal"
                  name="mainGoal"
                  className="rounded-xl border border-white/10 bg-black/60 px-3 py-3 text-sm outline-none ring-red-500/60 transition focus:border-red-500 focus:ring-2"
                >
                  <option value="">Select one (optional)</option>
                  <option>Fill specific nights or time slots</option>
                  <option>Grow brunch / day party traffic</option>
                  <option>Attract a specific vibe / crowd</option>
                  <option>Launch a new concept / event</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <label
                htmlFor="notes"
                className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400"
              >
                Anything else we should know?
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Tell us about your vibe, music, dress code, ideal crowd, or any offers you already have in mind."
                className="resize-none rounded-xl border border-white/10 bg-black/60 px-3 py-3 text-sm outline-none ring-red-500/60 transition focus:border-red-500 focus:ring-2"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(220,38,38,0.6)] transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-800"
                disabled={status === "submitting"}
              >
                {status === "submitting"
                  ? "Submitting..."
                  : status === "success"
                  ? "Submitted — We’ll be in touch"
                  : "Request Early Access"}
              </button>
              <p className="text-xs text-gray-500">
                We&apos;ll review your submission and follow up by email. No spam,
                no hard sells.
              </p>
              {status === "success" && (
                <p className="text-xs font-medium text-green-400">
                  Thanks! Your details were captured. You can safely leave this
                  page.
                </p>
              )}
              {status === "error" && (
                <p className="text-xs font-medium text-red-400">
                  {errorMessage || "Something went wrong. Please try again."}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

/* ---------- Small helper components ---------- */

function VendorStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-red-500 to-red-800 opacity-80 shadow-[0_0_30px_rgba(220,38,38,0.8)]" />
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
          {label}
        </p>
        <p className="text-base font-semibold text-white">{value}</p>
        <p className="text-xs text-gray-400">{hint}</p>
      </div>
    </div>
  );
}

function BenefitCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-black to-black px-5 py-6 text-sm shadow-[0_0_40px_rgba(0,0,0,0.8)] transition hover:border-red-500/80 hover:shadow-[0_0_60px_rgba(220,38,38,0.6)]">
      <div className="mb-4 h-8 w-8 rounded-full border border-red-500/50 bg-red-600/20 shadow-[0_0_25px_rgba(220,38,38,0.6)]" />
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-black to-black px-5 py-6 text-sm shadow-[0_0_40px_rgba(0,0,0,0.8)]">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xs font-semibold tracking-[0.18em]">
        {step}
      </span>
      <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[6px] inline-block h-2 w-2 flex-shrink-0 rounded-full bg-red-500 shadow-[0_0_12px_rgba(220,38,38,0.9)]" />
      <span>{children}</span>
    </li>
  );
}

function Field({
  id,
  label,
  required,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-white/10 bg-black/60 px-3 py-3 text-sm outline-none ring-red-500/60 transition focus:border-red-500 focus:ring-2"
      />
    </div>
  );
} 