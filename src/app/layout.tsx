import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import { CursorProvider } from '@/context/CursorContext';

export const metadata: Metadata = {
  title: 'JudyTech — Premium 3D Digital Experiences',
  description:
    'Crafting premium 3D interfaces and immersive digital experiences with React Three Fiber, GSAP, and modern web technologies.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="h-full antialiased smooth-scroll">
      <body className="min-h-full bg-background text-foreground">
        <CursorProvider>
          <LenisProvider>{children}</LenisProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
