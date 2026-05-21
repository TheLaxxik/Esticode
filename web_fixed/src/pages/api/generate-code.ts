export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHmac, timingSafeEqual } from 'node:crypto';

function isValidSessionToken(token: string): boolean {
  const TOKEN_SECRET = import.meta.env.ADMIN_TOKEN_SECRET || 'fallback-dev-secret-change-in-prod';
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [nonce, hmac] = parts;
  const expected = createHmac('sha256', TOKEN_SECRET).update(nonce).digest('hex');
  try {
    return timingSafeEqual(Buffer.from(hmac, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const rand = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `ESTI-${rand(4)}-${rand(4)}`;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionToken = cookies.get('admin_session')?.value ?? '';

  if (!sessionToken || !isValidSessionToken(sessionToken)) {
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
