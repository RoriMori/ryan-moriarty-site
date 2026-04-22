export interface SanityImageAsset {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  alt?: string
}

export interface EssayListItem {
  _id: string
  title: string
  slug: string
  subhead?: string
  publishedAt?: string
  excerpt?: string
  estimatedReadTime?: number
  heroImage?: SanityImageAsset
}

export interface Essay extends EssayListItem {
  body?: unknown[] // Sanity PortableText blocks
}
