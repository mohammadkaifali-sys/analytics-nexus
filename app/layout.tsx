import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistFont = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus Analytics | Secure Enterprise Operations",
  description: "High-stakes enterprise data intelligence and predictive ops dashboard system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interFont.variable} ${geistFont.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        {children}
      </body>
    </html>
  );
}
