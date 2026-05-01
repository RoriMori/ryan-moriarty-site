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
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      initialValue: 'Essay',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Essay', value: 'Essay' },
          { title: 'Poem', value: 'Poem' },
          { title: 'Fragment', value: 'Fragment' },
          { title: 'Field Note', value: 'Field Note' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'subhead',
      title: 'Subhead',
      type: 'string',
      hidden: ({ document }) => !!document?.contentType && document.contentType !== 'Essay',
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
      name: 'audioEmbed',
      title: 'Audio Embed URL',
      type: 'url',
      description: 'SoundCloud or similar iframe embed URL. Shows a Listen player above the content.',
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
            { title: 'H2 — Center', value: 'h2Center' },
            { title: 'H2 — Right', value: 'h2Right' },
            { title: 'H3', value: 'h3' },
            { title: 'H3 — Center', value: 'h3Center' },
            { title: 'H3 — Right', value: 'h3Right' },
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
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      initialValue: 'general',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'AI', value: 'ai' },
          { title: 'Custom', value: 'custom' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'customAttributionText',
      title: 'Custom Attribution Text',
      type: 'text',
      rows: 4,
      hidden: ({ document }) => document?.attribution !== 'custom',
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
