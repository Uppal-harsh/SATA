import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users } from 'lucide-react';
import { SATA_DATA } from '../data/sataData';

export function NetworkMatrix({ audio }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('ALL');

  const domains = ['ALL', 'Leadership', 'Technical', 'Operations', 'Content & Design', 'Marketing', 'Coverage'];

  const filteredMembers = SATA_DATA.members.filter(m => {
    const matchesDomain = selectedDomain === 'ALL' || m.domain === selectedDomain;
    const query = searchQuery.toLowerCase();
    const matchesQuery = 
      m.name.toLowerCase().includes(query) ||
      m.focus.toLowerCase().includes(query) ||
      m.domain.toLowerCase().includes(query) ||
      m.year.toLowerCase().includes(query) ||
      (m.email && m.email.toLowerCase().includes(query)) ||
      (m.enrollment && m.enrollment.toLowerCase().includes(query));
    return matchesDomain && matchesQuery;
  });

  return (
    <section className="network-section" id="network">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag cyan">06 // COMMUNITY ROSTER</div>
          <h2 className="section-title">SATA Member Network.</h2>
          <p className="section-description">
            Active student contributors, working group leads, researchers, and engineers spanning multiple disciplines and batches.
          </p>
        </motion.div>

        {/* Matrix Terminal Container */}
        <div className="network-matrix-container">
          <div className="network-search-row">
            <div className="network-search-box">
              <Search size={16} className="text-cyan" />
              <input
                type="text"
                className="network-search-input"
                placeholder="Search active nodes by name, domain, email, roll no..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="network-count-pill">
              {filteredMembers.length} ACTIVE NODES
            </div>
          </div>

          {/* Domain Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '12px 18px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
            {domains.map(d => (
              <button
                key={d}
                onClick={() => { audio.playClick(); setSelectedDomain(d); }}
                className="btn btn-outline"
                style={{
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  borderColor: selectedDomain === d ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                  color: selectedDomain === d ? 'var(--accent-cyan)' : 'var(--text-secondary)'
                }}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Matrix Header Row */}
          <div className="network-table-header">
            <span>#</span>
            <span>NAME / HANDLE</span>
            <span>DOMAIN</span>
            <span>CORE FOCUS</span>
            <span>ACADEMIC STAGE</span>
          </div>

          {/* Dynamic Members Body */}
          <div className="network-table-body">
            <AnimatePresence mode="popLayout">
              {filteredMembers.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  NO MATCHING NODES LOCATED FOR QUERY "{searchQuery.toUpperCase()}"
                </div>
              ) : (
                filteredMembers.map((m, idx) => (
                  <motion.div
                    key={m.num}
                    layout
                    className="network-row"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, delay: idx * 0.02 }}
                  >
                    <span className="net-num">{m.num}</span>
                    <span className="net-name">
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</span>
                      {m.email && <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>{m.email}</span>}
                    </span>
                    <span className="net-domain">{m.domain}</span>
                    <span className="net-focus">{m.focus}</span>
                    <span className="net-year">{m.year}</span>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
