"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

async function submitJoinForm(payload: unknown) {
  const res = await fetch("/api/genie-network", {
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

export default function JoinGenieNetworkPage() {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [city, setCity] = useState("");

  const isHouston =
    city.trim().toLowerCase() === "houston" ||
    city.trim().toLowerCase().startsWith("houston,") ||
    city.trim().toLowerCase().includes(" houston");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      // REQUIRED (Option B)
      name: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      city: String(formData.get("city") || "").trim(),

      // OPTIONAL
      phone: String(formData.get("phone") || "").trim() || null,
      vibe: String(formData.get("vibe") || "").trim() || null,
      source: "website_join_genie",
    };

    try {
      await submitJoinForm(payload);
      setStatus("success");
      setSubmitted(true);
      form.reset();
      setCity("");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err?.message || "Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* TOP: HERO / WHY JOIN */}
      <section className="border-b border-red-900/40 bg-gradient-to-b from-black via-black to-[#120008]">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 md:flex-row md:items-center md:py-24 lg:py-28">
          {/* Left: copy */}
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
              Join the Genie Network
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
              Be first in line
              <br />
              for Genie-powered nights out.
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-400">
              The Genie Network is our early access list for people who want
              smarter nights, better vibes, and first access to new cities and
              perks as Genie expands.
            </p>

            <div className="mt-6 grid gap-4 text-sm text-gray-300 md:grid-cols-2">
              <WhyItem title="Early access to new cities">
                Get notified when Genie activates your city with local partners,
                offers, and weekly picks.
              </WhyItem>
              <WhyItem title="Smarter recommendations">
                Help Genie learn what you like so she can send better spots your
                way over time.
              </WhyItem>
              <WhyItem title="Invites & drops">
                From curated events to member-only perks, you hear about it
                before the general public.
              </WhyItem>
              <WhyItem title="Shape the platform">
                As an early member, your feedback directly influences how Genie
                grows.
              </WhyItem>
            </div>

            <p className="mt-6 text-xs text-gray-500">
              No spam. No selling your data. Just Genie, letting you know when
              something worth your time pops up.
            </p>
          </div>

          {/* Right: subtle glow / card framing the form anchor */}
          <div className="flex flex-1 items-center justify-center md:justify-end">
            <div className="relative h-48 w-48 rounded-full bg-red-700/40 blur-[70px]" />
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="bg-black">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div className="text-center">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Join the Genie Network
            </h2>
            <p className="mt-3 text-sm text-gray-400 md:text-base">
              Tell Genie who you are and where you are. We&apos;ll use this to
              prioritize which cities to activate next and who to invite first.
            </p>
            <p className="mt-2 text-xs text-gray-500">
              <span className="text-red-400">*</span> indicates required fields.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6 rounded-3xl border border-red-900/40 bg-black/70 p-6 shadow-[0_0_80px_rgba(220,38,38,0.35)] backdrop-blur"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                id="fullName"
                label="Full Name"
                required
                placeholder="Your name"
              />
              <Field
                id="email"
                label="Email"
                type="email"
                required
                placeholder="you@email.com"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                id="phone"
                label="Phone (optional)"
                type="tel"
                placeholder="Best contact for invites"
              />
              <div className="flex flex-col gap-2 text-sm">
                <label
                  htmlFor="city"
                  className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400"
                >
                  City<span className="text-red-500"> *</span>
                </label>
                <input
                  id="city"
                  name="city"
                  required
                  placeholder="Houston, Atlanta, Chicago..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="rounded-xl border border-white/10 bg-black/60 px-3 py-3 text-sm outline-none ring-red-500/60 transition focus:border-red-500 focus:ring-2"
                />
                <p className="text-xs text-gray-500">
                  Genie works nationally. We use your city to sequence launch
                  perks & local partners.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <label
                htmlFor="vibe"
                className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400"
              >
                What kind of vibe are you usually looking for?
              </label>
              <input
                id="vibe"
                name="vibe"
                placeholder="R&B brunch, chill patios, day parties, date nights..."
                className="rounded-xl border border-white/10 bg-black/60 px-3 py-3 text-sm outline-none ring-red-500/60 transition focus:border-red-500 focus:ring-2"
              />
            </div>

            {/* Houston-specific callout */}
            {city && isHouston && (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-900/20 px-4 py-4 text-sm text-emerald-100 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  You&apos;re in Houston
                </p>
                <p className="mt-2">
                  Genie is launching first with the{" "}
                  <span className="font-semibold">Houston Eat &amp; Meet</span>{" "}
                  community. After you join the Genie Network, you&apos;ll get a
                  special invite to the HE&amp;M Facebook group for local
                  events, meetups, and perks.
                </p>
                <p className="mt-2 text-xs text-emerald-200/80">
                  You can also{" "}
                  <a
                    href="https://www.facebook.com/groups/houstoneatandmeet"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    request to join Houston Eat &amp; Meet now
                  </a>{" "}
                  while we review your Genie Network signup.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(220,38,38,0.6)] transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-800"
                disabled={status === "submitting"}
              >
                {status === "submitting"
                  ? "Submitting..."
                  : submitted
                  ? "You’re in — Genie will be in touch"
                  : "Join the Genie Network"}
              </button>
              <p className="text-xs text-gray-500">
                By joining, you agree to receive occasional updates about Genie
                launches, events, and perks. No spam, ever.
              </p>
              {status === "success" && (
                <p className="text-xs font-medium text-emerald-400">
                  Thanks for joining. Your info has been captured. As Genie
                  activates cities and perks, you&apos;ll be among the first to
                  know.
                </p>
              )}
              {status === "error" && (
                <p className="text-xs font-medium text-red-400">
                  {errorMessage || "Something went wrong. Please try again."}
                </p>
              )}
            </div>
          </form>

          <div className="mt-10 text-center text-xs text-gray-500">
            <p>
              Already talking to Genie on Facebook?{" "}
              <Link
                href="/"
                className="font-medium text-gray-300 underline underline-offset-4 hover:text-white"
              >
                Head back to the homepage
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ------------ Helper components ------------ */

function WhyItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 via-black to-black p-4 shadow-[0_0_30px_rgba(0,0,0,0.7)]">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-xs text-gray-400">{children}</p>
    </div>
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