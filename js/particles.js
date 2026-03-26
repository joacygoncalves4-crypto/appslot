// ==================== PARTICLES BACKGROUND ====================
// Efeito de particulas flutuantes estilo iGaming

(function() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;

  const c = canvas.getContext('2d');
  let W, H;
  let particles = [];
  let animFrame;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.7 ? '#a855f7' : (Math.random() > 0.5 ? '#00ff88' : '#ffffff')
    };
  }

  function init() {
    resize();
    particles = [];
    const count = Math.min(Math.floor((W * H) / 15000), 60);
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }

  function draw() {
    c.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      c.beginPath();
      c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      c.fillStyle = p.color;
      c.globalAlpha = p.alpha;
      c.fill();
    });

    c.globalAlpha = 1;
    animFrame = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
  });

  // Iniciar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { init(); draw(); });
  } else {
    init();
    draw();
  }
})();
