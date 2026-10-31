/* Small interactions for the resume page. Bootstrap handles the navbar toggle. */
(() => {
  'use strict';

  const navbar = document.querySelector('.site-navbar');
  const progressBar = document.getElementById('scrollProgress');
  const yearElement = document.getElementById('currentYear');
  const navCollapseElement = document.getElementById('navbarContent');

  // Keep the footer year current.
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // Update navbar appearance and reading progress while scrolling.
  const updateScrollUI = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

    if (navbar) navbar.classList.toggle('scrolled', scrollTop > 24);
    if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  window.addEventListener('resize', updateScrollUI);

  // Reveal content as it enters the viewport. Show everything if unsupported.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 65}ms`;
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Close the mobile menu after a navigation link is selected.
  if (navCollapseElement && window.bootstrap) {
    const collapse = window.bootstrap.Collapse.getOrCreateInstance(navCollapseElement, { toggle: false });
    navCollapseElement.querySelectorAll('a.nav-link, a.nav-contact').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 991.98px)').matches) collapse.hide();
      });
    });
  }
})();
