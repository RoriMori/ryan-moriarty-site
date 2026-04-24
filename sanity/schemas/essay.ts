import { defineArrayMember, defineField, defineType } from 'sanity'

export const essay = defineType({
  name: 'essay',
  title: 'Essay',
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
      name: 'subhead',
      title: 'Subhead',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'heroCaption',
      title: 'Hero Image Caption',
      type: 'string',
      description: 'Optional caption displayed below the hero image, right-aligned.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short summary shown on the homepage and writing list.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        // Standard rich text blocks
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Section Opener', value: 'sectionOpener' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', type: 'url', title: 'URL' }),
                ],
              }),
            ],
          },
        }),
        // Inline image with caption
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ],
        }),
        // Pull quote
        defineArrayMember({
          type: 'object',
          name: 'pullQuote',
          title: 'Pull Quote',
          fields: [
            defineField({ name: 'text', type: 'text', title: 'Quote', rows: 3 }),
          ],
          preview: {
            select: { title: 'text' },
            prepare: ({ title }) => ({ title: `"${title}"`, subtitle: 'Pull Quote' }),
          },
        }),
        // External embed (SoundCloud, YouTube, etc.)
        defineArrayMember({
          type: 'object',
          name: 'externalEmbed',
          title: 'External Embed',
          fields: [
            defineField({ name: 'url', type: 'url', title: 'URL' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption (optional)' }),
          ],
          preview: {
            select: { title: 'url', subtitle: 'caption' },
            prepare: ({ title, subtitle }) => ({
              title: subtitle || 'External Embed',
              subtitle: title,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'estimatedReadTime',
      title: 'Estimated Read Time (minutes)',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', date: 'publishedAt', media: 'heroImage' },
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
      title: 'Publish Date (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
