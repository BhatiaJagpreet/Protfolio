/* ================================================
   PORTFOLIO — Main JavaScript
   Navigation, animations, interactivity
   ================================================ */

// ---- Navigation Component ----
function renderNavigation(activePage) {
  const pages = [
    { name: 'Experience', href: 'experience.html' },
    { name: 'Projects', href: 'projects.html' },
    { name: 'Stack', href: 'stack.html' },
    { name: 'Certifications', href: 'certifications.html' },
    { name: 'Contact', href: 'contact.html' },
  ];

  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'navbar';
  nav.innerHTML = `
    <div class="nav-container">
      <a href="index.html" class="nav-logo"><img src="images/profile.jpg" alt="" class="nav-avatar">Jagpreet Singh Bhatia <span>.</span></a>
      <ul class="nav-links" id="navLinks">
        ${pages.map(p => `
          <li><a href="${p.href}" class="${activePage === p.name.toLowerCase() ? 'active' : ''}">${p.name}</a></li>
        `).join('')}
      </ul>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  document.body.prepend(nav);

  // Mobile toggle
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });

  // Close menu on link click (mobile)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
    });
  });

  // Scroll effect
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ---- Footer Component ----
function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-content">
        <p class="footer-text">© ${new Date().getFullYear()} Jagpreet Singh Bhatia. All rights reserved.</p>
        <ul class="footer-links">
          <li><a href="https://www.linkedin.com/in/jagpreet-singh-bhatia/" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="mailto:jagpreetsinghbhatia6@gmail.com">Email</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
    </div>
  `;

  document.querySelector('.page-wrapper').appendChild(footer);
}

// ---- Scroll Fade-In Animations ----
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || '';
  renderNavigation(page);
  renderFooter();

  // Small delay so elements render before animating
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initScrollAnimations();
    });
  });
});
