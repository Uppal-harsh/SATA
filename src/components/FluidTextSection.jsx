"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FluidText from './FluidText';
import { Sparkles, MousePointerClick } from 'lucide-react';

export function FluidTextSection({ audio }) {
  const [activePhrase, setActivePhrase] = useState('SATA LABS');

  const phrases = [
    'SATA LABS',
    'IDEAS BECOME SYSTEMS',
    'SCIENCE & TECH',
    'AUTONOMOUS AGENTS',
    'EXPLORATION'
  ];

  return (
    <section className="fluid-text-section" style={{
      position: 'relative',
      padding: '70px 0 50px 0',
      background: 'linear-gradient(180deg, var(--bg-primary) 0%, #0c1012 50%, var(--bg-primary) 100%)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      overflow: 'hidden',
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag cyan" style={{ margin: '0 auto 12px auto' }}>
            INTERACTIVE SIMULATION // WEBGL FLUID DYNAMICS
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Quantum Fluid Typography Lab.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '640px', margin: '8px auto 24px auto' }}>
            Move your cursor across the text to inject hydrodynamic Navier-Stokes splats rendered with SATA amber and cyan spectrum grading.
          </p>

          {/* Interactive Phrase Selector */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {phrases.map((phrase) => (
              <button
                key={phrase}
                onClick={() => {
                  if (audio?.playClick) audio.playClick();
                  setActivePhrase(phrase);
                }}
                className="btn btn-outline"
                style={{
                  padding: '5px 14px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  borderColor: activePhrase === phrase ? 'var(--accent-amber)' : 'var(--border-subtle)',
                  color: activePhrase === phrase ? 'var(--accent-amber)' : 'var(--text-secondary)',
                  background: activePhrase === phrase ? 'rgba(244, 197, 66, 0.1)' : 'transparent',
                }}
              >
                {phrase}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Fluid Canvas Box */}
        <div style={{
          height: '220px',
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
          background: 'radial-gradient(ellipse at center, #13181B 0%, #080B0D 100%)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8), 0 10px 40px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.1em',
            zIndex: 10,
            pointerEvents: 'none',
          }}>
            <MousePointerClick size={12} />
            <span>DRAG &amp; CLICK FOR FLUID SPLATS</span>
          </div>

          <FluidText
            key={activePhrase}
            text={activePhrase}
            color="#F2F0E8"
            paletteColors={["#F4C542", "#58D8D5", "#F7C844", "#72EBE8", "#E88F18"]}
            splatRadius={10}
            splatForce={14}
            curl={45}
            densityDissipation={3.5}
            font={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 900,
              fontSize: "92px",
              lineHeight: "1.1em",
              letterSpacing: "0.02em",
              textAlign: "center",
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </section>
  );
}
