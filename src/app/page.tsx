'use client';

import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import SocialProofSection from '@/components/layout/SocialProofSection';
import ProblemSolutionSection from '@/components/layout/ProblemSolutionSection';
import FeaturesSection from '@/components/layout/FeaturesSection';
import StatsSection from '@/components/layout/StatsSection';
import HowItWorksSection from '@/components/layout/HowItWorksSection';
import TestimonialsSection from '@/components/layout/TestimonialsSection';
import BenefitsSection from '@/components/layout/BenefitsSection';
import CTASection from '@/components/layout/CTASection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/layout/Footer';

const HeroSection = dynamic(() => import('@/components/layout/HeroSection'), {
  ssr: false,
  loading: () => (
    <div className="h-[80vh] w-full animate-pulse bg-gradient-to-b from-background via-primary/5 to-background" />
  ),
});

function PageContent() {
  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden">
      <Navbar />

      <main id="main">
        <HeroSection />
        <SocialProofSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <BenefitsSection />
        <CTASection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}
