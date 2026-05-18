# Esticode — Projekt (Astro)

Krátky popis
-----------------
Jednoduchá webová stránka postavená pomocou Astro. Obsahuje základné stránky, layouty, skripty a štýly.

Požiadavky
-----------------
- Node.js v16+ (odporúčané)
- npm alebo pnpm

Inštalácia
-----------------
Otvorte terminál v koreňovom priečinku projektu (kde sa nachádza `package.json`) a spustite:

```bash
npm install
# alebo
pnpm install
```

Spustenie v režime vývoja
-----------------
Spustíte lokálny development server:

```bash
npm run dev
# alebo (ak nemáte skript):
npx astro dev
```

Build a náhľad produkcie
-----------------
Vytvorenie produkčného buildu a jeho náhľad:

```bash
npm run build
npm run preview
```

Štruktúra projektu (hlavné priečinky)
-----------------
- `public/` — statické súbory (obrázky, favicon, ...)
- `src/` — zdrojové súbory (stránky, layouty, komponenty)
- `layouts/` — layouty Astro
- `pages/` — stránky (routes)
- `scripts/` — JavaScript pre klienta alebo admin
- `styles/` — CSS súbory

Užitočné príkazy
-----------------
- `npm run dev` — spustí dev server
- `npm run build` — vytvorí produkčný build
- `npm run preview` — spustí lokálny preview pre produkčný build

Nasadenie
-----------------
Po úspešnom build-e nasadzujte statické súbory podľa vášho hostingu (Netlify, Vercel, GitHub Pages, VPS). Väčšina hostingov podporuje Astro projekty priamo.

Kontakt / autor
-----------------
Ak potrebujete ďalšiu pomoc, dajte vedieť.
