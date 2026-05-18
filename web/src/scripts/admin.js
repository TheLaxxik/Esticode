const ADMIN_PASSWORD = 'Esticode2026!';
const ADMIN_SESSION_KEY = 'esticode_admin_logged_in_v1';
const REVIEWS_PENDING_KEY = 'esticode_reviews_pending_v1';
const REVIEWS_APPROVED_KEY = 'esticode_reviews_approved_v1';
let adminSessionFallback = false;

function initAdmin() {
  bindLoginForm();
  bindToolbarActions();
  updateVisibility();
  renderQueues();
}

function bindLoginForm() {
  const form = document.getElementById('admin-login-form');
  const message = document.getElementById('admin-login-message');

  if (!form || !message) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const password = String(data.get('admin-password') || '').trim();

    if (password !== ADMIN_PASSWORD) {
      message.textContent = 'Nespravne heslo.';
      return;
    }

    setAdminLoggedIn(true);
    form.reset();
    message.textContent = '';
    updateVisibility();
    renderQueues();
  });
}

function bindToolbarActions() {
  const logout = document.getElementById('admin-logout');
  const exportButton = document.getElementById('admin-export');

  if (logout) {
    logout.addEventListener('click', () => {
      setAdminLoggedIn(false);
      updateVisibility();
    });
  }

  if (exportButton) {
    exportButton.addEventListener('click', () => {
      const approved = readQueue(REVIEWS_APPROVED_KEY);
      const data = JSON.stringify(approved, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'esticode-approved-reviews.json';
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}

function updateVisibility() {
  const loggedIn = getAdminLoggedIn();
  const login = document.getElementById('admin-login');
  const panel = document.getElementById('admin-panel');

  if (!login || !panel) {
    return;
  }

  login.hidden = loggedIn;
  panel.hidden = !loggedIn;
  login.style.display = loggedIn ? 'none' : 'grid';
  panel.style.display = loggedIn ? 'grid' : 'none';
}

function getAdminLoggedIn() {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  } catch (error) {
    return adminSessionFallback;
  }
}

function setAdminLoggedIn(isLoggedIn) {
  adminSessionFallback = isLoggedIn;

  try {
    if (isLoggedIn) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      return;
    }

    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  } catch (error) {
    // Fallback stays in memory when sessionStorage is unavailable.
  }
}

function renderQueues() {
  const pendingList = document.getElementById('pending-list');
  const approvedList = document.getElementById('approved-list');

  if (!pendingList || !approvedList) {
    return;
  }

  const pending = readQueue(REVIEWS_PENDING_KEY);
  const approved = readQueue(REVIEWS_APPROVED_KEY);

  pendingList.innerHTML = '';
  approvedList.innerHTML = '';

  if (!pending.length) {
    pendingList.appendChild(createEmpty('Zatial ziadne cakajuce recenzie.'));
  } else {
    pending.forEach((review) => {
      pendingList.appendChild(createPendingRow(review));
    });
  }

  if (!approved.length) {
    approvedList.appendChild(createEmpty('Zatial ziadne schvalene recenzie.'));
  } else {
    approved.forEach((review) => {
      approvedList.appendChild(createApprovedRow(review));
    });
  }
}

function createPendingRow(review) {
  const row = createBaseRow(review);
  const actions = document.createElement('div');
  actions.className = 'review-actions';

  const approve = document.createElement('button');
  approve.type = 'button';
  approve.className = 'button button-primary';
  approve.textContent = 'Schvalit';
  approve.addEventListener('click', () => {
    approveReview(review.id);
  });

  const reject = document.createElement('button');
  reject.type = 'button';
  reject.className = 'button button-danger';
  reject.textContent = 'Odmietnut';
  reject.addEventListener('click', () => {
    rejectReview(review.id);
  });

  actions.appendChild(approve);
  actions.appendChild(reject);
  row.appendChild(actions);

  return row;
}

function createApprovedRow(review) {
  const row = createBaseRow(review);
  const actions = document.createElement('div');
  actions.className = 'review-actions';

  const unpublish = document.createElement('button');
  unpublish.type = 'button';
  unpublish.className = 'button button-outline';
  unpublish.textContent = 'Stiahnut z webu';
  unpublish.addEventListener('click', () => {
    unpublishReview(review.id);
  });

  actions.appendChild(unpublish);
  row.appendChild(actions);

  return row;
}

function createBaseRow(review) {
  const row = document.createElement('article');
  row.className = 'review-row';

  const title = document.createElement('h3');
  title.textContent = `${review.name} - ${review.business}`;

  const text = document.createElement('p');
  text.textContent = review.message;

  const meta = document.createElement('div');
  meta.className = 'review-meta';

  const rating = document.createElement('span');
  rating.textContent = getStarsText(review.rating);

  const code = document.createElement('span');
  code.textContent = `Kod: ${review.projectCode}`;

  const email = document.createElement('span');
  email.textContent = review.email;

  meta.appendChild(rating);
  meta.appendChild(code);
  meta.appendChild(email);

  row.appendChild(title);
  row.appendChild(text);
  row.appendChild(meta);

  return row;
}

function getStarsText(value) {
  const numericValue = Math.max(1, Math.min(5, Number(value) || 5));
  const filled = '★★★★★'.slice(0, numericValue);
  const empty = '☆☆☆☆☆'.slice(0, 5 - numericValue);
  return `${filled}${empty}`;
}

function createEmpty(text) {
  const p = document.createElement('p');
  p.className = 'empty';
  p.textContent = text;
  return p;
}

function approveReview(id) {
  const pending = readQueue(REVIEWS_PENDING_KEY);
  const approved = readQueue(REVIEWS_APPROVED_KEY);
  const review = pending.find((item) => item.id === id);

  if (!review) {
    return;
  }

  writeQueue(
    REVIEWS_PENDING_KEY,
    pending.filter((item) => item.id !== id)
  );

  approved.push({
    ...review,
    status: 'approved',
    approvedAt: new Date().toISOString()
  });

  writeQueue(REVIEWS_APPROVED_KEY, approved);
  renderQueues();
}

function rejectReview(id) {
  const pending = readQueue(REVIEWS_PENDING_KEY);
  writeQueue(
    REVIEWS_PENDING_KEY,
    pending.filter((item) => item.id !== id)
  );
  renderQueues();
}

function unpublishReview(id) {
  const approved = readQueue(REVIEWS_APPROVED_KEY);
  writeQueue(
    REVIEWS_APPROVED_KEY,
    approved.filter((item) => item.id !== id)
  );
  renderQueues();
}

function readQueue(key) {
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeQueue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Ignore local storage write issues.
  }
}

document.addEventListener('DOMContentLoaded', initAdmin);
