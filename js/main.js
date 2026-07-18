/* ============================================================
   ACCURACY CONSULTANCY — main.js
   ============================================================ */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const currentPage = () => {
    const path = window.location.pathname.replace(/\\/g, '/');
    const file = path.split('/').pop() || 'index.html';
    if (file === '' || file === 'index.html') return 'home';
    if (file.startsWith('about'))   return 'about';
    if (file.startsWith('contact')) return 'contact';
    return '';
  };

  function buildNavbar() {
    const page = currentPage();
    const links = [
      { href: 'index.html',   label: 'Home',    key: 'home'    },
      { href: 'about.html',   label: 'About',   key: 'about'   },
    ];

    const linksHTML = links
      .map(l => `<a href="${l.href}" class="nav-link${page === l.key ? ' active' : ''}">${l.label}</a>`)
      .join('');

    return `
<nav class="navbar navbar--transparent" id="ac-navbar" role="navigation" aria-label="Main navigation">
  <div class="container">
    <a href="index.html" class="nav-logo" aria-label="Accuracy Consultancy — Home">
      <img src="assets/logo.svg" alt="Accuracy Consultancy" id="nav-logo-img">
    </a>
    <div class="nav-links" id="nav-links" role="menubar">
      ${linksHTML}
      <a href="contact.html" class="nav-link nav-cta-btn${page === 'contact' ? ' active' : ''}">Contact Us</a>
    </div>
    <button class="nav-toggle" id="nav-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="nav-links">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;
  }

  function buildFooter() {
    const year = new Date().getFullYear();
    return `
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand-col">
        <a href="index.html" aria-label="Accuracy Consultancy — Home">
          <img src="assets/logo.svg" class="footer-logo" alt="Accuracy Consultancy">
        </a>
        <p>Independent monitoring, rigorous evaluation, and capacity building for organisations operating in complex environments.</p>
      </div>
      <div class="footer-col">
        <p class="footer-col-label">Pages</p>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer-col">
        <p class="footer-col-label">Services</p>
        <a href="index.html#services">Capacity Building</a>
        <a href="index.html#services">Third-Party Monitoring</a>
        <a href="index.html#services">Advisory &amp; Support</a>
      </div>
      <div class="footer-col">
        <p class="footer-col-label">Reach Us</p>
        <a href="mailto:hananabumunaser@gmail.com">hananabumunaser@gmail.com</a>
        <a href="tel:+967777778147">+(967) 77 777 8147</a>
        <a href="https://wa.me/967777778147" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href="contact.html">Sana'a, Yemen</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${year} Accuracy Consultancy. All rights reserved.</p>
      <p style="font-size:12px;color:rgba(255,255,255,0.18);">Built with precision.</p>
    </div>
  </div>
</footer>`;
  }

  function injectComponents() {
    const navSlot    = $('#navbar-slot');
    const footerSlot = $('#footer-slot');
    if (navSlot)    navSlot.innerHTML    = buildNavbar();
    if (footerSlot) footerSlot.innerHTML = buildFooter();
  }

  function initNavbar() {
    const nav    = $('#ac-navbar');
    const logo   = $('#nav-logo-img');
    if (!nav) return;

    const HERO_THRESHOLD = 80;

    function updateNav() {
      const scrolled = window.scrollY > HERO_THRESHOLD;
      nav.classList.toggle('navbar--transparent', !scrolled);
      nav.classList.toggle('navbar--solid',       scrolled);
      if (logo) {
        logo.style.filter = scrolled ? 'none' : 'brightness(0) invert(1)';
      }
    }

    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });

    const toggle = $('#nav-toggle');
    const links  = $('#nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          links.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }
  }

  function initScrollReveal() {
    const els = document.querySelectorAll('.fade-up');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach(el => observer.observe(el));
  }

  function initContactForm() {
    const form    = $('#ac-contact-form');
    const success = $('#form-success');
    const error   = $('#form-error');
    if (!form) return;

    const action = form.getAttribute('action') || '';
    const isPlaceholder = action.includes('YOUR_GOOGLE_SCRIPT_URL');

    if (isPlaceholder) {
      console.warn(
        '[Accuracy Consultancy] Form action is still set to a placeholder. ' +
        'Please paste your Google Apps Script Web App URL into the action attribute in contact.html.'
      );
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.textContent : 'Send Message';

      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#c0392b';
        } else {
          field.style.borderColor = '';
        }
      });

      if (!isValid) {
        if (error) {
          error.style.display = 'block';
          error.querySelector('p').textContent = 'Please fill in all required fields.';
        }
        return;
      }

      if (isPlaceholder) {
        if (error) {
          error.style.display = 'block';
          error.querySelector('p').textContent = 'Form not yet configured. Please paste your Google Script URL.';
        }
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
        btn.style.opacity = '0.7';
      }
      if (error) error.style.display = 'none';

      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      fetch(action, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(() => {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      })
      .catch(() => {
        if (error) error.style.display = 'block';
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText;
          btn.style.opacity = '1';
        }
      });
    });

    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

  function initHashLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  function init() {
    injectComponents();
    initNavbar();
    initScrollReveal();
    initContactForm();
    initHashLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();