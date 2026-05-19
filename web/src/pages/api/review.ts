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
      return new Response(
        JSON.stringify({ success: false, error: 'Interná chyba servera.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const codeEntry = codesData.codes[clientCode];

    // Overenie kódu
    if (!codeEntry || codeEntry.used) {
      return new Response(
        JSON.stringify({ success: false, error: 'Neplatný alebo už použitý klientsky kód.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Označenie kódu ako použitého
    codesData.codes[clientCode].used = true;
    codesData.codes[clientCode].usedAt = new Date().toISOString();
    codesData.codes[clientCode].usedBy = companyName;
    codesData.stats.totalUsed += 1;

    await fs.writeFile(codesPath, JSON.stringify(codesData, null, 2), 'utf-8');

    // Názov súboru pre recenziu
    const fileSlug = clientCode.toUpperCase().trim().replace(/[^A-Z0-9-]/g, '');
    const fileName = `${fileSlug}.mdoc`;
    const targetDir = path.join(rootDir, 'src', 'content', 'reviews');
    const filePath = path.join(targetDir, fileName);

    // TOTO JE TÁ OPRAVA: Presný formát času pre Keystatic (napr. "2026-05-19T23:38")
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Vygenerovanie .mdoc obsahu
    const reviewContent = `---
originalCode: ${JSON.stringify(clientCode)}
companyName: ${JSON.stringify(companyName)}
clientCode: ${JSON.stringify(clientCode)}
author: ${JSON.stringify(author)}
contactEmail: ${JSON.stringify(contactEmail)}
rating: ${Number(rating)}
createdAt: '${formattedDate}'
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
    return new Response(
      JSON.stringify({ success: false, error: 'Chyba na serveri.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};