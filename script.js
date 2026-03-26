/* ============================================
   RAJ SHEKHAR — DATA ANALYST PORTFOLIO
   script.js  |  All interactivity here
   ============================================ */


/* ── 1. ACTIVE NAV LINK ON SCROLL ──────────────
   Highlights the correct nav link as you
   scroll through each section.
   ─────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === '#' + current
    );
  });
});


/* ── 2. SCROLL REVEAL ANIMATION ────────────────
   Elements with class "rv" fade up into view
   as the user scrolls down the page.
   ─────────────────────────────────────────── */
const revealElements = document.querySelectorAll('.rv');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach(el => revealObserver.observe(el));


/* ── 3. CONTACT FORM — SEND BUTTON ─────────────
   Shows a success message when the user
   clicks Send Message, then resets after 3s.
   ─────────────────────────────────────────── */
const sendBtn = document.getElementById('sendBtn');

if (sendBtn) {
  sendBtn.addEventListener('click', function () {

    // Change button to success state
    this.textContent = '✓ Message Sent!';
    this.style.background = '#15803d';

    // Reset button after 3 seconds
    setTimeout(() => {
      this.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
        Send Message
      `;
      this.style.background = '';
    }, 3000);

  });
}


/* ── 4. SMOOTH SCROLL FOR ALL ANCHOR LINKS ─────
   Extra smooth scroll fallback for older
   browsers that don't support CSS scroll-behavior.
   ─────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* ── 5. NAVBAR SHADOW ON SCROLL ─────────────────
   Adds a soft shadow to the navbar when
   the user scrolls past the top.
   ─────────────────────────────────────────── */
const navbar = document.getElementById('nb');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 2px 20px rgba(15,23,42,0.10)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
