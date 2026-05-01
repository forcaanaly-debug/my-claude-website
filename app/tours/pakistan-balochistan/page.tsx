'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BalochistandRouteMap from '@/components/maps/BalochistandRouteMap'
import { getTourBySlug } from '@/lib/data/tours'

const DESTINATIONS = [
  {
    name: 'Karachi',
    days: 'Days 1–2',
    body: 'Pakistan\'s largest city — a metropolis of twenty million people built around a natural harbour on the Arabian Sea that the Baloch and Sindhi peoples knew long before the British turned it into the subcontinent\'s largest port. Karachi has been the commercial capital of Pakistan since independence and retains that intensity: a city of extraordinary energy, extraordinary food, and extraordinary scale. The Mazar-e-Quaid — the marble mausoleum of Muhammad Ali Jinnah, set in formal gardens at the centre of the city — is a fitting place to begin a journey that will end at the house where he died. Mohatta Palace (1927), a Jodhpur sandstone building repurposed as a museum, holds the finest collection of Sindhi cultural heritage in the country.',
  },
  {
    name: 'Ormara & the Makran Coast',
    days: 'Days 3–4',
    body: 'The Makran Coastal Highway leaves Karachi heading west — a road that was completed only in 2004 and that opened, for the first time, the possibility of driving 750 kilometres of Arabian Sea coastline that had previously been accessible only by boat or camel. The journey stops at Kund Malir: a long beach of white sand beneath sculpted sandstone cliffs, one of the finest beaches in Pakistan and almost entirely undeveloped. Hingol National Park passes in a landscape of mud volcanoes and eroded rock formations of lunar character. Ormara itself is a fishing town on a tombolo peninsula — and its Princess of Hope, a natural sandstone arch eroded into the shape of a standing figure above the water, is one of the coast\'s defining images.',
  },
  {
    name: 'Gwadar',
    days: 'Days 5–7',
    body: 'Gwadar is one of the most dramatic geographical settings in Pakistan: a narrow tombolo peninsula extending into the Arabian Sea with water on three sides, the Makran desert behind, and Oman visible on clear days across the water. It is also a city in active transformation — the terminus of the China-Pakistan Economic Corridor, its deep-water port one of the great infrastructure investments of the 21st century. But the Baloch fishing community of East Bay continues as it has for generations, entirely alongside the cranes and construction of the new city. The contrast is one of the most thought-provoking in Pakistan. The day excursion to Ganz — a secluded bay ~40km east, accessible by a rough coastal track — reaches a stretch of coast that sees almost no visitors: wooden boats, hand-laid nets, the catch dried above the beach.',
  },
  {
    name: 'Khuzdar',
    days: 'Day 8',
    body: 'The drive from Gwadar north to Khuzdar is one of the long days of the programme — a full day through terrain that transforms progressively from coastal scrub to high-altitude desert plateau. The road climbs through bare rock mountains that carry no vegetation and almost no sign of human habitation for hours at a time. Khuzdar sits in the heart of central Balochistan\'s highlands, at a crossroads of the old routes between the coast and the interior. Moola Chotok, reached on the drive to Quetta the next morning, is the surprise: a hidden limestone gorge where a stream has carved natural pools and a waterfall into the rock, a place of extraordinary cool and colour amid the surrounding desert.',
  },
  {
    name: 'Quetta',
    days: 'Days 9–11',
    body: 'Quetta is the capital of Balochistan — a city at 1,680 metres, ringed by desert mountains, with the character of a frontier town on a major trade route. Afghan influence is pervasive: the refugee community that arrived after 1979 has never fully left, and the bazaars reflect it. The Liaquat Bazaar is the finest place in Pakistan to buy Baloch tribal jewellery — silver work, lapis lazuli, carnelian, and the mirror-work embroidered textiles of the Baloch women. The Kandahari Bazaar is what a Central Asian spice and dried-fruit market looks like: pine nuts, pistachios, dried apricots, figs, and pomegranate syrup from Kandahar. Hanna Lake and the Hazarganji Chiltan National Park, habitat of the endangered Chiltan markhor, occupy the hills above the city.',
  },
  {
    name: 'Ziarat — Jinnah\'s Hill Residence',
    days: 'Day 11 (excursion)',
    body: 'The drive from Quetta to Ziarat climbs through the world\'s second-largest juniper forest — trees up to 5,000 years old, their bark silver-grey and twisted into forms of great age, covering the hillsides above the valley at 2,449 metres. Ziarat is a hill station of colonial bungalows and orchard gardens, cooler than Quetta and almost out of time. The Quaid-e-Azam Residency (1892) is a wooden colonial bungalow of teak and cedar where Muhammad Ali Jinnah spent his final two months in the summer of 1948, attempting to recover from tuberculosis. He died in September, six weeks after departing. The rooms are preserved as he left them — his reading desk, his medicine chest, his view over the juniper forest. It is among the most quietly powerful heritage sites in Pakistan, and a resonant place to close the journey.',
  },
  {
    name: 'Islamabad',
    days: 'Days 12–13',
    body: 'The flight from Quetta to Islamabad takes an hour and a half and crosses the full width of the Balochistan and Punjab plains. The contrast on landing — from desert frontier to the planned capital\'s wide boulevards and Margalla Hills greenery — is itself part of the journey. The Lok Virsa Folk Heritage Museum holds the finest collection of Pakistani craft, musical instruments, and material culture in the country: a full survey of everything the programme has passed through, from Baloch embroidery to Sindhi ajrak to the carved woodwork of the north. Rawalpindi\'s Raja Bazaar preserves the old market character of a pre-modern Pakistani city.',
  },
]

export default function BalochistandPage() {
  const tour = getTourBySlug('pakistan-balochistan')!
  const [openDay, setOpenDay] = useState<number | null>(1)
  const [formState, setFormState] = useState<'idle' | 'success'>('idle')

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', height: '70vh', minHeight: '500px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85"
          alt="Makran coast, Balochistan, Pakistan"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 50%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,15,15,0.1) 0%, rgba(15,15,15,0.72) 100%)', zIndex: 1 }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 2, paddingBottom: 'clamp(2.5rem, 6vw, 6rem)', width: '100%' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.25rem' }}>
            {[
              { label: 'Home', href: '/' },
              { label: 'Destinations', href: '/destinations' },
              { label: 'Pakistan', href: '/destinations/pakistan' },
              { label: 'Balochistan', href: '/tours/pakistan-balochistan' },
            ].map((c, i) => (
              <span key={c.href} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {i > 0 && <span style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.65rem' }}>—</span>}
                <Link href={c.href} style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: i === 3 ? 'var(--color-bronze-pale)' : 'rgba(245,240,232,0.5)', textDecoration: 'none' }}>
                  {c.label}
                </Link>
              </span>
            ))}
          </div>
          <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '0.75rem' }}>Balochistan</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 6vw, 5rem)',
            fontWeight: 300,
            color: 'var(--color-offwhite)',
            lineHeight: 1.0,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            maxWidth: '800px',
          }}>
            Balochistan — The Forgotten Frontier
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
              { label: 'Duration',   value: '13 Days' },
              { label: 'Route',      value: 'Karachi → Gwadar → Quetta → Islamabad' },
              { label: 'Group Size', value: '2 – 8 People' },
              { label: 'Category',   value: 'Expedition' },
              { label: 'Difficulty', value: 'Moderate' },
              { label: 'Price',      value: '$5,450 per person' },
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
                Pakistan's largest province. Almost no one comes here.
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
                <BalochistandRouteMap />
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
            750km of coastline. The great empty interior. Jinnah's last room.
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
                  $5,450
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-stone)' }}>
                  Twin sharing basis · 13 days · Karachi to Islamabad
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
                  href="/contact?tour=pakistan-balochistan&action=itinerary"
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
                  Speak directly with one of our Pakistan specialists. We'll discuss your travel dates, group size, and any customisations.
                </p>
                <Link
                  href="/contact?tour=pakistan-balochistan&action=call"
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
