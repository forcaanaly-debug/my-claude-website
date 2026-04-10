import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import CallToAction from '@/components/sections/CallToAction'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Images from across the Silk Road — Uzbekistan, Pakistan, Afghanistan, and China.',
}

const images = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-v9ZBig1I_j4?w=1200&q=85',
    alt: 'Registan Square at dusk, Samarkand',
    destination: 'Uzbekistan',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-AjFiqo-PsfE?w=1200&q=85',
    alt: 'Passu Cones rising above the Hunza River, Karakoram',
    destination: 'Pakistan',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-lc5iIZ7UO1w?w=1200&q=85',
    alt: 'Snow-dusted mountains of the Hindu Kush, Afghanistan',
    destination: 'Afghanistan',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-SGZ5DkDOoRo?w=1200&q=85',
    alt: 'Singing Sand Dunes at golden hour, Dunhuang',
    destination: 'China',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-U31zCVjmDA8?w=1200&q=85',
    alt: 'Attabad Lake — turquoise waters in the Karakoram gorge',
    destination: 'Pakistan',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-ih-afcs5oC4?w=1200&q=85',
    alt: 'Turquoise-tiled domes of Khiva, Uzbekistan',
    destination: 'Uzbekistan',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-i3pI9pQKo7Q?w=1200&q=85',
    alt: 'Hunza Valley at sunset — Rakaposhi in the distance',
    destination: 'Pakistan',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-WthHx_W7Ya4?w=1200&q=85',
    alt: 'The Kalon Minaret, Bukhara — a beacon since the 12th century',
    destination: 'Uzbekistan',
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-E2jsEq5urM4?w=1200&q=85',
    alt: 'A doorway in the old city of Kashgar, Silk Road China',
    destination: 'China',
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-8qCtP97jgoE?w=1200&q=85',
    alt: 'Aerial view of the Hunza River cutting through the Karakoram',
    destination: 'Pakistan',
  },
  {
    id: '11',
    src: 'https://images.unsplash.com/photo-LJh9ayGO8t8?w=1200&q=85',
    alt: 'Winter snows on the mountains above Hunza',
    destination: 'Pakistan',
  },
  {
    id: '12',
    src: 'https://images.unsplash.com/photo-TMJxZ_-xB-A?w=1200&q=85',
    alt: 'The Hunza River valley from the Passu Cones viewpoint',
    destination: 'Pakistan',
  },
  {
    id: '13',
    src: 'https://images.unsplash.com/photo-relRyFZxvZs?w=1200&q=85',
    alt: 'The Kalta Minor minaret, Khiva — abandoned before completion',
    destination: 'Uzbekistan',
  },
  {
    id: '14',
    src: 'https://images.unsplash.com/photo-VgNEZJ3JxvY?w=1200&q=85',
    alt: 'A river runs between mountain walls on the Karakoram Highway',
    destination: 'Pakistan',
  },
  {
    id: '15',
    src: 'https://images.unsplash.com/photo-GyALQFQ9cp4?w=1200&q=85',
    alt: 'Surveying the peaks above Hunza Valley',
    destination: 'Pakistan',
  },
  {
    id: '16',
    src: 'https://images.unsplash.com/photo-FacA4xA1jR4?w=1200&q=85',
    alt: 'A mosque under open sky, Central Asia',
    destination: 'Uzbekistan',
  },
]

export default function GalleryPage() {
  return (
    <>
      <PageHero
        imageSrc="https://images.unsplash.com/photo-i3pI9pQKo7Q?w=1400&q=85"
        imageAlt="Hunza Valley at sunset, Pakistan"
        eyebrow="The Places We Go"
        heading="A Portrait of the Silk Road"
        subheading="Images from our journeys — ancient cities, mountain corridors, and the landscapes between."
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
