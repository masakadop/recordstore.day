import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://recordstore.day'),
  title: 'Record Store Day Countdown',
  description:
    'Record Store Day（レコードストアデイ）まであと何日？開催日までのカウントダウンを表示する、アナログレコードと音楽ファンのためのサイトです。',
  generator: 'v0.app',
  applicationName: 'Record Store Day Countdown',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Record Store Day',
    'レコードストアデイ',
    'RSD',
    'vinyl',
    'レコード',
    '音楽',
    'カウントダウン',
  ],
  category: 'music',
  alternates: {
    canonical: '/',
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
  openGraph: {
    title: 'Record Store Day Countdown',
    description:
      'Record Store Day（レコードストアデイ）開催日までの残り日数をチェックできるカウントダウンサイト。',
    url: 'https://recordstore.day',
    siteName: 'Record Store Day Countdown',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Record Store Day Countdown'
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Record Store Day Countdown',
    description:
      'Record Store Day（レコードストアデイ）まであと何日？開催日までのカウントダウンを今すぐチェック。',
    images: ['/twitter-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a0a20',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Record Store Day Countdown',
  url: 'https://recordstore.day',
  inLanguage: 'ja',
  description:
    'Record Store Day（レコードストアデイ）開催日までの残り日数を表示するカウントダウンサイト。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
