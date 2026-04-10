'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileMenu from './MobileMenu'

const navLinks = [
  { href: '/destinations', label: 'Destinations' },
  { href: '/tours', label: 'Tours' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navBg = isHome
    ? scrolled
      ? 'bg-[#1C1C1C]/95 backdrop-blur-sm'
      : 'bg-transparent'
    : 'bg-[#1C1C1C]'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
        style={{ borderBottom: scrolled || !isHome ? '1px solid rgba(107,107,107,0.2)' : 'none' }}
      >
        <div className="container-wide">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 300,
                  letterSpacing: '0.12em',
                  color: 'var(--color-offwhite)',
                  lineHeight: 1,
                }}>
                  SILK ROUTE
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  color: 'var(--color-bronze-pale)',
                  textTransform: 'uppercase',
                }}>
                  EXPEDITIONS
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden-mobile">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    fontWeight: 400,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: pathname === link.href ? 'var(--color-bronze-pale)' : 'var(--color-stone-pale)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-offwhite)')}
                  onMouseLeave={e => (e.currentTarget.style.color = pathname === link.href ? 'var(--color-bronze-pale)' : 'var(--color-stone-pale)')}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="btn btn-bronze" style={{ padding: '0.6rem 1.4rem', fontSize: '0.65rem' }}>
                Plan Your Journey
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="show-mobile"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
              aria-label="Open menu"
            >
              <span style={{ display: 'block', width: '22px', height: '1px', background: 'var(--color-offwhite)' }} />
              <span style={{ display: 'block', width: '16px', height: '1px', background: 'var(--color-offwhite)' }} />
              <span style={{ display: 'block', width: '22px', height: '1px', background: 'var(--color-offwhite)' }} />
            </button>
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
    </>
  )
}
