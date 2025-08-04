import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "AI Tool Recommender for Designers – by Web Creativity Studio",
  description: "Discover the best AI tools for UX/UI designers, graphic designers, and frontend developers – curated by Web Creativity Studio.",
  keywords: "AI tools, design tools, development tools, productivity tools, tool recommendations, quiz, UX/UI designers, graphic designers, frontend developers",
  authors: [{ name: "Web Creativity Studio" }],
  openGraph: {
    title: "AI Tool Recommender for Designers – by Web Creativity Studio",
    description: "Discover the best AI tools for UX/UI designers, graphic designers, and frontend developers – curated by Web Creativity Studio.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI Tool Recommender for Designers – by Web Creativity Studio",
    description: "Discover the best AI tools for UX/UI designers, graphic designers, and frontend developers – curated by Web Creativity Studio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
