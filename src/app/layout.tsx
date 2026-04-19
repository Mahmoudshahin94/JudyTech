import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JudyTech — Digital Innovation",
  description:
    "We craft digital experiences that push the boundaries of technology and design. Web Development, AI Solutions, System Integration, and UI/UX Design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
