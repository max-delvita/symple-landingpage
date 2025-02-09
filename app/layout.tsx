import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AskSymple - Your AI Assistant",
  description: "Transform your workday with an AI assistant that works where you do - your inbox.",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/logo.svg',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Script
          src="https://api.lindy.ai/api/lindyEmbed/lindyEmbed.js?a=2718a2bb-5dd2-467c-90f0-b3001981389d"
          strategy="lazyOnload"
          async
          crossOrigin="use-credentials"
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
