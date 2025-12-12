"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// simple hook to know when something is in view
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setInView(true);
        });
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// generic fade-in wrapper
function FadeInSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`transform-gpu transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function HowGenieWorksPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="border-b border-white/5 bg-gradient-to-b from-black via-black to-[#140308]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-[1.1fr,0.9fr] md:py-24">

          <FadeInSection delay={0}>
            <div className="flex flex-col items-center text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-400">
                How Genie Works
              </p>

              <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
                Your Social Concierge... Behind The Magic.
              </h1>

              <p className="mt-5 max-w-xl text-lg text-gray-300">
                Genie combines conversation, vibe intelligence, and local data
                to figure out where you should go next — in just a few messages.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="https://genie.socialbevy.com/"
                  target="_blank"
                  className="rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(229,62,62,0.55)] hover:bg-red-500"
                >
                  Ask Genie
                </Link>

                <a
                  href="#steps"
                  className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white hover:border-white"
                >
                  See the steps
                </a>
              </div>
            </div>
          </FadeInSection>

          {/* Phones cluster unchanged */}
          <FadeInSection delay={150}>
            <div className="relative flex items-center justify-center">
              <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-[rgba(229,62,62,0.45)] blur-3xl" />

              <div className="relative flex gap-4">
                <div className="relative mt-10 hidden w-[210px] rotate-[-8deg] md:block">
                  <Image
                    src="/images/G-App-Home.png"
                    alt="Genie chat screen"
                    width={260}
                    height={520}
                    className="rounded-[40px] shadow-[0_0_45px_rgba(229,62,62,0.45)] transition-transform duration-700 hover:-translate-y-2"
                  />
                </div>

                <div className="relative w-[230px] md:w-[240px]">
                  <Image
                    src="/images/G-App-Venue.png"
                    alt="Genie recommendation screen"
                    width={280}
                    height={560}
                    className="rounded-[40px] shadow-[0_0_65px_rgba(229,62,62,0.7)] transition-transform duration-700 hover:-translate-y-2"
                  />
                </div>

                <div className="relative mt-10 hidden w-[210px] rotate-[8deg] md:block">
                  <Image
                    src="/images/G-App-Weekly.png"
                    alt="Genie venue detail screen"
                    width={260}
                    height={520}
                    className="rounded-[40px] shadow-[0_0_45px_rgba(229,62,62,0.45)] transition-transform duration-700 hover:-translate-y-2"
                  />
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* SECTION: HIGH-LEVEL STEPS */}
      <section id="steps" className="border-b border-white/5 bg-black py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">

          <FadeInSection>
            <h2 className="text-3xl font-semibold md:text-4xl">
              How Genie helps you choose where to go.
            </h2>

            <p className="mt-4 mx-auto max-w-2xl text-base text-gray-300 md:text-lg">
              At a high level, Genie does four things: understands you, reads
              the city, matches the two, and keeps learning every time you go
              out.
            </p>
          </FadeInSection>

          {/* Cards unchanged */}
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[
              {
                step: "Step 1",
                title: "You talk to Genie like a friend.",
                text: "“Find me a cute R&B patio”, “I want a low-key date night”, or “Where can I go solo but still be social?” Genie turns natural language into structured intent.",
              },
              {
                step: "Step 2",
                title: "She understands your vibe & filters.",
                text: "Behind the scenes, Genie breaks your request into energy level, music, crowd size, neighborhood, timing, and more — your “social fingerprint” for that moment.",
              },
              {
                step: "Step 3",
                title: "She reads the city in real time.",
                text: "Genie looks across venues, events, offers, and community data to see what actually fits your vibe & timing right now.",
              },
              {
                step: "Step 4",
                title: "She recommends a few great options.",
                text: "Instead of endless lists, Genie surfaces a handful of spots she’s confident you’ll actually like — with the info you need to decide quickly.",
              },
            ].map((item, index) => (
              <FadeInSection key={item.step} delay={150 + index * 120}>
                <div className="rounded-2xl border border-white/10 bg-[#050509] p-6">
                  <p className="text-sm font-semibold text-red-400">{item.step}</p>
                  <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: VIBE INTELLIGENCE */}
      <section className="border-b border-white/5 bg-black py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">

          <FadeInSection>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Vibe intelligence, not just filters.
            </h2>

            <p className="mt-4 mx-auto max-w-2xl text-base text-gray-300 md:text-lg">
              Genie learns the details that actually matter for a night out —
              and uses them to match you with the right places.
            </p>
          </FadeInSection>

          {/* Cards unchanged */}
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              {
                label: "Energy",
                text: "Chill, medium, or turnt — Genie adapts suggestions to your current energy level.",
              },
              {
                label: "Music",
                text: "R&B, Afrobeats, hip-hop, live bands, DJs — Genie notes your patterns.",
              },
              {
                label: "Crowd",
                text: "Small, cozy vibes or packed and popping — she watches what you respond to.",
              },
              {
                label: "Occasion",
                text: "Solo reset, date night, birthday, or link-up — context shapes every recommendation.",
              },
            ].map((item, index) => (
              <FadeInSection key={item.label} delay={120 + index * 100}>
                <div className="rounded-2xl border border-white/10 bg-[#050509] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: LEARNING OVER TIME */}
      <section className="border-b border-white/5 bg-black py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-2 md:items-center text-center md:text-left">

          <FadeInSection>
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl">
                Genie learns you over time.
              </h2>

              <p className="mt-4 mx-auto max-w-xl text-base text-gray-300 md:text-lg md:mx-0">
                The more you talk to Genie, the more she adapts to your
                preferences, your schedule, and your version of a good time.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0">
                <li>• Remembers what you liked and what you skipped.</li>
                <li>• Adjusts to your usual neighborhoods and time windows.</li>
                <li>• Notices patterns in your vibe, music, and crowd preferences.</li>
                <li>• Uses that history to make each suggestion a little smarter.</li>
              </ul>
            </div>
          </FadeInSection>

          {/* Example card unchanged */}
          <FadeInSection delay={150}>
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                <div className="h-64 w-64 rounded-full bg-[rgba(229,62,62,0.45)] blur-3xl" />
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#050509] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400">
                  Example
                </p>

                <h3 className="mt-3 text-lg font-semibold">
                  From “random spots” to “she just gets me”.
                </h3>

                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                  Week 1: You ask for brunch, rooftops, and R&amp;B happy hours.
                  Genie tests a variety of spots.
                </p>

                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                  Week 3: She’s learned the neighborhoods you prefer, the kind
                  of patios you like, and which nights you usually go out.
                </p>

                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                  Week 6: Genie is suggesting places that feel hand-picked —
                  because, in a way, they are.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-black py-20">
        <FadeInSection>
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Ready to see how Genie works for you?
            </h2>

            <p className="mt-4 max-w-xl mx-auto text-base text-gray-300 md:text-lg">
              Ask Genie for a spot right now — and experience the difference
              between another search app and a real social concierge.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="https://genie.socialbevy.com/"
                target="_blank"
                className="rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(229,62,62,0.55)] hover:bg-red-500"
              >
                Ask Genie
              </Link>

              <Link
                href="/weekly-picks"
                className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white hover:border-white"
              >
                Get Weekly Picks
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>

    </main>
  );
}
