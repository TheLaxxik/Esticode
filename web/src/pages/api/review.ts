export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.text();
    console.log('[review API] raw body:', rawBody);
    
    if (!rawBody) {
      return new Response(
        JSON.stringify({ success: false, error: 'Prázdny request body.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = JSON.parse(rawBody);
    const { author, companyName, contactEmail, clientCode, rating, content } = data;

    // Validácia povinných polí
    if (!clientCode || !author || !companyName || !contactEmail || !rating || !content) {
      return new Response(
        JSON.stringify({ success: false, error: 'Chýbajú povinné polia.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const fileSlug = clientCode
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const fileName = `${fileSlug}.mdoc`;

    // Toto spolahlivo ukazuje na web/ priecinok bez ohladu na cwd
    const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
    const targetDir = path.join(rootDir, 'src', 'content', 'reviews');
    const filePath = path.join(targetDir, fileName);

    console.log('[review API] rootDir:', rootDir);
    console.log('[review API] targetDir:', targetDir);
    console.log('[review API] filePath:', filePath);

    const fileContent = `---
clientCode: ${clientCode}
author: ${author}
companyName: ${companyName}
contactEmail: ${contactEmail}
rating: ${Number(rating)}
approved: false
---

${content}`;

    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(filePath, fileContent, 'utf-8');

    return new Response(
      JSON.stringify({ success: true, message: 'Recenzia bola úspešne uložená na schválenie.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('[review API] Chyba:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Chyba na serveri pri ukladaní recenzie.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};