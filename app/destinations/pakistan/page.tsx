import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/sections/PageHero'
import CallToAction from '@/components/sections/CallToAction'
import { pakistanRegions } from '@/lib/data/pakistan'
import { getTourBySlug } from '@/lib/data/tours'

export const metadata: Metadata = {
  title: 'Pakistan',
  description:
    'Four distinct regions — South Pakistan, North Pakistan, the Northwest Frontier, and Balochistan — each with curated expedition packages.',
}

const difficultyColour: Record<string, string> = {
  easy: 'var(--color-bronze)',
  moderate: '#5a7a4a',
  challenging: '#8b3a2a',
}

export default function PakistanPage() {
  return (
    <>
      <PageHero
        imageSrc="https://images.unsplash.com/photo-1684230715200-40f32e068bf2?w=1600&q=85"
        imageAlt="Karakoram peaks above the Hunza Valley, Pakistan"
        eyebrow="Destination"
        heading="Pakistan"
        subheading="Where the mountains touch the sky and civilisations run five millennia deep."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Destinations', href: '/destinations' },
          { label: 'Pakistan', href: '/destinations/pakistan' },
        ]}
      />

      {/* INTRO */}
      <section style={{ background: 'var(--color-offwhite)' }} className="section-padding">
        <div className="container-narrow">
          <div style={{ maxWidth: '760px' }}>
            <p className="text-eyebrow" style={{ marginBottom: '1rem' }}>About the Destination</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: 'var(--color-charcoal)',
              marginBottom: '2rem',
              lineHeight: 1.15,
            }}>
              One country. Four worlds.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                'Pakistan contains multitudes that most visitors never suspect. It is a country of Mughal mosques and Indus Valley ruins, of 8,000-metre peaks and Arabian Sea coastline, of Pashtun hill towns and Baloch desert caravans. No single programme can do it justice — which is why we approach Pakistan as four distinct territories, each with its own landscape, culture, and pace.',
                'The south — Punjab, Sindh, Islamabad — is the historical and cultural core: the cities of the Mughals, the shrines of the Sufis, and the excavated streets of Mohenjo-daro. The north — Gilgit-Baltistan — is a different planet: glaciers, the world\'s second-highest mountain, and mountain peoples whose cultures have been shaped by the altitude and isolation of the Karakoram.',
                'The northwest is Pakistan\'s most complex corner: Pashtun highlands, Kalash polytheists, Buddhist valleys, and the Hindu Kush. And Balochistan — the country\'s least visited and most underestimated province — holds a coastline of extraordinary beauty, a desert of ancient caravan routes, and a Baloch culture of deep and quiet pride.',
              ].map((para, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-stone)', lineHeight: 1.8 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section style={{ background: 'var(--color-charcoal)', padding: '3rem 0' }}>
        <div className="container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0',
          }}>
            {[
              { label: 'Capital', value: 'Islamabad' },
              { label: 'Language', value: 'Urdu, English + 70 regional languages' },
              { label: 'Currency', value: 'Pakistani Rupee (PKR)' },
              { label: 'Visa', value: 'E-visa available for most nationalities' },
              { label: 'Best Time', value: 'Oct – Mar (south); May – Oct (north)' },
              { label: 'Climate', value: 'Alpine in north; subtropical in south; arid in west' },
            ].map((fact, i, arr) => (
              <div
                key={fact.label}
                style={{
                  padding: '1.5rem 2rem',
                  borderRight: i < arr.length - 1 ? '1px solid rgba(107,107,107,0.2)' : 'none',
                }}
              >
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '0.35rem' }}>
                  {fact.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-offwhite)', lineHeight: 1.5 }}>
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGION NAV */}
      <section style={{ background: 'var(--color-sand)', padding: '2rem 0', borderBottom: '1px solid rgba(107,107,107,0.15)' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginRight: '0.75rem' }}>
              Jump to Region:
            </span>
            {pakistanRegions.map(r => (
              <a
                key={r.id}
                href={`#region-${r.id}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: 'var(--color-charcoal)',
                  textDecoration: 'none',
                  border: '1px solid rgba(107,107,107,0.3)',
                  padding: '0.4rem 1rem',
                  transition: 'all 0.2s',
                }}
              >
                {r.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOUR REGIONS */}
      {pakistanRegions.map((region, idx) => {
        const tour = getTourBySlug(region.tourSlug)
        const isEven = idx % 2 === 0

        return (
          <section
            key={region.id}
            id={`region-${region.id}`}
            style={{ background: isEven ? 'var(--color-offwhite)' : 'var(--color-sand)' }}
            className="section-padding"
          >
            <div className="container-wide">
              {/* Region header */}
              <div style={{ marginBottom: '3rem' }}>
                <p className="text-eyebrow" style={{ marginBottom: '0.5rem', color: 'var(--color-bronze)' }}>
                  {`0${idx + 1} — ${region.label}`}
                </p>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-charcoal)',
                  lineHeight: 1.0,
                }}>
                  {region.name}
                </h2>
              </div>

              {/* Two-column layout — alternating */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'clamp(2rem, 5vw, 5rem)',
                alignItems: 'start',
              }}>
                {/* Image column */}
                <div style={{ order: isEven ? 0 : 1 }}>
                  <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <Image
                      src={region.heroImage}
                      alt={region.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  {/* Cities covered */}
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '0.6rem' }}>
                      Cities & Places Covered
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {region.cities.map(city => (
                        <span
                          key={city}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.06em',
                            color: 'var(--color-charcoal)',
                            background: 'rgba(107,107,107,0.1)',
                            border: '1px solid rgba(107,107,107,0.2)',
                            padding: '0.25rem 0.65rem',
                          }}
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content column */}
                <div style={{ order: isEven ? 1 : 0 }}>
                  {/* Description */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '2.5rem' }}>
                    {region.description.map((para, i) => (
                      <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-stone)', lineHeight: 1.85 }}>
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div style={{ marginBottom: '2.5rem', padding: '1.75rem', background: isEven ? 'var(--color-sand)' : 'var(--color-offwhite)', border: '1px solid rgba(107,107,107,0.12)' }}>
                    <p className="text-eyebrow" style={{ marginBottom: '1rem' }}>Highlights</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {region.highlights.map(h => (
                        <div key={h} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(107,107,107,0.1)' }}>
                          <span style={{ color: 'var(--color-bronze)', flexShrink: 0, fontSize: '0.8rem' }}>—</span>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-charcoal)', lineHeight: 1.5 }}>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tour package card */}
                  {tour && (
                    <div style={{
                      padding: '1.75rem',
                      background: 'var(--color-charcoal)',
                      border: '1px solid rgba(107,107,107,0.2)',
                    }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-bronze-pale)', marginBottom: '0.6rem' }}>
                        Signature Programme
                      </p>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                        fontWeight: 300,
                        color: 'var(--color-offwhite)',
                        letterSpacing: '-0.01em',
                        marginBottom: '0.5rem',
                        lineHeight: 1.2,
                      }}>
                        {tour.title}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-stone)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        {tour.tagline}
                      </p>
                      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                        <div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '2px' }}>Duration</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, color: 'var(--color-offwhite)' }}>{tour.duration} days</div>
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '2px' }}>From</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, color: 'var(--color-offwhite)' }}>£{tour.priceFrom.toLocaleString()} <span style={{ fontSize: '0.65rem', color: 'var(--color-stone)' }}>pp</span></div>
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '2px' }}>Difficulty</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 500, color: difficultyColour[tour.difficulty], textTransform: 'capitalize' }}>{tour.difficulty}</div>
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '2px' }}>Best Time</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-offwhite)' }}>{region.bestTime}</div>
                        </div>
                      </div>
                      <Link href={`/tours/${region.tourSlug}`} className="btn btn-bronze" style={{ display: 'inline-block' }}>
                        View Full Itinerary
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ALL PAKISTAN TOURS */}
      <section style={{ background: 'var(--color-charcoal)' }} className="section-padding">
        <div className="container-wide">
          <div style={{ marginBottom: '3rem' }}>
            <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '0.75rem' }}>All Pakistan Programmes</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: 'var(--color-offwhite)',
              lineHeight: 1.15,
            }}>
              Four regions. Four expeditions.
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            background: 'rgba(107,107,107,0.2)',
          }}>
            {pakistanRegions.map(region => {
              const tour = getTourBySlug(region.tourSlug)
              if (!tour) return null
              return (
                <Link
                  key={region.id}
                  href={`/tours/${region.tourSlug}`}
                  style={{ textDecoration: 'none', display: 'block', background: 'var(--color-charcoal)' }}
                >
                  <div style={{ position: 'relative', aspectRatio: '3/2', overflow: 'hidden' }}>
                    <Image
                      src={region.heroImage}
                      alt={region.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,15,15,0.4)' }} />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-bronze-pale)' }}>
                        {region.label}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-bronze-pale)', marginBottom: '0.4rem' }}>
                      {region.name}
                    </p>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 300,
                      color: 'var(--color-offwhite)',
                      letterSpacing: '-0.01em',
                      marginBottom: '0.75rem',
                      lineHeight: 1.2,
                    }}>
                      {tour.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '1.25rem', borderTop: '1px solid rgba(107,107,107,0.25)', paddingTop: '0.75rem' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-stone)' }}>
                        {tour.duration} days
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-stone)' }}>
                        From £{tour.priceFrom.toLocaleString()}
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: difficultyColour[tour.difficulty], textTransform: 'capitalize' }}>
                        {tour.difficulty}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <CallToAction
        heading="Plan Your Pakistan Journey"
        subheading="Tell us which region calls to you. We'll design the programme around your interests, pace, and travel dates."
        primaryCta={{ text: 'Enquire Now', href: '/contact' }}
        secondaryCta={{ text: 'All Destinations', href: '/destinations' }}
      />
    </>
  )
}
