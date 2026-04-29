'use client'

import { useTina, tinaField } from 'tinacms/dist/react'
import PageHero from './PageHero'

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

type StaticHero = {
  imageSrc: string
  imageAlt: string
  eyebrow?: string
  heading: string
  subheading?: string
}

type Props = {
  tinaProps: TinaProps | null
  staticHero: StaticHero
  breadcrumb?: { label: string; href: string }[]
}

function PageHeroWithTina({ tinaProps, staticHero, breadcrumb }: { tinaProps: TinaProps; staticHero: StaticHero; breadcrumb?: Props['breadcrumb'] }) {
  const { data } = useTina(tinaProps)
  const hero = data.page.hero

  return (
    <PageHero
      imageSrc={hero?.imageSrc ?? staticHero.imageSrc}
      imageAlt={hero?.imageAlt ?? staticHero.imageAlt}
      eyebrow={hero?.eyebrow ?? staticHero.eyebrow}
      heading={hero?.heading ?? staticHero.heading}
      subheading={hero?.subheading ?? staticHero.subheading}
      tinaFields={hero ? {
        imageSrc: tinaField(hero, 'imageSrc'),
        eyebrow: tinaField(hero, 'eyebrow'),
        heading: tinaField(hero, 'heading'),
        subheading: tinaField(hero, 'subheading'),
      } : undefined}
      breadcrumb={breadcrumb}
    />
  )
}

export default function PageHeroClient({ tinaProps, staticHero, breadcrumb }: Props) {
  if (!tinaProps) {
    return (
      <PageHero
        imageSrc={staticHero.imageSrc}
        imageAlt={staticHero.imageAlt}
        eyebrow={staticHero.eyebrow}
        heading={staticHero.heading}
        subheading={staticHero.subheading}
        breadcrumb={breadcrumb}
      />
    )
  }

  return <PageHeroWithTina tinaProps={tinaProps} staticHero={staticHero} breadcrumb={breadcrumb} />
}
