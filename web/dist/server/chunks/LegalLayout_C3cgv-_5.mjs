import { c as createComponent } from './astro-component_DOXGTi8F.mjs';
import { D as renderComponent, J as renderTemplate, x as maybeRenderHead, H as renderSlot, l as addAttribute } from './server_Co7d5vRa.mjs';
import { r as renderScript } from './script_DC7eYGcO.mjs';
import { $ as $$BaseLayout } from './BaseLayout_CVhwpCCg.mjs';

const $$LegalLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LegalLayout;
  const { title, description, heading, currentPage } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="site-header"> <nav class="container nav" aria-label="Hlavná navigácia"> <a class="logo" href="/" aria-label="Esticode domovská stránka"> <img src="/img/Logo_White.svg" alt="Esticode"> </a> </nav> </header> <main> <section class="section"> <div class="container legal-shell"> <article class="legal-content fade-in is-visible"> <p class="kicker">Právne informácie</p> <h1>${heading}</h1> ${renderSlot($$result2, $$slots["default"])} </article> <aside class="legal-side fade-in is-visible" aria-label="Navigácia právnych stránok"> <p class="kicker">Navigácia</p> <h2>Právne stránky</h2> <nav> <a href="/ochrana-osobnych-udajov"${addAttribute(currentPage === "ochrana" ? "page" : void 0, "aria-current")}>
Ochrana osobných údajov
</a> <a href="/cookies"${addAttribute(currentPage === "cookies" ? "page" : void 0, "aria-current")}>
Cookies
</a> <a href="/obchodne-podmienky"${addAttribute(currentPage === "obchodne" ? "page" : void 0, "aria-current")}>
Obchodné podmienky
</a> </nav> <a class="legal-back" href="/">Späť na hlavnú stránku</a> </aside> </div> </section> </main> ${renderScript($$result2, "C:/Users/ivand/Desktop/Esticode/web/src/layouts/LegalLayout.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/ivand/Desktop/Esticode/web/src/layouts/LegalLayout.astro", void 0);

export { $$LegalLayout as $ };
