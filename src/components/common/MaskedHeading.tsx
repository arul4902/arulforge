import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MaskedHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
  isLightSection?: boolean;
}

export const MaskedHeading: React.FC<MaskedHeadingProps> = ({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  isLightSection = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: shouldReduceMotion ? 0 : '110%',
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.25, 1, 0.5, 1] as const, // cinematic cubic bezier
      },
    },
  };

  const Tag = as as any;

  return (
    <Tag className={`select-none ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em]"
      >
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden py-1">
            <motion.span
              variants={wordVariants}
              className={`inline-block ${
                isLightSection ? 'text-[#0C0C0C]' : 'hero-heading'
              }`}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default MaskedHeading;
