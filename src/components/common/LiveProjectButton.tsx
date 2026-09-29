import React from 'react';
import Magnet from './Magnet';
import { ArrowUpRight } from 'lucide-react';

interface LiveProjectButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  href,
  label = 'LIVE PROJECT',
  className = '',
}) => {
  return (
    <Magnet strength={5} padding={60}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-[#D7E2EA]/30 bg-[#161616]/80 text-[#D7E2EA] font-medium text-xs sm:text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0C0C0C] ${className}`}
        aria-label={`Open ${label}`}
      >
        <span>{label}</span>
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </Magnet>
  );
};

export default LiveProjectButton;
