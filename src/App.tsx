import React, { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Data & Context
import { CursorProvider } from './context/CursorContext';
import ForgeCursor from './components/forge/ForgeCursor';

// The Master 3D Architectural Blueprint Hero (Three.js + GSAP ScrollTrigger)
import ArchitecturalHero from './components/architectural-hero/ArchitecturalHero';
import ProjectEnquiryModal from './components/enquiry/ProjectEnquiryModal';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState<boolean>(false);

  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-[#05070a] text-[#F7FAFC] font-sans selection:bg-[#00D4FF] selection:text-[#05070a]">
        {/* Subtle Custom Forge Cursor (Desktop only) */}
        <ForgeCursor />

        {/* 
          ============================================================
          CONTINUOUS 3D CINEMATIC WORLD (800vh SCROLL JOURNEY)
          Native scrolling + GSAP ScrollTrigger scrub
          ============================================================
        */}
        <main className="relative w-full">
          <ArchitecturalHero onOpenEnquiry={() => setEnquiryModalOpen(true)} />
        </main>

        {/* Project Enquiry Modal Triggered by CTA */}
        <ProjectEnquiryModal
          isOpen={enquiryModalOpen}
          onClose={() => setEnquiryModalOpen(false)}
        />
      </div>
    </CursorProvider>
  );
};

export default App;
