import { c as createComponent } from './astro-component_DOXGTi8F.mjs';
import { D as renderComponent, J as renderTemplate, x as maybeRenderHead } from './server_Co7d5vRa.mjs';
import { $ as $$LegalLayout } from './LegalLayout_C3cgv-_5.mjs';

const $$OchranaOsobnychUdajov = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LegalLayout", $$LegalLayout, { "title": "Esticode | Ochrana osobných údajov", "description": "Zásady ochrany osobných údajov spoločnosti Esticode.", "heading": "Ochrana osobných údajov", "currentPage": "ochrana" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>Tento dokument popisuje, ako Esticode spracúva osobné údaje návštevníkov webu a klientov v súlade s GDPR a platnou legislatívou Slovenskej republiky.</p> <h2>Aké údaje spracúvame</h2> <p>Pri kontakte cez formulár môžeme spracúvať meno, email, telefónne číslo a obsah správy.</p> <h2>Účel spracovania</h2> <p>Osobné údaje používame výhradne na komunikáciu, prípravu cenovej ponuky a realizáciu služieb.</p> <h2>Doba uchovávania</h2> <p>Údaje uchovávame len po nevyhnutnú dobu potrebnú na splnenie účelu alebo zákonných povinností.</p> <h2>Vaše práva</h2> <p>Máte právo na prístup k údajom, opravu, vymazanie, obmedzenie spracovania a podanie námietky.</p> <h2>Kontakt</h2> <p>V prípade otázok nás kontaktujte na <a href="mailto:info@esticode.sk">info@esticode.sk</a>.</p> ` })}`;
}, "C:/Users/ivand/Desktop/Esticode/web/src/pages/ochrana-osobnych-udajov.astro", void 0);

const $$file = "C:/Users/ivand/Desktop/Esticode/web/src/pages/ochrana-osobnych-udajov.astro";
const $$url = "/ochrana-osobnych-udajov";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$OchranaOsobnychUdajov,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
