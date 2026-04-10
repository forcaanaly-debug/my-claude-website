'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface Props {
  open: boolean
  onClose: () => void
  links: { href: string; label: string }[]
}

export default function MobileMenu({ open, onClose, links }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15,15,15,0.6)',
          zIndex: 100,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(320px, 85vw)',
          background: 'var(--color-charcoal)',
          zIndex: 101,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
        }}
      >
        {/* Close */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-stone-pale)',
              fontSize: '1.5rem',
              lineHeight: 1,
              padding: '4px',
            }}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Logo */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 300,
            letterSpacing: '0.12em',
            color: 'var(--color-offwhite)',
          }}>
            SILK ROUTE
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.55rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            color: 'var(--color-bronze-pale)',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}>
            EXPEDITIONS
          </div>
        </div>

        {/* Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                color: 'var(--color-offwhite)',
                textDecoration: 'none',
                padding: '0.75rem 0',
                borderBottom: i < links.length - 1 ? '1px solid rgba(107,107,107,0.2)' : 'none',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <Link
            href="/contact"
            onClick={onClose}
            className="btn btn-bronze"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Plan Your Journey
          </Link>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            color: 'var(--color-stone)',
            marginTop: '1.5rem',
            letterSpacing: '0.02em',
          }}>
            info@silkrouteexpeditions.com
          </p>
        </div>
      </div>
    </>
  )
}
