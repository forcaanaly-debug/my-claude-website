'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Tour } from '@/lib/types'

interface Props {
  tour: Tour
}

const difficultyLabel = { easy: 'Easy', moderate: 'Moderate', challenging: 'Challenging' }
const categoryLabel = { cultural: 'Cultural', adventure: 'Adventure', expedition: 'Expedition' }

export default function TourCard({ tour }: Props) {
  return (
    <div
      className="card-lift"
      style={{
        background: 'var(--color-offwhite-warm)',
        border: '1px solid rgba(107,107,107,0.12)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Image */}
      <Link href={`/tours/${tour.slug}`} style={{ display: 'block', position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
        <Image
          src={tour.cardImage}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          className="tour-card-img"
        />
        {/* Tags overlay */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          display: 'flex',
          gap: '0.4rem',
          zIndex: 2,
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-offwhite)',
            background: 'var(--color-bronze)',
            padding: '0.3rem 0.6rem',
          }}>
            {categoryLabel[tour.category]}
          </span>
        </div>
        <style>{`.tour-card-img:hover { transform: scale(1.05); }`}</style>
      </Link>

      {/* Body */}
      <div style={{ padding: '1.5rem' }}>
        {/* Destination */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.6rem',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-bronze)',
          marginBottom: '0.5rem',
        }}>
          {tour.destinationName}
        </p>

        {/* Title */}
        <Link href={`/tours/${tour.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            color: 'var(--color-charcoal)',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--color-bronze)')}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--color-charcoal)')}
          >
            {tour.title}
          </h3>
        </Link>

        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: 'var(--color-stone)',
          marginBottom: '1.25rem',
          lineHeight: 1.5,
        }}>
          {tour.tagline}
        </p>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(107,107,107,0.15)', marginBottom: '1.25rem' }} />

        {/* Meta */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Duration', value: `${tour.duration} days` },
            { label: 'Group', value: `${tour.groupSize.min}–${tour.groupSize.max} pax` },
            { label: 'Level', value: difficultyLabel[tour.difficulty] },
          ].map(item => (
            <div key={item.label}>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.58rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-stone)',
                marginBottom: '2px',
              }}>
                {item.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--color-charcoal)',
              }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.58rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-stone)',
              marginBottom: '2px',
            }}>
              From
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 400,
              color: 'var(--color-charcoal)',
            }}>
              ${tour.priceFrom.toLocaleString()}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              color: 'var(--color-stone)',
            }}>
              per person
            </div>
          </div>
          <Link href={`/tours/${tour.slug}`} className="btn btn-primary" style={{ padding: '0.75rem 1.25rem', fontSize: '0.65rem' }}>
            View Tour →
          </Link>
        </div>
      </div>
    </div>
  )
}
