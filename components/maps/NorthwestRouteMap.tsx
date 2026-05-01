'use client'

import { useState } from 'react'

const STOPS = [
  { id: 'islamabad', label: 'Islamabad',      days: 'Days 1 & 17–18', x: 248, y: 100, desc: 'Departure and return hub. Faisal Mosque, Margalla Hills, and the Mughal-era bazaars of Rawalpindi — the old city that preceded the capital.' },
  { id: 'peshawar',  label: 'Peshawar',       days: 'Days 2–3',       x: 210, y: 90,  desc: 'The old Mughal gateway to Central Asia. Qissa Khwani Bazaar (the Storytellers\' Bazaar), Mahabat Khan Mosque (1670), and the finest Gandharan sculpture collection in Pakistan at the Peshawar Museum.' },
  { id: 'swat',      label: 'Swat',           days: 'Days 4–5',       x: 222, y: 70,  desc: 'The ancient Uddiyana kingdom, where the Buddha is said to have visited. Takht-i-Bahi Buddhist monastery (UNESCO, 1st century BC), Butkara Stupa, and the Swat Museum — seven centuries of Gandharan Buddhist art.' },
  { id: 'ayun',      label: 'Ayun / Kalash',  days: 'Days 6–9',       x: 197, y: 49,  desc: 'Base for all three Kalash valleys. Bumburet (the largest), Rumbur (the quietest), and Birir (the most traditional) — each day a full immersion into a pre-Islamic culture that has survived unchanged in these high valleys for centuries. Chilim Josh spring festival in late April.' },
  { id: 'chitral',   label: 'Chitral',        days: 'Days 10–11',     x: 191, y: 43,  desc: 'District capital under Tirich Mir (7,708m — the highest peak of the Hindu Kush). Chitral Fort, the Mehtar\'s palace, gem traders, and the ancestral home of Pakistani polo — a version of the game far older than any other.' },
  { id: 'mastuj',    label: 'Mastuj',         days: 'Day 12',         x: 208, y: 31,  desc: 'A frontier outpost at the confluence of the Yarkhun and Mastuj rivers. Mastuj Fort was a British Great Game garrison. The surrounding valley is very quiet, very beautiful, and almost entirely unvisited.' },
  { id: 'shandur',   label: 'Shandur / Gupis',days: 'Day 13',         x: 232, y: 29,  desc: 'The Shandur Pass (3,734m) — the Roof of the World polo ground, where Chitral and Gilgit play each July. Then the descent to Phander Lake: a sheet of extraordinary blue-green glacial water beneath snow peaks, one of Pakistan\'s most beautiful spots.' },
  { id: 'gilgit',    label: 'Gilgit',         days: 'Days 14–15',     x: 253, y: 46,  desc: 'The mountain trading hub at the junction of three great ranges. Kargah Buddha (7th century). The ancient polo ground. A bazaar where goods from China, Central Asia, and the Punjab plains all converge.' },
  { id: 'skardu',    label: 'Skardu',         days: 'Day 16',         x: 272, y: 65,  desc: 'Gateway to K2 and the Karakoram. Kharpocho Fort above the Indus. The mountain flight back to Islamabad — K2, Nanga Parbat, and the great peaks visible from the window.' },
]

const ROUTE_SEQUENCE = [
  { from: 'islamabad', to: 'peshawar',  transport: 'drive' as const },
  { from: 'peshawar',  to: 'swat',      transport: 'drive' as const },
  { from: 'swat',      to: 'ayun',      transport: 'drive' as const },
  { from: 'ayun',      to: 'chitral',   transport: 'drive' as const },
  { from: 'chitral',   to: 'mastuj',    transport: 'drive' as const },
  { from: 'mastuj',    to: 'shandur',   transport: 'drive' as const },
  { from: 'shandur',   to: 'gilgit',    transport: 'drive' as const },
  { from: 'gilgit',    to: 'skardu',    transport: 'drive' as const },
  { from: 'skardu',    to: 'islamabad', transport: 'fly'   as const },
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

export default function NorthwestRouteMap() {
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
          aria-label="Route map: Buddha & the Last Pagan Tribes of Kalash"
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
            const to   = getStop(seg.to)
            const mx   = (from.x + to.x) / 2
            const my   = (from.y + to.y) / 2
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

          <text x="250" y="116" fontFamily="var(--font-body)" fontSize="7" fill="rgba(107,107,107,0.6)" letterSpacing="0.08em">START / END</text>
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
