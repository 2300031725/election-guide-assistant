import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Election Guide Assistant",
  description: "Your AI-powered interactive assistant for election processes and voting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <Header />
        <main className="flex-1 flex flex-col relative w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
