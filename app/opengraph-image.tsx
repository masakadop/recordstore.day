import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px',
          background:
            'radial-gradient(circle at top right, #f59e0b 0%, rgba(245, 158, 11, 0.2) 32%, transparent 60%), linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #5b21b6 100%)',
          color: '#f8fafc',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: 34,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.95,
          }}
        >
          Record Store Day
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: 82, fontWeight: 800, lineHeight: 1.05 }}>
            Record Store Day Countdown
          </div>
          <div style={{ fontSize: 32, opacity: 0.9 }}>
            How many days until Record Store Day?
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 28,
            opacity: 0.88,
          }}
        >
          <span>recordstore.day</span>
          <span style={{ fontSize: 34 }}>Vinyl / Music / Countdown</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
