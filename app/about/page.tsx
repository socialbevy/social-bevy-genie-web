// app/about/page.tsx

export default function AboutPage() {
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
      <section className="relative mx-auto max-w-6xl px-6 py-20 space-y-16">
        {/* HERO ROW */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr,0.8fr] items-start">
          {/* Left: Story */}
          <div className="space-y-6 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500">
              ABOUT SOCIAL BEVY &amp; GENIE
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              The AI-powered plug
              <br />
              for your social life.
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed">
              Social Bevy is a social discovery platform built around Genie, our
              AI Social Concierge. Instead of endless scrolling and random
              searches, Genie learns your vibe and connects you to the venues,
              events, and moments that actually fit your energy.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed">
              We started in Houston with a simple idea: help people actually go
              out, touch grass, and make memories again—while giving local
              venues smarter ways to reach the right people at the right time.
            </p>
          </div>

          {/* Right: Quick facts card */}
          <div className="rounded-3xl border border-white/10 bg-black/70 p-7 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur">
            <h2 className="text-lg font-semibold mb-4">What Genie does</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>• Listens to how you want the night to feel, not just &quot;what&apos;s nearby&quot;.</li>
              <li>• Recommends vibes, venues, and offers that match your energy.</li>
              <li>• Connects you with exclusive deals and perks from partnered spots.</li>
              <li>• Helps venues understand real-world behavior, not just clicks.</li>
            </ul>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p className="text-2xl font-semibold text-white">Houston</p>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  First city
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">Nationwide</p>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  Genie coverage
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOR USERS & VENUES ROW */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* For Users */}
          <div className="rounded-3xl border border-white/10 bg-black/70 p-7 backdrop-blur">
            <h2 className="text-xl font-semibold mb-3">For social explorers</h2>
            <p className="text-sm text-gray-300 mb-4">
              Genie is your always-on plug. Tell her how you want the night (or
              brunch, or happy hour) to feel, and she handles the rest.
            </p>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>• Skip the group chat chaos and indecision.</li>
              <li>• Discover spots based on vibe, music, and crowd— not just ratings.</li>
              <li>• Get access to specials, offers, and invite-only experiences.</li>
              <li>• Use Genie from wherever you are, not just one city.</li>
            </ul>
          </div>

          {/* For Vendors */}
          <div className="rounded-3xl border border-white/10 bg-black/70 p-7 backdrop-blur">
            <h2 className="text-xl font-semibold mb-3">For venues &amp; brands</h2>
            <p className="text-sm text-gray-300 mb-4">
              Social Bevy helps you attract the right guests, not just more
              noise. Genie introduces people to your business when it truly
              fits.
            </p>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>• Feature your brunches, happy hours, and night experiences.</li>
              <li>• Create targeted offers that Genie can surface to ideal guests.</li>
              <li>• Understand what vibes, music, and moments your audience loves.</li>
              <li>• Start in Houston first, with more cities unlocking over time.</li>
            </ul>
          </div>
        </div>

        {/* VISION ROW */}
        <div className="rounded-3xl border border-white/10 bg-black/70 p-8 md:p-10 backdrop-blur max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            The bigger vision
          </h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4">
            We believe going out shouldn&apos;t feel like work. No more tabs of
            blogs, lists, random TikToks, and &quot;where we going?&quot;
            arguments. Genie becomes the trusted layer between you and the
            city—learning you over time and curating your social life with
            intention.
          </p>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            As Social Bevy grows, Genie will power more than recommendations:
            live availability, ticketing, travel, and connected experiences
            across cities— all through one conversation. We&apos;re building the
            operating system for your social life, starting with one great
            night out.
          </p>
        </div>
      </section>
    </main>
  );
}