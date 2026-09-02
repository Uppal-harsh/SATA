import React, { useEffect, useRef } from 'react';

export function AtmosphereCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: -1000, y: -1000, active: false };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Initialize particles: 50% Amber (#F4C542), 50% Cyan (#58D8D5)
    const count = width < 768 ? 25 : 50;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const isAmber = Math.random() > 0.5;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.6,
        color: isAmber ? '244, 197, 66' : '88, 216, 213',
        alpha: Math.random() * 0.4 + 0.15,
        baseAlpha: Math.random() * 0.4 + 0.15,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Render technical reticles in corners
      ctx.strokeStyle = 'rgba(37, 45, 48, 0.4)';
      ctx.lineWidth = 1;
      const corners = [
        { x: 30, y: 30 },
        { x: width - 30, y: 30 },
        { x: 30, y: height - 30 },
        { x: width - 30, y: height - 30 }
      ];
      corners.forEach(c => {
        ctx.beginPath();
        ctx.moveTo(c.x - 8, c.y);
        ctx.lineTo(c.x + 8, c.y);
        ctx.moveTo(c.x, c.y - 8);
        ctx.lineTo(c.x, c.y + 8);
        ctx.stroke();
      });

      // Render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.pulseAngle += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.15;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.05, p.alpha)})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.color}, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Proximity pull
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 140) {
            const force = (1 - mDist / 140) * 0.4;
            p.x += (mouse.x - p.x) * force * 0.02;
            p.y += (mouse.y - p.y) * force * 0.02;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${p.color}, ${force * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <canvas id="atmosphere-canvas" ref={canvasRef} />
      <div className="schematic-grid" aria-hidden="true" />
    </>
  );
}
