import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    reviews: collection({
      label: 'Recenzie',
      slugField: 'title',
      path: 'src/content/reviews/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titulok recenzie' } }),
        rating: fields.integer({ label: 'Hodnotenie (1-5)', validation: { min: 1, max: 5 } }),
        author: fields.text({ label: 'Meno autora recenzie' }),
        content: fields.markdoc({ label: 'Obsah recenzie / Text' }),
      },
    }),
  },
});