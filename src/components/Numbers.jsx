import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function CounterStat({ target, suffix = "+", duration = 1400 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!inView) return;
    let startTime;
    let frameId;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    }

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Numbers() {
  const stats = [
    {
      code: "METRIC // EVT-01",
      target: 12,
      suffix: "+",
      label: "MAJOR EVENTS",
      sub: "Hackathons, summits, and symposiums deployed",
      accent: "amber"
    },
    {
      code: "METRIC // MBR-02",
      target: 150,
      suffix: "+",
      label: "ACTIVE MEMBERS",
      sub: "Engineers, researchers, designers, and builders",
      accent: "cyan"
    },
    {
      code: "METRIC // PRJ-03",
      target: 8,
      suffix: "+",
      label: "CORE PROJECTS",
      sub: "Open-source microkernels, BCI & drone systems",
      accent: "amber"
    },
    {
      code: "METRIC // WKP-04",
      target: 20,
      suffix: "+",
      label: "INTENSIVE WORKSHOPS",
      sub: "Hands-on skill labs and peer masterclasses",
      accent: "cyan"
    }
  ];

  return (
    <section className="numbers-section" id="numbers">
      <div className="container">
        <div className="numbers-grid">
          {stats.map((s, idx) => (
            <motion.div 
              key={s.code} 
              className={`number-cell ${s.accent}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <span className="number-meta-code">{s.code}</span>
              <div className="number-stat-row">
                <span className="number-stat">
                  <CounterStat target={s.target} suffix={s.suffix} />
                </span>
              </div>
              <span className="number-label">{s.label}</span>
              <span className="number-sub">{s.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
