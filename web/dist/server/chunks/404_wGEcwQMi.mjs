import { c as createComponent } from './astro-component_DOXGTi8F.mjs';
import { D as renderComponent, J as renderTemplate, x as maybeRenderHead } from './server_Co7d5vRa.mjs';
import { r as renderScript } from './script_DC7eYGcO.mjs';
import { $ as $$BaseLayout } from './BaseLayout_CVhwpCCg.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Esticode | 404", "description": "Stránka nebola nájdená." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="site-header"> <nav class="container nav" aria-label="Hlavná navigácia"> <a class="logo" href="/" aria-label="Esticode domovská stránka"> <img src="/img/Logo_White.svg" alt="Esticode"> </a> </nav> </header> <main class="error-main"> <section class="container error-shell fade-in"> <p class="error-code">404</p> <h1>Táto stránka sa niekde stratila.</h1> <p class="error-lead">Link môže byť neplatný alebo stránka už neexistuje. Vráťte sa na hlavnú stránku a pokračujte odtiaľ.</p> <div class="error-actions"> <a class="button button-primary" href="/">Späť na domov</a> <a class="button button-outline" href="/#kontakt">Kontaktovať Esticode</a> </div> </section> </main> ${renderScript($$result2, "C:/Users/ivand/Desktop/Esticode/web/src/pages/404.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/ivand/Desktop/Esticode/web/src/pages/404.astro", void 0);

const $$file = "C:/Users/ivand/Desktop/Esticode/web/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
