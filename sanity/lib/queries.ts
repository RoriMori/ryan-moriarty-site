import { groq } from 'next-sanity'

export const essaySlugsQuery = groq`
  *[_type == "essay" && defined(slug.current)][].slug.current
`

export const essayListQuery = groq`
  *[_type == "essay" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    contentType,
    subhead,
    publishedAt,
    excerpt,
    estimatedReadTime,
    heroImage
  }
`

export const featuredEssayQuery = groq`
  *[_type == "essay" && defined(publishedAt)] | order(publishedAt desc)[0] {
    _id,
    title,
    "slug": slug.current,
    contentType,
    subhead,
    publishedAt,
    excerpt,
    estimatedReadTime
  }
`

export const essayBySlugQuery = groq`
  *[_type == "essay" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    contentType,
    subhead,
    publishedAt,
    heroImage,
    heroCaption,
    excerpt,
    audioEmbed,
    body,
    estimatedReadTime,
    attribution,
    customAttributionText
  }
`

export const trackListQuery = groq`
  *[_type == "track" && defined(releasedAt)] | order(releasedAt desc) {
    _id,
    title,
    description,
    releasedAt,
    "audioUrl": audioFile.asset->url,
    coverArt
  }
`

export const videoListQuery = groq`
  *[_type == "video" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    series,
    description,
    youtubeUrl,
    publishedAt
  }
`
