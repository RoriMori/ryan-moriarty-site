import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemas'

export default defineConfig({
  name:     'rorimori',
  title:    'Rori Mori',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production',

  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2026-04-22' }),
  ],

  schema: { types: schemaTypes },
})
