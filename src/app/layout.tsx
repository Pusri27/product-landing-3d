import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/components/effects/SoundController";
import { WebVitals } from "@/components/infrastructure/WebVitals";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import clsx from "clsx";
import { generateProductSchema } from "@/components/seo/StructuredData";
import Script from "next/script";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Lumina Prime - The Future of Sound",
  description: "Experience audio perfection with Lumina Prime. 3D spatial audio, titanium build, and AI-driven adaptive noise cancellation.",
  openGraph: {
    title: "Lumina Prime",
    description: "The future of sound is here.",
    type: "website",
    url: "https://lumina.com",
    images: ["https://lumina.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateProductSchema();

  return (
    <html lang="en" className="dark">
      <body className={clsx(outfit.variable, "antialiased bg-black")}>
        <Script
          id="product-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SoundProvider>
          <SmoothScroll>
            <WebVitals />
            {children}
          </SmoothScroll>
        </SoundProvider>
      </body>
    </html>
  );
}
