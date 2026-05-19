import { c as createComponent } from './astro-component_DOXGTi8F.mjs';
import { G as renderHead, J as renderTemplate, l as addAttribute } from './server_Co7d5vRa.mjs';
import { r as renderScript } from './script_DC7eYGcO.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const prerender = false;
const $$Codes = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Codes;
  const ADMIN_PASSWORD = undefined                              ;
  const cookies = Astro2.cookies;
  const isLoggedIn = cookies.get("admin_auth")?.value === ADMIN_PASSWORD;
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("action");
    if (action === "login") {
      const password = form.get("password");
      if (password === ADMIN_PASSWORD) {
        cookies.set("admin_auth", ADMIN_PASSWORD, { path: "/admin", httpOnly: true });
        return Astro2.redirect("/admin/codes");
      }
    }
    if (action === "logout") {
      cookies.delete("admin_auth", { path: "/admin" });
      return Astro2.redirect("/admin/codes");
    }
  }
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
  const codesPath = path.join(rootDir, "src", "data", "codes.json");
  let codesData = { codes: {}, stats: { totalGenerated: 0, totalUsed: 0 } };
  try {
    const raw = await fs.readFile(codesPath, "utf-8");
    codesData = JSON.parse(raw);
  } catch {
  }
  const codesList = Object.entries(codesData.codes);
  const free = codesData.stats.totalGenerated - codesData.stats.totalUsed;
  return renderTemplate`<html lang="sk" data-astro-cid-p7favawl> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Esticode | Admin – Kódy</title>${renderHead()}</head> <body data-astro-cid-p7favawl> ${!isLoggedIn && renderTemplate`<div class="login-wrap" data-astro-cid-p7favawl> <h1 data-astro-cid-p7favawl>Admin prístup</h1> <div class="login-card" data-astro-cid-p7favawl> <form method="POST" data-astro-cid-p7favawl> <input type="hidden" name="action" value="login" data-astro-cid-p7favawl> <div class="form-group" style="margin-block-end:0.75rem;" data-astro-cid-p7favawl> <label data-astro-cid-p7favawl>Heslo</label> <input type="password" name="password" autofocus required data-astro-cid-p7favawl> </div> <button type="submit" class="btn btn-primary" style="inline-size:100%; margin-block-start:0.5rem;" data-astro-cid-p7favawl>Prihlásiť sa</button> </form> </div> </div>`} ${isLoggedIn && renderTemplate`<div class="page" data-astro-cid-p7favawl> <div class="page-header" data-astro-cid-p7favawl> <span class="page-title" data-astro-cid-p7favawl>Správa klientských kódov</span> <form method="POST" style="margin:0;" data-astro-cid-p7favawl> <input type="hidden" name="action" value="logout" data-astro-cid-p7favawl> <button type="submit" class="btn btn-ghost" data-astro-cid-p7favawl>Odhlásiť</button> </form> </div> <div class="stats" data-astro-cid-p7favawl> <div class="stat" data-astro-cid-p7favawl> <div class="stat-number" data-astro-cid-p7favawl>${codesData.stats.totalGenerated}</div> <div class="stat-label" data-astro-cid-p7favawl>Vygenerovaných</div> </div> <div class="stat" data-astro-cid-p7favawl> <div class="stat-number" data-astro-cid-p7favawl>${codesData.stats.totalUsed}</div> <div class="stat-label" data-astro-cid-p7favawl>Použitých</div> </div> <div class="stat" data-astro-cid-p7favawl> <div class="stat-number" data-astro-cid-p7favawl>${free}</div> <div class="stat-label" data-astro-cid-p7favawl>Voľných</div> </div> </div> <div class="card" data-astro-cid-p7favawl> <p class="card-title" data-astro-cid-p7favawl>Nový kód</p> <div class="form-row" data-astro-cid-p7favawl> <div class="form-group" data-astro-cid-p7favawl> <label data-astro-cid-p7favawl>Názov klienta</label> <input type="text" id="gen-client" placeholder="Napr. Kaviareň Noir" data-astro-cid-p7favawl> </div> <div class="form-group" style="max-inline-size:180px;" data-astro-cid-p7favawl> <label data-astro-cid-p7favawl>Typ projektu</label> <select id="gen-type" data-astro-cid-p7favawl> <option value="landing-page" data-astro-cid-p7favawl>Landing page</option> <option value="firemny-web" data-astro-cid-p7favawl>Firemný web</option> <option value="redizajn" data-astro-cid-p7favawl>Redizajn</option> </select> </div> <button id="gen-btn" class="btn btn-primary" data-astro-cid-p7favawl>Generovať</button> </div> <p id="gen-result" data-astro-cid-p7favawl></p> </div> <div class="card" data-astro-cid-p7favawl> <p class="card-title" data-astro-cid-p7favawl>Všetky kódy</p> ${codesList.length === 0 && renderTemplate`<p class="empty" data-astro-cid-p7favawl>Zatiaľ žiadne kódy.</p>`} ${codesList.length > 0 && renderTemplate`<table class="codes-table" data-astro-cid-p7favawl> <thead data-astro-cid-p7favawl> <tr data-astro-cid-p7favawl> <th data-astro-cid-p7favawl>Kód</th> <th data-astro-cid-p7favawl>Klient</th> <th data-astro-cid-p7favawl>Typ</th> <th data-astro-cid-p7favawl>Stav</th> <th data-astro-cid-p7favawl>Dátum</th> <th data-astro-cid-p7favawl></th> </tr> </thead> <tbody data-astro-cid-p7favawl> ${codesList.map(([code, entry]) => renderTemplate`<tr data-astro-cid-p7favawl> <td data-astro-cid-p7favawl><code data-astro-cid-p7favawl>${code}</code></td> <td data-astro-cid-p7favawl>${entry.client}</td> <td data-astro-cid-p7favawl><span class="badge badge-type" data-astro-cid-p7favawl>${entry.type}</span></td> <td data-astro-cid-p7favawl>${entry.used ? renderTemplate`<span class="badge badge-used" data-astro-cid-p7favawl>Použitý</span>` : renderTemplate`<span class="badge badge-free" data-astro-cid-p7favawl>Voľný</span>`}</td> <td style="color:#555;" data-astro-cid-p7favawl>${entry.createdAt}</td> <td data-astro-cid-p7favawl>${!entry.used && renderTemplate`<button class="btn-copy"${addAttribute(code, "data-code")} data-astro-cid-p7favawl>Kopírovať</button>`}</td> </tr>`)} </tbody> </table>`} </div> </div>`} ${renderScript($$result, "C:/Users/ivand/Desktop/Esticode/web/src/pages/admin/codes.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/ivand/Desktop/Esticode/web/src/pages/admin/codes.astro", void 0);
const $$file = "C:/Users/ivand/Desktop/Esticode/web/src/pages/admin/codes.astro";
const $$url = "/admin/codes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Codes,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
