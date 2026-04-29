import Link from 'next/link'
import Image from 'next/image'

interface TinaFields {
  imageSrc?: string
  imageAlt?: string
  eyebrow?: string
  heading?: string
  subheading?: string
}

interface HeroProps {
  imageSrc: string
  imageAlt: string
  eyebrow?: string
  heading: string
  subheading?: string
  ctaPrimary?: { text: string; href: string }
  ctaSecondary?: { text: string; href: string }
  fullHeight?: boolean
  overlayStrength?: 'light' | 'medium' | 'strong'
  tinaFields?: TinaFields
}

export default function Hero({
  imageSrc,
  imageAlt,
  eyebrow,
  heading,
  subheading,
  ctaPrimary,
  ctaSecondary,
  fullHeight = true,
  overlayStrength = 'medium',
  tinaFields,
}: HeroProps) {
  const tf = tinaFields
  const overlayMap = {
    light: 'rgba(15,15,15,0.35)',
    medium: 'rgba(15,15,15,0.52)',
    strong: 'rgba(15,15,15,0.65)',
  }

  return (
    <section style={{
      position: 'relative',
      height: fullHeight ? '100vh' : '70vh',
      minHeight: fullHeight ? '600px' : '480px',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
    }}>
      {/* Background Image */}
      <div
        {...(tf?.imageSrc ? { 'data-tina-field': tf.imageSrc } : {})}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(
          to bottom,
          rgba(15,15,15,0.1) 0%,
          ${overlayMap[overlayStrength]} 60%,
          rgba(15,15,15,0.75) 100%
        )`,
        zIndex: 1,
      }} />

      {/* Industrial texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div className="container-wide" style={{ position: 'relative', zIndex: 3, paddingBottom: 'clamp(3rem, 6vw, 6rem)', width: '100%' }}>
        {eyebrow && (
          <p
            className="text-eyebrow animate-fade-up"
            style={{ color: 'var(--color-bronze-pale)', marginBottom: '1.25rem' }}
            {...(tf?.eyebrow ? { 'data-tina-field': tf.eyebrow } : {})}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="animate-fade-up animate-fade-up-delay-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            color: 'var(--color-offwhite)',
            lineHeight: 1.0,
            maxWidth: '900px',
            marginBottom: subheading ? '1.5rem' : '2rem',
          }}
          {...(tf?.heading ? { 'data-tina-field': tf.heading } : {})}
        >
          {heading}
        </h1>
        {subheading && (
          <p
            className="animate-fade-up animate-fade-up-delay-2"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(245,240,232,0.75)',
              maxWidth: '540px',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
            }}
            {...(tf?.subheading ? { 'data-tina-field': tf.subheading } : {})}
          >
            {subheading}
          </p>
        )}
        {(ctaPrimary || ctaSecondary) && (
          <div
            className="animate-fade-up animate-fade-up-delay-3"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            {ctaPrimary && (
              <Link href={ctaPrimary.href} className="btn btn-bronze">
                {ctaPrimary.text}
              </Link>
            )}
            {ctaSecondary && (
              <Link href={ctaSecondary.href} className="btn btn-ghost">
                {ctaSecondary.text}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Bottom scroll indicator */}
      {fullHeight && (
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          right: 'clamp(1.5rem, 5vw, 5rem)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.5)',
            writingMode: 'vertical-rl',
          }}>
            Scroll
          </span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(245,240,232,0.5), transparent)',
          }} />
        </div>
      )}
    </section>
  )
}
