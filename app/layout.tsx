import type { Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const viewport: Viewport = {
  themeColor: "#1a0a20",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
