import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  offset?: [`${number} ${number}` | `${number} start` | `${number} end` | `start ${number}` | `end ${number}` | 'start start' | 'start end' | 'end start' | 'end end' | string, string];
}

interface CharSpanProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const CharSpan: React.FC<CharSpanProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
    </motion.span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  offset = ['start 0.8', 'end 0.2'],
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as any,
  });

  const words = text.split(' ');
  // Count total characters excluding spaces for calculation
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, wIdx) => {
        const wordChars = word.split('');
        return (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
            {wordChars.map((char, cIdx) => {
              const start = charCounter / totalChars;
              const end = (charCounter + 1) / totalChars;
              charCounter += 1;
              return (
                <CharSpan
                  key={cIdx}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
