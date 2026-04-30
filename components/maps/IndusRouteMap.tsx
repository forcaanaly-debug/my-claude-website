'use client'

import { useState } from 'react'

const STOPS = [
  { id: 'karachi',    label: 'Karachi',         days: 'Days 1–2',  x: 128, y: 428, desc: 'Arabia Sea gateway. Mughal palaces, the great fish harbour, and the finest biryani in Pakistan.' },
  { id: 'thatta',    label: 'Thatta',           days: 'Day 3',     x: 152, y: 400, desc: 'Makli Necropolis (UNESCO) and the 93-domed Shah Jahan Mosque — a lost Mughal capital.' },
  { id: 'hyderabad', label: 'Hyderabad',        days: 'Day 3',     x: 182, y: 370, desc: 'Last capital of the Talpur Mirs. Ajrak block-print and mirror-work embroidery workshops.' },
  { id: 'sehwan',    label: 'Sehwan Sharif',    days: 'Day 4',     x: 175, y: 330, desc: 'Shrine of Lal Shahbaz Qalandar. The Thursday evening dhammal — the most vivid ritual in South Asia.' },
  { id: 'larkana',   label: 'Larkana',          days: 'Days 4–5',  x: 158, y: 290, desc: 'Gateway to Mohenjo-daro — a planned city of 4,500 years ago still mostly beneath the earth.' },
  { id: 'sukkur',    label: 'Sukkur',           days: 'Days 6–7',  x: 182, y: 256, desc: 'The great Indus crossing. Uch Sharif\'s magnificent Sufi tombs. Sadhu Bela island temple.' },
  { id: 'bahawalpur',label: 'Bahawalpur',       days: 'Days 8–9',  x: 232, y: 228, desc: 'Princely state palaces and Derawar Fort rising from the Cholistan desert.' },
  { id: 'multan',    label: 'Multan',           days: 'Days 10–11',x: 218, y: 196, desc: 'The City of Saints. Five hundred shrines, the Shrine of Bahauddin Zakariya, and kashi blue-tile craft.' },
  { id: 'harappa',   label: 'Harappa',          days: 'Day 12',    x: 248, y: 168, desc: 'The northern Indus city — twin of Mohenjo-daro. The site where the Indus script was first found.' },
  { id: 'lahore',    label: 'Lahore',           days: 'Days 12–14',x: 278, y: 145, desc: 'The Mughal capital. Lahore Fort, Badshahi Mosque, Shalimar Gardens (all UNESCO). The finest food in Pakistan.' },
  { id: 'islamabad', label: 'Islamabad',        days: 'Day 15–16', x: 248, y: 100, desc: 'The planned capital. Faisal Mosque, Margalla Hills, and the old bazaars of Rawalpindi.' },
]

const ROUTE_POINTS = STOPS.map(s => `${s.x},${s.y}`).join(' ')

// Simplified Pakistan outline — stylised for clarity
const PAKISTAN_PATH = `
  M 80,52 L 120,32 L 165,25 L 215,20 L 248,32 L 268,52 L 295,98
  L 308,148 L 300,188 L 278,232 L 248,278 L 198,355 L 162,395
  L 128,432 L 88,432 L 58,415 L 38,378 L 28,328 L 32,268
  L 42,198 L 55,132 L 68,88 Z
`

export default function IndusRouteMap() {
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
          aria-label="Route map: The Civilisations of the Indus"
        >
          {/* Country fill */}
          <path
            d={PAKISTAN_PATH}
            fill="rgba(240,235,224,0.35)"
            stroke="rgba(139,105,20,0.4)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Route line */}
          <polyline
            points={ROUTE_POINTS}
            fill="none"
            stroke="rgba(139,105,20,0.5)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Direction arrows along route */}
          {STOPS.slice(0, -1).map((stop, i) => {
            const next = STOPS[i + 1]
            const mx = (stop.x + next.x) / 2
            const my = (stop.y + next.y) / 2
            const angle = Math.atan2(next.y - stop.y, next.x - stop.x) * (180 / Math.PI)
            return (
              <g key={`arrow-${i}`} transform={`translate(${mx},${my}) rotate(${angle})`}>
                <polygon points="-3,2 3,0 -3,-2" fill="rgba(139,105,20,0.6)" />
              </g>
            )
          })}

          {/* City dots */}
          {STOPS.map((stop) => (
            <g
              key={stop.id}
              style={{ cursor: 'pointer' }}
              onClick={() => setActive(active === stop.id ? null : stop.id)}
            >
              {/* Outer ring on hover */}
              <circle
                cx={stop.x}
                cy={stop.y}
                r={active === stop.id ? 9 : 0}
                fill="none"
                stroke="rgba(139,105,20,0.35)"
                strokeWidth="1"
              />
              {/* Main dot */}
              <circle
                cx={stop.x}
                cy={stop.y}
                r={active === stop.id ? 5 : 4}
                fill={active === stop.id ? '#8b6914' : 'rgba(139,105,20,0.75)'}
                stroke="rgba(250,248,244,0.8)"
                strokeWidth="1.5"
              />
              {/* Label */}
              <text
                x={stop.x + 8}
                y={stop.y + 4}
                fontFamily="var(--font-body)"
                fontSize="8"
                fill={active === stop.id ? '#8b6914' : 'rgba(26,26,26,0.7)'}
                fontWeight={active === stop.id ? '600' : '400'}
                letterSpacing="0.04em"
              >
                {stop.label}
              </text>
            </g>
          ))}

          {/* Start marker */}
          <text x="130" y="448" fontFamily="var(--font-body)" fontSize="7" fill="rgba(107,107,107,0.6)" letterSpacing="0.08em">
            START
          </text>
          {/* End marker */}
          <text x="250" y="94" fontFamily="var(--font-body)" fontSize="7" fill="rgba(107,107,107,0.6)" letterSpacing="0.08em">
            END
          </text>
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
                    background: 'none',
                    border: 'none',
                    borderTop: i === 0 ? '1px solid rgba(107,107,107,0.2)' : 'none',
                    borderBottom: '1px solid rgba(107,107,107,0.2)',
                    padding: '0.65rem 0',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
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
