import type { APIRoute } from 'astro';
// @ts-ignore
import fs from 'node:fs/promises';
// @ts-ignore
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Čítanie JSON dát z požiadavky
    const data = await request.json();
    const { title, author, rating, content } = data;

    // Validácia povinných polí
    if (!title || !author || !rating || !content) {
      return new Response(
        JSON.stringify({ success: false, error: 'Chýbajú povinné údaje.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Vygenerovanie bezpečného názvu súboru zo slugu (Titulku)
    const fileSlug = title
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Odstránenie diakritiky
      .replace(/[^a-z0-9]+/g, '-')     // Nahradenie nealfanumerických znakov pomlčkou
      .replace(/^-+|-+$/g, '');        // Orezanie pomlčiek z krajov

    const fileName = `${fileSlug}.mdoc`;
    
    // @ts-ignore
    const rootDir = process.cwd();
    const targetDir = path.join(rootDir, 'src', 'content', 'reviews');
    const filePath = path.join(targetDir, fileName);

    // Vytvorenie štruktúry Markdoc súboru pre Keystatic s approved: false
    const fileContent = `---
title: ${title}
rating: ${Number(rating)}
author: ${author}
approved: false
---

${content}`;

    // Uistenie sa, že priečinok existuje a zápis súboru
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(filePath, fileContent, 'utf-8');

    return new Response(
      JSON.stringify({ success: true, message: 'Recenzia bola úspešne uložená na schválenie.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Chyba na backend API:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Chyba na serveri pri ukladaní recenzie.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};