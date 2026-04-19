"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import MotionShowcaseSection from "@/components/MotionShowcaseSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="overflow-x-hidden w-full">
        <CursorGlow />
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <MotionShowcaseSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
