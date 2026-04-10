export interface Destination {
  slug: string
  name: string
  region: string
  heroImage: string
  cardImage: string
  tagline: string
  description: string
  longDescription: string
  highlights: string[]
  bestTime: string
  climate: string
  capital: string
  language: string
  currency: string
  visa: string
  tourSlugs: string[]
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  accommodation?: string
}

export interface Tour {
  slug: string
  title: string
  destinationSlug: string
  destinationName: string
  duration: number
  groupSize: { min: number; max: number }
  priceFrom: number
  heroImage: string
  cardImage: string
  tagline: string
  overview: string
  itinerary: ItineraryDay[]
  included: string[]
  excluded: string[]
  difficulty: 'easy' | 'moderate' | 'challenging'
  category: 'cultural' | 'adventure' | 'expedition'
  featured: boolean
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  expertise: string[]
}

export interface Testimonial {
  quote: string
  author: string
  origin: string
  tour: string
  year: number
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  destination: string
  width: number
  height: number
}
