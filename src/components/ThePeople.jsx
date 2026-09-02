import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SATA_DATA } from '../data/sataData';

export function ThePeople({ audio }) {
  return (
    <section className="people-section" id="people">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag amber">04 // LEADERSHIP PANEL</div>
          <h2 className="section-title">The People Behind SATA.</h2>
          <p className="section-description">
            The student architects, system leads, designers, and organizers responsible for steering SATA's technical roadmap and initiatives.
          </p>
        </motion.div>

        {/* Leadership Grid */}
        <div className="people-grid">
          {SATA_DATA.leadership.map((person, idx) => (
            <motion.div 
              key={person.id} 
              className={`person-card ${person.accent}-glow`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => audio.playClick()}
            >
              <div className="person-portrait-box">
                <img src={person.image} alt={`${person.name} - ${person.role}`} />
              </div>
              <div className="person-info">
                <div className="person-index-row">
                  <span className="person-index">{person.number} // PANEL</span>
                  <span className="person-role-tag">{person.role}</span>
                </div>
                <h3 className="person-name">{person.name}</h3>
                <div className="person-resp">{person.role} // {person.responsibility}</div>
                <p className="person-bio">{person.bio}</p>
                <div className="person-social-links">
                  {person.github && (
                    <a 
                      href={person.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="person-social-link"
                    >
                      GITHUB ↗
                    </a>
                  )}
                  {person.linkedin && (
                    <a 
                      href={person.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="person-social-link"
                    >
                      LINKEDIN ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
