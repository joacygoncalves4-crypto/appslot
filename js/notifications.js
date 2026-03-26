// ==================== SISTEMA DE NOTIFICACOES ====================

(function() {
  let notificationHistory = [];
  let notificationTimer = null;

  function getHighRTPGames() {
    const allGames = [...PGSOFT_GAMES, ...PRAGMATIC_GAMES];
    return allGames.filter(game => calculateRTP(game.id) >= 85);
  }

  function getRandomProfit() {
    return 120 + Math.floor(Math.random() * 451);
  }

  function getRandomName() {
    const names = [
      'Ana', 'Maria', 'Joao', 'Pedro', 'Lucas', 'Julia',
      'Fernanda', 'Carlos', 'Rafael', 'Bruna', 'Diego',
      'Camila', 'Thiago', 'Larissa', 'Gustavo', 'Amanda',
      'Felipe', 'Beatriz', 'Rodrigo', 'Isabela', 'Matheus',
      'Leticia', 'Bruno', 'Daniela', 'Vinicius', 'Patricia'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  function showToast() {
    const highRTPGames = getHighRTPGames();
    if (highRTPGames.length === 0) return;

    let available = highRTPGames.filter(g => !notificationHistory.includes(g.id));
    if (available.length === 0) {
      notificationHistory = [];
      available = highRTPGames;
    }

    const game = available[Math.floor(Math.random() * available.length)];
    notificationHistory.push(game.id);

    const profit = getRandomProfit();
    const name = getRandomName();

    const toastContent = document.getElementById('toastContent');
    toastContent.innerHTML = `<strong>${name}</strong> faturou <strong>R$ ${profit}</strong> no <strong>${game.name}</strong>`;

    const toast = document.getElementById('toastNotification');
    toast.classList.add('show');

    // Som de notificacao
    try { SFX.win(); } catch(e) {}

    // Progress bar de 12s
    const progress = document.getElementById('toastProgress');
    if (progress) {
      progress.style.width = '100%';
      progress.style.transition = 'none';
      requestAnimationFrame(() => {
        progress.style.transition = 'width 12s linear';
        progress.style.width = '0%';
      });
    }

    setTimeout(() => {
      toast.classList.remove('show');
    }, 12000);
  }

  function startNotifications() {
    setTimeout(() => {
      showToast();
      notificationTimer = setInterval(showToast, 45000);
    }, 4000);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('toastClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.getElementById('toastNotification').classList.remove('show');
      });
    }

    startNotifications();
  });
})();
