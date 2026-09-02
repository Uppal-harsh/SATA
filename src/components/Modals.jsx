import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Users, Award, CheckCircle, Printer } from 'lucide-react';

export function EventDossierModal({ event, onClose, audio }) {
  if (!event) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay active"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-sheet dossier-sheet"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="modal-close-btn" 
            onClick={() => { audio?.playClick(); onClose(); }}
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* Dossier Header */}
          <div className="dossier-modal-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="featured-badge amber">{event.categoryLabel}</span>
              <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                EVT-{event.number} // ARCHIVE FILE
              </span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25 }}>
              {event.title}
            </h3>
            <p style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', marginTop: '4px', fontWeight: 500 }}>
              {event.subtitle}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="dossier-meta-grid">
            <div className="dossier-meta-card">
              <span className="dossier-meta-label">TIMELINE</span>
              <span className="dossier-meta-value amber">{event.date}</span>
            </div>
            <div className="dossier-meta-card">
              <span className="dossier-meta-label">VENUE</span>
              <span className="dossier-meta-value">{event.venue}</span>
            </div>
            <div className="dossier-meta-card">
              <span className="dossier-meta-label">IMPACT</span>
              <span className="dossier-meta-value cyan">{event.participants}</span>
            </div>
          </div>

          {/* Technical Overview */}
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', letterSpacing: '0.08em', marginBottom: '6px' }}>
              TECHNICAL OVERVIEW
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.9rem' }}>
              {event.summary}
            </p>
          </div>

          {/* Key Outcomes */}
          {event.outcomes && (
            <div style={{ marginTop: '18px' }}>
              <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', letterSpacing: '0.08em', marginBottom: '8px' }}>
                KEY DELIVERABLES &amp; OUTCOMES
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
                {event.outcomes.map((o, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.45 }}>
                    <CheckCircle size={15} className="text-cyan" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Organizing Squad */}
          {event.organizers && (
            <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                ORGANIZING SQUAD
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                {event.organizers.map(org => (
                  <span key={org} className="pillar-tag-pill" style={{ fontSize: '0.72rem' }}>{org}</span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function AdmissionPassModal({ passData, onClose, audio }) {
  if (!passData) return null;

  const handlePrint = () => {
    audio.playClick();
    window.print();
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay active"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-sheet"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="modal-close-btn" 
            onClick={() => { audio.playClick(); onClose(); }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span className="mono text-cyan" style={{ fontSize: '0.8rem', letterSpacing: '0.15em' }}>
              ACCESS GRANTED // NODE ADMISSION CERTIFICATE
            </span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '4px' }}>SATA DIGITAL PASS</h3>
          </div>

          <div className="pass-card" style={{
            background: 'var(--bg-surface-2)',
            border: '1px dashed var(--accent-cyan)',
            padding: '24px',
            borderRadius: '4px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <div>
                <span className="mono text-muted" style={{ fontSize: '0.7rem' }}>PASS IDENTIFIER</span>
                <div className="mono text-cyan" style={{ fontWeight: 800 }}>SATA-PASS-{(Math.random()*900000+100000).toFixed(0)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="mono text-muted" style={{ fontSize: '0.7rem' }}>SECURITY LEVEL</span>
                <div className="mono text-amber" style={{ fontWeight: 800 }}>TIER-01 AUTHORIZED</div>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <span className="mono text-muted" style={{ fontSize: '0.7rem' }}>HACKER / CANDIDATE</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{passData.name}</div>
                <div className="mono text-secondary" style={{ fontSize: '0.8rem' }}>{passData.email}</div>
              </div>
              <div>
                <span className="mono text-muted" style={{ fontSize: '0.7rem' }}>SELECTED TRACK</span>
                <div className="mono text-cyan" style={{ fontSize: '0.95rem', fontWeight: 700 }}>{passData.track || 'AI Build Night Sprint'}</div>
                <div className="mono text-secondary" style={{ fontSize: '0.8rem' }}>{passData.role || '2026 Batch'}</div>
              </div>
            </div>

            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CAMPUS LAB 402 • DELHI NCR</span>
              <span className="mono text-amber" style={{ fontSize: '0.75rem', fontWeight: 700 }}>STATUS: ACTIVE VERIFIED</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button className="btn btn-outline btn-full" onClick={handlePrint}>
              <Printer size={14} />
              <span>SAVE / PRINT PASS</span>
            </button>
            <button className="btn btn-cyan btn-full" onClick={() => { audio.playClick(); onClose(); }}>
              <span>PROCEED TO HUB</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
