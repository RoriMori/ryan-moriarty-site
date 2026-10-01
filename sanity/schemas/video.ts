import { defineField, defineType } from 'sanity'

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'string',
      description: "Optional series name — e.g. \"It's Oona\"",
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Full YouTube watch URL — e.g. https://www.youtube.com/watch?v=VIDEO_ID',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      description: 'Instagram Reel or post URL (optional)',
    }),
    defineField({
      name: 'tiktokUrl',
      title: 'TikTok URL',
      type: 'url',
      description: 'TikTok video URL (optional)',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Check to feature this on the homepage. Only one item across all types should be featured at a time.',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', series: 'series', date: 'publishedAt' },
    prepare({ title, series, date }) {
      const sub = [
        series,
        date
          ? new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          : 'Draft',
      ].filter(Boolean).join(' · ')
      return { title, subtitle: sub }
    },
  },
  orderings: [
    {
      title: 'Publish Date (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
