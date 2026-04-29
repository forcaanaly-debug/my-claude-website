import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import CallToAction from '@/components/sections/CallToAction'
import { getContent, getGalleryImages } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Images from across the Silk Road — Uzbekistan, Pakistan, Afghanistan, and China.',
}

export default function GalleryPage() {
  const hero = getContent().pages.gallery.hero
  const rawImages = getGalleryImages()
  const images = rawImages.map((img, i) => ({ id: String(i + 1), ...img }))
  return (
    <>
      <PageHero
        imageSrc={hero.imageSrc}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        fieldPrefix="pages.gallery.hero"
        subheading={hero.subheading ?? ''}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Gallery', href: '/gallery' }]}
      />

      {/* Filter row */}
      <section style={{ background: 'var(--color-charcoal)', borderBottom: '1px solid rgba(107,107,107,0.2)', padding: '1rem 0' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-stone)', marginRight: '0.5rem' }}>
              Destination:
            </span>
            {['All', 'Uzbekistan', 'Pakistan', 'Afghanistan', 'China'].map(filter => (
              <button
                key={filter}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: filter === 'All' ? 'var(--color-bronze-pale)' : 'var(--color-stone)',
                  background: filter === 'All' ? 'rgba(139,105,20,0.15)' : 'transparent',
                  border: filter === 'All' ? '1px solid rgba(139,105,20,0.3)' : '1px solid transparent',
                  padding: '0.4rem 0.9rem',
                  cursor: 'pointer',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <GalleryGrid images={images} />

      <CallToAction
        heading="These Places Are Waiting for You"
        subheading="Every image here represents a journey we have operated. Let us design yours."
        primaryCta={{ text: 'Plan Your Journey', href: '/contact' }}
        secondaryCta={{ text: 'View Our Tours', href: '/tours' }}
      />
    </>
  )
}
