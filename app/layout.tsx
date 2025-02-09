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
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
  },
};

const GA_MEASUREMENT_ID = 'G-D9NH697TD1';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Toaster />
        
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });

            // Track client-side page changes
            if (typeof window !== 'undefined') {
              window.history.pushState = new Proxy(window.history.pushState, {
                apply: (target, thisArg, argArray) => {
                  const result = target.apply(thisArg, argArray);
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                    send_page_view: true
                  });
                  return result;
                },
              });
            }
          `}
        </Script>

        {/* Lindy AI Script */}
        <Script
          src="https://api.lindy.ai/api/lindyEmbed/lindyEmbed.js?a=2718a2bb-5dd2-467c-90f0-b3001981389d"
          strategy="lazyOnload"
          async
          crossOrigin="use-credentials"
        />
      </body>
    </html>
  );
}
