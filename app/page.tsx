import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import DestinationCard from '@/components/cards/DestinationCard'
import TourCard from '@/components/cards/TourCard'
import Testimonials from '@/components/sections/Testimonials'
import CallToAction from '@/components/sections/CallToAction'
import { destinations } from '@/lib/data/destinations'
import { getFeaturedTours } from '@/lib/data/tours'
import testimonials from '@/lib/data/testimonials'
import { getContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Silk Route Expeditions — Curated Luxury Tours to Central Asia',
}

export default function HomePage() {
  const featuredTours = getFeaturedTours()
  const { pages } = getContent()
  const hero = pages.home.hero

  return (
    <>
      {/* HERO */}
      <Hero
        imageSrc={hero.imageSrc}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        subheading={hero.subheading ?? ''}
        fieldPrefix="pages.home.hero"
        ctaPrimary={{ text: 'Explore Destinations', href: '/destinations' }}
        ctaSecondary={{ text: 'View Tours', href: '/tours' }}
      />

      {/* DESTINATIONS */}
      <section style={{ background: 'var(--color-offwhite)' }} className="section-padding">
        <div className="container-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Where We Go</p>
              <h2 className="text-display-lg">
                Four Destinations.<br />One Ancient Route.
              </h2>
            </div>
            <Link href="/destinations" className="btn btn-outline">
              All Destinations
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1px',
            background: 'rgba(107,107,107,0.15)',
          }}>
            {destinations.map(dest => (
              <DestinationCard key={dest.slug} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section style={{ background: 'var(--color-charcoal-mid)' }} className="section-padding">
        <div className="container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'center',
          }}>
            {/* Left: pull quote */}
            <div>
              <span className="bronze-rule" style={{ marginBottom: '2rem', display: 'block' }} />
              <blockquote style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--color-offwhite)',
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
              }}>
                "We do not arrange tourism. We arrange encounters with civilisations that shaped the world."
              </blockquote>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-bronze-pale)',
                marginTop: '1.5rem',
              }}>
                Aziz Karimov, Founder
              </p>
            </div>

            {/* Right: three pillars */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                {
                  num: '01',
                  title: 'Radical Access',
                  body: 'We open doors that standard tourism cannot. Closed caves, private museum collections, artisan homes, nomadic camps — the spaces that make a journey transformative.',
                },
                {
                  num: '02',
                  title: 'Scholar Guides',
                  body: 'Every guide we field is an expert in their domain — historians, archaeologists, linguists, mountaineers. They carry knowledge that turns sites into stories.',
                },
                {
                  num: '03',
                  title: 'Small Groups',
                  body: 'We work exclusively in private groups of two to ten. There are no strangers at dinner, no queues, no compromise on pace or depth.',
                },
              ].map((pillar, i, arr) => (
                <div
                  key={pillar.num}
                  style={{
                    padding: '2rem 0',
                    borderTop: '1px solid rgba(107,107,107,0.25)',
                    borderBottom: i === arr.length - 1 ? '1px solid rgba(107,107,107,0.25)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      color: 'var(--color-stone)',
                      marginTop: '0.3rem',
                      flexShrink: 0,
                    }}>
                      {pillar.num}
                    </span>
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.35rem',
                        fontWeight: 400,
                        color: 'var(--color-offwhite)',
                        marginBottom: '0.5rem',
                        letterSpacing: '-0.01em',
                      }}>
                        {pillar.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'var(--color-stone)',
                        lineHeight: 1.7,
                      }}>
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section style={{ background: 'var(--color-offwhite)' }} className="section-padding">
        <div className="container-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Signature Programmes</p>
              <h2 className="text-display-lg">Featured Expeditions</h2>
            </div>
            <Link href="/tours" className="btn btn-outline">
              All Tours
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {featuredTours.map(tour => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section style={{
        background: 'var(--color-sand)',
        borderTop: '1px solid rgba(107,107,107,0.15)',
        borderBottom: '1px solid rgba(107,107,107,0.15)',
        padding: '3rem 0',
      }}>
        <div className="container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}>
            {[
              { num: '25+', label: 'Years Operating' },
              { num: '4', label: 'Countries' },
              { num: '6', label: 'Signature Tours' },
              { num: '100%', label: 'Private Programmes' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: 300,
                  color: 'var(--color-charcoal)',
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                }}>
                  {stat.num}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-stone)',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials testimonials={testimonials} />

      {/* CTA */}
      <CallToAction />
    </>
  )
}
