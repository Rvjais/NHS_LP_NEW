(() => {
  const setLanguage = language => {
    document.documentElement.dataset.lang = language;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    document.querySelectorAll('[data-placeholder-en]').forEach(input => {
      input.placeholder = input.getAttribute(`data-placeholder-${language}`);
    });
    try { localStorage.setItem('nhs-lang', language); } catch {}
  };
  let saved;
  try { saved = localStorage.getItem('nhs-lang'); } catch {}
  setLanguage(saved === 'pa' ? 'pa' : 'en');
  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!motionPreference.matches && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.section-heading, .service-card, .doctor-layout, .doctor-card, .hospital-gallery figure, .steps article, .appointment-copy, .appointment-form, .faq-section'
    );
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px 40px 0px', threshold: 0.08 });
    revealTargets.forEach((element, index) => {
      element.classList.add('reveal');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 70}ms`);
      observer.observe(element);
    });
    document.documentElement.classList.add('motion-ready');
  }
})();
