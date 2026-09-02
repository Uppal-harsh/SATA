import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Orbit, ShieldCheck } from 'lucide-react';
import ParticleSaturn from './ParticleSaturn';
import { ClickPowerupButton } from './ClickPowerupButton';

export function Hero({ audio }) {
  const [activeTab, setActiveTab] = useState('emblem'); // 'emblem' | '3d-saturn'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-backdrop-glow" aria-hidden="true" />

      <div className="container-wide">
        <motion.div
          className="hero-grid-layout"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Headlines & Copy */}
          <div className="hero-left-content">
            <motion.div className="hero-system-dossier" variants={itemVariants}>
              <span className="dossier-pill">SATA // SCIENCE &amp; TECHNOLOGY APPRECIATION CLUB</span>
              <span className="dossier-coords">LAT 28.6139° N // NODE-01</span>
            </motion.div>

            <motion.h1 className="hero-headline" variants={itemVariants}>
              <span className="split-amber">IDEAS</span><br />
              BECOME<br />
              <span className="split-cyan">SYSTEMS.</span>
            </motion.h1>

            <motion.p className="hero-description" variants={itemVariants}>
              <strong>Science and Technology Appreciation Club (SATA)</strong> is a student-led technology community turning curiosity, experimentation and ideas into real-world systems, hardware prototypes, and open-source breakthroughs.
            </motion.p>

            <motion.div className="hero-cta-row" variants={itemVariants}>
              <ClickPowerupButton
                variant="amber"
                audio={audio}
                onClick={() => {
                  window.location.hash = '#archive';
                }}
              >
                <span>VIEW EVENT ARCHIVE</span>
                <ArrowRight size={14} />
              </ClickPowerupButton>

              <ClickPowerupButton
                variant="outline"
                audio={audio}
                onClick={() => {
                  window.location.hash = '#what-is-sata';
                }}
              >
                <span>EXPLORE SATA [↓]</span>
              </ClickPowerupButton>
            </motion.div>
          </div>

          {/* Right Column: Central Hero Visual with Dual Mode (Official Emblem / 3D Quantum Saturn) */}
          <motion.div
            className="hero-visual-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {/* Visual Viewport Mode Switcher */}
            <div style={{
              display: 'inline-flex',
              gap: '4px',
              padding: '4px',
              background: 'rgba(16, 20, 22, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '24px',
              marginBottom: '16px',
              backdropFilter: 'blur(10px)',
              zIndex: 10,
              position: 'relative',
            }}>
              <button
                onClick={() => { audio.playClick(); setActiveTab('emblem'); }}
                style={{
                  background: activeTab === 'emblem' ? 'var(--accent-amber)' : 'transparent',
                  color: activeTab === 'emblem' ? '#080B0D' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '5px 14px',
                  borderRadius: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ShieldCheck size={13} />
                OFFICIAL EMBLEM
              </button>

              <button
                onClick={() => { audio.playClick(); setActiveTab('3d-saturn'); }}
                style={{
                  background: activeTab === '3d-saturn' ? 'var(--accent-cyan)' : 'transparent',
                  color: activeTab === '3d-saturn' ? '#080B0D' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '5px 14px',
                  borderRadius: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Orbit size={13} />
                3D QUANTUM ORBIT
              </button>
            </div>

            <div className="hero-emblem-wrapper" style={{ height: '400px', position: 'relative' }}>
              {activeTab === 'emblem' ? (
                <>
                  {/* Orbiting Reticles */}
                  <div className="hero-orbit-ring ring-1" />
                  <div className="hero-orbit-ring ring-2" />

                  {/* Badges */}
                  <div className="emblem-annotation top-left">AMBER // IDEAS &amp; DISCOVERY</div>
                  <div className="emblem-annotation bottom-right">CYAN // SYSTEMS &amp; EXECUTION</div>

                  {/* Official SVG Emblem */}
                  <motion.img
                    src="assets/logo-mark.svg"
                    alt="SATA Official Dual Emblem"
                    className="hero-emblem-svg"
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </>
              ) : (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <div className="emblem-annotation top-left" style={{ color: 'var(--accent-amber)' }}>
                    FIBONACCI SPHERE // AMBER CORE
                  </div>
                  <div className="emblem-annotation bottom-right" style={{ color: 'var(--accent-cyan)' }}>
                    KEPLER ORBIT // CYAN RINGS [DRAGGABLE]
                  </div>
                  <ParticleSaturn
                    coreColor="#F4C542"
                    ringColor="#58D8D5"
                    density={20}
                    particleSize={14}
                    glow={22}
                    tilt={16}
                    roll={14}
                    spinSpeed={8}
                    sizePercent={130}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Real-Time Telemetry Bar at Hero Bottom */}
        <motion.div
          className="hero-telemetry-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="telemetry-item">
            <span className="telemetry-label">ACTIVE PROTOCOL</span>
            <span className="telemetry-value cyan">AUTONOMOUS LAB // V-2.6</span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">SYSTEM UPTIME</span>
            <span className="telemetry-value">99.98% // 24×7 DEPLOY</span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">INCUBATED REPOSITORIES</span>
            <span className="telemetry-value amber">24+ SHIPPED</span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">NEXT EXPERIMENT</span>
            <span className="telemetry-value cyan">18 SEP // AI BUILD NIGHT</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
