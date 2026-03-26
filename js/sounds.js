// ==================== SISTEMA DE SONS ====================
// Gera sons programaticamente com Web Audio API (sem arquivos externos)

const SFX = (() => {
  let ctx = null;
  let enabled = true;

  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctx;
  }

  // Ativar audio no primeiro toque (requisito mobile)
  function unlock() {
    const ac = getCtx();
    if (ac.state === 'suspended') ac.resume();
    document.removeEventListener('touchstart', unlock);
    document.removeEventListener('click', unlock);
  }

  document.addEventListener('touchstart', unlock, { once: true });
  document.addEventListener('click', unlock, { once: true });

  function playTone(freq, duration, type, volume, ramp) {
    if (!enabled) return;
    try {
      const ac = getCtx();
      const osc = ac.createOscillator();
      const gain = ac.createGain();

      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, ac.currentTime);

      if (ramp) {
        osc.frequency.exponentialRampToValueAtTime(ramp, ac.currentTime + duration);
      }

      gain.gain.setValueAtTime(volume || 0.1, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);

      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + duration);
    } catch(e) {}
  }

  return {
    // Som de clique suave
    click() {
      playTone(800, 0.08, 'sine', 0.06);
    },

    // Som ao gerar sinal - sequencia ascendente empolgante
    signal() {
      playTone(400, 0.1, 'sine', 0.08);
      setTimeout(() => playTone(600, 0.1, 'sine', 0.08), 80);
      setTimeout(() => playTone(800, 0.1, 'sine', 0.08), 160);
      setTimeout(() => playTone(1200, 0.2, 'sine', 0.1), 240);
    },

    // Som de notificacao/ganho
    win() {
      playTone(523, 0.15, 'sine', 0.07);
      setTimeout(() => playTone(659, 0.15, 'sine', 0.07), 120);
      setTimeout(() => playTone(784, 0.2, 'sine', 0.08), 240);
    },

    // Som de confirmacao (age modal)
    confirm() {
      playTone(600, 0.12, 'sine', 0.06, 900);
    },

    // Som de tab change
    tab() {
      playTone(500, 0.06, 'triangle', 0.05);
    },

    // Som do botao de voltar
    back() {
      playTone(400, 0.08, 'sine', 0.05, 300);
    },

    // Toggle mute
    toggle() {
      enabled = !enabled;
      return enabled;
    }
  };
})();
