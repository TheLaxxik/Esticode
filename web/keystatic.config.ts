import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    reviews: collection({
      label: 'Recenzie',
      slugField: 'originalCode',
      path: 'src/content/reviews/*',
      format: { contentField: 'content' },
      schema: {
        originalCode: fields.slug({ name: { label: 'Klientský kód' } }),
        companyName: fields.text({ label: 'Názov firmy' }),
        author: fields.text({ label: 'Meno autora recenzie' }),
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

    clientCodes: collection({
      label: 'Klientske kódy',
      slugField: 'client',
      path: 'src/content/client-codes/*',
      format: { data: 'json' },
      schema: {
        client: fields.slug({
          name: {
            label: 'Názov klienta',
            description: '⚠️ Kódy sa generujú na /admin/codes — kód skopíruj a vlož do poľa Slug vyššie.',
          }
        }),
        projectType: fields.select({
          label: 'Typ projektu',
          options: [
            { label: 'Landing page', value: 'landing-page' },
            { label: 'Firemný web', value: 'firemny-web' },
            { label: 'Redizajn', value: 'redizajn' },
          ],
          defaultValue: 'landing-page',
        }),
        used: fields.checkbox({
          label: 'Použitý',
          description: 'Kód bol už použitý na odoslanie recenzie.',
          defaultValue: false,
        }),
      },
    }),
  },
});