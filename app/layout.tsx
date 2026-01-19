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
  title: `White Oak Interior | Premier Interior Design Services in India`,
  description: `Transform your space with White Oak Interior - Leading interior designers in India. Specializing in modern, luxury, and affordable home & office interiors. Get a free design consultation today!`,
  keywords: [
    // Core Services
    'interior design services in India',
    'modern home interior design',
    'residential interior design',
    'office interior design',
    'commercial interior design',
    'luxury interior design',
    'affordable interior design',
    'modular kitchen design',
    'wardrobe design',
    'false ceiling design',
    'living room design',
    'bedroom interior design',
    
    // Location-Based
    'interior designers in Mumbai',
    'best interior designers in Delhi NCR',
    'Bangalore home interior design',
    'Chennai interior design solutions',
    'Hyderabad luxury interiors',
    'Pune budget interior design',
    'Kolkata modern home decor',
    'Ahmedabad interior designers',
    
    // Design Styles
    'contemporary interior design',
    'modern minimalist interiors',
    'Scandinavian home design',
    'traditional Indian interior design',
    'fusion interior design',
    'eco-friendly interior design',
    
    // Trending
    'smart home interior design',
    'sustainable interior materials',
    'biophilic design India',
    'home office design',
    'modular furniture design',
    
    // Hindi Keywords
    'घर का इंटीरियर डिज़ाइन',
    'आधुनिक घर का डिज़ाइन',
    'किचन डिज़ाइन',
    'बेडरूम डिज़ाइन',
    'लिविंग रूम डिज़ाइन'
  ],
  authors: [{ name: 'White Oak Interior' }],
  creator: 'White Oak Interior',
  publisher: 'White Oak Interior',
  metadataBase: new URL('https://www.whiteoakinterior.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'hi-IN': '/hi',
    },
  },
  openGraph: {
    title: 'White Oak Interior | Premier Interior Design Services in India',
    description: 'Transform your space with our expert interior design services. Specializing in modern, luxury, and affordable home & office interiors across India.',
    url: 'https://www.whiteoakinterior.com',
    siteName: 'White Oak Interior',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'White Oak Interior - Modern Interior Design',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'White Oak Interior | Premier Interior Design Services in India',
    description: 'Transform your space with our expert interior design services across India.',
    images: ['/images/twitter-card.jpg'],
    creator: '@whiteoakinterior',
    site: '@whiteoakinterior',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/logo.png', type: 'image/png' },
      { url: '/images/logo-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/logo-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/images/apple-touch-icon.png',
    shortcut: '/images/favicon.ico',
  },
  appleWebApp: {
    title: 'White Oak Interior',
    statusBarStyle: 'black-translucent',
    startupImage: '/images/logo.png',
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_KEY',
    yandex: 'YANDEX_VERIFICATION_KEY',
  },
  // Additional metadata for better search visibility
  applicationName: 'White Oak Interior',
  category: 'Interior Design Services',
  classification: 'Interior Design Company',
  abstract: 'White Oak Interior offers premium interior design services across India, specializing in residential and commercial spaces with a focus on modern, sustainable, and innovative designs.',
  // themeColor: '#ffffff',
  // viewport: {
  //   width: 'device-width',
  //   initialScale: 1,
  //   maximumScale: 5,
  // },
  // Add structured data for better rich results
  other: {
    // 'msapplication-TileColor': '#ffffff',
    // 'msapplication-config': '/browserconfig.xml',
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
