import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, BookOpen, User, Calendar, Cpu } from 'lucide-react';
import { SATA_DATA } from '../data/sataData';

export function CommandPalette({ isOpen, onClose, onSelectEvent, audio }) {
  const [query, setQuery] = useState('');

  const searchItems = [
    { title: "BUILDATHON '26 Flagship Hackathon", category: "Archive Event", type: "event", data: SATA_DATA.events[0], icon: Calendar },
    { title: "Neural Systems & Edge AI Workshop", category: "Archive Event", type: "event", data: SATA_DATA.events[1], icon: Calendar },
    { title: "Decentralized Protocols Keynote", category: "Archive Event", type: "event", data: SATA_DATA.events[2], icon: Calendar },
    { title: "Embedded IoT & Robotics Lab", category: "Archive Event", type: "event", data: SATA_DATA.events[3], icon: Calendar },
    { title: "AeroSense Drone Telemetry", category: "Project Vault", type: "nav", href: "#work", icon: Cpu },
    { title: "KryptonOS Real-Time Microkernel", category: "Project Vault", type: "nav", href: "#work", icon: Cpu },
    { title: "NeuroSync BCI Interface", category: "Project Vault", type: "nav", href: "#work", icon: Cpu },
    { title: "SATAMesh Campus Radio", category: "Project Vault", type: "nav", href: "#work", icon: Cpu },
    { title: "Devansh — SATA President", category: "Leadership", type: "nav", href: "#people", icon: User },
    { title: "Janya Sharma — Vice President", category: "Leadership", type: "nav", href: "#people", icon: User },
    { title: "Harsh Uppal — Technical Lead", category: "Leadership", type: "nav", href: "#people", icon: User },
    { title: "Ashwika Sharma — General Secretary", category: "Leadership", type: "nav", href: "#people", icon: User },
    { title: "Hardik — Treasurer", category: "Leadership", type: "nav", href: "#people", icon: User },
    { title: "Gyanesh Kumar Nayak — Technical Team", category: "Leadership", type: "nav", href: "#people", icon: User },
    { title: "Harsh Chahal — Content & Design", category: "Leadership", type: "nav", href: "#people", icon: User },
    { title: "Bhavika Bansal — Operations & Event Management", category: "Leadership", type: "nav", href: "#people", icon: User },
    { title: "Tapesh Jaat — Operations & Event Management", category: "Roster", type: "nav", href: "#network", icon: User },
    { title: "Vaibhav Jangra — Operations & Event Management", category: "Roster", type: "nav", href: "#network", icon: User },
    { title: "Akshita Setia — Content & Design", category: "Roster", type: "nav", href: "#network", icon: User },
    { title: "Anushka — Content & Design", category: "Roster", type: "nav", href: "#network", icon: User },
    { title: "Taksh Yadav — Marketing and Communications", category: "Roster", type: "nav", href: "#network", icon: User },
    { title: "Rishita Roy — Marketing and Communications", category: "Roster", type: "nav", href: "#network", icon: User },
    { title: "Shubhi Vajpayee — Coverage & Social Media", category: "Roster", type: "nav", href: "#network", icon: User },
    { title: "Sneha Jangra — Coverage & Social Media", category: "Roster", type: "nav", href: "#network", icon: User },
    { title: "Next Experiment: AI Build Night", category: "Upcoming", type: "nav", href: "#experiments", icon: Calendar },
    { title: "Join SATA Application Form", category: "Membership", type: "nav", href: "#join", icon: BookOpen }
  ];

  const filteredItems = searchItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          audio.playClick();
          // trigger open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, audio]);

  if (!isOpen) return null;

  const handleSelect = (item) => {
    audio.playClick();
    onClose();
    if (item.type === 'event') {
      onSelectEvent(item.data);
    } else if (item.href) {
      window.location.hash = item.href;
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="cmd-palette-overlay active"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="cmd-palette-box"
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cmd-input-wrap">
            <Search size={18} className="text-cyan" />
            <input
              type="text"
              autoFocus
              className="cmd-input"
              placeholder="Search dossiers, repositories, leaders, or jump to section..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="cmd-close" onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          <div className="cmd-results-list">
            {filteredItems.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                NO DIRECT COMMANDS LOCATED
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="cmd-item"
                    onClick={() => handleSelect(item)}
                  >
                    <Icon size={16} className="text-cyan" style={{ flexShrink: 0 }} />
                    <span className="cmd-item-title">{item.title}</span>
                    <span className="cmd-item-cat">{item.category}</span>
                    <ArrowRight size={12} className="text-muted" />
                  </div>
                );
              })
            )}
          </div>

          <div className="cmd-footer-bar">
            <span>[ESC] TO CLOSE</span>
            <span>[ENTER] TO SELECT</span>
            <span>[↑↓] TO NAVIGATE</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
