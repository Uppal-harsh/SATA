import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Palette, Users, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export function JoinSata({ onIssuePass, audio }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    year: '1st Year Undergraduate',
    track: 'Systems / Backend'
  });

  const tracks = [
    { id: 'Systems / Backend', label: 'Systems / Backend', icon: Terminal },
    { id: 'Hardware / Embedded', label: 'Hardware / Embedded', icon: Cpu },
    { id: 'Design / Experience', label: 'Design / Experience', icon: Palette },
    { id: 'Operations / Outreach', label: 'Operations / Outreach', icon: Users }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    audio.playSuccess();
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#F4C542', '#58D8D5', '#FFFFFF']
      });
    } catch (err) {}

    onIssuePass({
      name: formData.name,
      email: formData.email,
      role: formData.year,
      track: formData.track
    });
  };

  return (
    <section className="join-section" id="join">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag amber">08 // INITIATION PROTOCOL</div>
          <h2 className="section-title">Join The SATA Network.</h2>
          <p className="section-description">
            We are looking for self-directed builders, low-level programmers, hardware tinkerers, UI designers, and technical writers ready to ship real projects.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div 
          className="join-form-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <form className="join-form" onSubmit={handleSubmit}>
            <div className="form-header-bar">
              <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--accent-amber)' }}>
                REGISTRATION PORTAL // PROTOCOL V-2026
              </span>
            </div>

            <div className="form-grid">
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">STUDENT FULL NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Gupta"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">CAMPUS / PERSONAL EMAIL *</label>
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Academic Year */}
              <div className="form-group full-width">
                <label className="form-label">ACADEMIC STAGE *</label>
                <select
                  className="form-select"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                >
                  <option value="1st Year Undergraduate">1st Year Undergraduate</option>
                  <option value="2nd Year Undergraduate">2nd Year Undergraduate</option>
                  <option value="3rd Year Undergraduate">3rd Year Undergraduate</option>
                  <option value="4th Year Undergraduate">4th Year Undergraduate</option>
                  <option value="Postgraduate / Researcher">Postgraduate / Researcher</option>
                </select>
              </div>

              {/* Primary Track Selection */}
              <div className="form-group full-width">
                <label className="form-label">PRIMARY INTEREST TRACK *</label>
                <div className="track-select-grid">
                  {tracks.map((t) => {
                    const Icon = t.icon;
                    const isSelected = formData.track === t.id;
                    return (
                      <div
                        key={t.id}
                        className={`track-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          audio.playClick();
                          setFormData({ ...formData, track: t.id });
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Icon size={16} className={isSelected ? 'text-cyan' : ''} />
                          <span className="track-name">{t.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <motion.button 
              type="submit" 
              className="btn btn-amber btn-full"
              style={{ marginTop: '24px' }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>SUBMIT APPLICATION &amp; GENERATE PASS</span>
              <ArrowRight size={14} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
