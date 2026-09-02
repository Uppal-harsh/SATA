import React, { useState } from 'react';
import { useAudio } from './hooks/useAudio';
import { useLiveClock } from './hooks/useClockAndCountdown';

import { AtmosphereCanvas } from './components/AtmosphereCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import SyncScroll from './components/SyncScroll';
import { WhatIsSata } from './components/WhatIsSata';
import { FluidTextSection } from './components/FluidTextSection';
import { Numbers } from './components/Numbers';
import { EventArchive } from './components/EventArchive';
import { FeaturedEvent } from './components/FeaturedEvent';
import { OurWork } from './components/OurWork';
import { ThePeople } from './components/ThePeople';
import { NetworkMatrix } from './components/NetworkMatrix';
import { NextExperiment } from './components/NextExperiment';
import { JoinSata } from './components/JoinSata';
import { Footer } from './components/Footer';

import { EventDossierModal, AdmissionPassModal } from './components/Modals';
import { CommandPalette } from './components/CommandPalette';

export function App() {
  const audio = useAudio();
  const liveClock = useLiveClock();

  // Modals state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [passData, setPassData] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keydown for search palette
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="sata-app-root">
      {/* Dynamic Background Particle Engine */}
      <AtmosphereCanvas />

      {/* Floating HUD Header */}
      <Navbar
        liveClock={liveClock}
        audio={audio}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Section 01: Hero with 3D Quantum Orbit & Click Powerups */}
        <Hero audio={audio} />

        {/* Velocity-Driven Marquee 01 */}
        <SyncScroll
          words={[
            "SCIENCE",
            "TECHNOLOGY",
            "APPRECIATION",
            "INNOVATION",
            "SYSTEMS",
            "RESEARCH",
            "HARDWARE",
            "AUTONOMOUS LABS"
          ]}
          baseVelocity={35}
          direction="left"
        />

        {/* Section 02: What is SATA (Dual Engine) */}
        <WhatIsSata audio={audio} />

        {/* Section 03: Quantum Fluid Typography Lab */}
        <FluidTextSection audio={audio} />

        {/* Section 04: Numbers & Telemetry */}
        <Numbers />

        {/* Section 05: Event Archive */}
        <EventArchive onSelectEvent={setSelectedEvent} audio={audio} />

        {/* Section 06: Featured Event Case File */}
        <FeaturedEvent onSelectEvent={setSelectedEvent} audio={audio} />

        {/* Section 07: Our Work & Repositories */}
        <OurWork audio={audio} />

        {/* Velocity-Driven Marquee 02 */}
        <SyncScroll
          words={[
            "IDEAS BECOME SYSTEMS",
            "STUDENT INNOVATION",
            "PROTOTYPING",
            "OPEN SOURCE",
            "EDGE AI",
            "ROBOTICS"
          ]}
          baseVelocity={40}
          direction="right"
        />

        {/* Section 08: Leadership Panel */}
        <ThePeople audio={audio} />

        {/* Section 09: SATA Network Matrix */}
        <NetworkMatrix audio={audio} />

        {/* Section 10: Next Experiment Protocol */}
        <NextExperiment 
          onOpenRSVP={(exp) => {
            setPassData({
              name: 'Candidate Visitor',
              email: 'visitor@sata-network.org',
              track: exp.title,
              role: 'Lab Access Pass'
            });
          }}
          audio={audio}
        />

        {/* Section 11: Join SATA Initiation Form */}
        <JoinSata onIssuePass={setPassData} audio={audio} />
      </main>

      {/* Footer */}
      <Footer audio={audio} />

      {/* Interactive Modals */}
      <EventDossierModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        audio={audio}
      />

      <AdmissionPassModal
        passData={passData}
        onClose={() => setPassData(null)}
        audio={audio}
      />

      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectEvent={setSelectedEvent}
        audio={audio}
      />
    </div>
  );
}

export default App;
