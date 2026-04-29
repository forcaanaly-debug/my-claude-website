'use client'

import { useTina } from 'tinacms/dist/react'
import { client } from '@/tina/__generated__/client'
import Hero from '@/components/sections/Hero'
import { useEffect, useState } from 'react'

type HeroData = {
  imageSrc?: string | null
  imageAlt?: string | null
  eyebrow?: string | null
  heading?: string | null
  subheading?: string | null
}

type Props = {
  data: {
    page: {
      hero?: HeroData | null
    }
  }
  query: string
  variables: Record<string, unknown>
}

function HomeInner(props: Props) {
  const { data } = useTina(props)
  const hero = data.page.hero

  return (
    <Hero
      imageSrc={hero?.imageSrc ?? ''}
      imageAlt={hero?.imageAlt ?? ''}
      eyebrow={hero?.eyebrow ?? ''}
      heading={hero?.heading ?? ''}
      subheading={hero?.subheading ?? ''}
      fieldPrefix="pages.home.hero"
      ctaPrimary={{ text: 'Explore Destinations', href: '/destinations' }}
      ctaSecondary={{ text: 'View Tours', href: '/tours' }}
    />
  )
}

// Server-fetches Tina data, then passes it to the client component
// so that the visual editor overlay is active in /admin context.
export default function HomeClient() {
  const [props, setProps] = useState<Props | null>(null)

  useEffect(() => {
    client.queries
      .page({ relativePath: 'home.json' })
      .then((res) => setProps(res as Props))
      .catch(console.error)
  }, [])

  if (!props) {
    // Render the hero from static values while Tina data loads
    return (
      <Hero
        imageSrc="https://images.unsplash.com/photo-1653023102302-247f5f0fbdd1?w=1600&q=85"
        imageAlt="Registan Square, Samarkand at dusk"
        eyebrow="Destination Management Company"
        heading="Where the Ancient Roads Still Run"
        subheading="Private expeditions to the crossroads of civilisations — Uzbekistan, Pakistan, Afghanistan, and China's Silk Road corridor."
        ctaPrimary={{ text: 'Explore Destinations', href: '/destinations' }}
        ctaSecondary={{ text: 'View Tours', href: '/tours' }}
      />
    )
  }

  return <HomeInner {...props} />
}
