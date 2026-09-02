/**
 * SATA ATMOSPHERIC PARTICLE & SCHEMATIC ENGINE
 * Lightweight, high-performance HTML5 Canvas simulation.
 * Recreates an advanced technology laboratory at night:
 * - Subtle drifting micro-particles
 * - Dual amber (#F4C542) & cyan (#58D8D5) illumination points
 * - Faint geometric telemetry nodes & lines
 */

class SataAtmosphereEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 55;
    this.mouse = { x: -1000, y: -1000, active: false };
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    }, { passive: true });

    this.createParticles();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  createParticles() {
    this.particles = [];
    // Adjust particle count for mobile vs desktop
    const count = this.width < 768 ? 25 : this.particleCount;

    for (let i = 0; i < count; i++) {
      // 50% amber (ideas/bulb), 50% cyan (tech/brain)
      const isAmber = Math.random() > 0.5;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.5 + 0.5,
        color: isAmber ? '244, 197, 66' : '88, 216, 213',
        alpha: Math.random() * 0.4 + 0.15,
        baseAlpha: Math.random() * 0.4 + 0.15,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render faint technical coordinate lines in corners
    this.renderTechnicalReticles();

    // Update & draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Movement
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around bounds
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Subtle pulse
      p.pulseAngle += p.pulseSpeed;
      p.alpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.15;

      // Draw particle glow
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.05, p.alpha)})`;
      this.ctx.fill();

      // Connect nearby particles with subtle schematic lines
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const lineAlpha = (1 - dist / 110) * 0.12;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          // Blended line color
          this.ctx.strokeStyle = `rgba(${p.color}, ${lineAlpha})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }

      // Mouse proximity interaction (subtle glow pull)
      if (this.mouse.active) {
        const mdx = p.x - this.mouse.x;
        const mdy = p.y - this.mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 140) {
          const force = (1 - mDist / 140) * 0.4;
          p.x += (this.mouse.x - p.x) * force * 0.02;
          p.y += (this.mouse.y - p.y) * force * 0.02;

          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(${p.color}, ${force * 0.15})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }

  renderTechnicalReticles() {
    this.ctx.strokeStyle = 'rgba(37, 45, 48, 0.4)';
    this.ctx.lineWidth = 1;

    // Corner crosshairs
    const corners = [
      { x: 30, y: 30 },
      { x: this.width - 30, y: 30 },
      { x: 30, y: this.height - 30 },
      { x: this.width - 30, y: this.height - 30 }
    ];

    corners.forEach(c => {
      this.ctx.beginPath();
      this.ctx.moveTo(c.x - 8, c.y);
      this.ctx.lineTo(c.x + 8, c.y);
      this.ctx.moveTo(c.x, c.y - 8);
      this.ctx.lineTo(c.x, c.y + 8);
      this.ctx.stroke();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.sataAtmosphere = new SataAtmosphereEngine('atmosphere-canvas');
});
