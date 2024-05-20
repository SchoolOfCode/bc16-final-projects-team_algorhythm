import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Lexend } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Chatbot from "@/components/Chatbot";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "SoCBrain",
  description: "The SoC Quiz App, powered by Algorhythm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lexend.variable} font-sans`}>
      <SpeedInsights />
      <Analytics />
      <body className="bg-background text-foreground dark:bg-slate-600 select-none">
        <main className="min-h-screen flex flex-col items-center">
          <Nav />
          <Chatbot />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
