/**
 * Record Store Day is celebrated on the third Saturday of April each year.
 * This utility calculates the next Record Store Day date.
 */

export function getThirdSaturdayOfApril(year: number): Date {
  // Start from April 1st
  const april = new Date(year, 3, 1) // Month is 0-indexed, so 3 = April
  
  // Find the first Saturday
  const dayOfWeek = april.getDay() // 0 = Sunday, 6 = Saturday
  const daysUntilFirstSaturday = (6 - dayOfWeek + 7) % 7
  const firstSaturday = 1 + daysUntilFirstSaturday
  
  // Third Saturday = first Saturday + 14 days
  const thirdSaturday = firstSaturday + 14
  
  return new Date(year, 3, thirdSaturday)
}

export function getNextRecordStoreDay(): Date {
  const now = new Date()
  const currentYear = now.getFullYear()
  
  // Get this year's Record Store Day
  const thisYearRSD = getThirdSaturdayOfApril(currentYear)
  
  // If this year's RSD hasn't passed yet, return it
  // We compare using the end of RSD (23:59:59) to ensure we show "today" all day
  const endOfRSD = new Date(thisYearRSD)
  endOfRSD.setHours(23, 59, 59, 999)
  
  if (now <= endOfRSD) {
    return thisYearRSD
  }
  
  // Otherwise, return next year's RSD
  return getThirdSaturdayOfApril(currentYear + 1)
}

export function isRecordStoreDay(): boolean {
  const now = new Date()
  const rsd = getNextRecordStoreDay()
  
  return (
    now.getFullYear() === rsd.getFullYear() &&
    now.getMonth() === rsd.getMonth() &&
    now.getDate() === rsd.getDate()
  )
}

export function getDaysUntilRecordStoreDay(): number {
  const now = new Date()
  const rsd = getNextRecordStoreDay()
  
  // Reset time parts for accurate day calculation
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const rsdMidnight = new Date(rsd.getFullYear(), rsd.getMonth(), rsd.getDate())
  
  const diffTime = rsdMidnight.getTime() - nowMidnight.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
}

export function formatRecordStoreDay(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  return `${year}年${month}月${day}日`
}
