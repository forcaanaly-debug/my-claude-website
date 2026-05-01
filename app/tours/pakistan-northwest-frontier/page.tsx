'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NorthwestRouteMap from '@/components/maps/NorthwestRouteMap'
import { getTourBySlug } from '@/lib/data/tours'

const DESTINATIONS = [
  {
    name: 'Islamabad',
    days: 'Days 1 & 17–18',
    body: 'Pakistan\'s planned capital sits at the foot of the Margalla Hills — purpose-built in the 1960s on a grid of wide boulevards and green sectors, designed as a deliberate contrast to Karachi\'s density. The Faisal Mosque (1988), its tent-like concrete shell designed by Turkish architect Vedat Dalokay, is one of the world\'s largest and the city\'s defining landmark. Adjacent Rawalpindi preserves all the texture of a pre-modern South Asian bazaar city in its Mughal-era lanes and cantonment architecture. The journey begins and ends here.',
  },
  {
    name: 'Peshawar',
    days: 'Days 2–3',
    body: 'Peshawar is the old Mughal gateway to Central Asia — the city where the Grand Trunk Road, carrying every army and merchant caravan from Kabul to Calcutta, entered the subcontinent. The Qissa Khwani Bazaar, the Storytellers\' Bazaar, was once the place where travellers exchanged news from Afghanistan, Persia, and the Silk Road cities. It retains that character. Mahabat Khan Mosque (1670) is the finest Mughal mosque in Khyber Pakhtunkhwa. The Peshawar Museum holds the finest collection of Gandharan Buddhist sculpture in Pakistan — including the Fasting Buddha, one of the most celebrated works in Asian art history.',
  },
  {
    name: 'Takht-i-Bahi & Swat',
    days: 'Days 4–5',
    body: 'The drive from Peshawar stops at Takht-i-Bahi (UNESCO) — a Buddhist monastery complex on a hilltop occupied continuously from the 1st century BC to the 7th century AD, abandoned only when Buddhism retreated from the subcontinent. The site is one of the best-preserved in South Asia: stupas, monks\' cells, meditation courts, and a great stupa court still carrying its original walls. The Swat Valley below was the ancient kingdom of Uddiyana, where the Buddha is said to have preached. Butkara Stupa (2nd century BC) and the Swat Museum — seven centuries of Gandharan art from the valley\'s own excavations — complete two days of remarkable Buddhist heritage.',
  },
  {
    name: 'Ayun & the Kalash Valleys',
    days: 'Days 6–9',
    body: 'Ayun is a quiet village at the entrance to the three Kalash valleys, and the base for four days of immersion in one of the most extraordinary surviving cultures in the world. The Kalash are among the last polytheistic peoples of South Asia — fewer than 4,000 remain, living in Bumburet, Rumbur, and Birir. Their religion predates Islam in these valleys by centuries: a pantheon of gods associated with sky, forest, and hearth; ritual spaces governed by strict rules of purity; carved wooden jestakin shrines on the rooftops of the clan houses. Each of the three valleys receives a full day — Bumburet for its size and accessibility, Rumbur for its quiet and its gandau effigies, Birir for being the most traditional and the least visited. The Chilim Josh festival (late April) transforms the valleys with a week of communal feasting, singing, and dance; where possible, we align departures with it.',
  },
  {
    name: 'Chitral',
    days: 'Days 10–11',
    body: 'Chitral city sits at 1,500 metres on the west bank of the Chitral River, in the shadow of Tirich Mir (7,708m) — the highest peak of the Hindu Kush. The Mehtar of Chitral ruled this valley for centuries as an independent state, managing the Great Game powers with the confidence of a dynasty that understood mountain terrain better than any foreign army could. Chitral Fort, where a famous British relief expedition arrived in 1895 after a 46-day siege by Pashtun tribesmen, is one of the region\'s most evocative sites. The bazaar is known for its gem traders (tourmalines and aquamarines from the surrounding hills), Chitrali pakol caps, and hand-embroidered textiles.',
  },
  {
    name: 'Mastuj',
    days: 'Day 12',
    body: 'The drive northeast from Chitral follows the Chitral River upstream for three hours through a landscape of carved-timber villages and terraced fields. Mastuj sits at the confluence of the Yarkhun and Mastuj rivers — the last significant settlement before the high passes that lead toward Afghanistan, over the Baroghil into what is now China, and up to the Shandur. Mastuj Fort was a British Great Game garrison post. The valley is very quiet and very beautiful, and overnight here — before the long mountain crossing ahead — is one of the moments when the remoteness of the programme becomes fully clear.',
  },
  {
    name: 'Shandur Pass & Phander',
    days: 'Day 13',
    body: 'The crossing from Mastuj to Ghizer is one of the great mountain drives of Pakistan. The Shandur Pass at 3,734 metres is a broad plateau where Chitral and Gilgit have played polo against each other every July for over a century — a tournament with no referees and very few rules, the most ancient and the most vivid version of the game played anywhere on earth. The descent into Ghizer reveals the Phander Lake: a sheet of glacial blue-green water beneath snow-dusted peaks, so clear and so improbably coloured that photographs of it read as implausible. It is one of the most beautiful places in Pakistan.',
  },
  {
    name: 'Gilgit',
    days: 'Days 14–15',
    body: 'Gilgit is the regional capital of Gilgit-Baltistan — the mountain trading hub at the convergence of the Karakoram, Himalaya, and Hindu Kush. The Kargah Buddha, a 7th-century standing figure carved into a cliff face above the river, is the oldest surviving monument in the city and one of the most atmospheric Silk Road sites in the region. The bazaar connects three mountain worlds: dried apricots from Hunza, Chitrali caps from the northwest, rough rubies and tourmalines from the local mines, and goods from China brought down the KKH. The polo ground is the oldest in Gilgit-Baltistan.',
  },
  {
    name: 'Skardu',
    days: 'Day 16',
    body: 'The drive east from Gilgit follows the Indus gorge to Skardu — five to six hours through some of the most dramatic river scenery on earth, stopping at Chilas for the densest concentration of rock art in the world: over 50,000 petroglyphs spanning 3,000 years, from ibex hunts and Buddhist votive carvings to Islamic inscriptions left by Silk Road travellers. Skardu itself, at 2,228 metres, is the gateway to K2 and the Karakoram. Kharpocho Fort watches from its outcrop above the valley. The morning mountain flight back to Islamabad — K2 and Nanga Parbat visible from the window on clear days — is the programme\'s parting image.',
  },
]

export default function NorthwestFrontierPage() {
  const tour = getTourBySlug('pakistan-northwest-frontier')!
  const [openDay, setOpenDay] = useState<number | null>(1)
  const [formState, setFormState] = useState<'idle' | 'success'>('idle')

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', height: '70vh', minHeight: '500px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <Image
          src="https://images.unsplash.com/photo-1502003148287-a154dc289a48?w=1600&q=85"
          alt="Kalash valley, Chitral, KPK Pakistan"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,15,15,0.1) 0%, rgba(15,15,15,0.72) 100%)', zIndex: 1 }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 2, paddingBottom: 'clamp(2.5rem, 6vw, 6rem)', width: '100%' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.25rem' }}>
            {[
              { label: 'Home', href: '/' },
              { label: 'Destinations', href: '/destinations' },
              { label: 'Pakistan', href: '/destinations/pakistan' },
              { label: 'Buddha & the Last Pagan Tribes', href: '/tours/pakistan-northwest-frontier' },
            ].map((c, i) => (
              <span key={c.href} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {i > 0 && <span style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.65rem' }}>—</span>}
                <Link href={c.href} style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: i === 3 ? 'var(--color-bronze-pale)' : 'rgba(245,240,232,0.5)', textDecoration: 'none' }}>
                  {c.label}
                </Link>
              </span>
            ))}
          </div>
          <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '0.75rem' }}>Khyber Pakhtunkhwa & Gilgit-Baltistan</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5.5vw, 4.75rem)',
            fontWeight: 300,
            color: 'var(--color-offwhite)',
            lineHeight: 1.0,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            maxWidth: '840px',
          }}>
            Buddha & the Last Pagan Tribes of Kalash
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: 'rgba(245,240,232,0.75)', maxWidth: '580px', lineHeight: 1.5 }}>
            {tour.tagline}
          </p>
        </div>
      </section>

      {/* FACTS BAR */}
      <div style={{ background: 'var(--color-charcoal)', borderBottom: '1px solid rgba(107,107,107,0.2)', padding: '1.25rem 0' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { label: 'Duration',   value: '18 Days' },
              { label: 'Route',      value: 'Islamabad → Peshawar → Skardu → Islamabad' },
              { label: 'Group Size', value: '2 – 8 People' },
              { label: 'Category',   value: 'Cultural Journey' },
              { label: 'Difficulty', value: 'Moderate' },
              { label: 'Price',      value: '$8,999 per person' },
              { label: 'Basis',      value: 'Twin Sharing' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '2px' }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-offwhite)' }}>
                  {item.value}
                </div>
              </div>
            ))}
            <div style={{ marginLeft: 'auto' }}>
              <a href="#enquire" className="btn btn-bronze">Enquire Now</a>
            </div>
          </div>
        </div>
      </div>

      {/* INTRODUCTION */}
      <section style={{ background: 'var(--color-offwhite)' }} className="section-padding">
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'start' }}>
            <div>
              <p className="text-eyebrow" style={{ marginBottom: '1rem' }}>About This Journey</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--color-charcoal)', marginBottom: '2rem', lineHeight: 1.15 }}>
                Two thousand years of faith in a single landscape.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {tour.overview.split('\n\n').map((para, i) => (
                  <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-stone)', lineHeight: 1.85 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-eyebrow" style={{ marginBottom: '1.25rem' }}>The Route</p>
              <div style={{ background: 'var(--color-sand)', padding: '1.75rem', border: '1px solid rgba(107,107,107,0.12)' }}>
                <NorthwestRouteMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section style={{ background: 'var(--color-charcoal)' }} className="section-padding">
        <div className="container-wide">
          <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '0.75rem' }}>The Destinations</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--color-offwhite)', lineHeight: 1.15, marginBottom: '3rem' }}>
            Mughal gateways. Buddhist ruins. The last pagan valleys of South Asia.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {DESTINATIONS.map((dest, i) => (
              <div
                key={dest.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: '3rem',
                  padding: '2.5rem 0',
                  borderTop: '1px solid rgba(107,107,107,0.2)',
                  alignItems: 'start',
                }}
              >
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--color-stone)', flexShrink: 0, marginTop: '0.3rem', minWidth: '2rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 400, color: 'var(--color-offwhite)', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: '0.3rem' }}>
                      {dest.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-bronze-pale)' }}>
                      {dest.days}
                    </p>
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-stone)', lineHeight: 1.8 }}>
                  {dest.body}
                </p>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(107,107,107,0.2)' }} />
          </div>
        </div>
      </section>

      {/* CHILIM JOSH CALLOUT */}
      <div style={{ background: 'rgba(139,105,20,0.12)', borderTop: '1px solid rgba(139,105,20,0.25)', borderBottom: '1px solid rgba(139,105,20,0.25)', padding: '2rem 0' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flexShrink: 0 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-bronze)', marginBottom: '0.35rem' }}>Festival Timing</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 300, color: 'var(--color-charcoal)', letterSpacing: '-0.01em' }}>Chilim Josh — Late April</p>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-stone)', lineHeight: 1.75, maxWidth: '620px' }}>
              The Kalash spring festival marks the return of the flocks from the winter lowlands with a week of communal feasting, singing, and dance across all three valleys. We offer departures timed to arrive in the Kalash Valleys during Chilim Josh. If this is important to your trip, mention it when enquiring and we will align your dates accordingly.
            </p>
          </div>
        </div>
      </div>

      {/* ITINERARY */}
      <section style={{ background: 'var(--color-sand)' }} className="section-padding">
        <div className="container-wide">
          <p className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Day by Day</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--color-charcoal)', lineHeight: 1.15, marginBottom: '3rem' }}>
            Draft Itinerary
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {tour.itinerary.map(day => (
              <div key={day.day} style={{ borderTop: '1px solid rgba(107,107,107,0.2)' }}>
                <button
                  onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                  style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', textAlign: 'left' }}
                >
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.14em', color: 'var(--color-stone)', flexShrink: 0, minWidth: '3.5rem' }}>
                      Day {day.day}
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--color-charcoal)', letterSpacing: '-0.01em' }}>
                      {day.title}
                    </span>
                  </div>
                  <span style={{ color: 'var(--color-bronze)', fontSize: '1.1rem', transition: 'transform 0.2s', transform: openDay === day.day ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
                </button>
                {openDay === day.day && (
                  <div style={{ paddingBottom: '1.75rem', paddingLeft: 'calc(3.5rem + 1.5rem)' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-stone)', lineHeight: 1.8, marginBottom: day.accommodation ? '0.75rem' : 0 }}>
                      {day.description}
                    </p>
                    {day.accommodation && (
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-stone)', letterSpacing: '0.04em' }}>
                        <span style={{ color: 'var(--color-bronze)' }}>Accommodation: </span>{day.accommodation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(107,107,107,0.2)' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-stone)', marginTop: '1.5rem', fontStyle: 'italic' }}>
            This is a draft itinerary. Final programme is tailored to your travel dates, interests, and group size.
          </p>
        </div>
      </section>

      {/* INCLUDED / EXCLUDED */}
      <section style={{ background: 'var(--color-offwhite)' }} className="section-padding">
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            <div>
              <p className="text-eyebrow" style={{ marginBottom: '1.25rem' }}>What's Included</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {tour.included.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid rgba(107,107,107,0.1)', paddingBottom: '0.6rem' }}>
                    <span style={{ color: 'var(--color-bronze)', flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-charcoal)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-eyebrow" style={{ marginBottom: '1.25rem' }}>Not Included</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {tour.excluded.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid rgba(107,107,107,0.1)', paddingBottom: '0.6rem' }}>
                    <span style={{ color: 'var(--color-stone)', flexShrink: 0 }}>○</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-stone)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--color-charcoal)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '0.5rem' }}>
                  Price Per Person
                </p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 300, color: 'var(--color-offwhite)', lineHeight: 1, marginBottom: '0.35rem' }}>
                  $8,999
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-stone)' }}>
                  Twin sharing basis · 18 days · Islamabad circuit
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-stone)', marginTop: '0.35rem' }}>
                  Single supplement available on request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENQUIRE */}
      <section id="enquire" style={{ background: 'var(--color-charcoal)' }} className="section-padding">
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '0.75rem' }}>Next Steps</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--color-offwhite)', lineHeight: 1.1, marginBottom: '1rem' }}>
              Ready to begin?
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-stone)', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto' }}>
              Choose how you'd like to proceed. We respond to all enquiries within 24 hours.
            </p>
          </div>

          {formState === 'success' ? (
            <div style={{ textAlign: 'center', padding: '3rem', border: '1px solid rgba(139,105,20,0.4)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--color-offwhite)', marginBottom: '0.75rem' }}>
                Thank you — we'll be in touch within 24 hours.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-stone)' }}>
                In the meantime, feel free to explore our other Pakistan programmes.
              </p>
              <Link href="/destinations/pakistan" className="btn btn-ghost" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
                Back to Pakistan
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'rgba(107,107,107,0.2)' }}>

              <div style={{ background: 'var(--color-charcoal)', padding: '2.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--color-bronze)', marginBottom: '1rem', lineHeight: 1 }}>01</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 400, color: 'var(--color-offwhite)', letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
                  Sign Up
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-stone)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  Reserve your place on the next departure. We'll confirm dates and collect your deposit to secure the booking.
                </p>
                <button
                  onClick={() => setFormState('success')}
                  className="btn btn-bronze"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Reserve My Place
                </button>
              </div>

              <div style={{ background: 'var(--color-charcoal)', padding: '2.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--color-bronze)', marginBottom: '1rem', lineHeight: 1 }}>02</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 400, color: 'var(--color-offwhite)', letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
                  Request Detailed Itinerary
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-stone)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  Receive a full day-by-day itinerary with accommodation names, all activities, and pre-departure information.
                </p>
                <Link
                  href="/contact?tour=pakistan-northwest-frontier&action=itinerary"
                  className="btn btn-ghost"
                  style={{ display: 'block', textAlign: 'center' }}
                >
                  Request Itinerary
                </Link>
              </div>

              <div style={{ background: 'var(--color-charcoal)', padding: '2.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--color-bronze)', marginBottom: '1rem', lineHeight: 1 }}>03</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 400, color: 'var(--color-offwhite)', letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
                  Talk to a Representative
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-stone)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  Speak directly with one of our Pakistan specialists. We'll discuss your travel dates, group size, and any customisations — including Chilim Josh timing.
                </p>
                <Link
                  href="/contact?tour=pakistan-northwest-frontier&action=call"
                  className="btn btn-ghost"
                  style={{ display: 'block', textAlign: 'center' }}
                >
                  Get in Touch
                </Link>
              </div>

            </div>
          )}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ background: 'var(--color-sand)', padding: '4rem 0' }}>
        <div className="container-narrow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <p className="text-eyebrow" style={{ marginBottom: '0.5rem' }}>Explore More</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--color-charcoal)', letterSpacing: '-0.01em' }}>
              Other Pakistan Programmes
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/destinations/pakistan" className="btn btn-outline">
              All Pakistan Regions
            </Link>
            <Link href="/tours" className="btn btn-outline">
              All Tours
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
