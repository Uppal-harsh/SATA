/**
 * SATA MAIN APPLICATION ENGINE
 * Coordinates UI rendering, filtering, countdowns, command palette, and interactive state.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initScrollEffects();
  initStatsCounters();
  initEventArchive();
  initNetworkDirectory();
  initCountdownTimer();
  initJoinForm();
  initCommandPalette();
  initMobileDrawer();
  initCustomPointerGlow();
});

/* --------------------------------------------------------------------------
   01. LIVE IST CLOCK & TELEMETRY
   -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.getElementById('nav-live-clock');
  function update() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    if (clockEl) clockEl.textContent = `${timeStr} IST`;
  }
  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   02. SCROLL EFFECTS & NAVBAR BEHAVIOR
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const nav = document.querySelector('.sata-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Reveal on scroll elements
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   03. NUMBER COUNTERS ANIMATION
   -------------------------------------------------------------------------- */
function initStatsCounters() {
  const statElements = document.querySelectorAll('[data-counter-target]');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter-target'), 10);
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const duration = 1400;
        const startTime = performance.now();

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          // Ease out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.floor(easeProgress * target);
          el.textContent = `${prefix}${current}${suffix}`;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  statElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   04. EVENT ARCHIVE TIMELINE & FILTERING
   -------------------------------------------------------------------------- */
function initEventArchive() {
  const container = document.getElementById('archive-timeline-list');
  const filterBtns = document.querySelectorAll('.archive-filter-btn');
  const hoverPreview = document.getElementById('archive-hover-preview');
  const previewImg = document.getElementById('archive-preview-img');

  function render(category = 'all') {
    if (!container) return;
    const events = category === 'all' 
      ? SATA_DATA.events 
      : SATA_DATA.events.filter(e => e.category === category);

    container.innerHTML = events.map(e => `
      <div class="archive-row" data-event-id="${e.id}" data-event-img="${e.image}">
        <span class="archive-row-num">${e.number}</span>
        <span class="archive-row-category">${e.categoryLabel}</span>
        <div class="archive-row-title-block">
          <div class="archive-row-title">${e.title}</div>
          <div class="archive-row-desc">${e.subtitle}</div>
        </div>
        <div class="archive-row-meta">
          <div>DATE: <span>${e.date}</span></div>
          <div>IMPACT: <span>${e.participants} • ${e.projects}</span></div>
        </div>
        <div class="archive-row-action">
          CASE FILE →
        </div>
      </div>
    `).join('');

    // Attach click handlers to open dossier modal
    container.querySelectorAll('.archive-row').forEach(row => {
      const id = row.getAttribute('data-event-id');
      const imgPath = row.getAttribute('data-event-img');

      row.addEventListener('click', () => {
        if (window.sataModal) window.sataModal.showEventDossier(id);
      });

      // Hover Image Preview
      if (hoverPreview && previewImg) {
        row.addEventListener('mouseenter', () => {
          previewImg.src = imgPath;
          hoverPreview.style.opacity = '1';
          hoverPreview.style.transform = 'scale(1)';
        });

        row.addEventListener('mousemove', (e) => {
          hoverPreview.style.left = `${e.clientX + 24}px`;
          hoverPreview.style.top = `${e.clientY - 90}px`;
        });

        row.addEventListener('mouseleave', () => {
          hoverPreview.style.opacity = '0';
          hoverPreview.style.transform = 'scale(0.95)';
        });
      }
    });
  }

  // Filter click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      render(cat);
      if (window.sataAudio) window.sataAudio.playClick();
    });
  });

  render('all');
}

/* --------------------------------------------------------------------------
   05. NETWORK MEMBER MATRIX
   -------------------------------------------------------------------------- */
function initNetworkDirectory() {
  const tableBody = document.getElementById('network-table-body');
  const searchInput = document.getElementById('network-search-input');
  const countBadge = document.getElementById('network-count-badge');

  function render(query = '') {
    if (!tableBody) return;
    const q = query.toLowerCase().trim();
    const members = SATA_DATA.members.filter(m => 
      m.name.toLowerCase().includes(q) ||
      m.domain.toLowerCase().includes(q) ||
      m.focus.toLowerCase().includes(q) ||
      m.year.toLowerCase().includes(q)
    );

    if (countBadge) countBadge.textContent = `SHOWING ${members.length} OF ${SATA_DATA.members.length} NODES`;

    if (members.length === 0) {
      tableBody.innerHTML = `
        <div style="padding:32px; text-align:center; color:var(--text-muted); font-family:var(--font-mono); font-size:0.85rem;">
          NO MATCHING NODES LOCATED FOR QUERY "${query.toUpperCase()}"
        </div>
      `;
      return;
    }

    tableBody.innerHTML = members.map(m => `
      <div class="network-row">
        <span class="net-num">${m.num}</span>
        <span class="net-name">${m.name}</span>
        <span class="net-domain">${m.domain}</span>
        <span class="net-focus">${m.focus}</span>
        <span class="net-year">${m.year}</span>
      </div>
    `).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      render(e.target.value);
    });
  }

  render();
}

/* --------------------------------------------------------------------------
   06. COUNTDOWN TIMER FOR NEXT EXPERIMENT
   -------------------------------------------------------------------------- */
function initCountdownTimer() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  const targetDate = new Date('2026-09-18T18:00:00+05:30').getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);

  // RSVP quick button in experiment card
  const rsvpBtn = document.getElementById('rsvp-experiment-btn');
  if (rsvpBtn) {
    rsvpBtn.addEventListener('click', () => {
      if (window.sataModal) {
        window.sataModal.showRSVPPassModal('Registered Explorer', 'explorer@college.edu', 'AI Build Night Attendee', 'Autonomous Systems');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   07. JOIN SATA MULTI-TRACK FORM
   -------------------------------------------------------------------------- */
function initJoinForm() {
  const form = document.getElementById('sata-join-form');
  const trackBtns = document.querySelectorAll('.track-btn');
  let selectedTrack = 'Core Engineering';

  trackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      trackBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTrack = btn.getAttribute('data-track');
      if (window.sataAudio) window.sataAudio.playClick();
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('join-name').value;
      const email = document.getElementById('join-email').value;
      const role = document.getElementById('join-year').value;

      if (window.sataModal) {
        window.sataModal.showRSVPPassModal(name, email, role, selectedTrack);
      }
      form.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   08. COMMAND PALETTE (CTRL+K / CMD+K)
   -------------------------------------------------------------------------- */
function initCommandPalette() {
  const searchBtn = document.getElementById('nav-search-btn');
  const paletteOverlay = document.getElementById('cmd-palette-overlay');
  const cmdInput = document.getElementById('cmd-palette-input');
  const resultsList = document.getElementById('cmd-results-list');

  // Build searchable index
  const index = [
    { title: "BUILDATHON '26 Flagship Hackathon", category: "Archive Event", type: "event", id: "sata-ev-07" },
    { title: "Neural Systems & Edge AI Workshop", category: "Archive Event", type: "event", id: "sata-ev-06" },
    { title: "Decentralized Protocols Keynote", category: "Archive Event", type: "event", id: "sata-ev-05" },
    { title: "Embedded IoT & Robotics Lab", category: "Archive Event", type: "event", id: "sata-ev-04" },
    { title: "AeroSense Drone Telemetry", category: "Project Vault", type: "nav", id: "work" },
    { title: "KryptonOS Real-Time Microkernel", category: "Project Vault", type: "nav", id: "work" },
    { title: "NeuroSync BCI Interface", category: "Project Vault", type: "nav", id: "work" },
    { title: "Devansh — SATA President", category: "Leadership", type: "nav", id: "people" },
    { title: "Janya Sharma — Vice President", category: "Leadership", type: "nav", id: "people" },
    { title: "Harsh Uppal — Technical Lead", category: "Leadership", type: "nav", id: "people" },
    { title: "Ashwika Sharma — General Secretary", category: "Leadership", type: "nav", id: "people" },
    { title: "Hardik — Treasurer", category: "Leadership", type: "nav", id: "people" },
    { title: "Gyanesh Kumar Nayak — Technical Team", category: "Leadership", type: "nav", id: "people" },
    { title: "Harsh Chahal — Content & Design", category: "Leadership", type: "nav", id: "people" },
    { title: "Bhavika Bansal — Operations & Event Management", category: "Leadership", type: "nav", id: "people" },
    { title: "Tapesh Jaat — Operations & Event Management", category: "Roster", type: "nav", id: "network" },
    { title: "Vaibhav Jangra — Operations & Event Management", category: "Roster", type: "nav", id: "network" },
    { title: "Akshita Setia — Content & Design", category: "Roster", type: "nav", id: "network" },
    { title: "Anushka — Content & Design", category: "Roster", type: "nav", id: "network" },
    { title: "Taksh Yadav — Marketing and Communications", category: "Roster", type: "nav", id: "network" },
    { title: "Rishita Roy — Marketing and Communications", category: "Roster", type: "nav", id: "network" },
    { title: "Shubhi Vajpayee — Coverage & Social Media", category: "Roster", type: "nav", id: "network" },
    { title: "Sneha Jangra — Coverage & Social Media", category: "Roster", type: "nav", id: "network" },
    { title: "Next Experiment: AI Build Night", category: "Upcoming", type: "nav", id: "experiments" },
    { title: "Join SATA Application Form", category: "Membership", type: "nav", id: "join" }
  ];

  function openPalette() {
    if (!paletteOverlay || !cmdInput) return;
    paletteOverlay.classList.add('active');
    cmdInput.value = '';
    renderResults('');
    cmdInput.focus();
    if (window.sataAudio) window.sataAudio.playClick();
  }

  function closePalette() {
    if (!paletteOverlay) return;
    paletteOverlay.classList.remove('active');
  }

  function renderResults(q) {
    if (!resultsList) return;
    const query = q.toLowerCase().trim();
    const filtered = query === '' 
      ? index.slice(0, 7) 
      : index.filter(item => item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query));

    resultsList.innerHTML = filtered.map(item => `
      <li class="cmd-result-item" data-type="${item.type}" data-id="${item.id}">
        <span class="cmd-item-title">${item.title}</span>
        <span class="cmd-item-category">${item.category}</span>
      </li>
    `).join('');

    resultsList.querySelectorAll('.cmd-result-item').forEach(el => {
      el.addEventListener('click', () => {
        const type = el.getAttribute('data-type');
        const id = el.getAttribute('data-id');
        closePalette();

        if (type === 'event' && window.sataModal) {
          window.sataModal.showEventDossier(id);
        } else if (type === 'nav') {
          const target = document.getElementById(id);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  if (searchBtn) searchBtn.addEventListener('click', openPalette);
  if (cmdInput) cmdInput.addEventListener('input', (e) => renderResults(e.target.value));

  if (paletteOverlay) {
    paletteOverlay.addEventListener('click', (e) => {
      if (e.target === paletteOverlay) closePalette();
    });
  }

  // Keyboard shortcut Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (paletteOverlay && paletteOverlay.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    }
  });
}

/* --------------------------------------------------------------------------
   09. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    if (window.sataAudio) window.sataAudio.playClick();
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   10. CUSTOM POINTER GLOW RETICLE
   -------------------------------------------------------------------------- */
function initCustomPointerGlow() {
  const beacon = document.getElementById('pointer-glow-beacon');
  if (!beacon) return;

  window.addEventListener('mousemove', (e) => {
    beacon.style.left = `${e.clientX}px`;
    beacon.style.top = `${e.clientY}px`;
  }, { passive: true });
}
