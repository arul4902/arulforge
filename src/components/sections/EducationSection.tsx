import React from 'react';
import FadeIn from '../common/FadeIn';
import SectionHeading from '../common/SectionHeading';
import { GraduationCap, Award } from 'lucide-react';

interface EducationItem {
  number: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
  scoreLabel: string;
}

const educationList: EducationItem[] = [
  {
    number: '01',
    degree: 'B.TECH INFORMATION TECHNOLOGY',
    institution: 'Sri Krishna College of Technology',
    period: '2022 – 2026',
    score: '7.8 / 10',
    scoreLabel: 'CGPA',
  },
  {
    number: '02',
    degree: 'HIGHER SECONDARY (HSC)',
    institution: 'Kamarajar Matric Hr Sec School',
    period: '2020 – 2022',
    score: '90.8%',
    scoreLabel: 'Percentage',
  },
  {
    number: '03',
    degree: 'SECONDARY SCHOOL (SSLC)',
    institution: 'Kamarajar Matric Hr Sec School',
    period: '2019 – 2020',
    score: '99.2%',
    scoreLabel: 'Percentage',
  },
];

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      className="py-24 sm:py-32 px-5 sm:px-8 md:px-16 relative bg-[#0C0C0C]"
      aria-label="Academic Education"
    >
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          title="EDUCATION"
          subtitle="ACADEMIC BACKGROUND"
          align="center"
        />

        <div className="border-t border-[#D7E2EA]/15 mt-16 sm:mt-20">
          {educationList.map((item, index) => (
            <FadeIn key={item.number} delay={index * 0.12} y={30}>
              <div className="flex flex-col md:flex-row md:items-center justify-between py-10 sm:py-14 md:py-16 border-b border-[#D7E2EA]/15 gap-6 md:gap-12 group hover:bg-[#141414]/50 transition-colors duration-300 px-2 sm:px-4 rounded-3xl">
                {/* Left Oversized Number */}
                <div className="shrink-0 w-32 sm:w-44 md:w-56">
                  <span
                    style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                    className="font-black leading-none text-[#D7E2EA]/20 group-hover:text-[#D7E2EA]/50 transition-colors font-kanit select-none"
                  >
                    {item.number}
                  </span>
                </div>

                {/* Center Degree & Institution */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#B600A8] uppercase mb-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{item.period}</span>
                  </div>
                  <h3
                    style={{ fontSize: 'clamp(1.2rem, 2.4vw, 2.2rem)' }}
                    className="font-bold uppercase tracking-tight text-[#D7E2EA] mb-2 font-kanit"
                  >
                    {item.degree}
                  </h3>
                  <p className="text-sm sm:text-base font-light text-[#BBCCD7]/70 font-kanit">
                    {item.institution}
                  </p>
                </div>

                {/* Right Academic Score Badge */}
                <div className="shrink-0 flex items-center md:flex-col md:items-end justify-between md:justify-center">
                  <span className="text-xs uppercase tracking-widest text-[#646973] block mb-1">
                    {item.scoreLabel}
                  </span>
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D7E2EA]/20 bg-[#161616] text-[#D7E2EA] font-black text-lg sm:text-xl font-kanit shadow-inner">
                    <Award className="w-4 h-4 text-[#7621B0]" />
                    <span>{item.score}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
