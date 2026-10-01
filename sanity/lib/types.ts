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
  contentType?: 'Essay' | 'Poem' | 'Fragment' | 'Field Note'
  subhead?: string
  publishedAt?: string
  excerpt?: string
  estimatedReadTime?: number
  heroImage?: SanityImageAsset
}

export interface Essay extends EssayListItem {
  heroCaption?: string
  audioEmbed?: string
  body?: unknown[]
  attribution?: 'general' | 'ai' | 'custom'
  customAttributionText?: string
}

export interface Track {
  _id: string
  title: string
  description?: string
  releasedAt?: string
  audioUrl: string
  coverArt?: SanityImageAsset
}

export interface FeaturedItem {
  _id: string
  _type: 'essay' | 'video' | 'track'
  title: string
  description?: string
  date?: string
  // essay
  slug?: string
  subhead?: string
  excerpt?: string
  estimatedReadTime?: number
  contentType?: string
  // video
  youtubeUrl?: string
  series?: string
  // track
  audioUrl?: string
}

export interface VideoItem {
  _id: string
  title: string
  series?: string
  description?: string
  youtubeUrl: string
  instagramUrl?: string
  tiktokUrl?: string
  publishedAt?: string
}
