import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { SATA_DATA } from '../data/sataData';
import { useCountdown } from '../hooks/useClockAndCountdown';

export function NextExperiment({ onOpenRSVP, audio }) {
  const exp = SATA_DATA.nextExperiment;
  const timeLeft = useCountdown(exp.targetDateISO);
  const percentBooked = Math.round((exp.seatsBooked / exp.seatsTotal) * 100);

  return (
    <section className="experiments-section" id="experiments">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag cyan">07 // UPCOMING PROTOCOL</div>
          <h2 className="section-title">The Next Experiment.</h2>
          <p className="section-description">
            Upcoming hackathons, workshops, and technical sprints organized by SATA. RSVP to secure on-campus lab access.
          </p>
        </motion.div>

        {/* Experiment Hero Card */}
        <motion.div 
          className="experiment-hero-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="exp-left-col">
            <div className="exp-status-row">
              <span className="exp-live-pulse"></span>
              <span className="exp-code">{exp.code}</span>
            </div>
            <h3 className="exp-title">{exp.title}</h3>
            <p className="exp-summary">{exp.description}</p>
            
            <div className="exp-prereq-box">
              <span className="exp-prereq-label">HARDWARE / PREREQUISITES:</span>
              <p className="exp-prereq-text">{exp.prerequisites}</p>
            </div>
          </div>

          <div className="exp-right-col">
            {/* Live Ticker Clock */}
            <div className="countdown-box">
              <span className="cd-header-label">T-MINUS TO SPRINT COMMENCEMENT</span>
              <div className="cd-grid">
                <div className="cd-unit">
                  <span className="cd-digits cyan">{timeLeft.days}</span>
                  <span className="cd-label">DAYS</span>
                </div>
                <div className="cd-unit">
                  <span className="cd-digits">{timeLeft.hours}</span>
                  <span className="cd-label">HOURS</span>
                </div>
                <div className="cd-unit">
                  <span className="cd-digits">{timeLeft.minutes}</span>
                  <span className="cd-label">MINS</span>
                </div>
                <div className="cd-unit">
                  <span className="cd-digits amber">{timeLeft.seconds}</span>
                  <span className="cd-label">SECS</span>
                </div>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div className="seat-meter-box">
              <div className="seat-meter-header">
                <span className="seat-label">LAB SEAT CAPACITY</span>
                <span className="seat-fraction">{exp.seatsBooked} / {exp.seatsTotal} ALLOCATED ({percentBooked}%)</span>
              </div>
              <div className="seat-meter-track">
                <motion.div 
                  className="seat-meter-fill" 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percentBooked}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </div>

            <motion.button 
              className="btn btn-cyan btn-full"
              onClick={() => {
                audio.playClick();
                onOpenRSVP(exp);
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>RSVP FOR SPRINT ACCESS</span>
              <ArrowRight size={14} />
            </motion.button>
          </div>
        </motion.div>

        {/* Future Schedule Row */}
        <div style={{ marginTop: '48px' }}>
          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.15em' }}>
            LOOKING AHEAD // AUTUMN SPRINT ROADMAP
          </span>
          <div className="upcoming-schedule-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
            {SATA_DATA.upcomingSchedule.map((item, idx) => (
              <motion.div 
                key={item.title} 
                className="pillar-card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="mono text-cyan" style={{ fontSize: '0.8rem', fontWeight: 700 }}>{item.date}</span>
                  <span className="pillar-tag-pill">{item.type}</span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
