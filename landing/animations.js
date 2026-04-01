/* ============================================================
   XP Concursos — animations.js
   Sistema de animações: partículas, scroll observer, efeitos
   ============================================================ */

'use strict';

// ============================================================
// SISTEMA DE PARTÍCULAS — canvas de fundo do hero
// ============================================================

const canvas = document.getElementById('particles-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let particles = [];
let animFrameId;

/**
 * Ajusta o tamanho do canvas ao tamanho da janela
 */
function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

/**
 * Classe Partícula — representa uma partícula flutuante
 */
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 2 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.alphaDir = Math.random() > 0.5 ? 1 : -1;
    this.alphaSpeed = Math.random() * 0.008 + 0.002;

    // Cores: roxo e branco suave
    const colors = [
      'rgba(124, 58, 237',   // roxo primário
      'rgba(167, 139, 250',  // roxo claro
      'rgba(91, 33, 182',    // roxo escuro
      'rgba(200, 180, 255',  // lavanda
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Atualiza posição e opacidade da partícula
   */
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha += this.alphaDir * this.alphaSpeed;

    // Inverte direção da opacidade
    if (this.alpha > 0.6 || this.alpha < 0.05) {
      this.alphaDir *= -1;
    }

    // Reposiciona ao sair da tela
    if (this.x < -10 || this.x > canvas.width + 10 ||
        this.y < -10 || this.y > canvas.height + 10) {
      this.reset();
    }
  }

  /**
   * Desenha a partícula no canvas
   */
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `${this.color}, ${this.alpha})`;
    ctx.fill();
  }
}

/**
 * Inicializa as partículas
 */
function initParticles() {
  if (!canvas || !ctx) return;

  const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
  particles = [];

  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

/**
 * Conecta partículas próximas com linhas suaves
 */
function drawConnections() {
  const maxDist = 120;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.12;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

/**
 * Loop de animação do canvas
 */
function animateParticles() {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha conexões primeiro (atrás das partículas)
  drawConnections();

  // Atualiza e desenha cada partícula
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  animFrameId = requestAnimationFrame(animateParticles);
}

// Inicializa e inicia o sistema de partículas
if (canvas) {
  resizeCanvas();
  initParticles();
  animateParticles();

  // Reajusta no resize (debounced)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
      initParticles();
    }, 200);
  });
}

// ============================================================
// INTERSECTION OBSERVER — anima elementos ao entrar no viewport
// ============================================================

/**
 * Observer principal para elementos com [data-animate]
 * Adiciona a classe 'animated' quando o elemento entra na tela
 */
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      // Não remove a observação para permitir re-animação ao voltar
      // scrollObserver.unobserve(entry.target); // Descomente se quiser animar só uma vez
    }
  });
}, {
  threshold: 0.12,      // Dispara quando 12% do elemento está visível
  rootMargin: '0px 0px -40px 0px'  // Pequena margem inferior para animar antes do final
});

/**
 * Observer para elementos filhos das grades (cards, steps, etc.)
 * Esses elementos têm animações controladas por CSS mas precisam da classe
 */
const childObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -20px 0px'
});

/**
 * Inicializa todos os observers após o DOM estar pronto
 */
function initScrollAnimations() {
  // Observa elementos com [data-animate] (seções, títulos, textos)
  document.querySelectorAll('[data-animate]').forEach(el => {
    scrollObserver.observe(el);
  });

  // Observa cards de problema individualmente
  document.querySelectorAll('.problem-card').forEach(el => {
    childObserver.observe(el);
  });

  // Observa step cards de como funciona
  document.querySelectorAll('.step-card').forEach(el => {
    childObserver.observe(el);
  });

  // Observa badges
  document.querySelectorAll('.badge-item').forEach(el => {
    childObserver.observe(el);
  });

  // Observa steps do roadmap
  document.querySelectorAll('.rm-step').forEach(el => {
    childObserver.observe(el);
  });

  // Observa features sociais
  document.querySelectorAll('.social-feature').forEach(el => {
    childObserver.observe(el);
  });
}

// Aguarda DOM pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}

// ============================================================
// EFEITO DE DIGITAÇÃO — para textos dinâmicos (opcional)
// ============================================================

/**
 * Efeito de texto sendo digitado
 * @param {HTMLElement} el - Elemento alvo
 * @param {string} text - Texto a ser digitado
 * @param {number} speed - Velocidade em ms por caractere
 */
function typeWriter(el, text, speed = 60) {
  el.textContent = '';
  let i = 0;

  const interval = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

// ============================================================
// ANIMAÇÃO DE HOVER NOS LEAGUE ITEMS (ligas)
// ============================================================
document.querySelectorAll('.league-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    // Remove destaque de outros
    document.querySelectorAll('.league-item').forEach(other => {
      other.style.opacity = '0.5';
    });
    item.style.opacity = '1';
    item.style.transform = 'scale(1.1)';
  });

  item.addEventListener('mouseleave', () => {
    document.querySelectorAll('.league-item').forEach(other => {
      other.style.opacity = '1';
      other.style.transform = '';
    });
    item.style.transform = '';
  });
});

// ============================================================
// EFEITO DE MOUSE TRACKING no hero (sutil movimento de luz)
// ============================================================
const heroSection = document.getElementById('hero');

if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Atualiza a posição do gradiente de luz dinamicamente
    heroSection.style.setProperty('--mouse-x', `${x}%`);
    heroSection.style.setProperty('--mouse-y', `${y}%`);
  });
}

// ============================================================
// ANIMAÇÃO DE PROGRESSO DO APP XP (na tela do celular)
// ============================================================

/**
 * Anima periodicamente a barra de XP dentro do app mockup
 * Simula uma sessão Pomodoro completando
 */
function animateAppXp() {
  const appXpFill = document.querySelector('.app-xp-fill');
  if (!appXpFill) return;

  let width = 68;
  let increasing = true;

  setInterval(() => {
    if (increasing) {
      width += 0.3;
      if (width >= 100) {
        width = 0;
        increasing = true;
      }
    }
    appXpFill.style.width = `${Math.min(width, 100)}%`;
  }, 100);
}

animateAppXp();

// ============================================================
// ANIMAÇÃO DE PARTÍCULAS DE XP (efeito visual ao hover nos cards)
// ============================================================

/**
 * Cria mini partículas de XP ao fazer hover em um card
 * @param {MouseEvent} e - Evento de mouse
 */
function spawnXpParticles(e) {
  const container = document.body;
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX;
  const y = e.clientY;

  const labels = ['+XP', '⚡', '+50'];

  for (let i = 0; i < 3; i++) {
    const particle = document.createElement('div');
    particle.textContent = labels[i % labels.length];
    particle.style.cssText = `
      position: fixed;
      left: ${x + (Math.random() - 0.5) * 60}px;
      top: ${y}px;
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.8rem;
      font-weight: 700;
      color: #A78BFA;
      pointer-events: none;
      z-index: 9999;
      animation: xp-float 0.8s ease-out forwards;
      animation-delay: ${i * 0.1}s;
    `;
    container.appendChild(particle);

    // Remove após a animação
    setTimeout(() => particle.remove(), 1000 + i * 100);
  }
}

// Adiciona CSS para a animação das partículas XP dinamicamente
const xpParticleStyle = document.createElement('style');
xpParticleStyle.textContent = `
  @keyframes xp-float {
    0%   { opacity: 1; transform: translateY(0) scale(1); }
    50%  { opacity: 1; transform: translateY(-30px) scale(1.1); }
    100% { opacity: 0; transform: translateY(-60px) scale(0.8); }
  }
`;
document.head.appendChild(xpParticleStyle);

// Aplica o efeito nos step cards
document.querySelectorAll('.step-card').forEach(card => {
  card.addEventListener('mouseenter', spawnXpParticles);
});

// ============================================================
// INDICADOR DE PROGRESSO DE SCROLL (linha no topo)
// ============================================================
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  width: 0%;
  background: linear-gradient(90deg, #7C3AED, #A78BFA);
  z-index: 9999;
  transition: width 0.1s linear;
  box-shadow: 0 0 8px rgba(124, 58, 237, 0.6);
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}, { passive: true });

// ============================================================
// LOG DE INICIALIZAÇÃO
// ============================================================
console.log('%c⚡ XP Concursos', 'color: #A78BFA; font-family: monospace; font-size: 20px; font-weight: bold;');
console.log('%cAnimations.js carregado com sucesso!', 'color: #7C3AED; font-family: monospace;');
