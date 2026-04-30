import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import TourCard from '@/components/cards/TourCard'
import CallToAction from '@/components/sections/CallToAction'
import { destinations, getDestinationBySlug } from '@/lib/data/destinations'
import { getToursByDestination } from '@/lib/data/tours'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return destinations.filter(d => d.slug !== 'pakistan').map(d => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) return {}
  return {
    title: dest.name,
    description: dest.description,
  }
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) notFound()

  const tours = getToursByDestination(dest.slug)

  return (
    <>
      <PageHero
        imageSrc={dest.heroImage}
        imageAlt={dest.name}
        eyebrow={dest.region}
        heading={dest.name}
        subheading={dest.tagline}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Destinations', href: '/destinations' },
          { label: dest.name, href: `/destinations/${dest.slug}` },
        ]}
      />

      {/* OVERVIEW */}
      <section style={{ background: 'var(--color-offwhite)' }} className="section-padding">
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            {/* Long description */}
            <div style={{ gridColumn: 'span 1' }}>
              <p className="text-eyebrow" style={{ marginBottom: '1rem' }}>About the Destination</p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: 'var(--color-charcoal)',
                marginBottom: '2rem',
                lineHeight: 1.15,
              }}>
                {dest.tagline}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {dest.longDescription.split('\n\n').map((para, i) => (
                  <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-stone)', lineHeight: 1.8 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Sidebar info */}
            <div>
              {/* Highlights */}
              <div style={{ marginBottom: '2.5rem', padding: '2rem', background: 'var(--color-sand)', border: '1px solid rgba(107,107,107,0.12)' }}>
                <p className="text-eyebrow" style={{ marginBottom: '1.25rem' }}>Highlights</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {dest.highlights.map(h => (
                    <div key={h} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(107,107,107,0.12)' }}>
                      <span style={{ color: 'var(--color-bronze)', flexShrink: 0, fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>—</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-charcoal)', lineHeight: 1.5 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick facts */}
              <div style={{ padding: '2rem', background: 'var(--color-charcoal)', border: '1px solid rgba(107,107,107,0.12)' }}>
                <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '1.25rem' }}>Quick Facts</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { label: 'Best Time to Visit', value: dest.bestTime },
                    { label: 'Capital', value: dest.capital },
                    { label: 'Language', value: dest.language },
                    { label: 'Currency', value: dest.currency },
                    { label: 'Visa', value: dest.visa },
                    { label: 'Climate', value: dest.climate },
                  ].map(fact => (
                    <div key={fact.label} style={{ borderBottom: '1px solid rgba(107,107,107,0.2)', paddingBottom: '0.75rem' }}>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '2px' }}>
                        {fact.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-offwhite)' }}>
                        {fact.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOURS */}
      {tours.length > 0 && (
        <section style={{ background: 'var(--color-sand)' }} className="section-padding">
          <div className="container-wide">
            <div style={{ marginBottom: '3rem' }}>
              <p className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Programmes</p>
              <h2 className="text-display-md">Tours in {dest.name}</h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}>
              {tours.map(tour => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CallToAction
        heading={`Plan Your ${dest.name} Journey`}
        subheading="We design every programme around the specific interests and pace of the travellers who will make it. Let's talk."
        primaryCta={{ text: 'Enquire Now', href: '/contact' }}
        secondaryCta={{ text: 'All Destinations', href: '/destinations' }}
      />
    </>
  )
}
