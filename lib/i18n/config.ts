export const SUPPORTED_LOCALES = ["en", "ja", "es", "de", "fr", "it", "nl", "zh-TW"] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: AppLocale = "en"

export const REGION_TO_LOCALE: Record<string, AppLocale> = {
  US: "en",
  GB: "en",
  IE: "en",
  CA: "en",
  AU: "en",
  NZ: "en",
  JP: "ja",
  ES: "es",
  MX: "es",
  DE: "de",
  FR: "fr",
  IT: "it",
  NL: "nl",
  BE: "nl",
  PL: "en",
  DK: "en",
  GR: "en",
  TW: "zh-TW",
  HK: "zh-TW",
  IL: "en",
}

export function isSupportedLocale(value: string): value is AppLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value)
}
