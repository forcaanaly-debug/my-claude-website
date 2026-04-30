'use client'

import { useState } from 'react'

const STOPS = [
  { id: 'islamabad', label: 'Islamabad',   days: 'Days 1 & 16–17', x: 182, y: 310, desc: 'Departure and return hub. Faisal Mosque, Margalla Hills, and the Mughal-era bazaars of Rawalpindi next door.' },
  { id: 'skardu',    label: 'Skardu',      days: 'Days 2 & 15',    x: 220, y: 215, desc: 'Gateway to K2 and the Baltoro Glacier. The Skardu Valley sits at 2,500 metres, ringed by 6,000-metre peaks. Kharpocho Fort watches over the Indus.' },
  { id: 'shigar',    label: 'Shigar',      days: 'Days 2–3 & 6',   x: 240, y: 200, desc: 'An apricot-orchard valley with a 17th-century raja\'s palace — now a heritage hotel. The old wooden mosque of Amburiq is one of the finest in Baltistan.' },
  { id: 'khaplu',   label: 'Khaplu',      days: 'Days 4–5',       x: 272, y: 195, desc: 'Seat of the Yabgo dynasty. The restored Khaplu Palace commands the Shyok Valley. Chaqchan Mosque (AD 1370) is the oldest surviving mosque in Pakistan.' },
  { id: 'gilgit',   label: 'Gilgit',      days: 'Days 7 & 14',    x: 168, y: 195, desc: 'The regional capital of Gilgit-Baltistan. A market town at the junction of three mountain ranges, with the Kargah Buddha carved into the cliff above the river.' },
  { id: 'hunza',    label: 'Hunza',       days: 'Days 8–11 & 13', x: 152, y: 168, desc: 'The most celebrated valley in Pakistan. Altit and Baltit Forts — nine centuries of Mir of Hunza\'s rule. Terraced apricot gardens. Rakaposhi (7,788m) on the horizon.' },
  { id: 'sost',     label: 'Sost',        days: 'Day 12',         x: 138, y: 138, desc: 'The last town before China, at 2,800 metres. The Karakorum Highway becomes rougher here. At night the stars are absolute.' },
  { id: 'khunjerab',label: 'Khunjerab',   days: 'Day 13',         x: 128, y: 112, desc: 'The roof of the world — 4,693 metres. The world\'s highest paved international border crossing. Snow leopards and Marco Polo sheep roam the pass.' },
]

// Route sequence with transport type: 'fly' | 'drive'
const ROUTE_SEQUENCE = [
  { from: 'islamabad', to: 'skardu',    transport: 'fly' as const },
  { from: 'skardu',    to: 'shigar',    transport: 'drive' as const },
  { from: 'shigar',    to: 'khaplu',    transport: 'drive' as const },
  { from: 'khaplu',    to: 'shigar',    transport: 'drive' as const },
  { from: 'shigar',    to: 'gilgit',    transport: 'drive' as const },
  { from: 'gilgit',    to: 'hunza',     transport: 'drive' as const },
  { from: 'hunza',     to: 'sost',      transport: 'drive' as const },
  { from: 'sost',      to: 'khunjerab', transport: 'drive' as const },
  { from: 'khunjerab', to: 'hunza',     transport: 'drive' as const },
  { from: 'hunza',     to: 'gilgit',    transport: 'drive' as const },
  { from: 'gilgit',    to: 'skardu',    transport: 'drive' as const },
  { from: 'skardu',    to: 'islamabad', transport: 'fly' as const },
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

export default function NorthPakistanRouteMap() {
  const [active, setActive] = useState<string | null>(null)
  const activeStop = STOPS.find(s => s.id === active)

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {/* SVG Map */}
      <div style={{ flex: '0 0 auto', position: 'relative' }}>
        <svg
          viewBox="0 0 340 460"
          width="320"
          height="434"
          style={{ display: 'block', maxWidth: '100%' }}
          aria-label="Route map: Where Three Empires Meet — North Pakistan"
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
            const from = getStop(seg.from)
            const to = getStop(seg.to)
            const mx = (from.x + to.x) / 2
            const my = (from.y + to.y) / 2
            const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI)
            const isDashed = seg.transport === 'fly'

            return (
              <g key={i}>
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x}   y2={to.y}
                  stroke={isDashed ? 'rgba(90,120,160,0.55)' : 'rgba(139,105,20,0.5)'}
                  strokeWidth="1.5"
                  strokeDasharray={isDashed ? '2 4' : '4 3'}
                  strokeLinecap="round"
                />
                <g transform={`translate(${mx},${my}) rotate(${angle})`}>
                  <polygon
                    points="-3,2 3,0 -3,-2"
                    fill={isDashed ? 'rgba(90,120,160,0.7)' : 'rgba(139,105,20,0.65)'}
                  />
                </g>
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
              <circle
                cx={stop.x} cy={stop.y} r={active === stop.id ? 9 : 0}
                fill="none"
                stroke="rgba(139,105,20,0.35)"
                strokeWidth="1"
              />
              <circle
                cx={stop.x} cy={stop.y}
                r={active === stop.id ? 5 : 4}
                fill={active === stop.id ? '#8b6914' : 'rgba(139,105,20,0.75)'}
                stroke="rgba(250,248,244,0.8)"
                strokeWidth="1.5"
              />
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

          {/* Legend */}
          <g transform="translate(18,420)">
            <line x1="0" y1="5" x2="18" y2="5" stroke="rgba(139,105,20,0.6)" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="22" y="8" fontFamily="var(--font-body)" fontSize="6.5" fill="rgba(107,107,107,0.75)" letterSpacing="0.06em">Drive</text>
            <line x1="0" y1="18" x2="18" y2="18" stroke="rgba(90,120,160,0.65)" strokeWidth="1.5" strokeDasharray="2 4" />
            <text x="22" y="21" fontFamily="var(--font-body)" fontSize="6.5" fill="rgba(107,107,107,0.75)" letterSpacing="0.06em">Fly</text>
          </g>

          {/* Start/End markers */}
          <text x="185" y="326" fontFamily="var(--font-body)" fontSize="7" fill="rgba(107,107,107,0.6)" letterSpacing="0.08em">START / END</text>
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
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.1em', color: 'var(--color-stone)', flexShrink: 0, minWidth: '72px' }}>
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
