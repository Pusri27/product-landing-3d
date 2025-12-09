import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Story } from "@/components/sections/Story";
import { Gallery } from "@/components/sections/Gallery";
import { Specs } from "@/components/sections/Specs";
import { Pricing } from "@/components/sections/Pricing";
import { Footer } from "@/components/sections/Footer";
import { Preloader } from "@/components/ui/Preloader";
import { CommandPalette } from "@/components/ui/CommandPalette";
import {
  DynamicFluidBackground,
  ResilientProductConfigurator,
  DynamicScrollVideo,
  DynamicXRayTech
} from "@/components/DynamicSections";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Preloader />
      <DynamicFluidBackground />
      <CommandPalette />
      <Navbar />
      <Hero />
      <Features />
      <ResilientProductConfigurator />
      <DynamicScrollVideo />
      <DynamicXRayTech />
      <Story />
      <Gallery />
      <Specs />
      <Pricing />
      <Footer />
    </main>
  );
}
