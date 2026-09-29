import React from 'react';

export const ForgeMachineGrid: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Precision Micro-Grid */}
      <div
        className="w-full h-full opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #00F0FF 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Perimeter Machine Registration Crosshairs */}
      <div className="absolute top-24 left-8 font-mono text-[9px] text-[#00F0FF]/30 tracking-widest hidden sm:block">
        + 00.00 // AXIS_X
      </div>
      <div className="absolute top-24 right-8 font-mono text-[9px] text-[#00F0FF]/30 tracking-widest hidden sm:block text-right">
        + 19.20 // REG_OK
      </div>
      <div className="absolute bottom-16 left-8 font-mono text-[9px] text-[#00F0FF]/30 tracking-widest hidden sm:block">
        [TOLERANCE: 0.001mm]
      </div>
      <div className="absolute bottom-16 right-8 font-mono text-[9px] text-[#00F0FF]/30 tracking-widest hidden sm:block text-right">
        [INVISIBLE MACHINE RUNTIME]
      </div>
    </div>
  );
};

export default ForgeMachineGrid;
