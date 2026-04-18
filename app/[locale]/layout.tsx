import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getMessages, resolveLocale } from "@/lib/i18n/messages"
import { SUPPORTED_LOCALES } from "@/lib/i18n/config"

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = resolveLocale(rawLocale)
  const messages = getMessages(locale)

  return {
    metadataBase: new URL("https://recordstore.day"),
    title: messages.metadata.title,
    description: messages.metadata.description,
    applicationName: messages.metadata.title,
    referrer: "origin-when-cross-origin",
    keywords: ["Record Store Day", "RSD", "vinyl", "record", "music", "countdown"],
    category: "music",
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(SUPPORTED_LOCALES.map((item) => [item, `/${item}`])),
    },
    openGraph: {
      title: messages.metadata.title,
      description: messages.metadata.ogDescription,
      url: `https://recordstore.day/${locale}`,
      siteName: messages.metadata.title,
      locale,
      type: "website",
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: messages.metadata.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.metadata.title,
      description: messages.metadata.twitterDescription,
      images: [`/${locale}/twitter-image`],
    },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!SUPPORTED_LOCALES.includes(locale as (typeof SUPPORTED_LOCALES)[number])) {
    notFound()
  }

  return <>{children}</>
}
