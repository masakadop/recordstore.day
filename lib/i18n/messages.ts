import { DEFAULT_LOCALE, type AppLocale, isSupportedLocale } from "@/lib/i18n/config"
import type { Messages } from "@/lib/i18n/types"

import en from "@/lib/i18n/messages/en.json"
import ja from "@/lib/i18n/messages/ja.json"
import es from "@/lib/i18n/messages/es.json"
import de from "@/lib/i18n/messages/de.json"
import fr from "@/lib/i18n/messages/fr.json"
import it from "@/lib/i18n/messages/it.json"
import nl from "@/lib/i18n/messages/nl.json"
import zhTW from "@/lib/i18n/messages/zh-TW.json"

const catalogs: Record<AppLocale, Messages> = {
  en: en as Messages,
  ja: ja as Messages,
  es: es as Messages,
  de: de as Messages,
  fr: fr as Messages,
  it: it as Messages,
  nl: nl as Messages,
  "zh-TW": zhTW as Messages,
}

function deepMerge<T>(base: T, override: Partial<T>): T {
  if (typeof base !== "object" || base === null) {
    return (override ?? base) as T
  }

  const result = { ...(base as Record<string, unknown>) }
  for (const key of Object.keys(override as Record<string, unknown>)) {
    const overrideValue = (override as Record<string, unknown>)[key]
    const baseValue = (base as Record<string, unknown>)[key]

    if (
      overrideValue &&
      typeof overrideValue === "object" &&
      !Array.isArray(overrideValue) &&
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMerge(baseValue, overrideValue)
      continue
    }

    result[key] = overrideValue
  }

  return result as T
}

export function resolveLocale(rawLocale: string): AppLocale {
  return isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE
}

export function getMessages(locale: string): Messages {
  const resolvedLocale = resolveLocale(locale)
  return deepMerge(catalogs.en, catalogs[resolvedLocale])
}

export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""))
}
