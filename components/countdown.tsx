"use client"

import { useEffect, useState } from "react"

interface CountdownProps {
  targetDate: Date
  onToday: boolean
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown({ targetDate, onToday }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) {
    return (
      <div className="flex gap-4 sm:gap-8 justify-center">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-16 sm:w-24 h-20 sm:h-28 bg-card rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  if (onToday) {
    return null
  }

  const timeUnits = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HOURS" },
    { value: timeLeft.minutes, label: "MINS" },
    { value: timeLeft.seconds, label: "SECS" },
  ]

  return (
    <div className="flex gap-3 sm:gap-6 justify-center">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex flex-col items-center gap-2">
          <div 
            className="relative w-16 sm:w-24 h-20 sm:h-28 bg-card rounded-lg flex items-center justify-center overflow-hidden group"
            style={{
              boxShadow: '0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
            }}
          >
            {/* Background glow on hover */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Number */}
            <span 
              className="text-3xl sm:text-5xl font-mono font-bold text-foreground tabular-nums"
              style={{
                textShadow: '0 0 20px rgba(255,0,102,0.3)'
              }}
            >
              {String(unit.value).padStart(2, '0')}
            </span>
            
            {/* Divider line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border/30" />
          </div>
          
          {/* Label */}
          <span className="text-[0.6rem] sm:text-xs font-mono text-muted-foreground tracking-[0.2em]">
            {unit.label}
          </span>
          
          {/* Separator */}
          {index < timeUnits.length - 1 && (
            <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
              <span className="text-2xl text-muted-foreground">:</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
