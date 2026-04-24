import { groq } from 'next-sanity'

export const essaySlugsQuery = groq`
  *[_type == "essay" && defined(slug.current)][].slug.current
`

export const essayListQuery = groq`
  *[_type == "essay" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
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
    subhead,
    publishedAt,
    heroImage,
    heroCaption,
    excerpt,
    body,
    estimatedReadTime
  }
`
