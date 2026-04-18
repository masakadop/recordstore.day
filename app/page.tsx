"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DEFAULT_LOCALE, REGION_TO_LOCALE, SUPPORTED_LOCALES, type AppLocale } from "@/lib/i18n/config"

function pickLocale(languages: readonly string[]): AppLocale {
  for (const languageTag of languages) {
    const normalized = languageTag.toLowerCase().replace("_", "-")
    const exact = SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === normalized)
    if (exact) return exact

    const baseLang = normalized.split("-")[0]
    const baseMatch = SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === baseLang)
    if (baseMatch) return baseMatch

    const region = normalized.split("-")[1]?.toUpperCase()
    if (region && REGION_TO_LOCALE[region]) {
      return REGION_TO_LOCALE[region]
    }
  }

  return DEFAULT_LOCALE
}

export default function IndexPage() {
  const router = useRouter()

  useEffect(() => {
    const detected = pickLocale(navigator.languages)
    router.replace(`/${detected}`)
  }, [router])

  return null
}
