'use client'

import { useState, useEffect } from 'react'
import type { Testimonial } from '@/lib/types'

interface Props {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: Props) {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActive(prev => (prev + 1) % testimonials.length)
        setFading(false)
      }, 400)
    }, 7000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const goTo = (i: number) => {
    if (i === active) return
    setFading(true)
    setTimeout(() => {
      setActive(i)
      setFading(false)
    }, 300)
  }

  const current = testimonials[active]

  return (
    <section style={{
      background: 'var(--color-charcoal)',
      position: 'relative',
      overflow: 'hidden',
    }} className="section-padding">
      {/* Texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        pointerEvents: 'none',
      }} />

      <div className="container-narrow" style={{ position: 'relative', textAlign: 'center' }}>
        {/* Open quote */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '6rem',
          lineHeight: 0.5,
          color: 'var(--color-bronze)',
          opacity: 0.6,
          marginBottom: '2rem',
          userSelect: 'none',
        }}>
          "
        </div>

        {/* Quote */}
        <blockquote
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-offwhite)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            transition: 'opacity 0.4s ease',
            opacity: fading ? 0 : 1,
          }}
        >
          {current.quote}
        </blockquote>

        <div style={{
          transition: 'opacity 0.4s ease',
          opacity: fading ? 0 : 1,
          marginBottom: '3rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--color-offwhite)',
            marginBottom: '0.25rem',
          }}>
            {current.author}
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--color-stone)',
            letterSpacing: '0.04em',
          }}>
            {current.origin} · {current.tour} · {current.year}
          </p>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? '2rem' : '0.5rem',
                height: '2px',
                background: i === active ? 'var(--color-bronze)' : 'rgba(107,107,107,0.5)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
