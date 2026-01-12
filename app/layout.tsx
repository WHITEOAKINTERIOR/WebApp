import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { FloatingButtons } from "@/components/floating-buttons";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { commonContent } from "@/content/sharedContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: commonContent.companyName,
  description: commonContent.companyDescription,
  icons: {
    icon: [
      { url: '/images/logo.png', type: 'image/png' },
      { url: '/images/logo.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/logo.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/images/logo.png',
    shortcut: '/images/logo.png',
  },
  appleWebApp: {
    title: commonContent.companyName,
    statusBarStyle: 'black-translucent',
    startupImage: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main> {/* Add padding to account for initial navbar height */}
          {children}

          <Footer />
          <FloatingButtons />
          <Toaster />
        </main>
      </body>
    </html>
  );
}
