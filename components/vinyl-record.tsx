"use client"

import { cn } from "@/lib/utils"

interface VinylRecordProps {
  isToday: boolean
  className?: string
}

export function VinylRecord({ isToday, className }: VinylRecordProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Outer glow effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full blur-3xl opacity-30",
          isToday ? "bg-primary animate-pulse" : "bg-primary/50"
        )} 
      />
      
      {/* Main vinyl record */}
      <div 
        className={cn(
          "relative w-full aspect-square rounded-full",
          isToday ? "animate-spin-slow" : ""
        )}
        style={{
          background: `
            radial-gradient(circle at center, 
              #1a1a1a 0%, 
              #1a1a1a 15%, 
              #2a2a2a 15.5%, 
              #1a1a1a 16%, 
              #1a1a1a 20%, 
              #2a2a2a 20.5%, 
              #1a1a1a 21%,
              #1a1a1a 25%,
              #2a2a2a 25.5%,
              #1a1a1a 26%,
              #1a1a1a 30%,
              #2a2a2a 30.5%,
              #1a1a1a 31%,
              #1a1a1a 35%,
              #2a2a2a 35.5%,
              #1a1a1a 36%,
              #1a1a1a 40%,
              #2a2a2a 40.5%,
              #1a1a1a 41%,
              #1a1a1a 100%
            )
          `
        }}
      >
        {/* Vinyl grooves overlay */}
        <div 
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background: `
              repeating-radial-gradient(
                circle at center,
                transparent 0px,
                transparent 2px,
                rgba(255,255,255,0.03) 2px,
                rgba(255,255,255,0.03) 3px
              )
            `
          }}
        />
        
        {/* Light reflection */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              linear-gradient(
                135deg,
                rgba(255,255,255,0.1) 0%,
                transparent 40%,
                transparent 60%,
                rgba(255,255,255,0.05) 100%
              )
            `
          }}
        />
        
        {/* Center label */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square rounded-full flex items-center justify-center"
          style={{
            background: isToday 
              ? `linear-gradient(135deg, #ff0066 0%, #ff6b00 100%)`
              : `linear-gradient(135deg, #1a0a20 0%, #2a1535 50%, #1a0a20 100%)`,
            boxShadow: isToday 
              ? '0 0 30px rgba(255,0,102,0.5)' 
              : '0 0 20px rgba(0,0,0,0.5)'
          }}
        >
          {/* Center hole */}
          <div className="w-[15%] aspect-square rounded-full bg-background" />
          
          {/* Label text ring */}
          <div className="absolute inset-[15%] flex items-center justify-center">
            <span 
              className={cn(
                "text-[0.4rem] sm:text-[0.5rem] font-mono tracking-widest uppercase",
                isToday ? "text-foreground" : "text-muted-foreground"
              )}
            >
              RSD
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
