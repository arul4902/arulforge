import React from 'react';
import Magnet from './Magnet';
import { ArrowUpRight } from 'lucide-react';

interface ContactButtonProps {
  text?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  showArrow?: boolean;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  text = 'CONTACT ME',
  onClick,
  href = '#contact',
  className = '',
  showArrow = true,
}) => {
  const content = (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-9 sm:py-4 rounded-full font-semibold uppercase tracking-wider text-xs sm:text-sm text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer contact-btn-signature ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
      }}
    >
      <span>{text}</span>
      {showArrow && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </button>
  );

  return (
    <Magnet strength={4} padding={80}>
      {href && !onClick ? (
        <a href={href} className="inline-block" aria-label={text}>
          {content}
        </a>
      ) : (
        content
      )}
    </Magnet>
  );
};

export default ContactButton;
