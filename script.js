const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.getElementById('sidebar-nav');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const closeMobileNav = () => {
  body.classList.remove('nav-open');
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
  }
};

const toggleMobileNav = () => {
  if (!menuToggle) {
    return;
  }

  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  body.classList.toggle('nav-open', !isExpanded);
};

if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', toggleMobileNav);
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 860) {
      closeMobileNav();
    }
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) {
    closeMobileNav();
  }
});

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visibleEntry) {
      setActiveLink(visibleEntry.target.id);
    }
  },
  {
    rootMargin: '-20% 0px -55% 0px',
    threshold: [0.2, 0.35, 0.5, 0.7],
  }
);

sections.forEach((section) => observer.observe(section));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMobileNav();
  }
});

document.addEventListener('click', (event) => {
  if (
    window.innerWidth <= 860 &&
    body.classList.contains('nav-open') &&
    sidebar &&
    menuToggle &&
    !sidebar.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMobileNav();
  }
});
