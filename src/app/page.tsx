'use client';

import { Suspense } from 'react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Hero3D from '@/components/3d/Hero3D';
import FeaturesSection from '@/components/layout/FeaturesSection';
import ShowcaseSection from '@/components/layout/ShowcaseSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/layout/Footer';

function PageContent() {
  const { t } = useLanguage();

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden">
      <Navbar />

      <main id="main">
        {/* Hero 3D Section */}
        <Suspense
          fallback={
            <div className="w-full h-screen bg-gradient-to-b from-background to-primary/10 animate-pulse" />
          }
        >
          <Hero3D
            title={t('hero_title')}
            subtitle={t('hero_subtitle')}
            badge={t('hero_badge')}
            ctaLabel={t('hero_cta')}
            onCTAClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          />
        </Suspense>

        {/* Features Section */}
        <section id="features">
          <FeaturesSection />
        </section>

        {/* Showcase Section */}
        <section id="showcase">
          <ShowcaseSection />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
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
