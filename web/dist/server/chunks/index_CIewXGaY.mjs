import { c as createComponent } from './astro-component_DOXGTi8F.mjs';
import { q as generateCspDigest, K as spreadAttributes, Q as unescapeHTML, J as renderTemplate, B as removeBase, v as isRemotePath, S as unflatten, y as object, o as date, m as array, A as AstroError, U as UnknownContentCollectionError, P as string, D as renderComponent, d as Fragment, x as maybeRenderHead, p as defineScriptVars, l as addAttribute } from './server_Co7d5vRa.mjs';
import { r as renderScript } from './script_DC7eYGcO.mjs';
import { $ as $$BaseLayout } from './BaseLayout_CVhwpCCg.mjs';
import { V as VALID_INPUT_FORMATS } from './consts_Cm-hF_R3.mjs';

var e=e=>Object.prototype.toString.call(e),t=e=>ArrayBuffer.isView(e)&&!(e instanceof DataView),o=t=>"[object Date]"===e(t),n=t=>"[object RegExp]"===e(t),r=t=>"[object Error]"===e(t),s=t=>"[object Boolean]"===e(t),l=t=>"[object Number]"===e(t),i=t=>"[object String]"===e(t),c=Array.isArray,u=Object.getOwnPropertyDescriptor,a=Object.prototype.propertyIsEnumerable,f=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,h=Object.keys;function d(e){const t=h(e),o=f(e);for(let n=0;n<o.length;n++)a.call(e,o[n])&&t.push(o[n]);return t}function b(e,t){return !u(e,t)?.writable}function y(e,u){if("object"==typeof e&&null!==e){let a;if(c(e))a=[];else if(o(e))a=new Date(e.getTime?e.getTime():e);else if(n(e))a=new RegExp(e);else if(r(e))a={message:e.message};else if(s(e)||l(e)||i(e))a=Object(e);else {if(t(e))return e.slice();a=Object.create(Object.getPrototypeOf(e));}const f=u.includeSymbols?d:h;for(const t of f(e))a[t]=e[t];return a}return e}var g={includeSymbols:false,immutable:false};function m(e,t,o=g){const n=[],r=[];let s=true;const l=o.includeSymbols?d:h,i=!!o.immutable;return function e(u){const a=i?y(u,o):u,f={};let h=true;const d={node:a,node_:u,path:[].concat(n),parent:r[r.length-1],parents:r,key:n[n.length-1],isRoot:0===n.length,level:n.length,circular:void 0,isLeaf:false,notLeaf:true,notRoot:true,isFirst:false,isLast:false,update:function(e,t=false){d.isRoot||(d.parent.node[d.key]=e),d.node=e,t&&(h=false);},delete:function(e){delete d.parent.node[d.key],e&&(h=false);},remove:function(e){c(d.parent.node)?d.parent.node.splice(d.key,1):delete d.parent.node[d.key],e&&(h=false);},keys:null,before:function(e){f.before=e;},after:function(e){f.after=e;},pre:function(e){f.pre=e;},post:function(e){f.post=e;},stop:function(){s=false;},block:function(){h=false;}};if(!s)return d;function g(){if("object"==typeof d.node&&null!==d.node){d.keys&&d.node_===d.node||(d.keys=l(d.node)),d.isLeaf=0===d.keys.length;for(let e=0;e<r.length;e++)if(r[e].node_===u){d.circular=r[e];break}}else d.isLeaf=true,d.keys=null;d.notLeaf=!d.isLeaf,d.notRoot=!d.isRoot;}g();const m=t(d,d.node);if(void 0!==m&&d.update&&d.update(m),f.before&&f.before(d,d.node),!h)return d;if("object"==typeof d.node&&null!==d.node&&!d.circular){r.push(d),g();for(const[t,o]of Object.entries(d.keys??[])){n.push(o),f.pre&&f.pre(d,d.node[o],o);const r=e(d.node[o]);i&&p.call(d.node,o)&&!b(d.node,o)&&(d.node[o]=r.node),r.isLast=!!d.keys?.length&&+t==d.keys.length-1,r.isFirst=0==+t,f.post&&f.post(d,r),n.pop();}r.pop();}return f.after&&f.after(d,d.node),d}(e).node}var j=class{#e;#t;constructor(e,t=g){this.#e=e,this.#t=t;}get(e){let t=this.#e;for(let o=0;t&&o<e.length;o++){const n=e[o];if(!p.call(t,n)||!this.#t.includeSymbols&&"symbol"==typeof n)return;t=t[n];}return t}has(e){let t=this.#e;for(let o=0;t&&o<e.length;o++){const n=e[o];if(!p.call(t,n)||!this.#t.includeSymbols&&"symbol"==typeof n)return  false;t=t[n];}return  true}set(e,t){let o=this.#e,n=0;for(n=0;n<e.length-1;n++){const t=e[n];p.call(o,t)||(o[t]={}),o=o[t];}return o[e[n]]=t,t}map(e){return m(this.#e,e,{immutable:true,includeSymbols:!!this.#t.includeSymbols})}forEach(e){return this.#e=m(this.#e,e,this.#t),this.#e}reduce(e,t){const o=1===arguments.length;let n=o?this.#e:t;return this.forEach(((t,r)=>{t.isRoot&&o||(n=e(t,n,r));})),n}paths(){const e=[];return this.forEach((t=>{e.push(t.path);})),e}nodes(){const e=[];return this.forEach((t=>{e.push(t.node);})),e}clone(){const e=[],o=[],n=this.#t;return t(this.#e)?this.#e.slice():function t(r){for(let t=0;t<e.length;t++)if(e[t]===r)return o[t];if("object"==typeof r&&null!==r){const s=y(r,n);e.push(r),o.push(s);const l=n.includeSymbols?d:h;for(const e of l(r))s[e]=t(r[e]);return e.pop(),o.pop(),s}return r}(this.#e)}};

function createSvgComponent({ meta, attributes, children, styles }) {
  const hasStyles = styles.length > 0;
  const Component = createComponent({
    async factory(result, props) {
      const normalizedProps = normalizeProps(attributes, props);
      if (hasStyles && result.cspDestination) {
        for (const style of styles) {
          const hash = await generateCspDigest(style, result.cspAlgorithm);
          result._metadata.extraStyleHashes.push(hash);
        }
      }
      return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
    },
    propagation: hasStyles ? "self" : "none"
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_uh3Me6Yz.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

object({
  tags: array(string()).optional(),
  lastModified: date().optional()
});
function createGetCollection({
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new j(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        if (imported.__svgData) {
          const { __svgData: svgData, ...meta } = imported;
          ctx.update(createSvgComponent({ meta, ...svgData }));
        } else {
          ctx.update(imported);
        }
      } else {
        ctx.update(src);
      }
    }
  });
}

// astro-head-inject

const liveCollections = {};

const getCollection = createGetCollection({
	liveCollections,
});

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allReviews = await getCollection("reviews");
  const approvedReviews = allReviews.filter((review) => review.data.approved === true);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Esticode | Weby pre kaviarne a malé firmy", "description": "Esticode z Košíc tvorí rýchle a čisté weby pre kaviarne a malé firmy. Jasná komunikácia, dôveryhodný dizajn a dodanie do 2-3 týždňov podľa rozsahu.", "ogTitle": "Esticode | Weby pre kaviarne a malé firmy", "ogDescription": "Rýchle a čisté weby z Košíc s dôrazom na dôveru, mobilný zážitok a jasné výsledky." }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<header class="site-header" id="top"> <nav class="container nav" aria-label="Hlavná navigácia"> <a class="logo" href="#hero" aria-label="Esticode domovská sekcia"> <img src="/img/Logo_White.svg" alt="Esticode"> </a> <button class="menu-toggle" type="button" aria-label="Otvoriť menu" aria-expanded="false" aria-controls="site-menu"> <span></span> <span></span> <span></span> </button> <ul class="menu" id="site-menu"> <li><a href="#hero">Domov</a></li> <li><a href="#sluzby">Služby</a></li> <li><a href="#dodanie">Dodanie</a></li> <li><a href="#portfolio">Portfólio</a></li> <li><a href="#recenzie">Recenzie</a></li> <li><a href="#preco-esticode">Prečo Esticode</a></li> <li><a href="#faq">FAQ</a></li> <li><a href="#kontakt">Kontakt</a></li> </ul> </nav> </header> <main> <section class="section hero" id="hero"> <div class="container fade-in"> <p class="kicker">Esticode z Košíc</p> <h1>Tvoríme weby pre kaviarne a malé firmy na Slovensku</h1> <p class="lead">Navrhujeme and kódujeme čisté, rýchle weby, ktoré pôsoatia profesionálne a fungujú bez kompromisov na mobile aj desktope.</p> <div class="hero-actions"> <a class="button button-primary" href="#portfolio">Pozrieť portfólio</a> <a class="button button-outline" href="#kontakt">Kontaktovať nás</a> </div> </div> </section> <section class="section" id="sluzby"> <div class="container"> <header class="section-header fade-in"> <p class="kicker">Služby</p> <h2>Čo vám vieme dodať</h2> </header> <div class="services-grid"> <article class="service-item fade-in"> <div class="service-icon" aria-hidden="true">01</div> <h3>Landing page</h3> <p>Jednostránkový web s dôrazom na jasné posolstvo, jednoduchú navigáciu a konverziu.</p> <p class="price">150-400€</p> </article> <article class="service-item fade-in"> <div class="service-icon" aria-hidden="true">02</div> <h3>Firemný web</h3> <p>Kompletný firemný web s prehľadnou štruktúrou, sekciami služieb a profesionálnou prezentáciou značky.</p> <p class="price">400-900€</p> </article> <article class="service-item fade-in"> <div class="service-icon" aria-hidden="true">03</div> <h3>Úprava existujúceho webu</h3> <p>Modernizácia dizajnu, responzivity a používateľského zážitku už existujúcej stránky.</p> <p class="price">150-250€</p> </article> </div> </div> </section> <section class="section delivery-section" id="dodanie"> <div class="container"> <header class="section-header fade-in"> <p class="kicker">Dodanie</p> <h2>Rýchly štart bez zbytočného čakania</h2> </header> <div class="delivery-grid"> <article class="delivery-card fade-in"> <p class="delivery-label">Landing page</p> <h3>7 až 10 pracovných dní</h3> <p>Keď je zadanie jasné, vieme dostať jednoduchý predajný web von rýchlejšie než býva bežné pri menších agentúrach.</p> </article> <article class="delivery-card fade-in"> <p class="delivery-label">Menší firemný web</p> <h3>2 až 3 týždne</h3> <p>Prehľadný web pre firmu, službu alebo kaviareň pripravíme v termíne, ktorý je pre klienta stále veľmi komfortný.</p> </article> <article class="delivery-card fade-in"> <p class="delivery-label">Redizajn</p> <h3>Podľa rozsahu, prvé výstupy do pár dní</h3> <p>Pri úpravách existujúceho webu vieme rýchlo ukázať smer a pracovať priebežne bez dlhého čakania na prvý výsledok.</p> </article> </div> <p class="section-note fade-in">Presný termín vždy závisí od rozsahu a pripravených podkladov, no cieľ je jednoduchý: dostať kvalitný web von rýchlo a bez chaosu.</p> </div> </section> <section class="section" id="portfolio"> <div class="container"> <header class="section-header fade-in"> <p class="kicker">Portfólio</p> <h2>Vybrané projekty</h2> </header> <div class="portfolio-grid"> <article class="project fade-in"> <div class="project-image"> <img src="/img/CoffeeShop_Preview.png" alt="Náhľad projektu CoffeeShop Demo"> </div> <h3>CoffeeShop Demo</h3> <p>Prezentačný web pre kaviareň s čistou typografiou, dôrazom na menu a kontaktné CTA prvky.</p> <a href="https://ivandvorovy.github.io/CoffeeShopDemo-web/" target="_blank" rel="noopener noreferrer">Zobraziť →</a> </article> <article class="project fade-in"> <div class="project-image" aria-label="Náhľad pripravovaného projektu">Náhľad projektu</div> <h3>Lokálne Bistro</h3> <p>Pripravovaný web pre malé bistro s prehľadnou ponukou, základným SEO a dôrazom na mobilný zážitok.</p> <a href="#kontakt">Zobraziť →</a> </article> </div> </div> </section> <section class="section" id="preco-esticode"> <div class="container why-grid"> <div class="about-mark fade-in" aria-hidden="true">ES</div> <article class="about-content fade-in"> <p class="kicker">Prečo Esticode</p> <h2>Lokálny prístup, rýchla odozva a weby, ktoré nepôsobia lacno</h2> <p>Ak niekto hľadá jednoduchú spoluprácu, rýchly štart a web, ktorý vyzerá profesionálne aj na mobile, práve tu vzniká najväčšia výhoda. Nepredávame len dizajn, ale celé riešenie, ktoré má zmysel pre malý biznis.</p> </article> <div class="why-points fade-in" aria-label="Dôvody spolupráce so službou Esticode"> <article class="why-point"> <h3>Priamy kontakt</h3> <p>Bez medzičlánkov, bez zdržiavania. Vieš, s kým komunikuješ, a odpoveď dostaneš rýchlo.</p> </article> <article class="why-point"> <h3>Čistý kód</h3> <p>Stránka je pripravená na ďalšie úpravy, nebude sa rozsypávať po prvom drobnom zásahu.</p> </article> <article class="why-point"> <h3>Pripravené na rast</h3> <p>Ak sa projekt časom rozrastie, web sa dá bez problémov rozšíriť o nové sekcie a funkcionalitu.</p> </article> </div> </div> </section> <section class="section contact-section" id="kontakt"> <div class="container"> <header class="section-header fade-in"> <p class="kicker">Contact</p> <h2>Poďme spolupracovať</h2> </header> <div class="contact-atelier fade-in"> <article class="contact-intro" aria-label="Kontaktné údaje Esticode"> <h3>Krátky dopytový formulár, nie zbytočný formalizmus</h3> <p class="contact-copy">Tento formulár slúži na rýchly úvodný kontakt. Vďaka pár odpovediam vieme lepšie odhadnúť rozsah, termín aj orientačný rozpočet bez dlhého prepisovania správ.</p> <p class="contact-copy">Stačí, ak napíšeš čo predávaš, komu web slúži a čo má byť výsledok. Zvyšok si prejdeme spolu.</p> <div class="contact-actions"> <a href="mailto:info@esticode.sk">info@esticode.sk</a> <a href="tel:+421917906885">+421 917 906 885</a> </div> <div class="contact-meta" aria-label="Detaily spolupráce"> <p>Prvá konzultácia zdarma</p> <p>Košice / remote</p> <p>Rýchly štart projektu</p> </div> </article> <form class="contact-form" aria-label="Kontaktný formulár"> <div class="form-row"> <div> <label for="meno">Meno</label> <input id="meno" name="meno" type="text" required> </div> <div> <label for="email">Email</label> <input id="email" name="email" type="email" required> </div> </div> <div class="form-row"> <div> <label for="firma">Firma / značka</label> <input id="firma" name="firma" type="text" autocomplete="organization" placeholder="Názov firmy alebo projektu"> </div> <div> <label for="rozpocet">Rozpočet</label> <select id="rozpocet" name="rozpocet"> <option value="" selected>Približný rozpočet</option> <option value="do-300">Do 300 €</option> <option value="300-600">300 - 600 €</option> <option value="600-1000">600 - 1 000 €</option> <option value="neviem">Ešte neviem</option> </select> </div> </div> <div class="form-row"> <div> <label for="termin">Kedy chcete spustiť web</label> <select id="termin" name="termin"> <option value="" selected>Vyberte termín</option> <option value="do-tyzdna">Čo najskôr</option> <option value="2-3-tyzdne">Do 2 - 3 týždňov</option> <option value="mesiac">Približne do mesiaca</option> <option value="len-info">Zbieram informácie</option> </select> </div> <div> <label for="typ-webu">Čo riešite</label> <select id="typ-webu" name="typ-webu" required> <option value="" selected disabled>Vyberte typ projektu</option> <option value="landing-page">Nová landing page</option> <option value="firemny-web">Nový firemný web</option> <option value="redizajn">Redizajn existujúceho webu</option> </select> </div> </div> <label for="sprava">Správa</label> <textarea id="sprava" name="sprava" rows="6" placeholder="Napr. potrebujeme web pre bistro, spustenie do 6 týždňov..." required></textarea> <div class="form-footer"> <button class="button button-primary" type="submit">Odoslať dopyt</button> <p class="form-hint">Po odoslaní sa ozveme s návrhom rozsahu a orientačnou cenou.</p> </div> <p class="form-message" aria-live="polite"></p> </form> </div> </div> </section> <section class="section faq-section" id="faq"> <div class="container"> <header class="section-header fade-in"> <p class="kicker">FAQ</p> <h2>Najčastejšie otázky</h2> </header> <div class="faq-list"> <details class="faq-item fade-in"> <summary>Koľko stojí web od Esticode?</summary> <div class="faq-answer"> <p>Závisí od rozsahu. Menšia landing page je lacnejšia než viacsekčný firemný web, no vždy sa snažíme držať férový pomer medzi cenou, rýchlosťou a kvalitou.</p> </div> </details> <details class="faq-item fade-in"> <summary>Ako rýchlo viete web dodať?</summary> <div class="faq-answer"> <p>Pri landing page často do 7 až 10 pracovných dní, pri menšom firemnom webe zvyčajne do 2 až 3 týždňov. Presný termín závisí od podkladov a rozsahu.</p> </div> </details> <details class="faq-item fade-in"> <summary>Viete upraviť aj existujúci web?</summary> <div class="faq-answer"> <p>Áno. Robíme redizajn, zrýchlenie, lepšiu mobilnú verziu aj úpravu štruktúry, ak už web má základ, ale nepôsobí dostatočne moderne.</p> </div> </details> <details class="faq-item fade-in"> <summary>Čo potrebujete od klienta na začiatok?</summary> <div class="faq-answer"> <p>Stačí stručne napísať, čo robíte, komu web slúži, aký je cieľ a aký približný termín alebo rozpočet máte v hlave. Zvyšok doplníme spolu.</p> </div> </details> </div> </div> </section> <section class="section testimonials-section" id="recenzie"> <div class="container"> <header class="section-header fade-in"> <p class="kicker">Recenzie</p> <h2>Čo hovoria klienti</h2> </header> <div class="testimonials-marquee fade-in" aria-label="Recenzie klientov"> <div class="reviews-carousel"> ${allReviews.length === 0 && renderTemplate`<p class="section-note">Zatiaľ tu nie sú žiadne recenzie. Pridajte novú cez Keystatic admin panel!</p>`} ${approvedReviews.length > 0 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([' <button class="carousel-btn carousel-btn--prev" aria-label="Predchádzajúca recenzia" title="Predchádzajúca"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <polyline points="15 18 9 12 15 6"></polyline> </svg> </button> <div class="review-card" id="current-review"> <h3></h3> <p class="stars"></p> <p class="quote"></p> <div class="author"> <p class="author-name"></p> <p class="author-company"></p> </div> </div> <button class="carousel-btn carousel-btn--next" aria-label="Ďalšia recenzia" title="Ďalšia"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <polyline points="9 18 15 12 9 6"></polyline> </svg> </button> <div class="carousel-indicators"> ', " </div> <script>(function(){", "\n                  {\n                    window.allReviewsData = reviews;\n                    window.currentReviewIndex = 0;\n                  }\n                })();<\/script> "])), approvedReviews.map((_, index) => renderTemplate`<button${addAttribute(`indicator ${index === 0 ? "is-active" : ""}`, "class")}${addAttribute(`Recenzia ${index + 1}`, "aria-label")}${addAttribute(index, "data-index")}></button>`), defineScriptVars({ reviewsCount: approvedReviews.length, reviews: approvedReviews })) })}`} </div> </div> <article class="review-submit fade-in" aria-labelledby="review-submit-title"> <h3 id="review-submit-title">Pridať recenziu po dokončení projektu</h3> <p class="section-note">Recenzia sa na web pridá až po overení projektu a manuálnom schválení. Týmto zabránime tomu, aby recenzie pridával hocikto.</p> <form class="review-form" id="review-form" aria-label="Formulár na odoslanie recenzie"> <div class="form-row"> <div> <label for="review-name">Meno</label> <input id="review-name" name="review-name" type="text" required> </div> <div> <label for="review-business">Firma / prevádzka</label> <input id="review-business" name="review-business" type="text" required> </div> </div> <div class="form-row"> <div> <label for="review-email">Kontaktný email</label> <input id="review-email" name="review-email" type="email" required> </div> <div> <label for="review-project-code">Klientsky kód projektu</label> <input id="review-project-code" name="review-project-code" type="text" placeholder="Napr. ESTI-2026-041" required> </div> </div> <label for="review-rating">Hodnotenie</label> <select id="review-rating" name="review-rating" required> <option value="" selected disabled>Vyberte hodnotenie</option> <option value="5">★★★★★ (5 hviezdiciek)</option> <option value="4">★★★★☆ (4 hviezdicky)</option> <option value="3">★★★☆☆ (3 hviezdicky)</option> <option value="2">★★☆☆☆ (2 hviezdicky)</option> <option value="1">★☆☆☆☆ (1 hviezdicka)</option> </select> <label for="review-message">Text recenzie</label> <textarea id="review-message" name="review-message" rows="5" minlength="15" maxlength="300" placeholder="Napíšte stručne, čo vám spolupráca priniesla..." required></textarea> <div class="form-footer"> <button class="button button-primary" type="submit">Poslať recenziu na schválenie</button> <p class="form-hint">Recenzie publikujeme až po overení klienta. Nepublikujú sa automaticky.</p> </div> <p class="form-message review-form-message" id="form-feedback" aria-live="polite"></p> </form> </article> </div> </section> </main> <footer class="site-footer"> <div class="container"> <p>&copy; <span id="current-year"></span> Esticode</p> <nav class="legal-nav" aria-label="Právne stránky"> <a href="/ochrana-osobnych-udajov">Ochrana osobných údajov</a> <a href="/cookies">Cookies</a> <a href="/obchodne-podmienky">Obchodné podmienky</a> </nav> </div> </footer> ${renderScript($$result2, "C:/Users/ivand/Desktop/Esticode/web/src/pages/index.astro?astro&type=script&index=0&lang.ts")} `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_b || (_b = __template([' <script type="application/ld+json">\n      {\n        "@context": "https://schema.org",\n        "@type": "LocalBusiness",\n        "name": "Esticode",\n        "description": "Tvorba čistých a moderných webov pre kaviarne a malé firmy.",\n        "areaServed": "Slovensko",\n        "address": {\n          "@type": "PostalAddress",\n          "addressLocality": "Košice",\n          "addressCountry": "SK"\n        }\n      }\n    <\/script> ']))) })}` })}`;
}, "C:/Users/ivand/Desktop/Esticode/web/src/pages/index.astro", void 0);

const $$file = "C:/Users/ivand/Desktop/Esticode/web/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
