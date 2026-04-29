import type { Metadata } from 'next'
import PageHeroClient from '@/components/sections/PageHeroClient'
import TourCard from '@/components/cards/TourCard'
import CallToAction from '@/components/sections/CallToAction'
import { tours } from '@/lib/data/tours'
import { getContent } from '@/lib/content'
import { client } from '@/tina/__generated__/client'

export const metadata: Metadata = {
  title: 'Tours & Expeditions',
  description: "Six signature expeditions across Central Asia, Pakistan, Afghanistan, and China's Silk Road.",
}

export default async function ToursPage() {
  const cultural = tours.filter(t => t.category === 'cultural')
  const expedition = tours.filter(t => t.category === 'expedition')
  const adventure = tours.filter(t => t.category === 'adventure')
  const staticHero = getContent().pages.tours.hero
  let tinaProps = null
  try {
    tinaProps = await client.queries.page({ relativePath: 'tours.json' })
  } catch {
    // TinaCMS Cloud not yet connected
  }

  return (
    <>
      <PageHeroClient
        tinaProps={tinaProps}
        staticHero={staticHero}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Tours', href: '/tours' }]}
      />

      {/* INTRO */}
      <section style={{ background: 'var(--color-offwhite)', padding: '4rem 0 2rem' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-charcoal)',
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
          }}>
            These are our starting points. Every programme we have ever operated was modified in some way by the people who made it. The itineraries here represent our best thinking about each destination — the duration, pacing, and sequence that most reliably produces an outstanding journey.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      {[
        { label: 'Cultural Journeys', tours: cultural, description: 'Architecture, history, living craft traditions, and encounters with cultures that shaped the world.' },
        { label: 'Expeditions', tours: expedition, description: 'Remote corridors, high passes, and landscapes at the edge of the known world. Demanding but deeply rewarding.' },
        { label: 'Adventure', tours: adventure, description: 'Mountain valleys, glaciers, and the natural wonders of the high Karakoram and Hindu Kush.' },
      ].filter(cat => cat.tours.length > 0).map(cat => (
        <section key={cat.label} style={{ background: 'var(--color-offwhite)' }} className="section-padding">
          <div className="container-wide">
            <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(107,107,107,0.15)' }}>
              <p className="text-eyebrow" style={{ marginBottom: '0.5rem' }}>
                {cat.tours.length} programme{cat.tours.length > 1 ? 's' : ''}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 className="text-display-md">{cat.label}</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-stone)', maxWidth: '420px', lineHeight: 1.6 }}>
                  {cat.description}
                </p>
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}>
              {cat.tours.map(tour => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* BESPOKE */}
      <section style={{ background: 'var(--color-sand)', padding: '4rem 0' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <p className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Bespoke Design</p>
          <h2 className="text-display-md" style={{ marginBottom: '1.25rem' }}>
            Don't See What You're Looking For?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-stone)', lineHeight: 1.75, maxWidth: '500px', margin: '0 auto 2rem' }}>
            We design completely custom programmes for clients whose interests or schedules don't fit a standard itinerary. Multi-country routes, specific archaeological sites, private family journeys — tell us what you want to do.
          </p>
          <a href="/contact" className="btn btn-primary">Design a Custom Journey</a>
        </div>
      </section>

      <CallToAction
        heading="Every Journey Is Ultimately Private"
        subheading="Our group sizes are small by design. You are not joining someone else's trip — you are commissioning your own."
        primaryCta={{ text: 'Start Planning', href: '/contact' }}
      />
    </>
  )
}
