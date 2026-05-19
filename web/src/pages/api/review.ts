export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { author, companyName, contactEmail, clientCode, rating, content } = data;

    if (!clientCode || !author || !companyName || !contactEmail || !rating || !content) {
      return new Response(
        JSON.stringify({ success: false, error: 'Chýbajú povinné polia.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
    const codesPath = path.join(rootDir, 'src', 'data', 'codes.json');

    // Načítanie codes.json
    let codesData: any;
    try {
      const raw = await fs.readFile(codesPath, 'utf-8');
      codesData = JSON.parse(raw);
    } catch (e) {
      console.error('Error reading or parsing codes.json:', e);
      return new Response(
        JSON.stringify({ success: false, error: 'Interná chyba servera pri čítaní kódov.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const codeEntry = codesData.codes[clientCode];

    // Overenie kódu
    if (!codeEntry) {
      return new Response(
        JSON.stringify({ success: false, error: 'Neplatný klientsky kód.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (codeEntry.used) {
      return new Response(
        JSON.stringify({ success: false, error: 'Tento kód bol už použitý.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Označenie kódu ako použitého
    codesData.codes[clientCode].used = true;
    codesData.codes[clientCode].usedAt = new Date().toISOString();
    codesData.codes[clientCode].usedBy = companyName;
    codesData.stats.totalUsed += 1;

    await fs.writeFile(codesPath, JSON.stringify(codesData, null, 2), 'utf-8');

    // Uloženie recenzie
    const fileSlug = companyName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');

    const fileName = `${fileSlug}.mdoc`;
    const targetDir = path.join(rootDir, 'src', 'content', 'reviews');
    const filePath = path.join(targetDir, fileName);

    const reviewContent = `---
originalCode: "${clientCode}"
companyName: "${companyName}"
clientCode: "${clientCode}"
author: "${author}"
contactEmail: "${contactEmail}"
rating: ${rating}
approved: false
---
${content}
`;
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(filePath, reviewContent, 'utf-8');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Chyba na serveri pri ukladaní recenzie:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Chyba na serveri pri ukladaní recenzie.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};