import { defineField, defineType } from 'sanity'

export const track = defineType({
  name: 'track',
  title: 'Track',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: { accept: 'audio/*' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverArt',
      title: 'Cover Art',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
    defineField({
      name: 'releasedAt',
      title: 'Release Date',
      type: 'date',
    }),
  ],
  preview: {
    select: { title: 'title', date: 'releasedAt', media: 'coverArt' },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date
          ? new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          : 'Draft',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Release Date (newest first)',
      name: 'releasedAtDesc',
      by: [{ field: 'releasedAt', direction: 'desc' }],
    },
  ],
})
