import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Poyrazköy Balıkçısı - Boğaz Manzaralı Balık Restoranı',
    template: '%s | Poyrazköy Balıkçısı'
  },
  description: 'İstanbul Boğazı\'nda eşsiz manzara eşliğinde taze balık ve deniz ürünleri. Poyrazköy\'de aile işletmesi balık restoranı. Rezervasyon: 0216 320 11 73',
  keywords: ['balık restoranı', 'Poyrazköy', 'Boğaz manzarası', 'taze balık', 'deniz ürünleri', 'İstanbul', 'Beykoz', 'rezervasyon'],
  authors: [{ name: 'Poyrazköy Balıkçısı' }],
  creator: 'Poyrazköy Balıkçısı',
  publisher: 'Poyrazköy Balıkçısı',
  metadataBase: new URL('https://www.poyrazkoybalikcisi.com'),
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logo.jpg',
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Poyrazköy Balıkçısı - Boğaz Manzaralı Balık Restoranı',
    description: 'İstanbul Boğazı\'nda eşsiz manzara eşliğinde taze balık ve deniz ürünleri. Poyrazköy\'de aile işletmesi balık restoranı.',
    url: 'https://www.poyrazkoybalikcisi.com',
    siteName: 'Poyrazköy Balıkçısı',
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Poyrazköy Balıkçısı Logo',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poyrazköy Balıkçısı - Boğaz Manzaralı Balık Restoranı',
    description: 'İstanbul Boğazı\'nda eşsiz manzara eşliğinde taze balık ve deniz ürünleri. Poyrazköy\'de aile işletmesi balık restoranı.',
    images: ['/logo.jpg'],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
