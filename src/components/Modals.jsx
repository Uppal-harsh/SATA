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

          <div className="dossier-modal-header">
            <div className="dossier-tag-row">
              <span className="featured-badge amber">{event.categoryLabel.toUpperCase()}</span>
              <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                DOSSIER // EVT-{event.number}
              </span>
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
              {event.title}
            </h3>
            <div style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginTop: '4px' }}>
              {event.subtitle}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginTop: '20px' }}>
            <div className="telemetry-item">
              <span className="telemetry-label">TIMELINE</span>
              <span className="telemetry-value amber">{event.date}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">VENUE</span>
              <span className="telemetry-value">{event.venue}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">IMPACT</span>
              <span className="telemetry-value cyan">{event.participants}</span>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h4 className="mono text-cyan" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>TECHNICAL OVERVIEW</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              {event.summary}
            </p>
          </div>

          {event.outcomes && (
            <div style={{ marginTop: '20px' }}>
              <h4 className="mono text-amber" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>KEY DELIVERABLES &amp; OUTCOMES</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {event.outcomes.map((o, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <CheckCircle size={15} className="text-cyan" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {event.organizers && (
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
              <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ORGANIZING SQUAD:</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                {event.organizers.map(org => (
                  <span key={org} className="pillar-tag-pill">{org}</span>
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
