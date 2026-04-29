import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import DestinationCard from '@/components/cards/DestinationCard'
import CallToAction from '@/components/sections/CallToAction'
import { destinations } from '@/lib/data/destinations'
import { getContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Destinations',
  description: "Explore Uzbekistan, Pakistan, Afghanistan, and China's Silk Road with Silk Route Expeditions.",
}

export default function DestinationsPage() {
  const hero = getContent().pages.destinations.hero
  return (
    <>
      <PageHero
        imageSrc={hero.imageSrc}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        fieldPrefix="pages.destinations.hero"
        subheading={hero.subheading ?? ''}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Destinations', href: '/destinations' }]}
      />

      {/* INTRO */}
      <section style={{ background: 'var(--color-offwhite)', padding: '4rem 0 3rem' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <p className="text-eyebrow" style={{ marginBottom: '1rem' }}>The Silk Road Corridor</p>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-charcoal)',
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
          }}>
            The ancient routes we follow connected the Roman Empire to Han China. Every city along the way carries the weight of that history — in its architecture, its food, its people, and its unspoken sense of having been at the centre of the world.
          </p>
        </div>
      </section>

      {/* DESTINATION GRID */}
      <section style={{ background: 'var(--color-offwhite)', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>
        <div className="container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            background: 'rgba(107,107,107,0.15)',
          }}>
            {destinations.map(dest => (
              <DestinationCard key={dest.slug} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* REGION DETAIL STRIP */}
      <section style={{ background: 'var(--color-sand)' }} className="section-padding">
        <div className="container-wide">
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <p className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Across the Route</p>
            <h2 className="text-display-md">What Each Region Offers</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '0',
            borderTop: '1px solid rgba(107,107,107,0.2)',
          }}>
            {destinations.map((dest, i, arr) => (
              <div
                key={dest.slug}
                style={{
                  padding: '2.5rem',
                  borderRight: i < arr.length - 1 ? '1px solid rgba(107,107,107,0.2)' : 'none',
                  borderBottom: '1px solid rgba(107,107,107,0.2)',
                }}
              >
                <p className="text-eyebrow" style={{ marginBottom: '0.5rem' }}>{dest.region}</p>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: 'var(--color-charcoal)',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                }}>
                  {dest.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-stone)',
                  lineHeight: 1.75,
                  marginBottom: '1.25rem',
                }}>
                  {dest.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {dest.highlights.slice(0, 3).map(h => (
                    <div key={h} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--color-bronze)', flexShrink: 0, marginTop: '0.1rem' }}>—</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-stone)' }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        heading="Not Sure Where to Begin?"
        subheading="Tell us what moves you — mountains or monuments, culture or wilderness — and we'll design the right itinerary."
        primaryCta={{ text: 'Plan Your Journey', href: '/contact' }}
        secondaryCta={{ text: 'View All Tours', href: '/tours' }}
      />
    </>
  )
}
