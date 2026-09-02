import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { SATA_DATA } from '../data/sataData';

export function Footer({ audio }) {
  const scrollToTop = () => {
    audio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="sata-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand / Identity Column */}
          <div className="footer-brand-block">
            <img src="assets/logo.svg" alt="SATA Official Logo" className="footer-logo" />
            <p className="footer-tagline">
              <strong>SATA ({SATA_DATA.fullName})</strong> is a student-led technology and innovation community turning curiosity, experimentation and ideas into real-world systems.
            </p>
          </div>

          {/* Navigation Index */}
          <div>
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-link-list">
              <li><a href="#what-is-sata" className="footer-link" onClick={() => audio.playClick()}>About SATA</a></li>
              <li><a href="#archive" className="footer-link" onClick={() => audio.playClick()}>Event Archive</a></li>
              <li><a href="#featured-event" className="footer-link" onClick={() => audio.playClick()}>Buildathon '26</a></li>
              <li><a href="#work" className="footer-link" onClick={() => audio.playClick()}>Our Work &amp; Vault</a></li>
              <li><a href="#people" className="footer-link" onClick={() => audio.playClick()}>Leadership Panel</a></li>
            </ul>
          </div>

          {/* Community Index */}
          <div>
            <h4 className="footer-col-title">COMMUNITY</h4>
            <ul className="footer-link-list">
              <li><a href="#network" className="footer-link" onClick={() => audio.playClick()}>Member Matrix</a></li>
              <li><a href="#experiments" className="footer-link" onClick={() => audio.playClick()}>Next Experiment</a></li>
              <li><a href="#join" className="footer-link" onClick={() => audio.playClick()}>Join SATA</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub Organization</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="footer-link">Discord Server</a></li>
            </ul>
          </div>

          {/* Telemetry & Legal */}
          <div>
            <h4 className="footer-col-title">TELEMETRY</h4>
            <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>NODE: DELHI-CAMPUS-01</div>
              <div>STATUS: <span style={{ color: 'var(--accent-cyan)' }}>ALL SYSTEMS OPERATIONAL</span></div>
              <div>ENCRYPTION: AES-256 GCM</div>
              <div>LICENSE: MIT OPEN SOURCE</div>
            </div>
            <motion.button 
              className="btn btn-outline"
              style={{ marginTop: '16px', padding: '6px 12px', fontSize: '0.75rem' }}
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>RETURN TO TOP [↑]</span>
              <ArrowUp size={12} />
            </motion.button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            SATA // {SATA_DATA.fullName.toUpperCase()} • EST. 2023 • ALL RIGHTS RESERVED
          </div>
          <div>
            DESIGNED AROUND THE <span className="cyan">SATA DUAL EMBLEM</span> VISUAL IDENTITY
          </div>
        </div>
      </div>
    </footer>
  );
}
