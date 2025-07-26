import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "AI Tool Recommender - Find the Perfect AI Tools for Your Workflow",
  description: "Take our quick quiz and get personalized recommendations for AI tools that match your role, workflow, and goals. Perfect for designers, developers, and creative professionals.",
  keywords: "AI tools, design tools, development tools, productivity tools, tool recommendations, quiz",
  authors: [{ name: "AI Tool Recommender" }],
  openGraph: {
    title: "AI Tool Recommender - Find the Perfect AI Tools",
    description: "Get personalized AI tool recommendations based on your role and workflow",
    type: "website",
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
