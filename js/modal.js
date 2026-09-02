/**
 * SATA MODAL & DOSSIER ENGINE
 * Manages event deep-dives, project case files, member inspectors, and digital pass generation.
 */

class SataModalEngine {
  constructor() {
    this.overlay = document.getElementById('global-modal-overlay');
    this.container = document.getElementById('modal-content-slot');
    this.closeBtn = document.getElementById('global-modal-close');

    if (this.closeBtn && this.overlay) {
      this.closeBtn.addEventListener('click', () => this.close());
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
          this.close();
        }
      });
    }
  }

  open(htmlContent) {
    if (!this.overlay || !this.container) return;
    this.container.innerHTML = htmlContent;
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.sataAudio) window.sataAudio.playClick();
  }

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (window.sataAudio) window.sataAudio.playClick();
  }

  showEventDossier(eventId) {
    const event = SATA_DATA.events.find(e => e.id === eventId);
    if (!event) return;

    const outcomesList = event.outcomes.map(o => `<li style="margin-bottom:8px; display:flex; gap:8px;"><span style="color:var(--accent-amber);">[✓]</span> ${o}</li>`).join('');
    const organizersList = event.organizers.map(org => `<span class="stack-badge">${org}</span>`).join(' ');

    const html = `
      <div style="padding: 36px 32px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <span class="dossier-pill">CASE FILE // ${event.id.toUpperCase()}</span>
          <span class="mono" style="font-size:0.75rem; color:var(--accent-amber);">${event.categoryLabel}</span>
        </div>

        <h2 style="font-size:2.2rem; font-weight:800; margin-bottom:8px;">${event.title}</h2>
        <p class="mono" style="font-size:0.9rem; color:var(--accent-amber); margin-bottom:24px;">${event.subtitle}</p>

        <div style="width:100%; aspect-ratio:16/9; background:#0A0D0F; border:1px solid var(--border-default); border-radius:var(--radius-xs); overflow:hidden; margin-bottom:24px;">
          <img src="${event.image}" alt="${event.title}" style="width:100%; height:100%; object-fit:cover;" />
        </div>

        <p style="color:var(--text-secondary); font-size:1rem; line-height:1.6; margin-bottom:24px;">${event.summary}</p>

        <div class="case-file-meta-grid" style="margin-bottom:24px;">
          <div class="case-meta-item">
            <span class="case-meta-title">DATE &amp; TIME</span>
            <span class="case-meta-value">${event.date}</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-title">VENUE</span>
            <span class="case-meta-value">${event.venue}</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-title">PARTICIPANTS</span>
            <span class="case-meta-value highlight">${event.participants}</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-title">DELIVERABLES</span>
            <span class="case-meta-value">${event.projects}</span>
          </div>
        </div>

        <div style="margin-bottom:24px;">
          <h4 class="mono" style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.12em; margin-bottom:12px;">KEY DELIVERABLES &amp; OUTCOMES</h4>
          <ul style="list-style:none; color:var(--text-main); font-size:0.92rem;">
            ${outcomesList}
          </ul>
        </div>

        <div>
          <h4 class="mono" style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.12em; margin-bottom:12px;">ORGANIZING PANEL</h4>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${organizersList}
          </div>
        </div>
      </div>
    `;

    this.open(html);
  }

  showRSVPPassModal(name, email, role, track) {
    const regId = 'SATA-REG-' + Math.floor(100000 + Math.random() * 900000);
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const html = `
      <div style="padding: 40px 32px; text-align:center;">
        <div style="display:inline-flex; align-items:center; gap:8px; padding:4px 12px; background:rgba(88,216,213,0.1); border:1px solid rgba(88,216,213,0.3); border-radius:var(--radius-xs); margin-bottom:16px;">
          <span class="status-dot" style="background:var(--accent-cyan); box-shadow:0 0 8px var(--accent-cyan);"></span>
          <span class="mono" style="font-size:0.75rem; color:var(--accent-cyan);">REGISTRATION VERIFIED // ADMIT ONE</span>
        </div>

        <h2 style="font-size:2rem; font-weight:800; margin-bottom:6px;">ACCESS PASS ISSUED</h2>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:28px;">Welcome to SATA Experiment Node. Your admission credential has been recorded.</p>

        <!-- Digital Boarding Card -->
        <div style="background:var(--surface-2); border:1px solid var(--border-cyan); border-radius:var(--radius-sm); padding:28px 24px; text-align:left; position:relative; box-shadow:0 0 30px rgba(88,216,213,0.1); margin-bottom:28px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; border-bottom:1px dashed var(--border-strong); padding-bottom:16px;">
            <div>
              <span class="mono" style="font-size:0.7rem; color:var(--accent-cyan); letter-spacing:0.15em;">SATA PASS ID</span>
              <div class="mono" style="font-size:1.3rem; font-weight:800; color:var(--text-main);">${regId}</div>
            </div>
            <div style="text-align:right;">
              <span class="mono" style="font-size:0.7rem; color:var(--text-muted);">EVENT</span>
              <div class="mono" style="font-size:0.85rem; font-weight:700; color:var(--accent-amber);">AI BUILD NIGHT</div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
            <div>
              <span class="mono" style="font-size:0.68rem; color:var(--text-muted);">HACKER / ATTENDEE</span>
              <div style="font-weight:700; color:var(--text-main); font-size:1rem;">${name || 'Student Explorer'}</div>
              <div class="mono" style="font-size:0.75rem; color:var(--text-secondary);">${email || 'explorer@sata.edu'}</div>
            </div>
            <div>
              <span class="mono" style="font-size:0.68rem; color:var(--text-muted);">TRACK / DOMAIN</span>
              <div class="mono" style="font-weight:700; color:var(--accent-cyan); font-size:0.9rem;">${track || 'Core Engineering'}</div>
              <div class="mono" style="font-size:0.75rem; color:var(--text-secondary);">${role || 'Student Member'}</div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--surface-1); padding:12px 16px; border-radius:var(--radius-xs);">
            <div class="mono" style="font-size:0.72rem; color:var(--text-muted);">
              <div>DATE: 18 SEP 2026 // 18:00 IST</div>
              <div>LOC: MAIN AUDITORIUM LAB 402</div>
            </div>
            <div class="mono" style="font-size:0.65rem; color:var(--accent-cyan); border:1px solid var(--border-cyan); padding:4px 8px; border-radius:2px;">
              [ VERIFIED ]
            </div>
          </div>
        </div>

        <button class="btn btn-cyan" onclick="window.print()" style="width:100%;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          PRINT / SAVE DIGITAL PASS
        </button>
      </div>
    `;

    this.open(html);
    if (window.sataAudio) window.sataAudio.playSuccessChime();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.sataModal = new SataModalEngine();
});
