import type {Metadata, Viewport} from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#00b4d8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://pomodoro-timer.camly.org'),
  title: {
    default: 'Camly | High-Precision Pomodoro Timer & Productivity Tool',
    template: '%s | Camly'
  },
  description: 'High-precision Pomodoro Timer for deep work, professional productivity, and tactical planning. Experience the enterprise-grade focus engine.',
  keywords: ['pomodoro timer', 'focus engine', 'productivity tools', 'deep work', 'tactical planning', 'camly pomodoro', 'professional timer'],
  authors: [{ name: 'Camly Operations Team' }],
  creator: 'Camly Inc',
  publisher: 'Camly Inc',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Camly',
  },
  openGraph: {
    title: 'Camly | High-Precision Pomodoro Timer',
    description: 'High-precision Pomodoro Timer for professional use. Optimize your deep work velocity.',
    url: 'https://pomodoro-timer.camly.org',
    siteName: 'Camly',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Camly Pomodoro Timer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Camly | High-Precision Pomodoro Timer',
    description: 'Professional-grade Pomodoro Timer with real-time synchronization. Master your flow.',
    creator: '@camly',
    images: ['/og-image.png'],
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
  alternates: {
    canonical: 'https://pomodoro-timer.camly.org',
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Camly Inc",
  "url": "https://camly.org",
  "logo": "https://pomodoro-timer.camly.org/camly.png",
  "description": "Camly Inc is a leading provider of high-precision productivity and chronological tools designed for enterprise performance.",
  "sameAs": [
    "https://twitter.com/camly",
    "https://github.com/camlys/pomodoro"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Camly",
  "url": "https://pomodoro-timer.camly.org",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://pomodoro-timer.camly.org/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
