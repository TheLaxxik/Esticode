import { c as createComponent } from './astro-component_DOXGTi8F.mjs';
import { l as addAttribute, H as renderSlot, G as renderHead, J as renderTemplate } from './server_Co7d5vRa.mjs';

const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description = "Esticode z Košíc tvorí rýchle a čisté weby pre kaviarne a malé firmy.",
    robots = "index,follow",
    cssFile = "/src/styles/global.css",
    ogTitle,
    ogDescription
  } = Astro2.props;
  return renderTemplate`<html lang="sk"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><meta name="robots"${addAttribute(robots, "content")}><meta name="theme-color" content="#111111"><meta name="color-scheme" content="dark"><meta property="og:locale" content="sk_SK"><meta property="og:type" content="website"><meta property="og:title"${addAttribute(ogTitle ?? title, "content")}><meta property="og:description"${addAttribute(ogDescription ?? description, "content")}><title>${title}</title><link rel="icon" type="image/svg+xml" href="/img/PFP_White.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/ivand/Desktop/Esticode/web/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
