/* ============================================================
   ACCURACY CONSULTANCY — main.js
   Shared English / Arabic components, language selection,
   navigation, animations, and contact form handling.
   ============================================================ */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
  const assetPrefix = isArabic ? '../' : '';
  const pageFile = (() => {
    const path = window.location.pathname.replace(/\\/g, '/');
    return path.split('/').pop() || 'index.html';
  })();

  const copy = isArabic ? {
    home: 'الرئيسية',
    about: 'من نحن',
    contact: 'تواصل معنا',
    navigation: 'التنقل الرئيسي',
    openMenu: 'فتح قائمة التنقل',
    pages: 'الصفحات',
    services: 'الخدمات',
    reachUs: 'تواصل معنا',
    capacity: 'بناء القدرات',
    monitoring: 'المراقبة من طرف ثالث',
    advisory: 'الاستشارات والدعم',
    whatsapp: 'واتساب',
    location: 'صنعاء، اليمن',
    footerBlurb: 'مراقبة مستقلة، وتقييم دقيق، وبناء قدرات للمنظمات العاملة في البيئات المعقدة.',
    rights: 'جميع الحقوق محفوظة.',
    precision: 'بُني بدقة.',
    switchLanguage: 'English',
    chooseTitle: 'اختر اللغة',
    chooseText: 'Choose your preferred language / اختر لغتك المفضلة',
    english: 'English',
    arabic: 'العربية',
    sending: 'جارٍ الإرسال…',
    requiredError: 'يرجى تعبئة جميع الحقول المطلوبة.',
    setupError: 'نموذج التواصل غير مُهيأ بعد. يرجى إضافة رابط Google Apps Script.',
  } : {
    home: 'Home',
    about: 'About',
    contact: 'Contact Us',
    navigation: 'Main navigation',
    openMenu: 'Open navigation menu',
    pages: 'Pages',
    services: 'Services',
    reachUs: 'Reach Us',
    capacity: 'Capacity Building',
    monitoring: 'Third-Party Monitoring',
    advisory: 'Advisory & Support',
    whatsapp: 'WhatsApp',
    location: "Sana'a, Yemen",
    footerBlurb: 'Independent monitoring, rigorous evaluation, and capacity building for organisations operating in complex environments.',
    rights: 'All rights reserved.',
    precision: 'Built with precision.',
    switchLanguage: 'العربية',
    chooseTitle: 'Choose your language',
    chooseText: 'Choose your preferred language / اختر لغتك المفضلة',
    english: 'English',
    arabic: 'العربية',
    sending: 'Sending…',
    requiredError: 'Please fill in all required fields.',
    setupError: 'Form not yet configured. Please paste your Google Script URL.',
  };

  function currentPage() {
    if (pageFile === '' || pageFile === 'index.html') return 'home';
    if (pageFile.startsWith('about')) return 'about';
    if (pageFile.startsWith('contact')) return 'contact';
    return '';
  }

  function languageTarget(lang) {
    const file = pageFile || 'index.html';
    if (lang === 'ar') return isArabic ? file : `ar/${file}`;
    return isArabic ? `../${file}` : file;
  }

  function buildNavbar() {
    const page = currentPage();
    const links = [
      { href: 'index.html', label: copy.home, key: 'home' },
      { href: 'about.html', label: copy.about, key: 'about' },
    ];
    const linksHTML = links
      .map(l => `<a href="${l.href}" class="nav-link${page === l.key ? ' active' : ''}">${l.label}</a>`)
      .join('');

    const switchTarget = isArabic ? languageTarget('en') : languageTarget('ar');
    const switchLang = isArabic ? 'en' : 'ar';

    return `
<nav class="navbar navbar--transparent" id="ac-navbar" role="navigation" aria-label="${copy.navigation}">
  <div class="container">
    <a href="index.html" class="nav-logo" aria-label="Accuracy Consultancy — ${copy.home}">
      <img src="${assetPrefix}assets/logo.svg" alt="Accuracy Consultancy" id="nav-logo-img">
    </a>
    <div class="nav-links" id="nav-links" role="menubar">
      ${linksHTML}
      <a href="contact.html" class="nav-link nav-cta-btn${page === 'contact' ? ' active' : ''}">${copy.contact}</a>
      <a href="${switchTarget}" class="nav-link language-switch" data-language-switch="${switchLang}" lang="${switchLang}">${copy.switchLanguage}</a>
    </div>
    <button class="nav-toggle" id="nav-toggle" aria-label="${copy.openMenu}" aria-expanded="false" aria-controls="nav-links">
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
        <a href="index.html" aria-label="Accuracy Consultancy — ${copy.home}">
          <img src="${assetPrefix}assets/logo.svg" class="footer-logo" alt="Accuracy Consultancy">
        </a>
        <p>${copy.footerBlurb}</p>
      </div>
      <div class="footer-col">
        <p class="footer-col-label">${copy.pages}</p>
        <a href="index.html">${copy.home}</a>
        <a href="about.html">${copy.about}</a>
        <a href="contact.html">${copy.contact}</a>
      </div>
      <div class="footer-col">
        <p class="footer-col-label">${copy.services}</p>
        <a href="index.html#services">${copy.capacity}</a>
        <a href="index.html#services">${copy.monitoring}</a>
        <a href="index.html#services">${copy.advisory}</a>
      </div>
      <div class="footer-col">
        <p class="footer-col-label">${copy.reachUs}</p>
        <a href="mailto:hananabumunaser@gmail.com">hananabumunaser@gmail.com</a>
        <a href="tel:+967777778147" dir="ltr">+(967) 77 777 8147</a>
        <a href="https://wa.me/967777778147" target="_blank" rel="noopener noreferrer">${copy.whatsapp}</a>
        <a href="contact.html">${copy.location}</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${year} Accuracy Consultancy. ${copy.rights}</p>
      <p style="font-size:12px;color:rgba(255,255,255,0.18);">${copy.precision}</p>
    </div>
  </div>
</footer>`;
  }

  function injectComponents() {
    const navSlot = $('#navbar-slot');
    const footerSlot = $('#footer-slot');
    if (navSlot) navSlot.innerHTML = buildNavbar();
    if (footerSlot) footerSlot.innerHTML = buildFooter();
  }

  function initNavbar() {
    const nav = $('#ac-navbar');
    const logo = $('#nav-logo-img');
    if (!nav) return;

    const HERO_THRESHOLD = 80;
    function updateNav() {
      const scrolled = window.scrollY > HERO_THRESHOLD;
      nav.classList.toggle('navbar--transparent', !scrolled);
      nav.classList.toggle('navbar--solid', scrolled);
      if (logo) logo.style.filter = scrolled ? 'none' : 'brightness(0) invert(1)';
    }

    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });

    const toggle = $('#nav-toggle');
    const links = $('#nav-links');
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

    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
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
    const form = $('#ac-contact-form');
    const success = $('#form-success');
    const error = $('#form-error');
    if (!form) return;

    const action = form.getAttribute('action') || '';
    const isPlaceholder = action.includes('YOUR_GOOGLE_SCRIPT_URL');
    if (isPlaceholder) {
      console.warn('[Accuracy Consultancy] Contact form action is still a placeholder.');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.textContent : '';
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

      const email = form.querySelector('input[type="email"]');
      if (email && email.value && !email.checkValidity()) {
        isValid = false;
        email.style.borderColor = '#c0392b';
      }

      if (!isValid) {
        if (error) {
          error.style.display = 'block';
          const firstParagraph = error.querySelector('p');
          if (firstParagraph) firstParagraph.textContent = copy.requiredError;
        }
        return;
      }

      if (isPlaceholder) {
        if (error) {
          error.style.display = 'block';
          const firstParagraph = error.querySelector('p');
          if (firstParagraph) firstParagraph.textContent = copy.setupError;
        }
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.textContent = copy.sending;
        btn.style.opacity = '0.7';
      }
      if (error) error.style.display = 'none';

      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => { data[key] = value; });

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
      field.addEventListener('input', () => { field.style.borderColor = ''; });
      field.addEventListener('change', () => { field.style.borderColor = ''; });
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

  function injectLanguageStyles() {
    if ($('#ac-language-style')) return;
    const style = document.createElement('style');
    style.id = 'ac-language-style';
    style.textContent = `
      .language-switch{font-weight:600;white-space:nowrap}
      .language-modal{position:fixed;inset:0;z-index:5000;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(26,13,16,.76);backdrop-filter:blur(8px)}
      .language-modal[hidden]{display:none}
      .language-card{width:min(480px,100%);background:#FAFAF8;border:1px solid rgba(255,255,255,.15);box-shadow:0 24px 80px rgba(0,0,0,.28);padding:44px 40px;text-align:center;border-radius:2px}
      .language-mark{width:34px;height:2px;background:#7B1C2E;margin:0 auto 24px}
      .language-card h2{font-family:var(--font-display);font-size:clamp(30px,6vw,42px);font-weight:500;line-height:1.15;color:#1A0D10;margin-bottom:10px}
      .language-card p{font-size:14px;color:#6B5A5E;margin-bottom:30px}
      .language-options{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .language-option{display:flex;align-items:center;justify-content:center;min-height:54px;padding:12px 18px;border:1px solid #D4CCC9;background:#fff;color:#1A0D10;font-size:15px;font-weight:500;transition:.2s ease}
      .language-option:hover,.language-option:focus-visible{border-color:#7B1C2E;color:#7B1C2E;outline:none;transform:translateY(-1px)}
      .language-option--primary{background:#7B1C2E;color:#fff;border-color:#7B1C2E}
      .language-option--primary:hover,.language-option--primary:focus-visible{background:#5C1422;color:#fff;border-color:#5C1422}
      @media(max-width:520px){.language-card{padding:34px 24px}.language-options{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function saveLanguage(lang) {
    try { window.localStorage.setItem('ac_language', lang); } catch (_) { /* storage may be unavailable */ }
  }

  function getSavedLanguage() {
    try { return window.localStorage.getItem('ac_language'); } catch (_) { return null; }
  }

  function initLanguageSelection() {
    injectLanguageStyles();

    document.querySelectorAll('[data-language-switch]').forEach(link => {
      link.addEventListener('click', () => saveLanguage(link.dataset.languageSwitch));
    });

    const saved = getSavedLanguage();
    const current = isArabic ? 'ar' : 'en';

    if (saved && saved !== current) {
      window.location.replace(languageTarget(saved));
      return;
    }
    if (saved) return;

    const modal = document.createElement('div');
    modal.className = 'language-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'language-title');
    modal.innerHTML = `
      <div class="language-card">
        <div class="language-mark" aria-hidden="true"></div>
        <h2 id="language-title">${copy.chooseTitle}</h2>
        <p>${copy.chooseText}</p>
        <div class="language-options">
          <button type="button" class="language-option${!isArabic ? ' language-option--primary' : ''}" data-language-choice="en" lang="en">${copy.english}</button>
          <button type="button" class="language-option${isArabic ? ' language-option--primary' : ''}" data-language-choice="ar" lang="ar">${copy.arabic}</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const choices = modal.querySelectorAll('[data-language-choice]');
    choices.forEach(button => {
      button.addEventListener('click', () => {
        const selected = button.dataset.languageChoice;
        saveLanguage(selected);
        if (selected === current) {
          modal.remove();
          document.body.style.overflow = '';
        } else {
          window.location.assign(languageTarget(selected));
        }
      });
    });

    const preferredButton = modal.querySelector(`[data-language-choice="${current}"]`);
    if (preferredButton) preferredButton.focus();
  }

  function init() {
    injectComponents();
    initNavbar();
    initScrollReveal();
    initContactForm();
    initHashLinks();
    initLanguageSelection();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
