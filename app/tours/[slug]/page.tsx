'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getTourBySlug, tours } from '@/lib/data/tours'

interface Props {
  params: Promise<{ slug: string }>
}

const difficultyColor = {
  easy: 'var(--color-bronze)',
  moderate: '#8B7355',
  challenging: 'var(--color-stone)',
}

const difficultyLabel = { easy: 'Easy', moderate: 'Moderate', challenging: 'Challenging' }
const categoryLabel = { cultural: 'Cultural Journey', adventure: 'Adventure', expedition: 'Expedition' }

export default function TourDetailPage({ params }: Props) {
  const { slug } = use(params)
  const tour = getTourBySlug(slug)
  if (!tour) notFound()

  const [openDay, setOpenDay] = useState<number | null>(1)

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', height: '65vh', minHeight: '460px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <Image src={tour.heroImage} alt={tour.title} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,15,15,0.1) 0%, rgba(15,15,15,0.65) 100%)', zIndex: 1 }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 2, paddingBottom: 'clamp(2.5rem, 5vw, 5rem)', width: '100%' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
            {[{ label: 'Home', href: '/' }, { label: 'Tours', href: '/tours' }, { label: tour.title, href: `/tours/${tour.slug}` }].map((c, i) => (
              <span key={c.href} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {i > 0 && <span style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.7rem' }}>—</span>}
                <Link href={c.href} style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: i === 2 ? 'var(--color-bronze-pale)' : 'rgba(245,240,232,0.55)', textDecoration: 'none' }}>
                  {c.label}
                </Link>
              </span>
            ))}
          </div>
          <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '0.75rem' }}>{tour.destinationName}</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--color-offwhite)', lineHeight: 1.05, marginBottom: '0.75rem', letterSpacing: '-0.02em', maxWidth: '700px' }}>
            {tour.title}
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(245,240,232,0.75)' }}>
            {tour.tagline}
          </p>
        </div>
      </section>

      {/* QUICK FACTS BAR */}
      <div style={{ background: 'var(--color-charcoal)', borderBottom: '1px solid rgba(107,107,107,0.2)', padding: '1.25rem 0' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { label: 'Duration', value: `${tour.duration} days` },
              { label: 'Group Size', value: `${tour.groupSize.min}–${tour.groupSize.max} people` },
              { label: 'Category', value: categoryLabel[tour.category] },
              { label: 'Difficulty', value: difficultyLabel[tour.difficulty] },
              { label: 'From', value: `$${tour.priceFrom.toLocaleString()} pp` },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '2px' }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-offwhite)' }}>
                  {item.value}
                </div>
              </div>
            ))}
            <div style={{ marginLeft: 'auto' }}>
              <Link href={`/contact?tour=${tour.slug}`} className="btn btn-bronze">
                Book This Tour
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* OVERVIEW + INCLUDED */}
      <section style={{ background: 'var(--color-offwhite)' }} className="section-padding">
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
            {/* Overview */}
            <div>
              <p className="text-eyebrow" style={{ marginBottom: '1rem' }}>Programme Overview</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {tour.overview.split('\n\n').map((para, i) => (
                  <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-stone)', lineHeight: 1.8 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Included / Excluded */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ background: 'var(--color-sand)', padding: '2rem' }}>
                <p className="text-eyebrow" style={{ marginBottom: '1.25rem' }}>What's Included</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {tour.included.map(item => (
                    <div key={item} style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid rgba(107,107,107,0.12)', paddingBottom: '0.6rem' }}>
                      <span style={{ color: 'var(--color-bronze)', flexShrink: 0, fontSize: '0.85rem' }}>✓</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-charcoal)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'var(--color-offwhite-warm)', padding: '2rem', border: '1px solid rgba(107,107,107,0.12)' }}>
                <p className="text-eyebrow" style={{ marginBottom: '1.25rem' }}>Not Included</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {tour.excluded.map(item => (
                    <div key={item} style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid rgba(107,107,107,0.1)', paddingBottom: '0.6rem' }}>
                      <span style={{ color: 'var(--color-stone)', flexShrink: 0, fontSize: '0.85rem' }}>○</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-stone)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ITINERARY */}
      <section style={{ background: 'var(--color-charcoal)' }} className="section-padding">
        <div className="container-wide">
          <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '0.75rem' }}>Day by Day</p>
          <h2 className="text-display-md" style={{ color: 'var(--color-offwhite)', marginBottom: '3rem' }}>Itinerary</h2>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {tour.itinerary.map(day => (
              <div
                key={day.day}
                style={{ borderTop: '1px solid rgba(107,107,107,0.25)' }}
              >
                <button
                  onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '1.5rem 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      letterSpacing: '0.14em',
                      color: 'var(--color-stone)',
                      flexShrink: 0,
                      minWidth: '3rem',
                    }}>
                      Day {day.day}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 400,
                      color: 'var(--color-offwhite)',
                      letterSpacing: '-0.01em',
                    }}>
                      {day.title}
                    </span>
                  </div>
                  <span style={{
                    color: 'var(--color-bronze)',
                    fontSize: '1rem',
                    transition: 'transform 0.2s ease',
                    transform: openDay === day.day ? 'rotate(45deg)' : 'none',
                    flexShrink: 0,
                  }}>
                    +
                  </span>
                </button>

                {openDay === day.day && (
                  <div style={{ paddingBottom: '2rem', paddingLeft: 'calc(3rem + 1.5rem)' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-stone)', lineHeight: 1.75, marginBottom: day.accommodation ? '1rem' : 0 }}>
                      {day.description}
                    </p>
                    {day.accommodation && (
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-stone)', letterSpacing: '0.04em' }}>
                        <span style={{ color: 'var(--color-bronze-pale)' }}>Accommodation: </span>{day.accommodation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(107,107,107,0.25)' }} />
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section style={{ background: 'var(--color-sand)', padding: '4rem 0' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <p className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Ready to Go?</p>
          <h2 className="text-display-md" style={{ marginBottom: '1.25rem' }}>Book or Enquire About This Programme</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-stone)', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto 2rem' }}>
            We'll confirm availability, discuss any modifications, and provide a full quotation within 48 hours.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/contact?tour=${tour.slug}`} className="btn btn-bronze">
              Enquire About This Tour
            </Link>
            <Link href="/tours" className="btn btn-outline">
              View All Tours
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
