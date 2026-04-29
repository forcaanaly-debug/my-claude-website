import Image from 'next/image'
import Link from 'next/link'

interface PageHeroProps {
  imageSrc: string
  imageAlt: string
  eyebrow?: string
  heading: string
  subheading?: string
  breadcrumb?: { label: string; href: string }[]
  fieldPrefix?: string
}

export default function PageHero({
  imageSrc,
  imageAlt,
  eyebrow,
  heading,
  subheading,
  breadcrumb,
  fieldPrefix,
}: PageHeroProps) {
  const f = fieldPrefix
  return (
    <section style={{
      position: 'relative',
      height: '60vh',
      minHeight: '420px',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
    }}>
      <div
        {...(f ? { 'data-field': `${f}.imageSrc`, 'data-field-type': 'image', 'data-field-value': imageSrc } : {})}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
      </div>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(15,15,15,0.1) 0%, rgba(15,15,15,0.55) 60%, rgba(15,15,15,0.75) 100%)',
        zIndex: 1,
      }} />

      <div className="container-wide" style={{ position: 'relative', zIndex: 2, paddingBottom: 'clamp(2.5rem, 5vw, 5rem)', width: '100%' }}>
        {breadcrumb && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {i > 0 && <span style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.7rem' }}>—</span>}
                <Link
                  href={crumb.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: i === breadcrumb.length - 1 ? 'var(--color-bronze-pale)' : 'rgba(245,240,232,0.55)',
                    textDecoration: 'none',
                  }}
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
          </div>
        )}
        {eyebrow && (
          <p
            className="text-eyebrow"
            style={{ color: 'var(--color-bronze-pale)', marginBottom: '1rem' }}
            {...(f ? { 'data-field': `${f}.eyebrow`, 'data-field-type': 'text', 'data-field-value': eyebrow } : {})}
          >
            {eyebrow}
          </p>
        )}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            color: 'var(--color-offwhite)',
            lineHeight: 1.05,
            maxWidth: '800px',
            marginBottom: subheading ? '1rem' : 0,
          }}
          {...(f ? { 'data-field': `${f}.heading`, 'data-field-type': 'text', 'data-field-value': heading } : {})}
        >
          {heading}
        </h1>
        {subheading && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'rgba(245,240,232,0.7)',
              maxWidth: '540px',
              lineHeight: 1.7,
            }}
            {...(f ? { 'data-field': `${f}.subheading`, 'data-field-type': 'text', 'data-field-value': subheading } : {})}
          >
            {subheading}
          </p>
        )}
      </div>
    </section>
  )
}
