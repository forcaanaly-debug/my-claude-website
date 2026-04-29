import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import CallToAction from '@/components/sections/CallToAction'
import team from '@/lib/data/team'
import { getContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'The story behind Silk Route Expeditions — who we are, what we believe, and how we operate.',
}

export default function AboutPage() {
  const hero = getContent().pages.about.hero
  return (
    <>
      <PageHero
        imageSrc={hero.imageSrc}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]}
      />

      {/* STORY */}
      <section style={{ background: 'var(--color-offwhite)' }} className="section-padding">
        <div className="container-narrow">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            <div>
              <p className="text-eyebrow" style={{ marginBottom: '1rem' }}>The Beginning</p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: 'var(--color-charcoal)',
                marginBottom: '1.5rem',
                lineHeight: 1.15,
              }}>
                From Scholar to Expedition Designer
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-stone)', lineHeight: 1.8 }}>
                  Silk Route Expeditions was founded in 1999 by Aziz Karimov, a Samarkand-born historian who had spent the previous decade guiding scholars and archaeologists through the sites of the ancient Silk Road. He had grown frustrated by what passed for "luxury travel" in Central Asia: foreign operators who treated the region as a backdrop rather than a subject, who moved clients through monuments without revealing what made them matter.
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-stone)', lineHeight: 1.8 }}>
                  The founding principle was simple: the quality of a journey is determined entirely by the quality of knowledge that accompanies it. A mediocre guide at the Mogao Caves leaves you with photographs. An exceptional one leaves you with a changed understanding of how ideas move across the world.
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-stone)', lineHeight: 1.8 }}>
                  Today we operate across Uzbekistan, Pakistan, Afghanistan, and China's Silk Road corridor. We have extended our team with regional specialists of the same calibre as our founder, and we maintain a network of in-country partners — guesthouse owners, drivers, mountain guides, artisans, scholars — built over twenty-five years.
                </p>
              </div>
            </div>
            <div>
              <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', marginBottom: '1rem' }}>
                <Image
                  src="https://images.unsplash.com/photo-1653023102302-247f5f0fbdd1?w=800&q=80"
                  alt="Samarkand's Registan Square"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-stone)', letterSpacing: '0.06em' }}>
                Registan Square, Samarkand — where Silk Route Expeditions began
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background: 'var(--color-sand)' }} className="section-padding">
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>What We Believe</p>
            <h2 className="text-display-md">Our Operating Principles</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '0',
            borderTop: '1px solid rgba(107,107,107,0.2)',
          }}>
            {[
              {
                num: '01',
                title: 'Depth Over Coverage',
                body: 'We design programmes that go slowly through fewer places rather than fast through many. A week spent properly in Bukhara is worth more than a week in five cities.',
              },
              {
                num: '02',
                title: 'Local Expertise',
                body: 'We do not fly in guides from abroad. Every expert who accompanies our clients is from the country they are interpreting. Language, culture, and lived knowledge are not transferable.',
              },
              {
                num: '03',
                title: 'Responsible Presence',
                body: 'We work only with locally-owned accommodation, locally-owned vehicles, and local food producers. Our economic footprint stays in the communities that host our clients.',
              },
              {
                num: '04',
                title: 'Honest Assessment',
                body: "We will tell you when a destination is not right for a particular time, or when a client's interests would be better served by a different programme. Our goal is the best journey, not the easiest sale.",
              },
            ].map((value, i, arr) => (
              <div
                key={value.num}
                style={{
                  padding: '2.5rem',
                  borderRight: i < arr.length - 1 ? '1px solid rgba(107,107,107,0.2)' : 'none',
                  borderBottom: '1px solid rgba(107,107,107,0.2)',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  color: 'var(--color-bronze)',
                  marginBottom: '1rem',
                }}>
                  {value.num}
                </p>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 400,
                  color: 'var(--color-charcoal)',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                }}>
                  {value.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-stone)',
                  lineHeight: 1.75,
                }}>
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ background: 'var(--color-offwhite)' }} className="section-padding">
        <div className="container-wide">
          <div style={{ marginBottom: '3rem' }}>
            <p className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>The People</p>
            <h2 className="text-display-md">Our Team</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2.5rem',
          }}>
            {team.map(member => (
              <div key={member.name}>
                <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', marginBottom: '1.25rem', background: 'var(--color-sand)' }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>
                <p className="text-eyebrow" style={{ marginBottom: '0.3rem' }}>
                  {member.role}
                </p>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: 'var(--color-charcoal)',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                }}>
                  {member.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-stone)',
                  lineHeight: 1.75,
                  marginBottom: '1rem',
                }}>
                  {member.bio}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {member.expertise.map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.6rem',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--color-bronze)',
                        border: '1px solid rgba(139,105,20,0.3)',
                        padding: '0.25rem 0.6rem',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCREDITATIONS */}
      <section style={{ background: 'var(--color-charcoal)', padding: '4rem 0' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '0.5rem' }}>Credentials</p>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 300,
                color: 'var(--color-offwhite)',
                letterSpacing: '-0.01em',
              }}>
                Trusted & Accredited
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {['ATOL Protected', 'IATA Member', 'ATTA Member', 'Certified DMC'].map(cert => (
                <div
                  key={cert}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-stone-pale)',
                    borderLeft: '2px solid var(--color-bronze)',
                    paddingLeft: '0.75rem',
                  }}
                >
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CallToAction
        heading="Ready to Talk About Your Journey?"
        subheading="Reach out to discuss your interests, your travel dates, and your group. Every conversation starts with listening."
        primaryCta={{ text: 'Get in Touch', href: '/contact' }}
        secondaryCta={{ text: 'View Our Tours', href: '/tours' }}
      />
    </>
  )
}
