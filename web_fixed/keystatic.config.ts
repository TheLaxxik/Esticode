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
      
      // Stĺpce, ktoré uvidíš v zozname recenzií
      columns: ['originalCode', 'companyName', 'rating', 'createdAt', 'approved'],
      
      schema: {
        originalCode: fields.slug({ name: { label: 'Klientský kód' } }),
        companyName: fields.text({ label: 'Názov firmy' }),
        clientCode: fields.text({
          label: 'K. Kód',
          description: 'Klientský kód pridelený zákazníkovi (napr. ESTI-XXXX-XXXX)',
        }),
        author: fields.text({ label: 'Meno autora recenzie' }),
        contactEmail: fields.text({ label: 'Kontaktný email' }),
        rating: fields.integer({ label: 'Hodnotenie (1-5)', validation: { min: 1, max: 5 } }),
        createdAt: fields.datetime({ label: 'Dátum vytvorenia' }),
        content: fields.markdoc({ label: 'Obsah recenzie / Text' }),
        approved: fields.checkbox({
          label: 'Zobraziť na web (Schválené)',
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
      
      // Pridané 'createdAt' aj do zoznamu stĺpcov pre kódy
      columns: ['client', 'companyName', 'projectType', 'used', 'createdAt'],
      
      schema: {
        client: fields.slug({
          name: {
            label: 'Názov klienta',
            description: '⚠️ Kódy sa generujú na: www.esticode.sk/admin/codes/ — kód skopíruj a vlož do poľa Slug vyššie.',
          }
        }),
        companyName: fields.text({
          label: 'Názov firmy',
          description: 'Oficiálny názov firmy klienta',
        }),
        clientCode: fields.text({
          label: 'K. Kód',
          description: 'Klientský kód pridelený zákazníkovi (napr. ESTI-XXXX-XXXX)',
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
        // FIX: Keystatic už vie prečítať dátum vytvorenia klientskeho kódu
        createdAt: fields.datetime({
          label: 'Dátum vytvorenia',
        }),
      },
    }),
  },
});