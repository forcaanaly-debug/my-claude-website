import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Silk Route Expeditions to begin planning your journey.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        imageSrc="https://images.unsplash.com/photo-1643661100639-de5cdf7bcb80?w=1400&q=85"
        imageAlt="Silk Road landscape"
        eyebrow="Get in Touch"
        heading="Begin Your Journey Here"
        subheading="Every great expedition starts with a conversation. Tell us where you want to go."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact' }]}
      />

      <section style={{ background: 'var(--color-offwhite)' }} className="section-padding">
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'start' }}>
            {/* Left: info */}
            <div>
              <p className="text-eyebrow" style={{ marginBottom: '1rem' }}>How to Reach Us</p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: 'var(--color-charcoal)',
                marginBottom: '1.5rem',
                lineHeight: 1.15,
              }}>
                We Respond Within 48 Hours
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-stone)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                We take every enquiry seriously. There are no automated responses — your message goes directly to the relevant regional director, who will respond personally within two working days.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  {
                    label: 'Bookings',
                    lines: ['Direct booking enquiries', 'forcaan@gmail.com'],
                  },
                  {
                    label: 'London Office',
                    lines: ['Mayfair, London W1K', '+44 20 7123 4567', 'info@silkrouteexpeditions.com'],
                  },
                  {
                    label: 'Tashkent Office',
                    lines: ['Mirzo Ulugbek, Tashkent', '+998 71 234 5678', 'uzbekistan@silkrouteexpeditions.com'],
                  },
                  {
                    label: 'Islamabad Office',
                    lines: ['F-6/2, Islamabad', '+92 51 234 5678', 'pakistan@silkrouteexpeditions.com'],
                  },
                ].map(office => (
                  <div
                    key={office.label}
                    style={{
                      padding: '1.5rem',
                      borderLeft: '2px solid var(--color-bronze)',
                      paddingLeft: '1.5rem',
                    }}
                  >
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-bronze)',
                      marginBottom: '0.5rem',
                    }}>
                      {office.label}
                    </p>
                    {office.lines.map(line => (
                      <p key={line} style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-stone)', lineHeight: 1.6 }}>
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Response time note */}
              <div style={{
                marginTop: '2.5rem',
                padding: '1.5rem',
                background: 'var(--color-sand)',
                borderTop: '2px solid var(--color-bronze)',
              }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-charcoal)', lineHeight: 1.7 }}>
                  <strong>Response time:</strong> We typically respond within 24–48 hours during business days (Mon–Fri, 9am–6pm GMT). For urgent operational matters during a journey, please use the emergency contact number provided in your pre-departure briefing.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
