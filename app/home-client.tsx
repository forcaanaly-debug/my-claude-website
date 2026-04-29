'use client'

import { useTina, tinaField } from 'tinacms/dist/react'
import Hero from '@/components/sections/Hero'

type HeroData = {
  imageSrc?: string | null
  imageAlt?: string | null
  eyebrow?: string | null
  heading?: string | null
  subheading?: string | null
}

type TinaProps = {
  data: { page: { hero?: HeroData | null } }
  query: string
  variables: Record<string, unknown>
}

const STATIC = {
  imageSrc: 'https://images.unsplash.com/photo-1653023102302-247f5f0fbdd1?w=1600&q=85',
  imageAlt: 'Registan Square, Samarkand at dusk',
  eyebrow: 'Destination Management Company',
  heading: 'Where the Ancient Roads Still Run',
  subheading: 'Private expeditions to the crossroads of civilisations — Uzbekistan, Pakistan, Afghanistan, and China\'s Silk Road corridor.',
}

function HomeHero({ tinaProps }: { tinaProps: TinaProps }) {
  const { data } = useTina(tinaProps)
  const hero = data.page.hero

  return (
    <Hero
      imageSrc={hero?.imageSrc ?? STATIC.imageSrc}
      imageAlt={hero?.imageAlt ?? STATIC.imageAlt}
      eyebrow={hero?.eyebrow ?? STATIC.eyebrow}
      heading={hero?.heading ?? STATIC.heading}
      subheading={hero?.subheading ?? STATIC.subheading}
      tinaFields={hero ? {
        imageSrc: tinaField(hero, 'imageSrc'),
        eyebrow: tinaField(hero, 'eyebrow'),
        heading: tinaField(hero, 'heading'),
        subheading: tinaField(hero, 'subheading'),
      } : undefined}
      ctaPrimary={{ text: 'Explore Destinations', href: '/destinations' }}
      ctaSecondary={{ text: 'View Tours', href: '/tours' }}
    />
  )
}

export default function HomeClient({ tinaProps }: { tinaProps: TinaProps | null }) {
  if (!tinaProps) {
    return (
      <Hero
        imageSrc={STATIC.imageSrc}
        imageAlt={STATIC.imageAlt}
        eyebrow={STATIC.eyebrow}
        heading={STATIC.heading}
        subheading={STATIC.subheading}
        ctaPrimary={{ text: 'Explore Destinations', href: '/destinations' }}
        ctaSecondary={{ text: 'View Tours', href: '/tours' }}
      />
    )
  }

  return <HomeHero tinaProps={tinaProps} />
}
