import Link from 'next/link'

interface CTAProps {
  heading?: string
  subheading?: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  dark?: boolean
}

export default function CallToAction({
  heading = 'Begin Your Silk Road Journey',
  subheading = 'Every programme we design is private, bespoke, and built around the singular goals of the travellers who will make it. Tell us where you want to go.',
  primaryCta = { text: 'Plan Your Journey', href: '/contact' },
  secondaryCta = { text: 'View All Tours', href: '/tours' },
  dark = true,
}: CTAProps) {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: dark ? 'var(--color-charcoal)' : 'var(--color-sand)',
      }}
      className="section-padding"
    >
      {/* Industrial noise texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='${dark ? '0.04' : '0.06'}'/%3E%3C/svg%3E")`,
        pointerEvents: 'none',
      }} />

      {/* Bronze accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(to right, var(--color-bronze), transparent)',
      }} />

      <div className="container-narrow" style={{ position: 'relative', textAlign: 'center' }}>
        <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '1.25rem' }}>
          Destination Management
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3.25rem)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          color: dark ? 'var(--color-offwhite)' : 'var(--color-charcoal)',
          lineHeight: 1.1,
          marginBottom: '1.5rem',
        }}>
          {heading}
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: dark ? 'rgba(245,240,232,0.65)' : 'var(--color-stone)',
          lineHeight: 1.75,
          maxWidth: '500px',
          margin: '0 auto 2.5rem',
        }}>
          {subheading}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={primaryCta.href} className="btn btn-bronze">
            {primaryCta.text}
          </Link>
          {secondaryCta && (
            <Link href={secondaryCta.href} className={`btn ${dark ? 'btn-ghost' : 'btn-outline'}`}>
              {secondaryCta.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
