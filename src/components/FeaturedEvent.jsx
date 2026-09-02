import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SATA_DATA } from '../data/sataData';

export function FeaturedEvent({ onSelectEvent, audio }) {
  const featured = SATA_DATA.events[0]; // Buildathon '26

  return (
    <section className="featured-section" id="featured-event">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag cyan">03 // FLAGSHIP CASE FILE</div>
          <h2 className="section-title">Inside Buildathon '26.</h2>
          <p className="section-description">
            A deep breakdown of SATA's premiere 48-hour student systems &amp; hardware hackathon.
          </p>
        </motion.div>

        <motion.div 
          className="featured-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {/* Blueprint Graphic */}
          <div className="featured-media-col">
            <img 
              src="assets/images/events/buildathon-26.svg" 
              alt="Buildathon '26 Case Blueprint" 
              className="featured-media-img"
            />
          </div>

          {/* Detailed Content */}
          <div className="featured-content-col">
            <div className="featured-tag-row">
              <span className="featured-badge amber">FLAGSHIP RECORD</span>
              <span className="featured-date-code">DOSSIER #EVT-26-07 // FEB 2026</span>
            </div>

            <h3 className="featured-heading">48 Hours of Continuous Systems Architecture</h3>
            <p className="featured-body">
              Buildathon '26 brought together 128 student engineers from across 4 institutions to build bare-metal kernels, autonomous hardware rigs, edge AI inference stacks, and distributed networks.
            </p>

            {/* Impact Metric Chips */}
            <div className="featured-stats-bar">
              <div className="featured-stat-item">
                <span className="fstat-val amber">128</span>
                <span className="fstat-lbl">HACKERS</span>
              </div>
              <div className="featured-stat-item">
                <span className="fstat-val cyan">24</span>
                <span className="fstat-lbl">REPOSITORIES</span>
              </div>
              <div className="featured-stat-item">
                <span className="fstat-val">₹1.0L</span>
                <span className="fstat-lbl">GRANT POOL</span>
              </div>
              <div className="featured-stat-item">
                <span className="fstat-val cyan">48H</span>
                <span className="fstat-lbl">DURATION</span>
              </div>
            </div>

            {/* Key Outcomes */}
            <div className="featured-outcomes-block">
              <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.15em' }}>
                PRIMARY TECHNICAL DELIVERABLES:
              </span>
              <ul className="featured-outcomes-list">
                <li className="featured-outcome-item">
                  <CheckCircle2 size={16} className="text-cyan" />
                  <span>24 production repositories compiled, tested, and demonstrated live to industry judges.</span>
                </li>
                <li className="featured-outcome-item">
                  <CheckCircle2 size={16} className="text-amber" />
                  <span>Seed micro-grants disbursed to incubated student ventures: AeroSense and KryptonOS.</span>
                </li>
                <li className="featured-outcome-item">
                  <CheckCircle2 size={16} className="text-cyan" />
                  <span>Full telemetry and dataset open-sourced to the student engineering community.</span>
                </li>
              </ul>
            </div>

            <div className="featured-action-row">
              <motion.button 
                className="btn btn-cyan"
                onClick={() => {
                  audio.playClick();
                  onSelectEvent(featured);
                }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>INSPECT FULL CASE FILE</span>
                <ArrowRight size={14} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
