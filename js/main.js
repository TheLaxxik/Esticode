// Initializes interactive behavior for the site.
function initSite() {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initPopupSystem();
  initCookieConsent();
  renderApprovedReviews();
  initTestimonialsTicker();
  initReviewForm();
  initContactForm();
  setCurrentYear();
}

const COOKIE_CONSENT_KEY = 'esticode_cookie_consent_v1';
const REVIEW_SUBMISSION_ENDPOINT = '';
const REVIEWS_PENDING_KEY = 'esticode_reviews_pending_v1';
const REVIEWS_APPROVED_KEY = 'esticode_reviews_approved_v1';

let popupElements = null;

function initPopupSystem() {
  if (popupElements) {
    return;
  }

  const popup = document.createElement('div');
  popup.className = 'custom-popup';
  popup.setAttribute('aria-hidden', 'true');
  popup.innerHTML = `
    <div class="custom-popup__backdrop" data-popup-close="true"></div>
    <div class="custom-popup__panel" role="dialog" aria-modal="true" aria-labelledby="custom-popup-title">
      <button class="custom-popup__close" type="button" aria-label="Zavrieť okno" data-popup-close="true">×</button>
      <p class="custom-popup__eyebrow">Esticode</p>
      <h3 class="custom-popup__title" id="custom-popup-title"></h3>
      <p class="custom-popup__message"></p>
      <button class="button button-primary custom-popup__action" type="button" data-popup-close="true">Rozumiem</button>
    </div>
  `;

  document.body.appendChild(popup);

  popup.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.dataset.popupClose === 'true') {
      closeCustomPopup();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCustomPopup();
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const trigger = target.closest('[data-popup-message]');

    if (!trigger) {
      return;
    }

    event.preventDefault();

    const title = trigger.getAttribute('data-popup-title') || 'Informácia';
    const message = trigger.getAttribute('data-popup-message') || '';

    openCustomPopup(title, message);
  });

  popupElements = {
    root: popup,
    title: popup.querySelector('.custom-popup__title'),
    message: popup.querySelector('.custom-popup__message')
  };
}

function openCustomPopup(title, message) {
  if (!popupElements) {
    return;
  }

  if (popupElements.title) {
    popupElements.title.textContent = title;
  }

  if (popupElements.message) {
    popupElements.message.textContent = message;
  }

  popupElements.root.classList.add('is-open');
  popupElements.root.setAttribute('aria-hidden', 'false');
  document.body.classList.add('popup-open');
}

function closeCustomPopup() {
  if (!popupElements) {
    return;
  }

  popupElements.root.classList.remove('is-open');
  popupElements.root.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('popup-open');
}

function initCookieConsent() {
  const saved = readCookieConsent();

  if (saved) {
    return;
  }

  const banner = document.createElement('aside');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Nastavenie cookies');
  banner.innerHTML = `
    <div class="cookie-banner__text">
      <p class="cookie-banner__title">Cookies na Esticode</p>
      <p>Používame nevyhnutné cookies a voliteľné analytické cookies pre zlepšenie webu.</p>
    </div>
    <div class="cookie-banner__actions">
      <a class="button button-outline" href="cookies.html">Viac info</a>
      <button class="button button-outline" type="button" data-cookie-action="necessary">Len nevyhnutné</button>
      <button class="button button-primary" type="button" data-cookie-action="all">Prijať všetko</button>
    </div>
  `;

  document.body.appendChild(banner);

  banner.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const action = target.dataset.cookieAction;

    if (!action) {
      return;
    }

    const consent = action === 'all'
      ? { necessary: true, analytics: true }
      : { necessary: true, analytics: false };

    writeCookieConsent(consent);
    banner.remove();

    const summary = consent.analytics
      ? 'Ďakujeme. Uložili sme súhlas s analytickými cookies.'
      : 'Nastavenie uložené. Používame iba nevyhnutné cookies.';

    openCustomPopup('Cookies nastavené', summary);
  });
}

function readCookieConsent() {
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    return null;
  }
}

function writeCookieConsent(value) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
  } catch (error) {
    // Ignore storage errors for private/incognito contexts.
  }
}

// Highlights navbar links based on URL hash and closes menu after navigation.
function initNavbar() {
  const links = document.querySelectorAll('.menu a');

  function setActiveLink() {
    const currentHash = window.location.hash || '#hero';

    links.forEach((link) => {
      if (link.getAttribute('href') === currentHash) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
      setActiveLink();
    });
  });

  window.addEventListener('hashchange', setActiveLink);
  setActiveLink();
}

// Handles mobile navigation toggle state.
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');

  if (!toggle) {
    return;
  }

  toggle.addEventListener('click', () => {
    const menu = document.querySelector('.menu');

    if (!menu) {
      return;
    }

    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Closes mobile menu programmatically.
function closeMobileMenu() {
  const menu = document.querySelector('.menu');
  const toggle = document.querySelector('.menu-toggle');

  if (!menu || !toggle) {
    return;
  }

  menu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}

// Adds subtle fade-in effect when elements enter the viewport.
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, animationObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          animationObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach((element) => observer.observe(element));
}

// Simulates form submit confirmation for static portfolio websites.
function initContactForm() {
  const form = document.querySelector('.contact-form');
  const message = document.querySelector('.form-message');

  if (!form || !message) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const meno = String(data.get('meno') || '').trim();
    const typWebu = String(data.get('typ-webu') || '').trim();
    const firma = String(data.get('firma') || '').trim();
    const termin = String(data.get('termin') || '').trim();

    const typWebuLabel = {
      'landing-page': 'landing page',
      'firemny-web': 'firemný web',
      'redizajn': 'redizajn'
    }[typWebu] || 'projekt';

    const terminLabel = {
      'do-tyzdna': 'čo najskôr',
      '2-3-tyzdne': 'do 2 - 3 týždňov',
      'mesiac': 'približne do mesiaca',
      'len-info': 'zatiaľ len informácie'
    }[termin] || 'bez uvedeného termínu';

    const firmaText = firma ? ` pre ${firma}` : '';

    message.textContent = `Ďakujeme, ${meno || 'ozveme sa čoskoro'}${firmaText}. Zaregistrovali sme ${typWebuLabel} s termínom ${terminLabel}.`;
    openCustomPopup(
      'Dopyt odoslaný',
      `Super, ${meno || 'ďakujeme'}${firmaText}! Prešli sme si tvoj ${typWebuLabel} a ozveme sa s ďalším postupom čo najskôr.`
    );
    form.reset();
  });
}

// Handles moderated review submissions.
function initReviewForm() {
  const form = document.getElementById('review-form');
  const message = document.querySelector('.review-form-message');

  if (!form || !message) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const payload = {
      id: `review-${Date.now()}`,
      name: String(data.get('review-name') || '').trim(),
      business: String(data.get('review-business') || '').trim(),
      email: String(data.get('review-email') || '').trim(),
      projectCode: String(data.get('review-project-code') || '').trim(),
      rating: String(data.get('review-rating') || '').trim(),
      message: String(data.get('review-message') || '').trim(),
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    if (!payload.name || !payload.business || !payload.email || !payload.projectCode || !payload.rating || payload.message.length < 40) {
      message.textContent = 'Prosím vyplňte všetky polia. Text recenzie má mať aspoň 40 znakov.';
      return;
    }

    message.textContent = 'Odosielam recenziu na schválenie...';

    const sent = await submitReviewForModeration(payload);

    if (!sent) {
      message.textContent = 'Recenziu sa teraz nepodarilo odoslať. Skúste to znova alebo kontaktujte nás emailom.';
      return;
    }

    message.textContent = 'Ďakujeme, recenziu sme prijali na schválenie. Po overení klientského kódu ju môžeme publikovať.';
    openCustomPopup(
      'Recenzia prijatá',
      'Recenziu sme zaradili na schválenie. Na web sa pridáva až po manuálnom overení projektu.'
    );
    form.reset();
  });
}

async function submitReviewForModeration(payload) {
  if (!REVIEW_SUBMISSION_ENDPOINT) {
    const pending = readReviewQueue(REVIEWS_PENDING_KEY);
    pending.push(payload);
    writeReviewQueue(REVIEWS_PENDING_KEY, pending);
    return true;
  }

  try {
    const response = await fetch(REVIEW_SUBMISSION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}

function renderApprovedReviews() {
  const container = document.getElementById('reviews-list');

  if (!container) {
    return;
  }

  const approved = readReviewQueue(REVIEWS_APPROVED_KEY);

  if (!approved.length) {
    return;
  }

  const fragment = document.createDocumentFragment();

  approved.forEach((review) => {
    fragment.appendChild(createReviewCard(review));
  });

  container.appendChild(fragment);
}

function initTestimonialsTicker() {
  const track = document.getElementById('reviews-list');

  if (!track || track.children.length < 2) {
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let isPaused = false;
  let offset = 0;
  let direction = 1;
  let rafId = 0;

  const step = () => {
    const maxOffset = Math.max(0, track.scrollWidth - track.clientWidth);

    if (maxOffset <= 0) {
      rafId = requestAnimationFrame(step);
      return;
    }

    if (offset === 0 && track.scrollLeft === 0) {
      offset = maxOffset / 2;
      track.scrollLeft = offset;
    }

    if (!isPaused) {
      offset += 0.45 * direction;

      if (offset >= maxOffset) {
        offset = maxOffset;
        direction = -1;
      } else if (offset <= 0) {
        offset = 0;
        direction = 1;
      }

      track.scrollLeft = offset;
    }

    rafId = requestAnimationFrame(step);
  };

  track.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  track.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  track.addEventListener('touchstart', () => {
    isPaused = true;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    isPaused = false;
  }, { passive: true });

  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(step);
}

function createReviewCard(review) {
  const article = document.createElement('article');
  article.className = 'testimonial fade-in is-visible';

  const stars = document.createElement('p');
  stars.className = 'testimonial-stars';
  const starText = getStarsText(review.rating);
  stars.textContent = starText;
  stars.setAttribute('aria-label', `${review.rating} hviezdiciek`);

  const quote = document.createElement('p');
  quote.className = 'testimonial-quote';
  quote.textContent = `"${review.message}"`;

  const meta = document.createElement('div');
  meta.className = 'testimonial-meta';

  const name = document.createElement('strong');
  name.textContent = review.name;

  const business = document.createElement('span');
  business.textContent = review.business;

  article.appendChild(stars);
  meta.appendChild(name);
  meta.appendChild(business);
  article.appendChild(quote);
  article.appendChild(meta);

  return article;
}

function readReviewQueue(key) {
  try {
    const value = window.localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeReviewQueue(key, items) {
  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    // Ignore local storage write issues.
  }
}

function getStarsText(value) {
  const numericValue = Math.max(1, Math.min(5, Number(value) || 5));
  const filled = '★★★★★'.slice(0, numericValue);
  const empty = '☆☆☆☆☆'.slice(0, 5 - numericValue);
  return `${filled}${empty}`;
}

// Sets current year in footer.
function setCurrentYear() {
  const yearElement = document.getElementById('current-year');

  if (!yearElement) {
    return;
  }

  yearElement.textContent = String(new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', initSite);
