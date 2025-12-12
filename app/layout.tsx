// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";

export const metadata: Metadata = {
  title: "Social Bevy — Your Social Concierge",
  description:
    "Ask Genie. Discover the best social experiences in your city—happy hours, brunches, vibes, and more.",
  metadataBase: new URL("https://socialbevy.com"),

  // ✅ Browser tab icon (favicon)
  icons: {
    icon: "/sb-logo-icon.png",
  },

  openGraph: {
    title: "Social Bevy — Your Social Concierge",
    description:
      "Genie curates the best social experiences for you. Discover your next vibe.",
    url: "https://socialbevy.com",
    siteName: "Social Bevy",
    images: [
      {
        url: "/images/socialbevylogo.png", // in /public/images
        width: 1200,
        height: 630,
        alt: "Social Bevy logo and Genie branding",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Social Bevy — Your Social Concierge",
    description:
      "Ask Genie. Curated spots, vibes, and experiences in your city.",
    images: ["/images/socialbevylogo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Header />
        {children}
      </body>
    </html>
  );
}
