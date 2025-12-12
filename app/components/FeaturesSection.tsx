"use client";

import { useEffect, useRef, useState } from "react";

type Feature = {
  title: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  delay: number;
};

// Apple-style thin outline icons
const TargetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 4V2" />
    <path d="M20 12h2" />
    <path d="M12 22v-2" />
    <path d="M2 12h2" />
  </svg>
);

const ChatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 19l-3 3v-4" />
    <rect x="4" y="4" width="16" height="12" rx="4" />
    <path d="M8 10h5" />
    <path d="M8 13h3" />
  </svg>
);

const SparkleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3l1.6 3.7L17 8.3 13.9 11l.9 4-3.1-1.8L8.6 15l.9-4L6 8.3l3.4-1.6L12 3z" />
    <path d="M18.5 4.5L19 6l1.5.5L19 7l-.5 1.5L18 7l-1.5-.5L18 6l.5-1.5z" />
    <path d="M5.5 4.5L6 6l1.5.5L6 7l-.5 1.5L5 7l-1.5-.5L5 6l.5-1.5z" />
  </svg>
);

// simple hook to know when section is in view
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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

const features: Feature[] = [
  {
    title: "She learns your vibe.",
    description:
      "Genie pays attention to your tastes, your energy, your timing, and your favorite kinds of spots — then picks what fits you perfectly.",
    Icon: TargetIcon,
    delay: 0,
  },
  {
    title: "Talk to her naturally.",
    description:
      "Ask for brunch, date night, patios, R&B vibes, rooftops — anything. Genie understands exactly what you mean and gets right to the good stuff.",
    Icon: ChatIcon,
    delay: 100,
  },
  {
    title: "Find moments worth going to.",
    description:
      "From happy hours to nightlife, from food festivals to chill lounges — Genie shows you everything happening around you in one place.",
    Icon: SparkleIcon,
    delay: 200,
  },
];

export function FeaturesSection() {
  const { ref, inView } = useInView(0.25);

  return (
    <section
      id="features"
      className="relative border-t border-white/5 bg-black py-28"
      ref={ref}
    >
      {/* subtle red fog behind cards */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-64 bg-[radial-gradient(circle_at_center,rgba(229,62,62,0.35),transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-4xl font-semibold md:text-5xl">
          What Genie Can Do for You
        </h2>

        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          She’s more than search — she’s personal. Here’s how Genie makes your social life easier:
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map(({ title, description, Icon, delay }, index) => (
            <div
              key={index}
              className={`
                rounded-2xl border border-white/10
                bg-gradient-to-b
                from-[#0A0A0C]
                via-[#0A0A0C]
                to-[#B31414]
                pt-12 pb-12 px-8
                text-left
                transform-gpu
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-red-500
                hover:shadow-[0_0_45px_rgba(229,62,62,0.45)]
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{
                boxShadow:
                  "0px 0px 40px rgba(229,62,62,0.22), 0px -10px 25px rgba(229,62,62,0.15) inset",
                transitionDelay: inView ? `${delay}ms` : "0ms",
              }}
            >
              {/* icon circle */}
              <div className="flex justify-center mb-6">
  <div className="
    flex 
    h-14 w-14 
    items-center 
    justify-center 
    rounded-full 
    border border-white/20 
    bg-black/60 
    shadow-[0_0_20px_rgba(229,62,62,0.15)]
  ">
    <Icon className="h-7 w-7 text-white" />
  </div>
</div>

              <h3 className="mt-6 text-2xl font-semibold text-white">
                {title}
              </h3>

              <p className="mt-4 text-base text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}