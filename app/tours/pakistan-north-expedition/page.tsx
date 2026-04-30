'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NorthPakistanRouteMap from '@/components/maps/NorthPakistanRouteMap'
import { getTourBySlug } from '@/lib/data/tours'

const DESTINATIONS = [
  {
    name: 'Islamabad',
    days: 'Days 1 & 16–17',
    image: 'https://images.unsplash.com/photo-1684230715200-40f32e068bf2?w=800&q=80',
    body: 'Pakistan\'s planned capital sits at the foot of the Margalla Hills — purpose-built in the 1960s to replace Karachi as the seat of government. The Faisal Mosque, completed in 1988 to a design by Turkish architect Vedat Dalokay, is one of the world\'s largest mosques and the city\'s defining landmark. Adjacent Rawalpindi preserves all the texture of a pre-modern South Asian bazaar town in its lanes, mosques, and cantonment architecture. Islamabad is where the journey begins and ends — a fitting contrast to the mountain world in between.',
  },
  {
    name: 'Skardu',
    days: 'Days 2 & 15',
    image: 'https://images.unsplash.com/photo-1636997209370-e2042d01d5a5?w=800&q=80',
    body: 'Skardu sits at 2,228 metres in a broad valley at the junction of the Indus and Shigar rivers. It is the administrative capital of Baltistan and the gateway to the Karakoram\'s high peaks — all K2 expeditions pass through here. The flight from Islamabad is one of the world\'s great short routes: fifty minutes through the heart of the Karakoram with peaks over 7,000 metres below the wingtip. Kharpocho Fort, on its outcrop above the city, has watched the Indus valley since the 16th century.',
  },
  {
    name: 'Shigar',
    days: 'Days 2–3 & 6',
    image: 'https://images.unsplash.com/photo-1502003148287-a154dc289a48?w=800&q=80',
    body: 'The Shigar Valley is forty-five minutes from Skardu and a world apart: apricot and poplar orchards along a clear river, walled villages, and at its centre, the Shigar Fort — a 17th-century palace of the Amacha dynasty, now painstakingly restored by the Aga Khan Trust and operating as a heritage hotel. The fort\'s carved wooden interiors, the centuries-old Amburiq Mosque with its Tibetan-Buddhist timber architecture, and the village woodcarving tradition all represent Baltistan at its most distinctive. Nights here, with the peaks turning dark above the orchards, are among the finest on the programme.',
  },
  {
    name: 'Khaplu',
    days: 'Days 4–5',
    image: 'https://images.unsplash.com/photo-1682686581362-796145f0e123?w=800&q=80',
    body: 'Khaplu is the historic capital of the former Princely State of Ghanche, seat of the Yabgo dynasty — who ruled this valley for centuries from their palace on the hillside above the Shyok River. The Khaplu Palace, another Aga Khan Trust restoration, is among the finest heritage hotels in Asia: terrace gardens, carved wooden screens, and views across the Karakoram to the peaks of the Hushe Valley that approach K2. Chaqchan Mosque, built in 1370 by a Kashmiri architect, is the oldest surviving mosque in the Karakoram — its fusion of Kashmiri and Tibetan architectural traditions produces a building unlike any other in South Asia.',
  },
  {
    name: 'Gilgit',
    days: 'Days 7 & 14',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    body: 'Gilgit is the regional capital of Gilgit-Baltistan — a market town at the meeting point of the Karakoram, Himalaya, and Hindu Kush. It has been a trading hub since the Silk Road era and retains that character: the bazaar sells Chitrali pakol caps, dried apricots and mulberries from the valleys, rough-cut rubies and tourmalines from local mines, and goods from China carried down the KKH. The Kargah Buddha, a 7th-century carving cut into a cliff face above the city, is the oldest surviving Silk Road monument in the region.',
  },
  {
    name: 'Hunza',
    days: 'Days 8–11 & 13',
    image: 'https://images.unsplash.com/photo-1684230715200-40f32e068bf2?w=800&q=80',
    body: 'Hunza is the most celebrated valley in Pakistan — a place that entered Western consciousness through the writings of travellers who compared it to Shangri-La. The Mir of Hunza ruled this valley for nine centuries from Baltit and Altit Forts, managing the vital Silk Road passage through his territory with extraordinary political skill. Baltit Fort, restored 1990–1996 with carved wooden ceilings and painted inner chambers, is one of Asia\'s finest examples of mountain fortress architecture. The Nagar Valley across the river — Hunza\'s ancient rival — adds Hopper Glacier and a completely different social and cultural character. The panorama from Eagle\'s Nest at sunset — Rakaposhi, Ultar Sar, and Diran all visible — is among the great mountain views on earth.',
  },
  {
    name: 'Sost',
    days: 'Day 12',
    image: 'https://images.unsplash.com/photo-1567611665672-bc6b2a8cfe74?w=800&q=80',
    body: 'Sost is the last Pakistani town before China — a frontier settlement at 2,800 metres where the Karakoram Highway narrows, the NADRA checkpoint registers travellers, and the mountains close in from all sides. It has the authentic character of a border town at the edge of the world: basic, functional, and charged with the knowledge that the road ahead leads only to Khunjerab and then into Xinjiang. The drive north from Hunza through Gojal (Upper Hunza) passes Passu, where granite cathedral spires rise from the valley floor in one of the most photographed mountain formations in Asia.',
  },
  {
    name: 'Khunjerab Pass',
    days: 'Day 13',
    image: 'https://images.unsplash.com/photo-1636997209370-e2042d01d5a5?w=800&q=80',
    body: 'At 4,693 metres, Khunjerab is the highest paved international border crossing in the world and the geographic climax of the journey. The pass lies inside a protected wildlife sanctuary where Marco Polo sheep are regularly seen in the early morning and snow leopards are photographed periodically at altitude. The landscape at the top is entirely different from the valleys below — a high-altitude plateau of extraordinary bleakness and clarity. Standing at the border gate, looking north into Xinjiang with the peaks of the Karakoram behind, is one of those moments of geographical and historical drama that few journeys anywhere in the world can offer.',
  },
]

export default function NorthExpeditionPage() {
  const tour = getTourBySlug('pakistan-north-expedition')!
  const [openDay, setOpenDay] = useState<number | null>(1)
  const [formState, setFormState] = useState<'idle' | 'success'>('idle')

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', height: '70vh', minHeight: '500px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <Image
          src="https://images.unsplash.com/photo-1684230715200-40f32e068bf2?w=1600&q=85"
          alt="Hunza Valley and Baltit Fort, Northern Pakistan"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,15,15,0.1) 0%, rgba(15,15,15,0.72) 100%)', zIndex: 1 }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 2, paddingBottom: 'clamp(2.5rem, 6vw, 6rem)', width: '100%' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.25rem' }}>
            {[
              { label: 'Home', href: '/' },
              { label: 'Destinations', href: '/destinations' },
              { label: 'Pakistan', href: '/destinations/pakistan' },
              { label: 'Where Three Empires Meet', href: '/tours/pakistan-north-expedition' },
            ].map((c, i) => (
              <span key={c.href} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {i > 0 && <span style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.65rem' }}>—</span>}
                <Link href={c.href} style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: i === 3 ? 'var(--color-bronze-pale)' : 'rgba(245,240,232,0.5)', textDecoration: 'none' }}>
                  {c.label}
                </Link>
              </span>
            ))}
          </div>
          <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '0.75rem' }}>Northern Pakistan</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 6vw, 5rem)',
            fontWeight: 300,
            color: 'var(--color-offwhite)',
            lineHeight: 1.0,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            maxWidth: '820px',
          }}>
            Where Three Empires Meet
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
              { label: 'Duration', value: '17 Days' },
              { label: 'Route', value: 'Islamabad → Khunjerab → Islamabad' },
              { label: 'Group Size', value: '2 – 8 People' },
              { label: 'Category', value: 'Mountain Expedition' },
              { label: 'Difficulty', value: 'Moderate' },
              { label: 'Price', value: '$9,999 per person' },
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
                The most contested mountain frontier on earth.
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
                <NorthPakistanRouteMap />
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
            Eight valleys. A thousand years of mountain kingdoms.
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
              {/* Price summary */}
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--color-charcoal)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '0.5rem' }}>
                  Price Per Person
                </p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 300, color: 'var(--color-offwhite)', lineHeight: 1, marginBottom: '0.35rem' }}>
                  $9,999
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-stone)' }}>
                  Twin sharing basis · 17 days · Islamabad circuit
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
                  href="/contact?tour=pakistan-north-expedition&action=itinerary"
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
                  href="/contact?tour=pakistan-north-expedition&action=call"
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
