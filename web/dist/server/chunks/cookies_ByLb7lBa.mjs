import { c as createComponent } from './astro-component_DOXGTi8F.mjs';
import { D as renderComponent, J as renderTemplate, x as maybeRenderHead } from './server_Co7d5vRa.mjs';
import { $ as $$LegalLayout } from './LegalLayout_C3cgv-_5.mjs';

const $$Cookies = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LegalLayout", $$LegalLayout, { "title": "Esticode | Cookies", "description": "Informácie o používaní cookies na webe Esticode.", "heading": "Cookies", "currentPage": "cookies" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>Táto stránka vysvetľuje, ako Esticode používa súbory cookies a podobné technológie na svojom webe.</p> <h2>Čo sú cookies</h2> <p>Cookies sú malé textové súbory ukladané v prehliadači používateľa pri návšteve webovej stránky.</p> <h2>Typy cookies</h2> <p>Môžeme používať nevyhnutné cookies na technické fungovanie stránky a analytické cookies na zlepšovanie obsahu.</p> <h2>Správa cookies</h2> <p>Používateľ môže cookies spravovať alebo vymazať v nastaveniach svojho prehliadača.</p> <h2>Kontakt</h2> <p>V prípade otázok nás kontaktujte na <a href="mailto:info@esticode.sk">info@esticode.sk</a>.</p> ` })}`;
}, "C:/Users/ivand/Desktop/Esticode/web/src/pages/cookies.astro", void 0);

const $$file = "C:/Users/ivand/Desktop/Esticode/web/src/pages/cookies.astro";
const $$url = "/cookies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cookies,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
