// ==================== CONFIGURACAO CENTRALIZADA ====================
const CONFIG = {
  siteName: 'BELA BET',
  logo: 'assets/banner-belabet-main.jpg',
  affiliateLink: 'https://vipprime.bet/?r=hhz0y5',
  whatsappGroup: 'https://chat.whatsapp.com/H9zi87UuFABBjFgAgyOILe',
  whatsappContact: '',
  platformLogo: 'assets/banner-belabet-main.jpg',
  platformName: 'VIPPrime',
  colors: {
    primary: '#0a0005',
    accent: '#D4AF37',
    success: '#D4AF37',
    highlight: '#C41E3A'
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
    renderHotRTP();
    updateTicker();
    updateFakeStats();
    scheduleRTPUpdate();
  }, delay);
}

// ==================== TELA DO JOGO ====================
let signalChartInstance = null;

function showPaymentChart(slotId, slotName) {
  SFX.click();
  savedScrollPos = window.scrollY;
  activePaymentSlotId = slotId;
  activePaymentSlotName = slotName;

  document.getElementById('signalGameName').textContent = slotName;

  // Reset chips compactos
  ['chipRTP', 'chipNormal', 'chipTurbo', 'chipAcerto', 'chipValido'].forEach(id => {
    const el = document.getElementById(id);
    el.textContent = id === 'chipValido' ? '--:--' : '--';
    el.classList.remove('animate');
  });

  // Reset detalhes expandidos
  document.getElementById('signalRTP').textContent = '0.0%';
  document.getElementById('signalRTP').className = 'signal-rtp-value';
  document.getElementById('signalRTPFill').style.width = '0%';
  document.getElementById('signalRTPFill').className = 'signal-rtp-fill';

  ['signalNormal', 'signalTurbo', 'signalAcerto'].forEach(id => {
    const el = document.getElementById(id);
    el.textContent = '--';
    el.classList.remove('active', 'animate');
  });
  const valEl = document.getElementById('signalValidade');
  valEl.textContent = '--:--';
  valEl.classList.remove('active', 'animate');

  // Esconder grafico e colapsar detalhes
  document.getElementById('signalChartContainer').style.display = 'none';
  document.getElementById('signalDetails').classList.remove('open');
  if (signalChartInstance) {
    signalChartInstance.destroy();
    signalChartInstance = null;
  }

  const gameScreen = document.getElementById('gameScreen');
  const iframe = document.getElementById('platformIframe');

  gameScreen.classList.add('active', 'loading');
  document.body.style.overflow = 'hidden';

  if (CONFIG.affiliateLink && CONFIG.affiliateLink !== '#') {
    iframe.src = CONFIG.affiliateLink;
    iframe.onload = () => gameScreen.classList.remove('loading');
  }

  // Detalhes comecam fechados, toggle desativado
  document.getElementById('signalDetails').classList.remove('open');
  document.getElementById('signalToggle').classList.remove('active');

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
  const details = document.getElementById('signalDetails');
  const btn = document.getElementById('signalToggle');
  details.classList.toggle('open');
  btn.classList.toggle('active');
}

// ==================== GERACAO DE SINAL ====================
function generateSignal() {
  if (!activePaymentSlotId) return;

  const btn = document.getElementById('generateSignalBtn');
  if (btn.disabled) return;

  SFX.signal();

  // Fase 1: ANALISANDO... (1.8s)
  btn.disabled = true;
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> ANALISANDO...';
  btn.style.animation = 'analyzing 1s ease-in-out infinite';

  setTimeout(() => {
    btn.style.animation = '';

    const rtp = calculateRTP(activePaymentSlotId);
    const normal = 5 + Math.floor(Math.random() * 11);
    const turbo = 4 + Math.floor(Math.random() * 9);
    const acerto = 88 + Math.floor(Math.random() * 8);
    const rtpClass = getRTPClass(rtp);

    const now = new Date();
    const validity = new Date(now.getTime() + 5 * 60000);
    const brasiliaValidity = new Date(validity.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const validH = brasiliaValidity.getHours().toString().padStart(2, '0');
    const validM = brasiliaValidity.getMinutes().toString().padStart(2, '0');

    // Atualizar CHIPS compactos com animacao sequencial
    const chipUpdates = [
      { id: 'chipRTP', val: `${rtp}%`, delay: 0 },
      { id: 'chipNormal', val: `${normal}X`, delay: 100 },
      { id: 'chipTurbo', val: `${turbo}X`, delay: 200 },
      { id: 'chipAcerto', val: `${acerto}%`, delay: 300 },
      { id: 'chipValido', val: `${validH}:${validM}`, delay: 400 }
    ];

    chipUpdates.forEach(({ id, val, delay }) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        el.textContent = val;
        el.classList.remove('animate');
        void el.offsetWidth;
        el.classList.add('animate');
      }, delay);
    });

    // Atualizar DETALHES expandidos (RTP bar + metricas)
    const rtpValue = document.getElementById('signalRTP');
    const rtpFill = document.getElementById('signalRTPFill');

    rtpValue.textContent = `${rtp}.0%`;
    rtpValue.className = 'signal-rtp-value ' + rtpClass;
    rtpFill.style.width = `${rtp}%`;
    rtpFill.className = 'signal-rtp-fill ' + rtpClass;

    const metricUpdates = [
      { id: 'signalNormal', val: `${normal}X`, delay: 200 },
      { id: 'signalTurbo', val: `${turbo}X`, delay: 400 },
      { id: 'signalAcerto', val: `${acerto}%`, delay: 600 },
      { id: 'signalValidade', val: `${validH}:${validM}`, delay: 800 }
    ];

    metricUpdates.forEach(({ id, val, delay }) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        el.textContent = val;
        el.classList.remove('animate');
        void el.offsetWidth;
        el.classList.add('animate', 'active');
      }, delay);
    });

    // Gerar e mostrar grafico Chart.js
    setTimeout(() => renderSignalChart(rtp), 400);

    startCooldown();
  }, 1800);
}

// ==================== GRAFICO DE PAGAMENTO ====================
function renderSignalChart(currentRtp) {
  const container = document.getElementById('signalChartContainer');
  container.style.display = 'block';

  if (signalChartInstance) {
    signalChartInstance.destroy();
  }

  const canvas = document.getElementById('signalChart');
  const ctx = canvas.getContext('2d');

  // Gerar dados ficticios baseados no RTP atual
  const labels = [];
  const data = [];
  const now = new Date();

  for (let i = 7; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 5 * 60000);
    const h = t.getHours().toString().padStart(2, '0');
    const m = t.getMinutes().toString().padStart(2, '0');
    labels.push(`${h}:${m}`);

    if (i === 0) {
      data.push(currentRtp);
    } else {
      const variation = currentRtp + (Math.random() * 20 - 10);
      data.push(Math.max(30, Math.min(98, Math.round(variation))));
    }
  }

  // Gradient fill
  const gradient = ctx.createLinearGradient(0, 0, 0, 120);
  gradient.addColorStop(0, 'rgba(40,167,69,0.4)');
  gradient.addColorStop(1, 'rgba(40,167,69,0.02)');

  signalChartInstance = new Chart(canvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        borderColor: '#28a745',
        backgroundColor: gradient,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#28a745',
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#fff',
          bodyColor: '#28a745',
          borderColor: 'rgba(40,167,69,0.3)',
          borderWidth: 1,
          padding: 8,
          callbacks: {
            label: (ctx) => `RTP: ${ctx.raw}%`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 9 } }
        },
        y: {
          min: 20,
          max: 100,
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: 'rgba(255,255,255,0.4)',
            font: { size: 9 },
            callback: (v) => v + '%'
          }
        }
      }
    }
  });

  // Atualizar info do grafico
  const first = data[0];
  const last = data[data.length - 1];
  const percent = ((last - first) / first * 100).toFixed(1);
  const sign = percent >= 0 ? '+' : '';
  document.getElementById('chartChange').textContent = `${sign}${percent}%`;
  document.getElementById('chartChange').style.color = percent >= 0 ? '#28a745' : '#dc3545';

  const nowBr = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  document.getElementById('chartTime').textContent = `${nowBr.getHours().toString().padStart(2, '0')}:${nowBr.getMinutes().toString().padStart(2, '0')} BRT`;
}

function startCooldown() {
  const btn = document.getElementById('generateSignalBtn');
  btn.disabled = true;
  let remaining = 59;

  signalCooldowns[activePaymentSlotId] = Date.now() + 59000;

  const clockIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';
  btn.innerHTML = `${clockIcon} AGUARDE (${remaining}s)`;

  const interval = setInterval(() => {
    remaining--;
    btn.innerHTML = `${clockIcon} AGUARDE (${remaining}s)`;

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

    const clockIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';
    btn.innerHTML = `${clockIcon} AGUARDE (${remaining}s)`;

    const interval = setInterval(() => {
      const rem = Math.ceil((cooldownEnd - Date.now()) / 1000);
      if (rem <= 0) {
        clearInterval(interval);
        btn.disabled = false;
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> GERAR NOVO SINAL';
        delete signalCooldowns[activePaymentSlotId];
      } else {
        btn.innerHTML = `${clockIcon} AGUARDE (${rem}s)`;
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

      if (nav === 'whatsapp') {
        window.open(CONFIG.whatsappGroup, '_blank');
        return;
      }

      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      document.querySelectorAll('.section').forEach(s => s.style.display = 'none');

      const tabsContainer = document.querySelector('.tabs');
      const statsBar = document.querySelector('.stats-bar');

      if (nav === 'home') {
        tabsContainer.style.display = 'flex';
        statsBar.style.display = 'flex';
        const activeTab = document.querySelector('.tab.active');
        const activeCategory = activeTab ? activeTab.getAttribute('data-category') : 'pgsoft';
        document.getElementById(`section-${activeCategory}`).style.display = 'block';
      } else if (nav === 'rtp') {
        tabsContainer.style.display = 'none';
        statsBar.style.display = 'none';
        document.getElementById('section-hotrtp').style.display = 'block';
        renderHotRTP();
        startHotTimer();
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

// ==================== HOT RTP AO VIVO ====================
function renderHotRTP() {
  const allGames = [...PGSOFT_GAMES, ...PRAGMATIC_GAMES];
  const hotGames = allGames
    .map(g => ({ ...g, rtp: calculateRTP(g.id) }))
    .filter(g => g.rtp >= 90)
    .sort((a, b) => b.rtp - a.rtp);

  const grid = document.getElementById('grid-hotrtp');
  if (!grid) return;
  grid.innerHTML = '';

  const countEl = document.getElementById('hotCount');
  if (countEl) countEl.textContent = hotGames.length;

  // Atualizar badge na nav e banner na home
  const badgeEl = document.getElementById('navHotBadge');
  if (badgeEl) badgeEl.textContent = hotGames.length;
  const bannerCountEl = document.getElementById('hotBannerCount');
  if (bannerCountEl) bannerCountEl.textContent = hotGames.length;

  hotGames.forEach((game, index) => {
    const rtpClass = getRTPClass(game.rtp);
    const card = document.createElement('div');
    card.className = 'game-card rtp-hot-card';
    card.style.animationDelay = `${Math.min(index * 0.03, 0.5)}s`;
    card.onclick = () => showPaymentChart(game.id, game.name);

    card.innerHTML = `
      <div class="card-img">
        <img src="${game.image}" alt="${game.name}" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg, #1a0033, #0a0014)'">
        <span class="card-rtp-badge ${rtpClass}">${game.rtp}%</span>
        <div class="card-hot-icon">
          <svg viewBox="0 0 24 24" fill="var(--hot)" stroke="none">
            <path d="M12 23c-3.866 0-7-3.134-7-7 0-3.107 2.012-5.03 3.5-6.5C10 8 11.5 6.5 12 3c.5 3.5 2 5 3.5 6.5C17 11 19 12.893 19 16c0 3.866-3.134 7-7 7zm0-3c1.657 0 3-1.343 3-3 0-1.4-.8-2.2-1.5-2.9-.7-.7-1.5-1.6-1.5-3.1 0 1.5-.8 2.4-1.5 3.1C9.8 14.8 9 15.6 9 17c0 1.657 1.343 3 3 3z"/>
          </svg>
        </div>
      </div>
      <div class="card-info">
        <div class="card-name">${game.name}</div>
        <div class="rtp-bar">
          <div class="rtp-fill ${rtpClass}" style="width: ${game.rtp}%"></div>
        </div>
        <div class="card-platform">
          <span class="card-platform-name">${CONFIG.platformName}</span>
          <div class="card-play-icon">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

let hotTimerInterval = null;

function startHotTimer() {
  if (hotTimerInterval) clearInterval(hotTimerInterval);

  hotTimerInterval = setInterval(() => {
    const now = Date.now();
    const nextFrame = (Math.floor(now / 600000) + 1) * 600000;
    const remaining = Math.max(0, nextFrame - now);
    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    const el = document.getElementById('hotTimerCountdown');
    if (el) el.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, 1000);
}

// ==================== APLICAR CONFIG ====================
function applyConfig() {
  document.title = `${CONFIG.siteName} - Sinais RTP Premium`;
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

// ==================== HERO CAROUSEL ====================
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!track || dots.length === 0) return;

  let currentSlide = 0;
  const totalSlides = dots.length;

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-slide'));
      goToSlide(idx);
    });
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, 5000);

  // Touch/swipe support
  let startX = 0;
  const carousel = document.getElementById('heroCarousel');
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(Math.min(currentSlide + 1, totalSlides - 1));
      else goToSlide(Math.max(currentSlide - 1, 0));
    }
  }, { passive: true });
}

// ==================== INICIALIZACAO ====================
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  initAgeModal();
  initTabs();
  initCarousel();

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

  // Banner hot RTP - clique navega para a aba RTP
  const hotBanner = document.getElementById('hotBanner');
  if (hotBanner) {
    hotBanner.addEventListener('click', () => {
      SFX.click();
      document.querySelector('[data-nav="rtp"]').click();
    });
  }

  // Inicializar contagem hot na carga
  renderHotRTP();
  startHotTimer();
});
