import { HomePage } from "@/components/i18n/home-page"
import { getMessages } from "@/lib/i18n/messages"
import { resolveLocale } from "@/lib/i18n/messages"

interface LocalePageProps {
  params: Promise<{ locale: string }>
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale: rawLocale } = await params
  const locale = resolveLocale(rawLocale)
  const messages = getMessages(locale)

  return <HomePage locale={locale} messages={messages} />
}
