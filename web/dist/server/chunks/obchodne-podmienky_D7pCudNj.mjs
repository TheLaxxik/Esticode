import { c as createComponent } from './astro-component_DOXGTi8F.mjs';
import { D as renderComponent, J as renderTemplate, x as maybeRenderHead } from './server_Co7d5vRa.mjs';
import { $ as $$LegalLayout } from './LegalLayout_C3cgv-_5.mjs';

const $$ObchodnePodmienky = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LegalLayout", $$LegalLayout, { "title": "Esticode | Obchodné podmienky", "description": "Všeobecné obchodné podmienky spoločnosti Esticode.", "heading": "Obchodné podmienky", "currentPage": "obchodne" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>Tieto obchodné podmienky upravujú vzťah medzi Esticode a klientom pri poskytovaní služieb tvorby webových stránok.</p> <h2>Predmet služieb</h2> <p>Esticode poskytuje návrh, vývoj a úpravy webových stránok podľa dohodnutého rozsahu prác.</p> <h2>Cena a fakturácia</h2> <p>Cena služby je dohodnutá individuálne v cenovej ponuke. Fakturácia prebieha podľa dohodnutých termínov.</p> <h2>Dodacie termíny</h2> <p>Termín dodania závisí od rozsahu projektu a súčinnosti klienta pri dodaní podkladov.</p> <h2>Zodpovednosť</h2> <p>Esticode nezodpovedá za škody spôsobené nesprávnym používaním stránky alebo zásahom tretích strán.</p> <h2>Kontakt</h2> <p>V prípade otázok nás kontaktujte na <a href="mailto:info@esticode.sk">info@esticode.sk</a>.</p> ` })}`;
}, "C:/Users/ivand/Desktop/Esticode/web/src/pages/obchodne-podmienky.astro", void 0);

const $$file = "C:/Users/ivand/Desktop/Esticode/web/src/pages/obchodne-podmienky.astro";
const $$url = "/obchodne-podmienky";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ObchodnePodmienky,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
