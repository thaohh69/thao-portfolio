import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Import development utilities only in development
let DevUtils: React.ComponentType<unknown> | null = null;
if (process.env.NODE_ENV === 'development') {
  try {
    DevUtils = require("@/lib/dev-utils").DevUtils;
  } catch (error) {
    console.warn('[Layout] Failed to load dev utilities:', error);
  }
}

// Load Inter font for non-Apple devices
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "chigili portfolio",
  description: "Interactive portfolio with an AI-powered assistant that answers questions about me, my skills, and my experience",
  keywords: [
    "thaoho", 
    "Portfolio", 
    "Data Engineer", 
    "AI", 
    "Interactive", 
    "Assistant", 
    "Data Engineering",
    "Data Analytics",
    "Reporting",
    "Python",
    "SQL"
  ],
  authors: [
    {
      name: "Sai Krishna Chaitanya Chigili",
      url: "https://linkedin.com/in/saikrishnachaitanyachigili",
    },
  ],
  creator: "chigili",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "thaoho portfolio",
    description: "Interactive portfolio with an AI-powered assistant that answers questions about me",
    siteName: "thaoho portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "thaoho portfolio",
    description: "Interactive portfolio with an AI-powered assistant that answers questions about me",
    creator: "@thaoho",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}