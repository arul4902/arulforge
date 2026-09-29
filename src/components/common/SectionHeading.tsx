import React from 'react';
import FadeIn from './FadeIn';
import MaskedHeading from './MaskedHeading';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  isLightSection?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = 'center',
  className = '',
  isLightSection = false,
}) => {
  const alignmentClass =
    align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';

  return (
    <div className={`mb-12 sm:mb-16 md:mb-20 ${alignmentClass} ${className}`}>
      {subtitle && (
        <FadeIn delay={0} y={15}>
          <span
            className={`inline-block text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-3 ${
              isLightSection ? 'text-[#0C0C0C]/60' : 'text-[#BBCCD7]/70'
            }`}
          >
            {subtitle}
          </span>
        </FadeIn>
      )}
      <MaskedHeading
        text={title}
        as="h2"
        isLightSection={isLightSection}
        className="font-black uppercase tracking-tighter leading-none text-[clamp(2.8rem,9vw,8rem)] sm:text-[clamp(3.5rem,11vw,10rem)]"
      />
    </div>
  );
};

export default SectionHeading;
