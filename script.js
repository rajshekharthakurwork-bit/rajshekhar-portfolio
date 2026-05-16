/* ============================================
   RAJ SHEKHAR — DATA ANALYST PORTFOLIO
   script.js  |  All interactivity here
   ============================================ */


/* ── 0. WEB3FORMS ACCESS KEY ────────────────────
   ✏️  Replace the string below with your own key.
   Get a FREE key at: https://web3forms.com
   (just enter rajshekharthakur.official@gmail.com)
   ─────────────────────────────────────────── */
const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE';


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


/* ── 3. CONTACT FORM — REAL EMAIL SUBMISSION ────
   Sends form data to Web3Forms API which
   forwards the message to your Gmail inbox.
   ─────────────────────────────────────────── */
const sendBtn       = document.getElementById('sendBtn');
const nameInput     = document.getElementById('senderName');
const emailInput    = document.getElementById('senderEmail');
const subjectInput  = document.getElementById('senderSubject');
const messageInput  = document.getElementById('senderMessage');

/* SVG icon reused for the button default state */
const sendIconHTML = `
  <svg width="15" height="15" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
  Send Message
`;

function resetBtn() {
  sendBtn.innerHTML = sendIconHTML;
  sendBtn.style.background  = '';
  sendBtn.style.cursor      = '';
  sendBtn.disabled          = false;
}

if (sendBtn) {
  sendBtn.addEventListener('click', async function () {

    /* ── Basic client-side validation ── */
    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !subject || !message) {
      /* Shake the empty fields */
      [nameInput, emailInput, subjectInput, messageInput].forEach(el => {
        if (!el.value.trim()) {
          el.style.borderColor = '#ef4444';
          el.addEventListener('input', () => (el.style.borderColor = ''), { once: true });
        }
      });
      return;
    }

    /* ── Loading state ── */
    sendBtn.innerHTML  = '⏳ Sending…';
    sendBtn.style.cursor   = 'not-allowed';
    sendBtn.disabled       = true;

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body   : JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          subject,
          message,
          /* Extra context shown in the email */
          from_name : 'Portfolio Contact Form',
        }),
      });

      const data = await res.json();

      if (data.success) {
        /* ── Success state ── */
        sendBtn.textContent     = '✓ Message Sent!';
        sendBtn.style.background = '#15803d';
        sendBtn.disabled        = false;

        /* Clear the form */
        nameInput.value    = '';
        emailInput.value   = '';
        subjectInput.value = '';
        messageInput.value = '';

        /* Reset button after 4 seconds */
        setTimeout(resetBtn, 4000);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Contact form error:', err);

      /* ── Error state ── */
      sendBtn.textContent      = '✗ Failed — Try Again';
      sendBtn.style.background = '#b91c1c';
      sendBtn.disabled         = false;

      setTimeout(resetBtn, 4000);
    }
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
