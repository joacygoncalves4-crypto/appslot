// ==================== CONFIGURACAO CENTRALIZADA ====================
const CONFIG = {
  siteName: 'MINHA MARCA',
  logo: 'assets/logo-placeholder.png',
  affiliateLink: 'https://www.lottu.bet.br/register?affiliate_id=69b17388edd3a5000a70a054&ngx_campaign_id=69b199ae299c0b0028369dfc&ngx_source_id=Pampera',
  whatsappGroup: '#',
  whatsappContact: '',
  platformLogo: 'assets/platform-logo.png',
  platformName: 'Lottu',
  colors: {
    primary: '#0a0014',
    accent: '#00ff88',
    success: '#00ff88',
    highlight: '#a855f7'
  }
};

// ==================== VARIAVEIS GLOBAIS ====================
let activePaymentSlotId = null;
let activePaymentSlotName = null;
let savedScrollPos = 0;
let signalCooldowns = {};

// ==================== SISTEMA RTP DINAMICO ====================
function calculateRTP(slotId) {
  const frameId = Math.floor(Date.now() / 600000);
  const cacheKey = `rtp_${slotId}_${frameId}`;

  const cached = localStorage.getItem(cacheKey);
  if (cached) return parseFloat(cached);

  const mix = (slotId * 937) + (frameId * 719);
  const rand = (mix % 10000) / 10000;

  let rtp;
  if (rand < 0.12) {
    rtp = 40 + Math.floor((mix % 1500) / 100);
    rtp = Math.min(rtp, 55);
  } else if (rand < 0.30) {
    rtp = 60 + Math.floor((mix % 1500) / 100);
    rtp = Math.min(rtp, 75);
  } else {
    rtp = 75 + Math.floor((mix % 2300) / 100);
    rtp = Math.min(rtp, 98);
  }

  localStorage.setItem(cacheKey, rtp.toString());
  return rtp;
}

function getRTPClass(rtp) {
  if (rtp >= 90) return 'rtp-hot';
  if (rtp >= 75) return 'rtp-high';
  if (rtp >= 60) return 'rtp-medium';
  return 'rtp-low';
}

function scheduleRTPUpdate() {
  const now = Date.now();
  const nextFrame = (Math.floor(now / 600000) + 1) * 600000;
  const delay = nextFrame - now + 500;

  setTimeout(() => {
    renderGames('pgsoft');
    renderGames('pragmatic');
    updateTicker();
    updateFakeStats();
    scheduleRTPUpdate();
  }, delay);
}

// ==================== TELA DO JOGO ====================
function showPaymentChart(slotId, slotName) {
  SFX.click();
  savedScrollPos = window.scrollY;
  activePaymentSlotId = slotId;
  activePaymentSlotName = slotName;

  document.getElementById('signalGameName').textContent = slotName;

  // Reset signal values
  ['signalRTP', 'signalNormal', 'signalTurbo', 'signalAcerto'].forEach(id => {
    document.getElementById(id).textContent = '--';
    document.getElementById(id).classList.remove('animate');
  });
  document.getElementById('signalValidade').textContent = '--:--';
  document.getElementById('signalValidade').classList.remove('animate');

  const gameScreen = document.getElementById('gameScreen');
  const iframe = document.getElementById('platformIframe');

  gameScreen.classList.add('active', 'loading');
  document.body.style.overflow = 'hidden';

  if (CONFIG.affiliateLink && CONFIG.affiliateLink !== '#') {
    iframe.src = CONFIG.affiliateLink;
    iframe.onload = () => gameScreen.classList.remove('loading');
  }

  const panel = document.getElementById('signalPanel');
  panel.classList.remove('collapsed');
  document.getElementById('signalToggle').classList.add('active');

  updateGenerateButton();
}

function hidePaymentChart() {
  SFX.back();
  const gameScreen = document.getElementById('gameScreen');
  const iframe = document.getElementById('platformIframe');

  gameScreen.classList.remove('active', 'loading');
  iframe.src = 'about:blank';
  document.body.style.overflow = '';
  window.scrollTo(0, savedScrollPos);
}

function toggleSignalPanel() {
  SFX.click();
  const panel = document.getElementById('signalPanel');
  const btn = document.getElementById('signalToggle');
  panel.classList.toggle('collapsed');
  btn.classList.toggle('active');
}

// ==================== GERACAO DE SINAL ====================
function generateSignal() {
  if (!activePaymentSlotId) return;

  const btn = document.getElementById('generateSignalBtn');
  if (btn.disabled) return;

  SFX.signal();

  const rtp = calculateRTP(activePaymentSlotId);
  const normal = 5 + Math.floor(Math.random() * 11);
  const turbo = 4 + Math.floor(Math.random() * 9);
  const acerto = 88 + Math.floor(Math.random() * 8);

  const now = new Date();
  const validity = new Date(now.getTime() + 10 * 60000);
  const brasiliaValidity = new Date(validity.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const validH = brasiliaValidity.getHours().toString().padStart(2, '0');
  const validM = brasiliaValidity.getMinutes().toString().padStart(2, '0');

  // Animacao sequencial dos valores
  const updates = [
    { id: 'signalRTP', val: `${rtp}%`, delay: 0 },
    { id: 'signalNormal', val: `${normal}X`, delay: 100 },
    { id: 'signalTurbo', val: `${turbo}X`, delay: 200 },
    { id: 'signalAcerto', val: `${acerto}%`, delay: 300 },
    { id: 'signalValidade', val: `${validH}:${validM}`, delay: 400 }
  ];

  updates.forEach(({ id, val, delay }) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      el.textContent = val;
      el.classList.remove('animate');
      void el.offsetWidth; // force reflow
      el.classList.add('animate');
    }, delay);
  });

  startCooldown();
}

function startCooldown() {
  const btn = document.getElementById('generateSignalBtn');
  btn.disabled = true;
  let remaining = 59;

  signalCooldowns[activePaymentSlotId] = Date.now() + 59000;

  const svgIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';

  const interval = setInterval(() => {
    remaining--;
    btn.innerHTML = `${svgIcon} AGUARDE ${remaining}s`;

    if (remaining <= 0) {
      clearInterval(interval);
      btn.disabled = false;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> GERAR NOVO SINAL';
      delete signalCooldowns[activePaymentSlotId];
    }
  }, 1000);
}

function updateGenerateButton() {
  const btn = document.getElementById('generateSignalBtn');
  const cooldownEnd = signalCooldowns[activePaymentSlotId];

  if (cooldownEnd && Date.now() < cooldownEnd) {
    const remaining = Math.ceil((cooldownEnd - Date.now()) / 1000);
    btn.disabled = true;

    const svgIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';
    btn.innerHTML = `${svgIcon} AGUARDE ${remaining}s`;

    const interval = setInterval(() => {
      const rem = Math.ceil((cooldownEnd - Date.now()) / 1000);
      if (rem <= 0) {
        clearInterval(interval);
        btn.disabled = false;
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> GERAR NOVO SINAL';
        delete signalCooldowns[activePaymentSlotId];
      } else {
        btn.innerHTML = `${svgIcon} AGUARDE ${rem}s`;
      }
    }, 1000);
  } else {
    btn.disabled = false;
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> GERAR NOVO SINAL';
  }
}

// ==================== VERIFICACAO DE IDADE ====================
function initAgeModal() {
  const modal = document.getElementById('ageModal');
  if (getCookie('age_modal_confirmed')) {
    modal.classList.add('hidden');
    return;
  }

  modal.querySelector('[data-age-action="yes"]').addEventListener('click', () => {
    SFX.confirm();
    setCookie('age_modal_confirmed', 'true', 365);
    modal.classList.add('hidden');
  });

  modal.querySelector('[data-age-action="no"]').addEventListener('click', () => {
    // Nao faz nada
  });
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

// ==================== TABS ====================
function initTabs() {
  const buttons = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('.section:not(.section-page)');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      SFX.tab();
      const category = btn.getAttribute('data-category');

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      sections.forEach(s => s.style.display = 'none');
      const target = document.getElementById(`section-${category}`);
      if (target) target.style.display = 'block';
    });
  });
}

// ==================== BOTTOM NAVIGATION ====================
function initBottomNav() {
  const items = document.querySelectorAll('.nav-item');

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      SFX.click();
      const nav = item.getAttribute('data-nav');
      if (!nav) return;

      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      document.querySelectorAll('.section').forEach(s => s.style.display = 'none');

      const tabsContainer = document.querySelector('.tabs');
      const statsBar = document.querySelector('.stats-bar');

      if (nav === 'home' || nav === 'rtp') {
        tabsContainer.style.display = 'flex';
        statsBar.style.display = 'flex';
        const activeTab = document.querySelector('.tab.active');
        const activeCategory = activeTab ? activeTab.getAttribute('data-category') : 'pgsoft';
        document.getElementById(`section-${activeCategory}`).style.display = 'block';
      } else {
        tabsContainer.style.display = 'none';
        statsBar.style.display = 'none';
        const el = document.getElementById(`section-${nav}`);
        if (el) el.style.display = 'block';
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// ==================== LIVE TICKER ====================
function updateTicker() {
  const allGames = [...PGSOFT_GAMES, ...PRAGMATIC_GAMES];
  const hotGames = allGames.filter(g => calculateRTP(g.id) >= 85);

  if (hotGames.length === 0) return;

  const messages = hotGames.slice(0, 8).map(g => {
    const rtp = calculateRTP(g.id);
    return `${g.name} ${rtp}%`;
  });

  const tickerEl = document.getElementById('tickerText');
  if (tickerEl) {
    tickerEl.innerHTML = `<span>${messages.join('  &#x26A1;  ')}</span>`;
  }
}

// ==================== FAKE STATS ====================
function updateFakeStats() {
  const base = Math.floor(Date.now() / 60000);
  const online = 1200 + (base % 900);
  const signals = 200 + (base % 180);
  const wins = 85 + (base % 10);

  const onlineEl = document.getElementById('statOnline');
  const signalsEl = document.getElementById('statSignals');
  const winsEl = document.getElementById('statWins');

  if (onlineEl) onlineEl.textContent = online.toLocaleString('pt-BR');
  if (signalsEl) signalsEl.textContent = signals.toString();
  if (winsEl) winsEl.textContent = `${wins}%`;
}

// ==================== APLICAR CONFIG ====================
function applyConfig() {
  document.title = `${CONFIG.siteName} - Sinais RTP`;
  const headerName = document.getElementById('headerSiteName');
  if (headerName) headerName.textContent = CONFIG.siteName;

  const btnWhatsapp = document.getElementById('btnWhatsappGroup');
  if (btnWhatsapp && CONFIG.whatsappGroup !== '#') {
    btnWhatsapp.href = CONFIG.whatsappGroup;
    btnWhatsapp.target = '_blank';
  }

  const root = document.documentElement;
  if (CONFIG.colors) {
    if (CONFIG.colors.accent) root.style.setProperty('--accent', CONFIG.colors.accent);
    if (CONFIG.colors.highlight) root.style.setProperty('--purple', CONFIG.colors.highlight);
  }
}

// ==================== INICIALIZACAO ====================
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  initAgeModal();
  initTabs();

  renderGames('pgsoft');
  renderGames('pragmatic');

  initBottomNav();
  scheduleRTPUpdate();
  updateTicker();
  updateFakeStats();

  // Atualizar stats a cada 30s
  setInterval(updateFakeStats, 30000);

  // Event listeners da tela do jogo
  document.getElementById('gameScreenBack').addEventListener('click', hidePaymentChart);
  document.getElementById('generateSignalBtn').addEventListener('click', generateSignal);
  document.getElementById('signalToggle').addEventListener('click', toggleSignalPanel);
});
