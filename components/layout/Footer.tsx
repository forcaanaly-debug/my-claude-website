'use client'

import Link from 'next/link'

const destinations = [
  { href: '/destinations/uzbekistan', label: 'Uzbekistan' },
  { href: '/destinations/pakistan', label: 'Pakistan' },
  { href: '/destinations/afghanistan', label: 'Afghanistan' },
  { href: '/destinations/china', label: 'China (Silk Road)' },
]

const company = [
  { href: '/about', label: 'About Us' },
  { href: '/tours', label: 'Tours & Packages' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-charcoal)',
      borderTop: '1px solid rgba(107,107,107,0.15)',
    }}>
      {/* Main Footer */}
      <div className="container-wide" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 300,
                letterSpacing: '0.12em',
                color: 'var(--color-offwhite)',
                lineHeight: 1,
              }}>
                SILK ROUTE
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.22em',
                color: 'var(--color-bronze-pale)',
                textTransform: 'uppercase',
                marginTop: '3px',
              }}>
                EXPEDITIONS
              </div>
            </Link>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--color-stone)',
              lineHeight: 1.75,
              maxWidth: '260px',
              marginBottom: '2rem',
            }}>
              Curated luxury expeditions to the ancient crossroads of Central Asia, Pakistan, Afghanistan, and China.
            </p>
            <span className="bronze-rule" />
          </div>

          {/* Destinations */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-bronze-pale)',
              marginBottom: '1.5rem',
            }}>
              Destinations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {destinations.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-stone)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-offwhite)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-stone)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-bronze-pale)',
              marginBottom: '1.5rem',
            }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {company.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-stone)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-offwhite)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-stone)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-bronze-pale)',
              marginBottom: '1.5rem',
            }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Email', value: 'info@silkrouteexpeditions.com' },
                { label: 'Phone', value: '+44 20 7123 4567' },
                { label: 'London Office', value: 'Mayfair, London W1K' },
                { label: 'Tashkent Office', value: 'Mirzo Ulugbek, Tashkent' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
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
                    fontSize: '0.875rem',
                    color: 'var(--color-stone-pale)',
                  }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(107,107,107,0.15)' }}>
        <div className="container-wide" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            color: 'var(--color-stone)',
            letterSpacing: '0.04em',
          }}>
            © 2025 Silk Route Expeditions Ltd. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            color: 'var(--color-stone)',
            letterSpacing: '0.04em',
          }}>
            Registered in England & Wales · ATOL Protected
          </p>
        </div>
      </div>
    </footer>
  )
}
