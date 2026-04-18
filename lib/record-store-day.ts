/**
 * Record Store Day is celebrated on the third Saturday of April each year.
 * This utility calculates the next Record Store Day date.
 */

export function getThirdSaturdayOfApril(year: number): Date {
  const april = new Date(year, 3, 1)

  const dayOfWeek = april.getDay()
  const daysUntilFirstSaturday = (6 - dayOfWeek + 7) % 7
  const firstSaturday = 1 + daysUntilFirstSaturday

  const thirdSaturday = firstSaturday + 14

  return new Date(year, 3, thirdSaturday)
}

export function getNextRecordStoreDay(baseDate: Date = new Date()): Date {
  const now = new Date(baseDate)
  const currentYear = now.getFullYear()

  const thisYearRSD = getThirdSaturdayOfApril(currentYear)

  const endOfRSD = new Date(thisYearRSD)
  endOfRSD.setHours(23, 59, 59, 999)

  if (now <= endOfRSD) {
    return thisYearRSD
  }

  return getThirdSaturdayOfApril(currentYear + 1)
}

export function isRecordStoreDay(baseDate: Date = new Date()): boolean {
  const now = new Date(baseDate)
  const rsd = getNextRecordStoreDay(now)

  return now.getFullYear() === rsd.getFullYear() && now.getMonth() === rsd.getMonth() && now.getDate() === rsd.getDate()
}

export function getDaysUntilRecordStoreDay(baseDate: Date = new Date()): number {
  const now = new Date(baseDate)
  const rsd = getNextRecordStoreDay(now)

  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const rsdMidnight = new Date(rsd.getFullYear(), rsd.getMonth(), rsd.getDate())

  const diffTime = rsdMidnight.getTime() - nowMidnight.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

export function formatRecordStoreDay(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date)
}
