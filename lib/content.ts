import fs from 'fs'
import path from 'path'

export interface ThemeColors {
  charcoal: string
  stone: string
  sand: string
  offwhite: string
  bronze: string
  bronzePale: string
}

export interface HeroContent {
  imageSrc: string
  imageAlt: string
  eyebrow: string
  heading: string
  subheading?: string
}

export interface SiteContent {
  theme: ThemeColors
  pages: {
    home: { hero: HeroContent }
    about: { hero: HeroContent }
    tours: { hero: HeroContent }
    destinations: { hero: HeroContent }
    services: { hero: HeroContent }
    contact: { hero: HeroContent }
    gallery: { hero: HeroContent }
  }
}

const contentPath = path.join(process.cwd(), 'data', 'content.json')

export function getContent(): SiteContent {
  const raw = fs.readFileSync(contentPath, 'utf-8')
  return JSON.parse(raw) as SiteContent
}

export function writeContent(content: SiteContent): void {
  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf-8')
}
