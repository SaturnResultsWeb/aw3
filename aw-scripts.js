/* ================================================
   ALDERNEY WEEK 2026 — SHARED SCRIPTS
   ================================================ */

(function () {
  'use strict';

  /* ── NAV SCROLL EFFECT ─────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── MOBILE MENU ───────────────────────────── */
  const burger     = document.querySelector('.nav__burger');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close on mobile link click */
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── FAQ ACCORDION ─────────────────────────── */
  document.querySelectorAll('.faq__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq__item');
      const answer = item.querySelector('.faq__a');
      const isOpen = item.classList.contains('is-open');

      /* Close all open items */
      document.querySelectorAll('.faq__item.is-open').forEach(open => {
        open.classList.remove('is-open');
        open.querySelector('.faq__a').style.maxHeight = '0';
      });

      /* Open clicked item if it was closed */
      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ── SCROLL-IN ANIMATIONS ──────────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');

  if (fadeEls.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    fadeEls.forEach(el => observer.observe(el));
  }

  /* ── ACTIVE NAV LINK ───────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });

  /* ── SMOOTH CONTACT FORM SUBMIT ────────────── */
  const contactForm = document.querySelector('.js-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      const btn = contactForm.querySelector('[type="submit"]');
      if (btn) {
        btn.textContent = 'Sending...';
        btn.disabled = true;
      }
    });
  }

})();
