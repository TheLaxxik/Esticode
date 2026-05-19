import { c as createComponent } from './astro-component_DOXGTi8F.mjs';
import { D as renderComponent, J as renderTemplate } from './server_Co7d5vRa.mjs';

const prerender = false;
const $$KeystaticAstroPage = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Keystatic", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/ivand/Desktop/Esticode/node_modules/.pnpm/@keystatic+astro@5.0.6_@key_588bf2f9d6b0a60fedd2b45468d61147/node_modules/@keystatic/astro/internal/keystatic-page.js", "client:component-export": "Keystatic" })}`;
}, "C:/Users/ivand/Desktop/Esticode/node_modules/.pnpm/@keystatic+astro@5.0.6_@key_588bf2f9d6b0a60fedd2b45468d61147/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", void 0);

const $$file = "C:/Users/ivand/Desktop/Esticode/node_modules/.pnpm/@keystatic+astro@5.0.6_@key_588bf2f9d6b0a60fedd2b45468d61147/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$KeystaticAstroPage,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
