import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Cpu } from 'lucide-react';

export function WhatIsSata({ audio }) {
  const cardVariants = {
    offscreen: { opacity: 0, y: 30 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="what-is-sata-section" id="what-is-sata">
      <div className="container">
        <motion.div 
          className="section-header"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
        >
          <div className="section-tag amber">01 // IDENTITY &amp; PURPOSE</div>
          <h2 className="section-title">Technology Begins With Curiosity.</h2>
          <p className="section-description">
            SATA operates on a dual-engine philosophy: the spark of intellectual curiosity on one side, and the rigorous engineering discipline required to execute it on the other.
          </p>
        </motion.div>

        {/* Ideas | Execution Split Grid */}
        <div className="split-container">
          {/* Amber Card: Ideas */}
          <motion.div 
            className="split-card amber-side"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onMouseEnter={() => audio.playClick()}
          >
            <div className="split-card-header">
              <span className="split-card-number">01 / DISCOVERY ENGINE</span>
              <Lightbulb className="split-card-icon text-amber" size={28} />
            </div>
            <h3 className="split-card-title">IDEAS</h3>
            <p className="split-card-desc">
              Every breakthrough begins with asking questions that others overlook. We foster an environment where students research, debate, formulate theoretical models, and challenge existing paradigms.
            </p>
            <ul className="split-pillar-list">
              <li className="split-pillar-item">
                <span className="marker">[01]</span>
                <span>Applied Research &amp; Whitepapers</span>
              </li>
              <li className="split-pillar-item">
                <span className="marker">[02]</span>
                <span>Unconstrained Curiosity &amp; Exploration</span>
              </li>
              <li className="split-pillar-item">
                <span className="marker">[03]</span>
                <span>Systems Architecture &amp; Problem Formulation</span>
              </li>
              <li className="split-pillar-item">
                <span className="marker">[04]</span>
                <span>Design Systems &amp; Technical Aesthetics</span>
              </li>
            </ul>
          </motion.div>

          {/* Cyan Card: Execution */}
          <motion.div 
            className="split-card cyan-side"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onMouseEnter={() => audio.playClick()}
          >
            <div className="split-card-header">
              <span className="split-card-number">02 / PRODUCTION ENGINE</span>
              <Cpu className="split-card-icon text-cyan" size={28} />
            </div>
            <h3 className="split-card-title">EXECUTION</h3>
            <p className="split-card-desc">
              Ideas without execution remain abstract. We write production-grade code, flash bare-metal microcontrollers, host intense 48-hour hackathons, and ship open-source tools to global users.
            </p>
            <ul className="split-pillar-list">
              <li className="split-pillar-item">
                <span className="marker">[01]</span>
                <span>48-Hour Flagship Hackathons &amp; Sprints</span>
              </li>
              <li className="split-pillar-item">
                <span className="marker">[02]</span>
                <span>Hardware Prototyping &amp; Embedded Labs</span>
              </li>
              <li className="split-pillar-item">
                <span className="marker">[03]</span>
                <span>Hands-on Model Quantization &amp; Edge AI</span>
              </li>
              <li className="split-pillar-item">
                <span className="marker">[04]</span>
                <span>Production CI/CD &amp; Kernel Deployments</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
