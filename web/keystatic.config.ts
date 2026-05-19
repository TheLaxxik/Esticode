import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    reviews: collection({
      label: 'Recenzie',
      slugField: 'clientCode',
      path: 'src/content/reviews/*',
      format: { contentField: 'content' },
      schema: {
        clientCode: fields.slug({ name: { label: 'Klientský kód' } }),
        author: fields.text({ label: 'Meno autora recenzie' }),
        companyName: fields.text({ label: 'Názov firmy' }),
        contactEmail: fields.text({ label: 'Kontaktný email' }),
        rating: fields.integer({ label: 'Hodnotenie (1-5)', validation: { min: 1, max: 5 } }),
        content: fields.markdoc({ label: 'Obsah recenzie / Text' }),
        
        approved: fields.checkbox({
          label: 'Zobraziť na webe (Schválené)',
          description: 'Ak toto nie je zaškrtnuté, recenzia sa na stránke neukáže.',
          defaultValue: false,
        }),
      },
    }),
  },
});