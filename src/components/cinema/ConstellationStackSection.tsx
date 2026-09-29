import React, { useState, useRef } from 'react';
import { technologyNodes } from '../../data/technologies';
import { useCursor } from '../../context/CursorContext';
import { Network, Terminal } from 'lucide-react';

export const ConstellationStackSection: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<string>('ALL');
  const [rotationOffset, setRotationOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { setCursor, resetCursor } = useCursor();

  const clusters = ['ALL', 'FRONTEND', 'BACKEND', 'DATA', 'AI', 'CLOUD', 'WORKFLOW'];

  const activeNode = technologyNodes.find((n) => n.id === activeNodeId);

  // Check if a node is connected to the currently hovered node
  const isConnected = (targetId: string) => {
    if (!activeNodeId) return true;
    if (targetId === activeNodeId) return true;
    const current = technologyNodes.find((n) => n.id === activeNodeId);
    if (!current) return false;
    return current.connectedTo.includes(targetId);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setRotationOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setRotationOffset({ x: 0, y: 0 });
    setActiveNodeId(null);
    resetCursor();
  };

  return (
    <section id="stack" className="relative py-28 md:py-48 bg-[#040a13] border-t border-[#00D4FF]/20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 forge-grid-line opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 md:pb-24 border-b border-[#00D4FF]/20">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-4">
              <Network className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>TECHNOLOGY CONSTELLATION // INTERCONNECTED NODES</span>
            </div>
            <h2 className="section-title-clamp font-display font-black text-white tracking-tighter uppercase leading-[0.94]">
              THE <br />
              <span className="text-gradient-cyan">FORGE STACK.</span>
            </h2>
          </div>

          <div className="font-mono text-xs sm:text-sm text-[#8D96A8] max-w-md leading-relaxed">
            <span className="text-white font-semibold block mb-1">
              &ldquo;Tools change. Craft doesn&rsquo;t.&rdquo;
            </span>
            Technologies exist as interconnected neural nodes. Hover over any node to trace its data contracts, framework dependencies, and production pipelines.
          </div>
        </div>

        {/* Cluster Filter Buttons */}
        <div className="mt-10 flex flex-wrap gap-2 pb-6 border-b border-white/10">
          {clusters.map((cluster) => (
            <button
              key={cluster}
              onClick={() => setSelectedCluster(cluster)}
              onMouseEnter={() => setCursor('default')}
              onMouseLeave={resetCursor}
              className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all cursor-pointer ${
                selectedCluster === cluster
                  ? 'bg-[#00D4FF] text-[#040a13] font-bold shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                  : 'bg-[#0A0E27] text-[#8D96A8] hover:text-white border border-white/10'
              }`}
            >
              {cluster}
            </button>
          ))}
        </div>

        {/* THE HOLOGRAPHIC CONSTELLATION CANVAS CONTAINER */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setCursor('drag')}
          className="mt-12 relative w-full h-[520px] sm:h-[620px] rounded-3xl border-2 border-[#00D4FF]/30 bg-[#070A12]/90 backdrop-blur-xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] select-none"
        >
          {/* Subtle Grid Coordinates */}
          <div className="absolute top-4 left-6 font-mono text-[9px] text-[#00D4FF]">
            NEURAL_CONSTELLATION // DYNAMIC TOPOLOGY
          </div>
          <div className="absolute top-4 right-6 font-mono text-[9px] text-[#8D96A8]">
            NODES: {technologyNodes.length} // ACTIVE CLUSTER: {selectedCluster}
          </div>

          {/* SVG Connection Lines between Technologies */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {technologyNodes.map((node) =>
              node.connectedTo.map((targetId) => {
                const targetNode = technologyNodes.find((n) => n.id === targetId);
                if (!targetNode) return null;

                const isPathActive =
                  activeNodeId === node.id || activeNodeId === targetId;

                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={`${node.xPos}%`}
                    y1={`${node.yPos}%`}
                    x2={`${targetNode.xPos}%`}
                    y2={`${targetNode.yPos}%`}
                    stroke={isPathActive ? '#00D4FF' : 'rgba(0, 212, 255, 0.12)'}
                    strokeWidth={isPathActive ? 2 : 1}
                    strokeDasharray={isPathActive ? 'none' : '3 3'}
                    className="transition-colors duration-300"
                  />
                );
              })
            )}
          </svg>

          {/* Floating Technology Nodes */}
          <div
            className="absolute inset-0 z-10 transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${-rotationOffset.y}deg) rotateY(${rotationOffset.x}deg)`,
            }}
          >
            {technologyNodes.map((node) => {
              const active = activeNodeId === node.id;
              const connected = isConnected(node.id);
              const matchesCluster =
                selectedCluster === 'ALL' || node.cluster === selectedCluster;

              return (
                <div
                  key={node.id}
                  style={{
                    left: `${node.xPos}%`,
                    top: `${node.yPos}%`,
                  }}
                  onMouseEnter={() => {
                    setActiveNodeId(node.id);
                    setCursor('default');
                  }}
                  onMouseLeave={() => setActiveNodeId(null)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                    matchesCluster && connected
                      ? 'opacity-100 scale-100'
                      : 'opacity-25 blur-[0.4px] scale-90'
                  }`}
                >
                  <div
                    className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold tracking-tight whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                      active
                        ? 'bg-[#00D4FF] text-[#040a13] border-[#00D4FF] shadow-[0_0_25px_#00D4FF] scale-110 z-30'
                        : 'bg-[#0A0E27]/90 text-white border-[#00D4FF]/40 hover:border-[#00D4FF]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        active ? 'bg-[#040a13]' : 'bg-[#00D4FF]'
                      }`}
                    />
                    <span>{node.name}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Active Node Telemetry Card */}
          <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-md p-4 rounded-2xl bg-[#040a13]/90 border border-[#00D4FF]/40 backdrop-blur-md z-20">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-mono text-[10px] text-[#00D4FF] uppercase tracking-widest">
                INSPECTED NODE // {activeNode ? activeNode.cluster : 'EXPLORATION'}
              </span>
              <Terminal className="w-3.5 h-3.5 text-[#00D4FF]" />
            </div>

            <div className="pt-2 font-display text-base font-bold text-white">
              {activeNode ? activeNode.name : 'Hover over any technology node above'}
            </div>
            <div className="font-mono text-xs text-[#8D96A8] mt-0.5">
              {activeNode
                ? `Role: ${activeNode.role} • Connected: ${activeNode.connectedTo.join(', ')}`
                : 'Traces architectural pipelines and data dependency graph.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstellationStackSection;
