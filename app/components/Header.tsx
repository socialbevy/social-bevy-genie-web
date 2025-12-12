"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Left: Logo (3x larger) */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-20 w-20">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-red-600/60 blur-2xl" />
            <div className="relative flex h-20 w-20 items-center justify-center">
              <Image
                src="/images/bevy_black.png"
                alt="Social Bevy"
                width={80}
                height={80}
                className="h-16 w-16 object-contain"
              />
            </div>
          </div>
        </Link>

        {/* Center nav links */}
        <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
          <Link href="/how-genie-works" className="hover:text-white transition">How Genie Works</Link>
          <Link href="/vendors" className="hover:text-white transition">For Vendors</Link>
          <Link href="/join" className="hover:text-white transition">Join Genie Network</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </nav>

        {/* Right side CTAs */}
        <div className="hidden md:flex items-center gap-3">

          {/* Ask Genie (external link) */}
          <Link
            href="https://genie.socialbevy.com/"
            target="_blank"
            className="rounded-full bg-red-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(220,38,38,0.7)] hover:bg-red-500 transition"
          >
            Ask Genie
          </Link>

          {/* Join button (transparent) */}
          <Link
            href="/join"
            className="rounded-full border border-white/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:border-white transition"
          >
            Join
          </Link>
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 md:hidden">

          {/* Ask Genie (mobile, external URL) */}
          <Link
            href="https://genie.socialbevy.com/"
            target="_blank"
            className="rounded-full bg-red-600 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(220,38,38,0.7)] hover:bg-red-500 transition"
          >
            Ask Genie
          </Link>

          {/* Join (mobile) */}
          <Link
            href="/join"
            className="rounded-full border border-white/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:border-white transition"
          >
            Join
          </Link>
        </div>

      </div>
    </header>
  );
}
