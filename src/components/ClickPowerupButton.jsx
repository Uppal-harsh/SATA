"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';

export function ClickPowerupButton({
  children,
  onClick,
  variant = 'cyan', // 'cyan' | 'amber' | 'outline'
  className = '',
  audio,
  style = {},
  showPowerLevel = true,
  ...props
}) {
  const [power, setPower] = useState(0);
  const [sparks, setSparks] = useState([]);
  const [combo, setCombo] = useState(1);
  const decayTimerRef = useRef(null);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Increment power & combo
    setPower((prev) => Math.min(prev + 12, 100));
    setCombo((prev) => Math.min(prev + 0.2, 5));

    // Spawn 8 directional spark particles
    const newSparks = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + Math.random(),
      x: clickX,
      y: clickY,
      vx: (Math.random() - 0.5) * 80,
      vy: (Math.random() - 0.5) * 80,
      color: variant === 'amber' ? '#F4C542' : '#58D8D5',
      size: Math.random() * 4 + 2,
    }));

    setSparks((prev) => [...prev.slice(-20), ...newSparks]);

    // Play click audio if available
    if (audio?.playClick) {
      audio.playClick();
    }

    // Reset decay timer
    clearTimeout(decayTimerRef.current);
    decayTimerRef.current = setTimeout(() => {
      const decayInterval = setInterval(() => {
        setPower((p) => {
          if (p <= 1) {
            clearInterval(decayInterval);
            setCombo(1);
            return 0;
          }
          return Math.floor(p * 0.85);
        });
      }, 80);
    }, 1200);

    if (onClick) {
      onClick(e);
    }
  };

  useEffect(() => {
    if (sparks.length > 0) {
      const timer = setTimeout(() => {
        setSparks([]);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [sparks]);

  const isOverdrive = power >= 90;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <motion.button
        className={`btn btn-${variant} ${className} ${isOverdrive ? 'powerup-overdrive' : ''}`}
        onClick={handleClick}
        style={{
          position: 'relative',
          overflow: 'hidden',
          ...style,
        }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.94 }}
        {...props}
      >
        {/* Dynamic Energy Fill Bar */}
        {power > 0 && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: variant === 'amber' ? 'var(--accent-amber)' : 'var(--accent-cyan)',
              boxShadow: `0 0 10px ${variant === 'amber' ? 'var(--accent-amber)' : 'var(--accent-cyan)'}`,
              zIndex: 1,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${power}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        )}

        {/* Button Content */}
        <span style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          {children}
          {isOverdrive && (
            <motion.span
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.4 }}
            >
              <Zap size={14} className={variant === 'amber' ? 'text-amber' : 'text-cyan'} />
            </motion.span>
          )}
        </span>

        {/* Explosive Click Spark Particles */}
        <AnimatePresence>
          {sparks.map((spark) => (
            <motion.span
              key={spark.id}
              initial={{ x: spark.x, y: spark.y, opacity: 1, scale: 1 }}
              animate={{
                x: spark.x + spark.vx,
                y: spark.y + spark.vy,
                opacity: 0,
                scale: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${spark.size}px`,
                height: `${spark.size}px`,
                borderRadius: '50%',
                backgroundColor: spark.color,
                boxShadow: `0 0 6px ${spark.color}`,
                pointerEvents: 'none',
                zIndex: 10,
              }}
            />
          ))}
        </AnimatePresence>
      </motion.button>

      {/* Floating Combo Multiplier Badge */}
      <AnimatePresence>
        {combo > 1.2 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -24, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            style={{
              position: 'absolute',
              top: 0,
              right: '-12px',
              background: variant === 'amber' ? '#F4C542' : '#58D8D5',
              color: '#080B0D',
              fontSize: '0.65rem',
              fontWeight: 900,
              fontFamily: 'var(--font-mono)',
              padding: '2px 6px',
              borderRadius: '2px',
              pointerEvents: 'none',
              zIndex: 20,
              boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            {isOverdrive ? '⚡ OVERDRIVE' : `x${combo.toFixed(1)}`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ClickPowerupButton;
