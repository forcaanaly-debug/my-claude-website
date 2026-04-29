import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import CallToAction from '@/components/sections/CallToAction'
import { getContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Ground handling, logistics, private guiding, and custom itinerary design across Central Asia, Pakistan, Afghanistan, and China.',
}

const services = [
  {
    num: '01',
    title: 'Ground Handling & Logistics',
    description: 'The invisible architecture of a great journey. We manage every aspect of in-country operations: airport transfers, vehicle fleets and drivers, accommodation bookings, domestic flights, border crossings, permit applications, and contingency planning.\n\nIn remote destinations — the Wakhan Corridor, Gilgit-Baltistan, the Gansu Desert — where infrastructure is unpredictable and alternatives are few, the quality of our ground operations is the difference between a journey that unfolds smoothly and one that does not.',
    icon: '⬡',
  },
  {
    num: '02',
    title: 'Private Expert Guides',
    description: "Our guides are the central feature of every programme we operate. We do not use generalist guides who cover multiple countries. Each specialist operates in the region they know intimately: a Samarkand-born art historian for Uzbekistan, a Gilgiti mountaineer for the northern areas of Pakistan, a Chinese Buddhist art scholar for Dunhuang.\n\nAll guides speak fluent English and the relevant local languages. Many have academic credentials in their subject area. They are selected not only for knowledge but for the quality of their company — the ability to make a day's walk or a long drive as interesting as the destination itself.",
    icon: '◈',
  },
  {
    num: '03',
    title: 'Accommodation Curation',
    description: 'We reject the global hotel chain model for travel in this region. Our accommodation is selected for its character, its location within the historic fabric of each city, and the quality of its hospitality. In Bukhara and Khiva we use restored caravanserais and historic townhouses. In Hunza, properties with unobstructed views of the peaks. In remote areas, the best available guesthouses, carefully vetted.\n\nWhere high-specification international hotel accommodation genuinely enhances the experience — as in Lahore or Islamabad — we book it. Our standard is always: the place where you will feel most connected to where you are.',
    icon: '◇',
  },
  {
    num: '04',
    title: 'Bespoke Itinerary Design',
    description: "Every programme we have ever operated was built around a specific client's interests. The itineraries on our website are starting points — our best thinking about the right duration, sequence, and pace for each destination. They are not fixed products.\n\nWe regularly design programmes that combine multiple destinations, that focus on a single theme (Islamic architecture, Silk Road trade history, mountain photography, high-altitude botany), or that involve unusual logistics (river journeys, pack-horse treks, extended overland crossings). If you have a vision for a journey, tell us. If you have an interest but not a plan, tell us that too.",
    icon: '◉',
  },
  {
    num: '05',
    title: 'Corporate & Incentive Travel',
    description: 'We design programmes for corporate groups and incentive travel that use the extraordinary backdrop of the Silk Road as a setting for leadership development, relationship building, and reward. These programmes are typically 6–14 days and are planned around a specific corporate objective as well as a curated travel experience.\n\nPast corporate clients have included finance, energy, and technology firms. The destinations we operate in — particularly Uzbekistan and Pakistan — offer a level of exclusivity and distinctiveness that is simply unavailable in more established luxury markets.',
    icon: '◈',
  },
  {
    num: '06',
    title: 'Academic & Research Support',
    description: 'We have supported research expeditions for universities, documentary film crews, archaeological teams, and individual scholars since our founding. Our network of in-country contacts — conservators, archivists, local historians, community leaders — provides access that is unavailable through standard channels.\n\nIf you are undertaking research in the region and need in-country logistics, translation, local expertise, or introductions, we can assist.',
    icon: '◇',
  },
]

export default function ServicesPage() {
  const hero = getContent().pages.services.hero
  return (
    <>
      <PageHero
        imageSrc={hero.imageSrc}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        fieldPrefix="pages.services.hero"
        subheading={hero.subheading ?? ''}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }]}
      />

      {/* SERVICES GRID */}
      <section style={{ background: 'var(--color-offwhite)' }} className="section-padding">
        <div className="container-wide">
          <div style={{ marginBottom: '4rem', maxWidth: '640px' }}>
            <p className="text-eyebrow" style={{ marginBottom: '1rem' }}>Our Capabilities</p>
            <h2 className="text-display-md" style={{ marginBottom: '1.25rem' }}>
              We Handle Everything.<br />You Experience Everything.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-stone)', lineHeight: 1.8 }}>
              A destination management company's job is to make the complexity of travel in challenging regions invisible to the client. You should never feel the friction of operating across multiple countries, languages, currencies, and bureaucracies. That is our work.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '0',
            borderTop: '1px solid rgba(107,107,107,0.15)',
            borderLeft: '1px solid rgba(107,107,107,0.15)',
          }}>
            {services.map(service => (
              <div
                key={service.num}
                style={{
                  padding: '2.5rem',
                  borderRight: '1px solid rgba(107,107,107,0.15)',
                  borderBottom: '1px solid rgba(107,107,107,0.15)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-bronze)',
                  }}>
                    {service.num}
                  </span>
                  <span style={{ fontSize: '1.25rem', color: 'var(--color-stone-pale)', opacity: 0.5 }}>
                    {service.icon}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: 'var(--color-charcoal)',
                  marginBottom: '1rem',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}>
                  {service.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {service.description.split('\n\n').map((para, i) => (
                    <p key={i} style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-stone)',
                      lineHeight: 1.75,
                    }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: 'var(--color-charcoal)' }} className="section-padding">
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="text-eyebrow" style={{ color: 'var(--color-bronze-pale)', marginBottom: '0.75rem' }}>The Process</p>
            <h2 className="text-display-md" style={{ color: 'var(--color-offwhite)' }}>
              From First Contact to Final Day
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { step: '01', title: 'Initial Consultation', desc: 'A conversation about your interests, travel dates, group composition, and budget. This is not a sales call — it is a planning conversation. We ask a lot of questions.' },
              { step: '02', title: 'Programme Proposal', desc: 'We send a detailed day-by-day proposal within five working days, including accommodation recommendations, guide profiles, and a full cost breakdown.' },
              { step: '03', title: 'Refinement', desc: 'We work through any changes, answer questions about specific elements, and adjust until the programme is exactly what you want.' },
              { step: '04', title: 'Confirmation & Logistics', desc: 'On confirmation, we begin all ground bookings — accommodation, domestic transport, permits, guide assignments — typically 3–6 months before departure.' },
              { step: '05', title: 'Pre-Departure Briefing', desc: 'Two weeks before departure, a detailed briefing document covering everything you need to know: health, weather, packing, cultural context, day-by-day logistics.' },
              { step: '06', title: 'In-Country Support', desc: 'A 24/7 emergency contact is available throughout your journey. Your lead guide has direct lines to our operations team in each country.' },
            ].map((item, i, arr) => (
              <div
                key={item.step}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  padding: '1.75rem 0',
                  borderTop: '1px solid rgba(107,107,107,0.25)',
                  borderBottom: i === arr.length - 1 ? '1px solid rgba(107,107,107,0.25)' : 'none',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  color: 'var(--color-stone)',
                  flexShrink: 0,
                  minWidth: '2rem',
                  marginTop: '0.25rem',
                }}>
                  {item.step}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    color: 'var(--color-offwhite)',
                    marginBottom: '0.4rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-stone)', lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        heading="Let's Start the Conversation"
        subheading="There's no obligation in an initial enquiry. Tell us what you're interested in and we'll tell you what's possible."
        primaryCta={{ text: 'Make an Enquiry', href: '/contact' }}
        secondaryCta={{ text: 'View Our Tours', href: '/tours' }}
      />
    </>
  )
}
