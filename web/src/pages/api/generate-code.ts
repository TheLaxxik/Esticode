export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const rand = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const year = new Date().getFullYear();
  return `ESTI-${rand(4)}-${rand(4)}`;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD;
  const authCookie = cookies.get('admin_auth')?.value;

  if (authCookie !== ADMIN_PASSWORD) {
    return new Response(
      JSON.stringify({ success: false, error: 'Neautorizovaný prístup.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { client, type } = await request.json();

    if (!client || !type) {
      return new Response(
        JSON.stringify({ success: false, error: 'Chýbajú údaje.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
    const codesPath = path.join(rootDir, 'src', 'data', 'codes.json');

    let codesData: any = { codes: {}, stats: { totalGenerated: 0, totalUsed: 0 } };
    try {
      const raw = await fs.readFile(codesPath, 'utf-8');
      codesData = JSON.parse(raw);
    } catch {}

    // Generovanie unikátneho kódu
    let code = generateCode();
    while (codesData.codes[code]) {
      code = generateCode();
    }

    codesData.codes[code] = {
      used: false,
      type,
      client,
      createdAt: new Date().toISOString().split('T')[0]
    };
    codesData.stats.totalGenerated += 1;

    await fs.writeFile(codesPath, JSON.stringify(codesData, null, 2), 'utf-8');

    return new Response(
      JSON.stringify({ success: true, code }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: 'Chyba pri generovaní kódu.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};