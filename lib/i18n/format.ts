import { interpolate } from "@/lib/i18n/messages"
import type { AppLocale } from "@/lib/i18n/config"
import type { Messages } from "@/lib/i18n/types"

export function formatDateForLocale(date: Date, locale: AppLocale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date)
}

export function formatCompactNumber(value: number, locale: AppLocale): string {
  return new Intl.NumberFormat(locale, { useGrouping: false }).format(value)
}

export function formatUnitNumber(value: number, locale: AppLocale): string {
  return new Intl.NumberFormat(locale, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }).format(value)
}

export function formatDaysRemaining(locale: AppLocale, messages: Messages, count: number): string {
  const plural = new Intl.PluralRules(locale).select(count)
  const template = plural === "one" ? messages.home.daysRemaining.one : messages.home.daysRemaining.other
  const formattedCount = formatCompactNumber(count, locale)

  return interpolate(template, { count: formattedCount })
}
