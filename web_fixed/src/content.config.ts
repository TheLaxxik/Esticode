import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reviews = defineCollection({
  // Astro v6 potrebuje loader, ktorý nájde všetky .mdoc a .md súbory v zložke
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/reviews' }),
  schema: z.object({
    originalCode: z.string(),
    companyName: z.string(),
    author: z.string(),
    contactEmail: z.string(),
    rating: z.number().min(1).max(5),
    approved: z.boolean().default(false),
  }),
});

export const collections = { reviews };