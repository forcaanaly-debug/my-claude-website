import Link from 'next/link'
import Image from 'next/image'
import type { Destination } from '@/lib/types'

interface Props {
  destination: Destination
}

export default function DestinationCard({ destination }: Props) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      style={{
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '3/4',
        textDecoration: 'none',
        background: 'var(--color-charcoal)',
      }}
      className="destination-card"
    >
      <Image
        src={destination.cardImage}
        alt={destination.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        style={{
          objectFit: 'cover',
          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        className="dest-card-img"
      />

      {/* Base gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent 40%, rgba(15,15,15,0.75) 100%)',
        zIndex: 1,
      }} />

      {/* Hover overlay */}
      <div
        className="dest-hover-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15,15,15,0.55)',
          zIndex: 2,
          opacity: 0,
          transition: 'opacity 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: 'rgba(245,240,232,0.85)',
          textAlign: 'center',
          lineHeight: 1.65,
        }}>
          {destination.description}
        </p>
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '1.5rem',
        zIndex: 3,
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.6rem',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-bronze-pale)',
          marginBottom: '0.4rem',
        }}>
          {destination.region}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.75rem',
          fontWeight: 300,
          letterSpacing: '-0.01em',
          color: 'var(--color-offwhite)',
          lineHeight: 1.1,
          marginBottom: '0.5rem',
        }}>
          {destination.name}
        </h3>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.95rem',
          fontStyle: 'italic',
          color: 'rgba(245,240,232,0.65)',
          fontWeight: 400,
        }}>
          {destination.tagline}
        </p>
      </div>

      <style>{`
        .destination-card:hover .dest-card-img {
          transform: scale(1.06);
        }
        .destination-card:hover .dest-hover-overlay {
          opacity: 1;
        }
      `}</style>
    </Link>
  )
}
