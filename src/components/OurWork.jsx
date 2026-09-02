import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal, Cpu, Radio, Network } from 'lucide-react';
import { SATA_DATA } from '../data/sataData';

export function OurWork({ audio }) {
  const pillars = [
    {
      code: "01 // BUILD",
      title: "Engineering",
      desc: "Bare-metal kernels, embedded robotics, edge AI inference, and autonomous drone telemetry stacks.",
      tags: ["Rust / C++", "RISC-V", "ESP32", "Linux"],
      icon: Terminal,
      accent: "amber"
    },
    {
      code: "02 // LEARN",
      title: "Education",
      desc: "Intensive peer-led bootcamps, hands-on paper reading groups, model quantization labs, and code reviews.",
      tags: ["Deep Learning", "Microcontrollers", "DSP"],
      icon: Cpu,
      accent: "cyan"
    },
    {
      code: "03 // CONNECT",
      title: "Community",
      desc: "Flagship 48-hour hackathons, tech keynote talks, university mixers, and collaborative multi-institution summits.",
      tags: ["Buildathons", "Keynotes", "Open Labs"],
      icon: Network,
      accent: "amber"
    },
    {
      code: "04 // CREATE",
      title: "Research",
      desc: "Exploratory whitepapers, industrial design prototypes, technical publications, and developer tooling.",
      tags: ["BCI Signals", "CAD / UI", "Papers"],
      icon: Radio,
      accent: "cyan"
    }
  ];

  return (
    <section className="work-section" id="work">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag amber">04 // WHAT WE DO &amp; SHIP</div>
          <h2 className="section-title">Our Work &amp; Repositories.</h2>
          <p className="section-description">
            SATA is structured into four core pillars. Everything we build is open source, peer-reviewed, and deployed to production.
          </p>
        </motion.div>

        {/* 4 Pillars Grid */}
        <div className="pillars-grid">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div 
                key={p.code} 
                className="pillar-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => audio.playClick()}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="pillar-code">{p.code}</span>
                  <Icon size={18} className={p.accent === 'amber' ? 'text-amber' : 'text-cyan'} />
                </div>
                <h3 className="pillar-name">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
                <div className="pillar-tags">
                  {p.tags.map(t => (
                    <span key={t} className="pillar-tag-pill">{t}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Project Vault */}
        <div className="projects-header-row">
          <div>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', letterSpacing: '0.15em' }}>
              VAULT // OPEN SOURCE SHIPS
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }}>Core Repositories</h3>
          </div>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline-cyan"
            onClick={() => audio.playClick()}
          >
            <span>EXPLORE GITHUB ORG</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {SATA_DATA.projects.map((proj, idx) => (
            <motion.div 
              key={proj.id} 
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => audio.playClick()}
            >
              <div className="project-preview-wrap">
                <img src={proj.image} alt={`${proj.title} Blueprint`} />
              </div>
              <div className="project-info-wrap">
                <div className="project-top-row">
                  <span className={`project-badge ${idx % 2 === 1 ? 'amber' : ''}`}>{proj.badge}</span>
                  <div className="project-links">
                    <a 
                      href={proj.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-ext-link"
                      title="GitHub Source"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
                <h4 className="project-title">{proj.title} — {proj.subtitle}</h4>
                <p className="project-desc">{proj.description}</p>
                <div className="project-tech-stack">
                  {proj.techStack.map(st => (
                    <span key={st} className="stack-badge">{st}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
