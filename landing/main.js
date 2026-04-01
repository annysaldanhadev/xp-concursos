/* ============================================================
   XP Concursos — main.js
   Lógica principal: navbar, formulário, pomodoro, contadores
   ============================================================ */

'use strict';

// ============================================================
// NAVBAR — scroll e menu mobile
// ============================================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');

/**
 * Adiciona classe 'scrolled' na navbar ao rolar a página
 * Ativa o efeito de vidro fosco (backdrop-filter)
 */
function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

/**
 * Menu mobile toggle
 */
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.contains('mobile-open');

  if (isOpen) {
    navLinks.classList.remove('mobile-open');
    navCta.classList.remove('mobile-open');
    navToggle.setAttribute('aria-expanded', 'false');
  } else {
    navLinks.classList.add('mobile-open');
    navCta.classList.add('mobile-open');
    navToggle.setAttribute('aria-expanded', 'true');
  }
});

// Fecha o menu mobile ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('mobile-open');
    navCta.classList.remove('mobile-open');
  });
});

// ============================================================
// CONTADOR XP ODÔMETRO — anima o número de XP no hero
// ============================================================

/**
 * Formata número com separador de milhar brasileiro
 */
function formatNumber(num) {
  return num.toLocaleString('pt-BR');
}

/**
 * Anima um contador numérico de 0 até o valor alvo
 * @param {HTMLElement} el - Elemento onde o número será exibido
 * @param {number} target - Valor final
 * @param {number} duration - Duração em ms
 * @param {string} suffix - Sufixo opcional
 */
function animateCounter(el, target, duration = 2000, suffix = '') {
  const startTime = performance.now();
  const startValue = 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing: ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startValue + (target - startValue) * eased);

    el.textContent = formatNumber(current) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Contador XP do hero (odômetro)
const xpOdometer = document.getElementById('xp-odometer');
let xpAnimated = false;

// A animação do XP é disparada pela classe .animated (via IntersectionObserver em animations.js)
// Mas aqui controlamos manualmente para o hero
setTimeout(() => {
  if (xpOdometer) {
    animateCounter(xpOdometer, 2847350, 2500);
  }
}, 1400); // Aguarda a entrada do hero

// ============================================================
// BARRA DE XP DO HERO — se preenche ao entrar na seção
// ============================================================
const xpBar = document.getElementById('xp-bar');

setTimeout(() => {
  if (xpBar) {
    xpBar.style.width = '72%';
  }
}, 1600);

// ============================================================
// CONTADORES .count-up — anima ao entrar no viewport
// ============================================================
const countUpObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, 1800, suffix);
      countUpObserver.unobserve(el); // Anima apenas uma vez
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count-up').forEach(el => {
  countUpObserver.observe(el);
});

// Mini stats do hero (stat-num)
const heroStatNums = document.querySelectorAll('.stat-num');
let heroStatsAnimated = false;

const heroStatsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !heroStatsAnimated) {
      heroStatsAnimated = true;
      heroStatNums.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target, 2000);
      });
    }
  });
}, { threshold: 0.3 });

const heroStatsEl = document.querySelector('.hero-stats');
if (heroStatsEl) heroStatsObserver.observe(heroStatsEl);

// ============================================================
// BARRA DE PROGRESSO DAS LIGAS — anima ao entrar no viewport
// ============================================================
const leagueFill = document.getElementById('league-fill');
const leagueCursor = document.getElementById('league-cursor');
const leagueSection = document.getElementById('league-progress-section');

const leagueObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Liga atual: Veterano = 75% da barra
      setTimeout(() => {
        if (leagueFill) leagueFill.style.width = '75%';
        if (leagueCursor) leagueCursor.style.left = '75%';
      }, 300);
      leagueObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

if (leagueSection) leagueObserver.observe(leagueSection);

// ============================================================
// TIMER POMODORO (simulado na tela do celular)
// ============================================================
const pomoTimer = document.getElementById('pomo-timer');
const pomoStart = document.getElementById('pomo-start');
const pomoCircle = document.getElementById('pomo-circle');

let pomoInterval = null;
let pomoRunning = false;
let pomoSeconds = 25 * 60; // 25 minutos
const POMO_TOTAL = 25 * 60;
const CIRCUMFERENCE = 213.6; // 2 * π * 34

function updatePomoDisplay() {
  const mins = Math.floor(pomoSeconds / 60);
  const secs = pomoSeconds % 60;
  if (pomoTimer) {
    pomoTimer.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // Atualiza o arco SVG
  if (pomoCircle) {
    const progress = pomoSeconds / POMO_TOTAL;
    const dashoffset = CIRCUMFERENCE * (1 - progress);
    pomoCircle.style.strokeDashoffset = dashoffset;
  }
}

function startPomo() {
  pomoRunning = true;
  if (pomoStart) pomoStart.textContent = '⏸ Pausar';

  pomoInterval = setInterval(() => {
    if (pomoSeconds > 0) {
      pomoSeconds--;
      updatePomoDisplay();
    } else {
      clearInterval(pomoInterval);
      pomoRunning = false;
      pomoSeconds = 25 * 60;
      if (pomoStart) pomoStart.textContent = '▶ Iniciar';
      updatePomoDisplay();
    }
  }, 1000);
}

function pausePomo() {
  pomoRunning = false;
  clearInterval(pomoInterval);
  if (pomoStart) pomoStart.textContent = '▶ Continuar';
}

if (pomoStart) {
  pomoStart.addEventListener('click', () => {
    if (pomoRunning) {
      pausePomo();
    } else {
      startPomo();
    }
  });
}

// ============================================================
// FORMULÁRIO CTA — lista de espera
// ============================================================
const ctaForm = document.getElementById('cta-form');
const ctaSuccess = document.getElementById('cta-success');
const ctaSubmit = document.getElementById('cta-submit');
const btnText = document.getElementById('btn-text');

/**
 * Validação simples de email
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (ctaForm) {
  ctaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('cta-name');
    const emailInput = document.getElementById('cta-email');
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    // Validação
    if (!name) {
      nameInput.focus();
      nameInput.style.borderColor = '#ef4444';
      setTimeout(() => { nameInput.style.borderColor = ''; }, 3000);
      return;
    }

    if (!isValidEmail(email)) {
      emailInput.focus();
      emailInput.style.borderColor = '#ef4444';
      setTimeout(() => { emailInput.style.borderColor = ''; }, 3000);
      return;
    }

    // Estado de loading
    ctaSubmit.disabled = true;
    if (btnText) btnText.textContent = '⏳ Entrando na lista...';

    try {
      await db.collection('waitlist').add({
        name,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Salva localmente para não mostrar o form de novo na mesma sessão
      sessionStorage.setItem('xp_waitlist', JSON.stringify({ name, email }));

      // Mostra mensagem de sucesso
      ctaForm.style.display = 'none';
      if (ctaSuccess) {
        ctaSuccess.style.display = 'block';
        ctaSuccess.style.animation = 'fade-in-up 0.5s ease forwards';
      }
    } catch (err) {
      console.error('Erro ao salvar na lista de espera:', err);
      ctaSubmit.disabled = false;
      if (btnText) btnText.textContent = '🚀 Entrar na lista de espera';
      alert('Ocorreu um erro. Tente novamente em instantes.');
    }
  });
}

// Verifica se já entrou na lista (nessa sessão)
const existingEntry = sessionStorage.getItem('xp_waitlist');
if (existingEntry && ctaForm && ctaSuccess) {
  ctaForm.style.display = 'none';
  ctaSuccess.style.display = 'block';
}

// ============================================================
// PARALLAX SUAVE NO HERO
// ============================================================
let ticking = false;

function handleParallax() {
  const scrollY = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  const heroMockup = document.querySelector('.hero-mockup');

  if (heroContent && scrollY < window.innerHeight) {
    // Move o conteúdo mais devagar que o scroll (efeito parallax)
    heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
    heroMockup.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleParallax();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// ============================================================
// EFEITO HOVER DE INCLINAÇÃO NOS CARDS (tilt sutil)
// ============================================================
function addTiltEffect(cards) {
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Aplica tilt nos cards de problema (não no featured para não conflitar com scale)
const problemCards = document.querySelectorAll('.problem-card:not(.card-featured)');
addTiltEffect(problemCards);

// ============================================================
// LOOP DE ATUALIZAÇÃO DO RANKING (simula dados ao vivo)
// ============================================================
function simulateLiveRanking() {
  const xpValues = document.querySelectorAll('.rp-xp');
  if (!xpValues.length) return;

  // Simula pequenas variações nos XPs do ranking
  const baseValues = [12840, 11230, 10875];

  xpValues.forEach((el, i) => {
    if (i < 3) {
      const variation = Math.floor(Math.random() * 20) - 10;
      const newVal = baseValues[i] + variation;
      el.textContent = newVal.toLocaleString('pt-BR') + ' XP';
      baseValues[i] = newVal;
    }
  });
}

setInterval(simulateLiveRanking, 4000);

// ============================================================
// SMOOTH SCROLL para links internos
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  handleNavbarScroll();
  updatePomoDisplay();
  console.log('⚡ XP Concursos — Landing Page carregada!');
});
