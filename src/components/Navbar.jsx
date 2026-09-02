import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { ClickPowerupButton } from './ClickPowerupButton';

export function Navbar({ liveClock, audio, onOpenSearch, onOpenJoin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "01 // ABOUT", href: "#what-is-sata" },
    { label: "02 // ARCHIVE", href: "#archive" },
    { label: "03 // WORK", href: "#work" },
    { label: "04 // PEOPLE", href: "#people" },
    { label: "05 // NETWORK", href: "#network" },
    { label: "06 // EXPERIMENT", href: "#experiments" }
  ];

  return (
    <>
      <header className={`sata-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Brand */}
          <a 
            href="#hero" 
            className="nav-brand" 
            onClick={() => audio.playClick()}
          >
            <motion.img 
              src="assets/logo-mark.svg" 
              alt="SATA Official Emblem" 
              className="nav-logo-icon"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="nav-brand-text">
              <span className="nav-brand-title">SATA</span>
              <span className="nav-brand-sub">SCIENCE &amp; TECH // 2026</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Navigation" className="desktop-only">
            <ul className="nav-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="nav-link"
                    onClick={() => audio.playClick()}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Actions & Telemetry */}
          <div className="nav-actions">
            {/* Live Clock HUD */}
            <div className="nav-status">
              <span className="status-dot"></span>
              <span className="mono">{liveClock || "--:--:-- IST"}</span>
            </div>

            {/* Search Command Trigger */}
            <motion.button 
              className="nav-search-btn" 
              onClick={() => { audio.playClick(); onOpenSearch(); }}
              title="Search System (Ctrl+K)"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={14} />
              <span className="kbd-shortcut">⌘K</span>
            </motion.button>

            {/* Audio Feedback Toggle */}
            <motion.button 
              className={`audio-toggle-btn ${audio.enabled ? 'active' : ''}`}
              onClick={audio.toggleAudio}
              aria-label="Toggle Sound Effects"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              {audio.enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </motion.button>

            {/* Click Powerup Join CTA */}
            <ClickPowerupButton
              variant="cyan"
              audio={audio}
              onClick={() => {
                window.location.hash = '#join';
              }}
              style={{ padding: '8px 18px', fontSize: '0.82rem' }}
            >
              JOIN SATA →
            </ClickPowerupButton>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-nav-toggle"
              onClick={() => { audio.playClick(); setMobileOpen(!mobileOpen); }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            className="mobile-drawer open"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="mobile-nav-link"
                onClick={() => { audio.playClick(); setMobileOpen(false); }}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#join" 
              className="mobile-nav-link text-cyan"
              onClick={() => { audio.playClick(); setMobileOpen(false); }}
            >
              08 // JOIN SATA →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
