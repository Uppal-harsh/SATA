import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SATA_DATA } from '../data/sataData';

export function EventArchive({ onSelectEvent, audio }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredImage, setHoveredImage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const categories = [
    { id: 'all', label: `ALL DOSSIERS (${SATA_DATA.events.length})` },
    { id: 'hackathons', label: 'HACKATHONS' },
    { id: 'workshops', label: 'WORKSHOPS' },
    { id: 'talks', label: 'TECH TALKS' },
    { id: 'hardware', label: 'HARDWARE LABS' }
  ];

  const filteredEvents = selectedCategory === 'all'
    ? SATA_DATA.events
    : SATA_DATA.events.filter(e => e.category === selectedCategory);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX + 24, y: e.clientY - 90 });
  };

  return (
    <section className="archive-section" id="archive">
      {/* Floating Hover Thumbnail */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div 
            className="archive-hover-preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              position: 'fixed',
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              pointerEvents: 'none',
              zIndex: 100
            }}
          >
            <img src={hoveredImage} alt="Event Preview" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag amber">02 // HISTORICAL RECORD</div>
          <h2 className="section-title">Event Archive.</h2>
          <p className="section-description">
            A chronological docket of major hackathons, technical symposia, hardware build sessions, and research talks organized and led by SATA.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="archive-filter-row">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`archive-filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                audio.playClick();
                setSelectedCategory(cat.id);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Editorial Timeline */}
        <div className="archive-timeline">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((e, idx) => (
              <motion.div
                key={e.id}
                layout
                className="archive-row"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                onClick={() => {
                  audio.playClick();
                  onSelectEvent(e);
                }}
                onMouseEnter={() => setHoveredImage(e.image)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <span className="archive-row-num">{e.number}</span>
                <span className="archive-row-category">{e.categoryLabel}</span>
                <div className="archive-row-title-block">
                  <div className="archive-row-title">{e.title}</div>
                  <div className="archive-row-desc">{e.subtitle}</div>
                </div>
                <div className="archive-row-meta">
                  <div>DATE: <span>{e.date}</span></div>
                  <div>IMPACT: <span>{e.participants} • {e.projects}</span></div>
                </div>
                <div className="archive-row-action">
                  <span>CASE FILE</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
