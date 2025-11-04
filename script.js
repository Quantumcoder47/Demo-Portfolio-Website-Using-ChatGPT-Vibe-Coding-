// ===== Mobile menu toggle =====
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn?.addEventListener('click', () => {
  const isOpen = mobileMenu.style.display === 'block';
  mobileMenu.style.display = isOpen ? 'none' : 'block';
  menuBtn.setAttribute('aria-expanded', String(!isOpen));
});

document.querySelectorAll('[data-mobile-link]').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// ===== Active link highlight as you scroll =====
const sections = ['home','about','projects','contact'].map(id => document.getElementById(id));
const navLinks = document.querySelectorAll('.nav-link');
const setActive = (id) => {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
  });
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
sections.forEach(s => s && observer.observe(s));

// ===== Header shadow on scroll =====
const header = document.querySelector('header.nav');
window.addEventListener('scroll', () => {
  header.style.boxShadow = (window.scrollY || 0) > 8 ? '0 6px 20px rgba(0,0,0,.35)' : 'none';
});

// ===== Contact form (front-end only) =====
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formMsg.textContent = 'Please complete all fields.';
    return;
  }
  // Simple email check
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    formMsg.textContent = 'Please enter a valid email.';
    return;
  }

  // No backend yet — show a friendly success message
  formMsg.textContent = 'Thanks! Your message has been “sent” (demo).';
  form.reset();

  // Optional: scroll to Contact heading
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ===== Avatar fallback (hide initials if image loads) =====
const avatarImg = document.querySelector('.avatar-img');
const avatarFallback = document.querySelector('.avatar-fallback');
avatarImg?.addEventListener('load', () => {
  if (avatarImg.naturalWidth > 0) {
    avatarFallback.style.display = 'none';
  }
});
avatarImg?.addEventListener('error', () => {
  // Keep fallback visible if image missing
  avatarFallback.style.display = 'grid';
});
