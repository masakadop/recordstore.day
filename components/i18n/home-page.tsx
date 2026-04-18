"use client"

import { useEffect, useState } from "react"
import { VinylRecord } from "@/components/vinyl-record"
import { Countdown } from "@/components/countdown"
import {
  getNextRecordStoreDay,
  isRecordStoreDay,
  getDaysUntilRecordStoreDay,
} from "@/lib/record-store-day"
import type { AppLocale } from "@/lib/i18n/config"
import type { Messages } from "@/lib/i18n/types"
import { formatDateForLocale, formatDaysRemaining } from "@/lib/i18n/format"

interface HomePageProps {
  locale: AppLocale
  messages: Messages
}

export function HomePage({ locale, messages }: HomePageProps) {
  const [mounted, setMounted] = useState(false)
  const [isToday, setIsToday] = useState(false)
  const [nextRSD, setNextRSD] = useState<Date>(new Date())
  const [daysLeft, setDaysLeft] = useState(0)

  useEffect(() => {
    setMounted(true)
    setIsToday(isRecordStoreDay())
    setNextRSD(getNextRecordStoreDay())
    setDaysLeft(getDaysUntilRecordStoreDay())
  }, [])

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">{messages.common.loading}</div>
      </main>
    )
  }

  const formattedDaysLeft = formatDaysRemaining(locale, messages, daysLeft)
  const formattedDate = formatDateForLocale(nextRSD, locale)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative">
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-12 max-w-4xl mx-auto text-center">
        <div className="space-y-2">
          <h1 className="text-xs sm:text-sm font-mono tracking-[0.3em] text-muted-foreground uppercase">
            {messages.common.siteWordmark}
          </h1>
        </div>

        <div className="w-48 sm:w-64 md:w-80">
          <VinylRecord isToday={isToday} />
        </div>

        <div className="space-y-4 sm:space-y-6">
          {isToday ? (
            <>
              <div className="space-y-2">
                <h2
                  className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-balance"
                  style={{
                    background: "linear-gradient(135deg, #ff0066 0%, #ff6b00 50%, #ffcc00 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {messages.home.celebrationTitleLine1}
                  <br />
                  {messages.home.celebrationTitleLine2}
                </h2>
              </div>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-md mx-auto text-balance">
                {messages.home.celebrationBodyLine1}
                <br />
                {messages.home.celebrationBodyLine2}
              </p>

              <div className="flex justify-center gap-2 pt-4" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: ["#ff0066", "#ff6b00", "#ffcc00", "#00ff88", "#00ccff"][i],
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <p className="text-base sm:text-lg text-muted-foreground">{messages.home.untilNextRsd}</p>
                <h2
                  className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #ff0066 0%, #ff6b00 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {formattedDaysLeft}
                </h2>
              </div>

              <Countdown targetDate={nextRSD} onToday={isToday} locale={locale} messages={messages} />

              <p className="text-sm text-muted-foreground font-mono pt-4">
                {messages.home.nextDateLabel.replace("{date}", formattedDate)}
              </p>
            </>
          )}
        </div>

        <footer className="pt-8 sm:pt-16 space-y-4">
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <div className="h-px w-12 bg-border" />
            <span className="text-xs font-mono tracking-wider" aria-label={messages.common.separatorMusic}>
              ♪
            </span>
            <div className="h-px w-12 bg-border" />
          </div>
          <p className="text-xs text-muted-foreground/60 font-mono">{messages.common.supportLocalStore}</p>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </main>
  )
}
