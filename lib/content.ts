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

export interface GalleryImage {
  src: string
  alt: string
  destination: string
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

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T
}

const root = process.cwd()

export function getContent(): SiteContent {
  const { theme } = readJson<{ theme: ThemeColors }>(
    path.join(root, 'content/global/index.json')
  )
  const pages = ['home', 'about', 'tours', 'destinations', 'services', 'contact', 'gallery'] as const
  return {
    theme,
    pages: Object.fromEntries(
      pages.map(p => [p, readJson(path.join(root, `content/pages/${p}.json`))])
    ) as SiteContent['pages'],
  }
}

export function getGalleryImages(): GalleryImage[] {
  const { images } = readJson<{ images: GalleryImage[] }>(
    path.join(root, 'content/gallery/index.json')
  )
  return images
}
