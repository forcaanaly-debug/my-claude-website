'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import IndusRouteMap from '@/components/maps/IndusRouteMap'
import { getTourBySlug } from '@/lib/data/tours'

const CITIES = [
  {
    name: 'Karachi',
    days: 'Days 1 – 2',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    body: 'Pakistan\'s largest city and its commercial heart, Karachi spreads across twenty-five kilometres of Arabian Sea coastline. Built around a natural harbour, it grew from a small Baloch fishing village in the 18th century into South Asia\'s largest port under British rule. Today it is a city of extraordinary energy and the undisputed capital of Pakistani street food — the biryani here is a subject of national debate; the fried fish and malai boti of its coastal restaurants are beyond compare.',
  },
  {
    name: 'Thatta',
    days: 'Day 3 (en route)',
    image: 'https://images.unsplash.com/photo-1567611665672-bc6b2a8cfe74?w=800&q=80',
    body: 'Thatta was the capital of Lower Sindh for five centuries before the Indus shifted course and the city\'s commerce collapsed. The Makli Necropolis on its outskirts is one of the largest Islamic necropolises in the world — 125,000 graves spanning four dynasties, the tombs of Sindhi rulers and Sufi saints carved in elaborate brick and tile. Shah Jahan ordered a great mosque built here in 1647 as an act of gratitude to the city; its 93 blue-tiled domes are among the finest examples of Mughal decorative art in existence.',
  },
  {
    name: 'Hyderabad',
    days: 'Day 3',
    image: 'https://images.unsplash.com/photo-1584802547882-3499a2bb917a?w=800&q=80',
    body: 'Founded in 1768 on a rocky outcrop above the Indus, Hyderabad was the last capital of the Talpur Mirs before the British annexed Sindh in 1843. The city preserves its character in its craft traditions: the Sindhi art of ajrak block-printing — geometric patterns in indigo and madder red — and the mirror-work embroidery of the Thari women are most actively maintained here. The bazaars of the old city reward patience.',
  },
  {
    name: 'Sehwan Sharif',
    days: 'Day 4 (en route)',
    image: 'https://images.unsplash.com/photo-1502003148287-a154dc289a48?w=800&q=80',
    body: 'The town of Sehwan has been a sacred site for at least two thousand years — Alexander the Great captured it in 325 BC. Its modern significance centres entirely on the shrine of Lal Shahbaz Qalandar, the 13th-century Sufi saint whose devotion to ecstatic union with God made him one of the most beloved figures in South Asian Islam. Each Thursday evening the shrine courtyard fills with devotees for the dhammal — a ritual drumming ceremony in which worshippers enter states of ecstatic trance. It is one of the most intense and authentic religious experiences available to a traveller anywhere in Asia.',
  },
  {
    name: 'Larkana & Mohenjo-daro',
    days: 'Days 4 – 5',
    image: 'https://images.unsplash.com/photo-1643661100639-de5cdf7bcb80?w=800&q=80',
    body: 'Larkana is the largest city of Upper Sindh and the gateway to Mohenjo-daro — the "Mound of the Dead." Excavated from 1921, the site reveals a civilisation of astonishing sophistication: gridded streets, a citywide drainage system, standardised bricks, a Great Bath and a Granary, standardised weights and measures — all from 2500 BC, when most of Europe was still in the Neolithic. The Indus script carved on its seals has never been deciphered. A full day here with an archaeological guide transforms an abstract historical fact into something vivid and strange.',
  },
  {
    name: 'Sukkur',
    days: 'Days 6 – 7',
    image: 'https://images.unsplash.com/photo-1684230715200-40f32e068bf2?w=800&q=80',
    body: 'Sukkur sits at the point where the Indus narrows between limestone ridges — a natural crossing used for millennia by armies, merchants, and pilgrims. The Sukkur Barrage (1932), one of the world\'s great early irrigation works, transformed the Sindh desert into farmland that feeds millions. The surrounding region holds the shrine complex of Uch Sharif — a cluster of tombs spanning the 12th to 15th centuries, with tilework and architecture that rivals anything in the subcontinent.',
  },
  {
    name: 'Bahawalpur & Cholistan',
    days: 'Days 8 – 9',
    image: 'https://images.unsplash.com/photo-1636997209370-e2042d01d5a5?w=800&q=80',
    body: 'Bahawalpur was the capital of a Princely State that was one of the wealthiest in British India, its income derived from vast cotton estates along the Sutlej. The Nawabs built with ambition: Noor Mahal (1872) is a Corinthian-colonnaded palace surrounded by Mughal gardens; Darbar Mahal is the state reception palace. Beyond the city, Derawar Fort rises from the flat Cholistan desert — thirty-metre bastions visible for miles, flanked by a Mughal mosque of extraordinary quality.',
  },
  {
    name: 'Multan',
    days: 'Days 10 – 11',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    body: 'Multan is one of the oldest continuously inhabited cities in South Asia — mentioned in Sanskrit texts as Kashyapapura, conquered by Alexander the Great in 325 BC. Its epithet, the City of Saints, is earned: more than five hundred shrines lie within its historic area, the most celebrated being the Shrine of Bahauddin Zakariya (13th century), founder of the Suhrawardiyya Sufi order. Multan also produces the finest blue kashi-glazed pottery in Pakistan, made by family workshops whose methods are unchanged from the Mughal period.',
  },
  {
    name: 'Harappa',
    days: 'Day 12 (en route)',
    image: 'https://images.unsplash.com/photo-1682686581362-796145f0e123?w=800&q=80',
    body: 'Harappa gave the Indus Valley Civilisation its alternative name. Contemporary with Mohenjo-daro, it was a planned city of the third millennium BC — gridded streets, standardised weights, a sophisticated drainage system, and the same undeciphered script. The Indus script tablets were first recovered here in the 1820s by British railway engineers who used the ancient fired bricks for railway ballast, unknowingly destroying much of the upper levels. What remains is still extraordinary.',
  },
  {
    name: 'Lahore',
    days: 'Days 12 – 14',
    image: 'https://images.unsplash.com/photo-1653023102302-247f5f0fbdd1?w=800&q=80',
    body: 'Lahore is Pakistan\'s cultural and intellectual capital — the city the Mughals loved above all others. Akbar made it his primary residence. Jahangir is buried here in a garden mausoleum at Shahdara. Shah Jahan built the Shalimar Gardens in its suburbs. The Lahore Fort and Badshahi Mosque form one of the great architectural ensembles of the Islamic world. The walled city preserves Mughal-era havelis, Sufi shrines, and Pakistan\'s most celebrated food street — a cultural density that few cities anywhere can match.',
  },
  {
    name: 'Islamabad',
    days: 'Days 15 – 16',
    image: 'https://images.unsplash.com/photo-1684230715200-40f32e068bf2?w=800&q=80',
    body: 'Pakistan\'s capital was purpose-built in the 1960s from the foothills of the Margalla Hills, designed by Greek urbanist Konstantinos Doxiadis as a green, planned contrast to the chaos of Karachi. The Faisal Mosque (1988), its tent-like roof designed by Vedat Dalokay, is one of the largest in the world and the city\'s defining landmark. Adjacent Rawalpindi preserves the old colonial and pre-colonial city in its bazaars, mosques, and cantonment lanes.',
  },
]

export default function IndusCivilisationsPage() {
  const tour = getTourBySlug('indus-civilisations')!
  const [openDay, setOpenDay] = useState<number | null>(1)
  const [formState, setFormState] = useState<'idle' | 'success'>('idle')

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', height: '70vh', minHeight: '500px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <Image
          src="https://images.unsplash.com/photo-1567611665672-bc6b2a8cfe74?w=1600&q=85"
          alt="Badshahi Mosque, Lahore"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,15,15,0.1) 0%, rgba(15,15,15,0.72) 100%)', zIndex: 1 }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 2, paddingBottom: 'clamp(2.5rem, 6vw, 6rem)', width: '100%' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.25rem' }}>
            {[{ label: 'Home', href: '/' }, { label: 'Destinations', href: '/destinations' }, { label: 'Pakistan', href: '/destinations/pakistan' }, { label: 'Civilisations of the Indus', href: '/tours/indus-civilisations' }].map((c, i) => (
              <span key={c.href} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {i > 0 && <span style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.65rem' }}>—</span>}
                <Link href={c.href} style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: i === 3 ? 'var(--color-bronze-pale)' : 'rgba(245,240,232,0.5)', textDecoration: 'none' }}>
                  {c.label}
                </Link>
              </span>
            ))}
          </div>
          <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '0.75rem' }}>Southern Pakistan</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 6vw, 5rem)',
            fontWeight: 300,
            color: 'var(--color-offwhite)',
            lineHeight: 1.0,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            maxWidth: '780px',
          }}>
            The Civilisations of the Indus
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: 'rgba(245,240,232,0.75)', maxWidth: '540px', lineHeight: 1.5 }}>
            Sixteen days tracing five millennia of civilisation along the great river of South Asia
          </p>
        </div>
      </section>

      {/* FACTS BAR */}
      <div style={{ background: 'var(--color-charcoal)', borderBottom: '1px solid rgba(107,107,107,0.2)', padding: '1.25rem 0' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { label: 'Duration', value: '16 Days' },
              { label: 'Route', value: 'Karachi → Islamabad' },
              { label: 'Group Size', value: '2 – 8 People' },
              { label: 'Category', value: 'Cultural Journey' },
              { label: 'Difficulty', value: 'Easy' },
              { label: 'Price', value: '$9,000 per person' },
              { label: 'Basis', value: 'Twin Sharing' },
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
                No river on earth has more to say than the Indus.
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
              {/* Route Map */}
              <p className="text-eyebrow" style={{ marginBottom: '1.25rem' }}>The Route</p>
              <div style={{ background: 'var(--color-sand)', padding: '1.75rem', border: '1px solid rgba(107,107,107,0.12)' }}>
                <IndusRouteMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section style={{ background: 'var(--color-charcoal)' }} className="section-padding">
        <div className="container-wide">
          <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '0.75rem' }}>The Destinations</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--color-offwhite)', lineHeight: 1.15, marginBottom: '3rem' }}>
            Eleven cities. Five thousand years.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {CITIES.map((city, i) => (
              <div
                key={city.name}
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
                      {city.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-bronze-pale)' }}>
                      {city.days}
                    </p>
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-stone)', lineHeight: 1.8 }}>
                  {city.body}
                </p>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(107,107,107,0.2)' }} />
          </div>
        </div>
      </section>

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
              {/* Price summary */}
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--color-charcoal)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '0.5rem' }}>
                  Price Per Person
                </p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 300, color: 'var(--color-offwhite)', lineHeight: 1, marginBottom: '0.35rem' }}>
                  $9,000
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-stone)' }}>
                  Twin sharing basis · 16 days · Karachi to Islamabad
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-stone)', marginTop: '0.35rem' }}>
                  Single supplement available on request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENQUIRE SECTION */}
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

              {/* Option 1: Sign Up */}
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

              {/* Option 2: Request Itinerary */}
              <div style={{ background: 'var(--color-charcoal)', padding: '2.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--color-bronze)', marginBottom: '1rem', lineHeight: 1 }}>02</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 400, color: 'var(--color-offwhite)', letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
                  Request Detailed Itinerary
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-stone)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  Receive a full day-by-day itinerary with accommodation names, all activities, and pre-departure information.
                </p>
                <Link
                  href="/contact?tour=indus-civilisations&action=itinerary"
                  className="btn btn-ghost"
                  style={{ display: 'block', textAlign: 'center' }}
                >
                  Request Itinerary
                </Link>
              </div>

              {/* Option 3: Talk to a Representative */}
              <div style={{ background: 'var(--color-charcoal)', padding: '2.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--color-bronze)', marginBottom: '1rem', lineHeight: 1 }}>03</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 400, color: 'var(--color-offwhite)', letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
                  Talk to a Representative
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-stone)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  Speak directly with one of our Pakistan specialists. We'll discuss your travel dates, group size, and any customisations.
                </p>
                <Link
                  href="/contact?tour=indus-civilisations&action=call"
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
