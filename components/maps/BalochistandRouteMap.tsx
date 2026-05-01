'use client'

import { useState } from 'react'

// Route: Karachi → Ormara → Gwadar → Khuzdar → Quetta → fly → Islamabad
// Coordinates mapped to the same Pakistan SVG outline as the other route maps
const STOPS = [
  { id: 'karachi',   label: 'Karachi',   days: 'Days 1–2',   x: 128, y: 428, desc: 'Pakistan\'s largest city and Arabian Sea gateway. Mazar-e-Quaid, Mohatta Palace Museum, and the finest seafood in the country — the starting point for the Makran drive.' },
  { id: 'ormara',    label: 'Ormara',    days: 'Days 3–4',   x: 86,  y: 416, desc: 'A fishing town on a tombolo peninsula on the Makran coast. Princess of Hope rock arch — a sandstone figure eroded by wind and sea. En route: Kund Malir beach and the Hingol National Park rock formations.' },
  { id: 'gwadar',    label: 'Gwadar',    days: 'Days 5–7',   x: 68,  y: 420, desc: 'The deep-water port on a dramatic tombolo peninsula — a city in transformation alongside its centuries-old Baloch fishing community. Day excursion to the secluded bay of Ganz.' },
  { id: 'khuzdar',   label: 'Khuzdar',   days: 'Day 8',      x: 102, y: 350, desc: 'Central Balochistan highlands — the long drive north from the coast through absolute desert terrain and bare rock mountains. Gateway to Moola Chotok canyon.' },
  { id: 'quetta',    label: 'Quetta',    days: 'Days 9–11',  x: 104, y: 272, desc: 'The provincial capital at 1,680m. Liaquat and Kandahari bazaars. Excursion to Ziarat — the juniper forest hill station where Jinnah spent his final weeks in 1948.' },
  { id: 'islamabad', label: 'Islamabad', days: 'Days 12–13', x: 248, y: 100, desc: 'Final stop after the Quetta–Islamabad flight. Faisal Mosque, Lok Virsa Folk Heritage Museum, and the Rawalpindi bazaar before departure.' },
]

const ROUTE_SEQUENCE = [
  { from: 'karachi',   to: 'ormara',    transport: 'drive' as const },
  { from: 'ormara',    to: 'gwadar',    transport: 'drive' as const },
  { from: 'gwadar',    to: 'khuzdar',   transport: 'drive' as const },
  { from: 'khuzdar',   to: 'quetta',    transport: 'drive' as const },
  { from: 'quetta',    to: 'islamabad', transport: 'fly'   as const },
]

const PAKISTAN_PATH = `
  M 80,52 L 120,32 L 165,25 L 215,20 L 248,32 L 268,52 L 295,98
  L 308,148 L 300,188 L 278,232 L 248,278 L 198,355 L 162,395
  L 128,432 L 88,432 L 58,415 L 38,378 L 28,328 L 32,268
  L 42,198 L 55,132 L 68,88 Z
`

function getStop(id: string) {
  return STOPS.find(s => s.id === id)!
}

export default function BalochistandRouteMap() {
  const [active, setActive] = useState<string | null>(null)
  const activeStop = STOPS.find(s => s.id === active)

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {/* SVG Map */}
      <div style={{ flex: '0 0 auto', position: 'relative' }}>
        <svg
          viewBox="0 0 380 460"
          width="340"
          height="412"
          style={{ display: 'block', maxWidth: '100%' }}
          aria-label="Route map: Balochistan — The Forgotten Frontier"
        >
          {/* Country fill */}
          <path
            d={PAKISTAN_PATH}
            fill="rgba(240,235,224,0.35)"
            stroke="rgba(139,105,20,0.4)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Route segments */}
          {ROUTE_SEQUENCE.map((seg, i) => {
            const from  = getStop(seg.from)
            const to    = getStop(seg.to)
            const mx    = (from.x + to.x) / 2
            const my    = (from.y + to.y) / 2
            const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI)
            const isFly = seg.transport === 'fly'
            return (
              <g key={i}>
                <line
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={isFly ? 'rgba(90,120,160,0.55)' : 'rgba(139,105,20,0.5)'}
                  strokeWidth="1.5"
                  strokeDasharray={isFly ? '2 4' : '4 3'}
                  strokeLinecap="round"
                />
                <g transform={`translate(${mx},${my}) rotate(${angle})`}>
                  <polygon points="-3,2 3,0 -3,-2" fill={isFly ? 'rgba(90,120,160,0.7)' : 'rgba(139,105,20,0.65)'} />
                </g>
              </g>
            )
          })}

          {/* City dots */}
          {STOPS.map((stop) => (
            <g key={stop.id} style={{ cursor: 'pointer' }} onClick={() => setActive(active === stop.id ? null : stop.id)}>
              <circle cx={stop.x} cy={stop.y} r={active === stop.id ? 9 : 0} fill="none" stroke="rgba(139,105,20,0.35)" strokeWidth="1" />
              <circle
                cx={stop.x} cy={stop.y}
                r={active === stop.id ? 5 : 4}
                fill={active === stop.id ? '#8b6914' : 'rgba(139,105,20,0.75)'}
                stroke="rgba(250,248,244,0.8)"
                strokeWidth="1.5"
              />
              <text
                x={stop.x + 8} y={stop.y + 4}
                fontFamily="var(--font-body)" fontSize="8"
                fill={active === stop.id ? '#8b6914' : 'rgba(26,26,26,0.7)'}
                fontWeight={active === stop.id ? '600' : '400'}
                letterSpacing="0.04em"
              >
                {stop.label}
              </text>
            </g>
          ))}

          {/* Legend */}
          <g transform="translate(18,420)">
            <line x1="0" y1="5" x2="18" y2="5" stroke="rgba(139,105,20,0.6)" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="22" y="8" fontFamily="var(--font-body)" fontSize="6.5" fill="rgba(107,107,107,0.75)" letterSpacing="0.06em">Drive</text>
            <line x1="0" y1="18" x2="18" y2="18" stroke="rgba(90,120,160,0.65)" strokeWidth="1.5" strokeDasharray="2 4" />
            <text x="22" y="21" fontFamily="var(--font-body)" fontSize="6.5" fill="rgba(107,107,107,0.75)" letterSpacing="0.06em">Fly</text>
          </g>

          <text x="130" y="444" fontFamily="var(--font-body)" fontSize="7" fill="rgba(107,107,107,0.6)" letterSpacing="0.08em">START</text>
          <text x="250" y="116" fontFamily="var(--font-body)" fontSize="7" fill="rgba(107,107,107,0.6)" letterSpacing="0.08em">END</text>
        </svg>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'var(--color-stone)', letterSpacing: '0.08em', textAlign: 'center', marginTop: '0.5rem' }}>
          Click any city for details
        </p>
      </div>

      {/* City info panel */}
      <div style={{ flex: 1, minWidth: '220px' }}>
        {activeStop ? (
          <div style={{ padding: '1.5rem', background: 'var(--color-charcoal)', border: '1px solid rgba(139,105,20,0.3)' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-bronze-pale)', marginBottom: '0.4rem' }}>
              {activeStop.days}
            </p>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 300, color: 'var(--color-offwhite)', letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
              {activeStop.label}
            </h4>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-stone)', lineHeight: 1.7 }}>
              {activeStop.desc}
            </p>
          </div>
        ) : (
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '1.25rem' }}>
              Journey Overview
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {STOPS.map((stop, i) => (
                <button
                  key={stop.id}
                  onClick={() => setActive(stop.id)}
                  style={{
                    background: 'none', border: 'none',
                    borderTop: i === 0 ? '1px solid rgba(107,107,107,0.2)' : 'none',
                    borderBottom: '1px solid rgba(107,107,107,0.2)',
                    padding: '0.65rem 0', display: 'flex', gap: '1rem',
                    alignItems: 'center', cursor: 'pointer', textAlign: 'left', width: '100%',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.1em', color: 'var(--color-stone)', flexShrink: 0, minWidth: '60px' }}>
                    {stop.days}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-charcoal)' }}>
                    {stop.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
