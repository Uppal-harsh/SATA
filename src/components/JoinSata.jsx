import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal, Cpu, Palette, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ClickPowerupButton } from './ClickPowerupButton';

export function JoinSata({ audio }) {
  const nexusUrl = "https://nexus.bmu.edu.in";

  const tracks = [
    {
      code: "TRACK // 01",
      title: "Systems & Architecture",
      desc: "Low-level microkernels, distributed networks, Rust/C++ pipelines, and cloud systems.",
      icon: Terminal,
      color: "var(--accent-amber)"
    },
    {
      code: "TRACK // 02",
      title: "Hardware & Robotics",
      desc: "Custom PCB design, ESP32/RISC-V firmware, sensor fusion, and autonomous drones.",
      icon: Cpu,
      color: "var(--accent-cyan)"
    },
    {
      code: "TRACK // 03",
      title: "Content & Visual Design",
      desc: "UI/UX interaction design, 3D graphics, technical brand media, and editorial writing.",
      icon: Palette,
      color: "var(--accent-amber)"
    },
    {
      code: "TRACK // 04",
      title: "Operations & Management",
      desc: "Flagship hackathon production, event orchestration, community growth, and PR.",
      icon: Users,
      color: "var(--accent-cyan)"
    }
  ];

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
          <div className="section-tag amber">07 // REGISTRATION GATEWAY</div>
          <h2 className="section-title">Join The SATA Network.</h2>
          <p className="section-description">
            Official recruitment, project team intake, and active memberships for SATA are processed directly through BML Munjal University's Nexus portal.
          </p>
        </motion.div>

        {/* BMU Nexus Gateway Card */}
        <motion.div 
          className="nexus-gateway-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="nexus-header-row">
            <div className="nexus-badge-group">
              <span className="nexus-portal-badge">OFFICIAL UNIVERSITY PORTAL</span>
              <span className="mono text-cyan" style={{ fontSize: '0.8rem' }}>NEXUS.BMU.EDU.IN</span>
            </div>
            <span className="nexus-status-pill">
              <span className="status-dot"></span> RECRUITMENT OPEN // 2026 SPRINT
            </span>
          </div>

          <div className="nexus-main-content">
            <h3 className="nexus-heading">
              Ready to build systems, hack hardware, and ship real projects?
            </h3>
            <p className="nexus-subtext">
              Log in to the BMU Nexus portal with your university credentials, navigate to <strong>Student Clubs → SATA</strong>, and submit your preference for our active working tracks.
            </p>

            {/* Track Highlights Grid */}
            <div className="nexus-tracks-grid">
              {tracks.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.code} className="nexus-track-item">
                    <div className="nexus-track-top">
                      <span className="mono" style={{ fontSize: '0.72rem', color: t.color }}>{t.code}</span>
                      <Icon size={16} style={{ color: t.color }} />
                    </div>
                    <h4 className="nexus-track-title">{t.title}</h4>
                    <p className="nexus-track-desc">{t.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Instructions list */}
            <div className="nexus-steps-box">
              <div className="nexus-step">
                <CheckCircle2 size={16} className="text-cyan" />
                <span><strong>Step 1:</strong> Authenticate with your <code>@bmu.edu.in</code> student account.</span>
              </div>
              <div className="nexus-step">
                <CheckCircle2 size={16} className="text-cyan" />
                <span><strong>Step 2:</strong> Select <em>Science and Technology Appreciation Club (SATA)</em>.</span>
              </div>
              <div className="nexus-step">
                <CheckCircle2 size={16} className="text-cyan" />
                <span><strong>Step 3:</strong> Choose your primary track and attach your project repository or portfolio.</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="nexus-actions-row">
              <a
                href={nexusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-amber btn-large"
                onClick={() => audio?.playSuccess()}
                style={{ textDecoration: 'none' }}
              >
                <span>APPLY VIA BMU NEXUS PORTAL</span>
                <ArrowUpRight size={18} />
              </a>

              <a
                href="#network"
                className="btn btn-outline"
                onClick={() => audio?.playClick()}
                style={{ textDecoration: 'none' }}
              >
                <span>EXPLORE MEMBER NETWORK [↓]</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

