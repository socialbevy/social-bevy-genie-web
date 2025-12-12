"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { FeaturesSection } from "./components/FeaturesSection";

/** Shared helper for posting to our Next.js API routes */
async function submitForm(path: string, payload: unknown) {
  const res = await fetch(path, {
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

export default function HomePage() {
  const [weeklyStatus, setWeeklyStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function handleWeeklySubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setWeeklyStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const contact_value = String(formData.get("contact_value") || "").trim();

    // basic frontend validation
    if (!contact_value) {
      setWeeklyStatus("error");
      return;
    }

    // infer contact_type for Xano (matches weekly_pick_signups)
    const contact_type = contact_value.includes("@") ? "email" : "phone";

    try {
      await submitForm("/api/weekly-picks", {
        contact_type,
        contact_value,
        // optional: city context (can be "" or "Houston" etc.)
        city: "",
      });
      setWeeklyStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setWeeklyStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* SECTION 1: HERO */}
      <section className="bg-black">
        <div
          className="
            mx-auto max-w-6xl
            grid grid-cols-1 md:grid-cols-[1.1fr,0.9fr]
            gap-12
            px-6
            py-[180px] md:py-[210px]
          "
        >
          {/* RIGHT ON DESKTOP, TOP ON MOBILE: GENIE */}
          <div
            className="
              order-1 md:order-2
              relative flex justify-center md:justify-end md:flex-1
              -mt-8 md:-mt-[460px] lg:-mt-[580px]
            "
          >
            <div className="relative w-[260px] sm:w-[300px] md:w-[360px] lg:w-[440px]">
              {/* Red glow behind Genie */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-64 rounded-full bg-red-700/60 blur-[80px]"
                aria-hidden="true"
              />

              <Image
                src="/images/Social-Genie-Pic.png"
                alt="Genie, your Social Concierge"
                width={440}
                height={640}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* LEFT ON DESKTOP, UNDER GENIE ON MOBILE: COPY */}
          <div
            className="
              order-2 md:order-1
              max-w-xl
              text-center md:text-left
              mt-8 md:mt-0
            "
          >
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Meet Genie
              <br />
              Your Social Concierge.
            </h1>

            <p className="mt-6 text-lg text-gray-400">
              She finds the vibes, the venues, the deals, the events, and the
              moments — wherever you are.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-start sm:gap-4">
              {/* Primary CTA — Ask Genie Now (external app) */}
              <Link
                href="https://genie.socialbevy.com/"
                target="_blank"
                className="
                  rounded-full bg-red-600 px-8 py-3
                  text-sm font-semibold text-white
                  shadow-[0_0_40px_rgba(220,38,38,0.45)]
                  hover:bg-red-500
                  text-center
                "
              >
                Ask Genie Now
              </Link>

              {/* Secondary CTA — Learn more */}
              <Link
                href="/how-genie-works"
                className="
                  rounded-full border border-white/20
                  px-8 py-3
                  text-sm font-semibold text-white
                  hover:border-white
                  text-center
                "
              >
                See How Genie Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT GENIE CAN DO */}
      <FeaturesSection />

      {/* ========== SECTION 3: SCREENS SHOWCASE — SEE GENIE IN ACTION ========== */}
      <section
        id="screens"
        className="border-t border-white/5 bg-gradient-to-b from-black via-black to-[#140308] py-28"
      >
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-4xl font-semibold md:text-5xl">
            See Genie in Action
          </h2>

          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Genie brings your social life to you — personalized recommendations,
            real vibes, and real places, all in one simple conversation.
          </p>

          <div className="relative mt-20 flex flex-col items-center justify-center gap-10 md:flex-row">
            {/* red fog under phones */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[radial-gradient(circle_at_center,rgba(229,62,62,0.38),transparent_65%)] blur-3xl" />

            <Image
              src="/images/G-App-Home.png"
              alt="Genie welcome screen"
              width={260}
              height={520}
              className="w-52 drop-shadow-[0_0_45px_rgba(229,62,62,0.35)]"
            />

            <Image
              src="/images/G-App-Venue.png"
              alt="Genie recommendations"
              width={280}
              height={560}
              className="w-60 scale-105 drop-shadow-[0_0_65px_rgba(229,62,62,0.6)]"
            />

            <Image
              src="/images/G-App-Weekly.png"
              alt="Genie venue detail"
              width={260}
              height={520}
              className="w-52 drop-shadow-[0_0_45px_rgba(229,62,62,0.35)]"
            />
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: WEEKLY PICKS SIGNUP ========== */}
      <section
        id="weekly-picks"
        className="border-t border-white/5 bg-black py-24"
      >
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          {/* soft circular red glow behind form */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-72 w-72 rounded-full bg-[rgba(229,62,62,0.35)] blur-3xl" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-400">
            Genie&apos;s Weekly Picks
          </p>

          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
            The best moves of the week, picked for you.
          </h2>

          <p className="mt-4 text-base text-gray-300 md:text-lg">
            Get a weekly drop from Genie with hand-picked spots, events, and
            social moments in your city.
          </p>

          <form
            onSubmit={handleWeeklySubmit}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <input
              name="contact_value"
              type="text"
              placeholder="Enter your email or phone"
              className="w-full rounded-full border border-white/10 bg-[#0D0D12] px-5 py-3 text-sm text-white placeholder:text-gray-500 focus:border-red-500 focus:outline-none sm:w-80"
            />
            <button
              type="submit"
              disabled={weeklyStatus === "submitting"}
              className="w-full rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(229,62,62,0.4)] hover:bg-red-500 sm:w-auto disabled:opacity-60"
            >
              {weeklyStatus === "submitting" ? "Submitting..." : "Get the Picks"}
            </button>
          </form>

          {weeklyStatus === "success" && (
            <p className="mt-3 text-xs text-green-400">
              Got it. Genie will send you the weekly picks.
            </p>
          )}
          {weeklyStatus === "error" && (
            <p className="mt-3 text-xs text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
          {weeklyStatus === "idle" && (
            <p className="mt-3 text-xs text-gray-500">
              No spam. Just vibes from Genie.
            </p>
          )}
        </div>
      </section>

      {/* ========== SECTION 5: MEET GENIE + WHY SHE'S DIFFERENT ========== */}
      <section className="border-t border-white/5 bg-black py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:items-center">
          {/* Meet Genie */}
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">Meet Genie.</h2>
            <p className="mt-5 text-lg text-gray-400 leading-relaxed">
              Genie is your AI Social Concierge — warm, intuitive, and built to
              understand what you actually want to do. She learns your vibe over
              time and helps you find the moments that fit your energy.
            </p>
            <ul className="mt-6 space-y-2 text-gray-300 text-sm">
              <li>• Friendly and fun</li>
              <li>• Always available</li>
              <li>• Talks like a real person</li>
              <li>• Knows your city</li>
              <li>• Gets smarter with every conversation</li>
            </ul>

            <div className="mt-10 flex justify-center lg:justify-start">
              <Image
                src="/images/Red-Genie.jpeg"
                alt="Genie glowing"
                width={320}
                height={420}
                className="drop-shadow-[0_0_90px_rgba(220,38,38,0.7)]"
              />
            </div>
          </div>

          {/* Why Genie Is Different */}
          <div>
            <h3 className="text-2xl font-semibold md:text-3xl">
              Why Genie Is Different
            </h3>

            <div className="mt-10 space-y-8">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-red-500">🎯</span>
                  <h4 className="text-lg font-semibold">
                    Vibe-Centered Intelligence
                  </h4>
                </div>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  Genie doesn&apos;t just search. She understands your energy —
                  the kind of night you want, the music you like, the vibe
                  you&apos;re in.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-red-500">💬</span>
                  <h4 className="text-lg font-semibold">
                    Conversational Search
                  </h4>
                </div>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  Talk to her naturally. No filters, no tapping through menus —
                  just &quot;Genie, find me a cute R&amp;B patio.&quot;
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-red-500">⭐</span>
                  <h4 className="text-lg font-semibold">
                    Curated Local Knowledge
                  </h4>
                </div>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  Genie blends AI with real community data to surface hidden
                  gems, trending spots, and the best experiences in your city.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 6: FOR VENDORS — PARTNER WITH GENIE (WAITLIST) ========== */}
      <section
        id="vendors"
        className="border-t border-white/5 bg-gradient-to-b from-black to-[#120207] py-24"
      >
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-400">
            For Businesses &amp; Venues
          </p>

          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
            Partner with Genie.
          </h2>

          <p className="mt-4 text-base text-gray-300 md:text-lg max-w-2xl mx-auto">
            Vendor access opens soon. Share your info and we&apos;ll reach out
            when Genie is ready to feature new venues, offers, and experiences
            in your city.
          </p>

          <div className="mt-10 grid gap-8 text-left md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/70 p-7">
              <h3 className="text-lg font-semibold text-white">
                Smart placement
              </h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                Your spot appears when Genie knows it matches a user&apos;s
                vibe, location, and intent — not as a random ad.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/70 p-7">
              <h3 className="text-lg font-semibold text-white">
                High-intent reach
              </h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                People come to Genie ready to go out. You get discovered at the
                moment decisions are being made.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/70 p-7">
              <h3 className="text-lg font-semibold text-white">
                Plug-ready offers
              </h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                Feature specials, happy hours, or exclusive perks that Genie can
                surface to the right audience inside her recommendations.
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/vendors"
              className="rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(229,62,62,0.4)] hover:bg-red-500"
            >
              Join the Vendor Waitlist
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: CITIES + COMMUNITY ========== */}
      <section
        id="community"
        className="border-t border-white/5 bg-black py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Starting in Houston. Built for many cities.
          </h2>
          <p className="mt-4 text-base text-gray-400 md:text-lg">
            Genie is born from the Houston Eat &amp; Meet community — and
            she&apos;s getting ready to light up more cities.
          </p>

          <div className="mt-10 grid gap-4 text-sm text-gray-300 sm:grid-cols-3">
            <div className="rounded-2xl border border-red-500/60 bg-red-900/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-red-400">
                Live Now
              </p>
              <p className="mt-2 text-lg font-semibold text-white">Houston</p>
              <p className="mt-1 text-xs text-gray-400">
                Powered by 25K+ members in Houston Eat &amp; Meet.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                Coming Soon
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                Dallas • Austin • Atlanta
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                On the Roadmap
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                DMV • LA • More
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-red-500">
              <span className="text-sm font-semibold text-red-500">S</span>
            </div>
            <span className="font-medium text-gray-200">Social Bevy</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#features" className="hover:text-white">
              Genie
            </a>
            <a href="#vendors" className="hover:text-white">
              Vendors
            </a>
            <a href="#community" className="hover:text-white">
              Community
            </a>
            <button className="hover:text-white">Contact</button>
            <button className="hover:text-white">Terms</button>
            <button className="hover:text-white">Privacy</button>
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Social Bevy. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}