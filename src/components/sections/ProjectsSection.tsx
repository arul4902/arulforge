import React from 'react';
import ProjectManufacturing from '../forge/ProjectManufacturing';
import type { ProjectData } from '../projects/ProjectCard';

const projectsList: ProjectData[] = [
  {
    number: '01',
    title: 'AI MOCK INTERVIEW COACH',
    category: 'AI / FULL STACK',
    tech: ['React', 'REST APIs', 'OpenAI GPT'],
    description:
      'An AI-powered mock interview experience designed to help users practice interviews through intelligent interactions and modern web technology.',
    liveUrl: 'https://ai-mock-interview-coach.vercel.app/',
    mainScreenshot: '/projects/mock_interview_1.jpg',
    detailScreenshots: ['/projects/detail_analytics.jpg', '/projects/detail_mobile.jpg'],
  },
  {
    number: '02',
    title: 'FARM2FACTORY',
    category: 'FULL STACK APPLICATION',
    tech: ['React', 'Spring Boot', 'MySQL'],
    description:
      'A full-stack application demonstrating frontend-backend integration, REST API architecture and structured database-driven functionality.',
    githubUrl: 'https://github.com/',
    mainScreenshot: '/projects/farm2factory_1.jpg',
    detailScreenshots: ['/projects/detail_code.jpg', '/projects/detail_analytics.jpg'],
  },
  {
    number: '03',
    title: 'HVAC SERVICES',
    category: 'BUSINESS WEBSITE',
    tech: ['Next.js', 'Tailwind CSS'],
    description:
      'A modern service-business website designed around clear service presentation, responsive user experience and customer conversion.',
    liveUrl: 'https://hvac-website-rho.vercel.app/',
    mainScreenshot: '/projects/hvac_1.jpg',
    detailScreenshots: ['/projects/detail_mobile.jpg', '/projects/roofing_1.jpg'],
  },
  {
    number: '04',
    title: 'PLUMBING SERVICES',
    category: 'BUSINESS WEBSITE',
    tech: ['Next.js', 'Tailwind CSS', 'JavaScript'],
    description:
      'A high-performance modern contractor platform featuring instant dispatch request booking, interactive service scope breakdowns, and seamless mobile responsiveness.',
    liveUrl: 'https://plumbing-website-mauve.vercel.app/',
    mainScreenshot: '/projects/plumbing_1.jpg',
    detailScreenshots: ['/projects/detail_mobile.jpg', '/projects/hvac_1.jpg'],
  },
  {
    number: '05',
    title: 'SUMMIT ROOFING SOLUTIONS',
    category: 'BUSINESS WEBSITE',
    tech: ['Next.js', 'Tailwind CSS'],
    description:
      'An authoritative roofing solutions portal with an architectural gallery, instant estimate generator, and conversion-optimized service catalog.',
    liveUrl: 'https://roofing-website-delta.vercel.app/',
    mainScreenshot: '/projects/roofing_1.jpg',
    detailScreenshots: ['/projects/detail_mobile.jpg', '/projects/plumbing_1.jpg'],
  },
  {
    number: '06',
    title: 'THE BLACK TRENDZ',
    category: 'WEB APPLICATION',
    tech: ['React', 'JavaScript', 'Tailwind CSS'],
    description:
      'A bold, avant-garde digital apparel store engineered with snappy client-side state, slide-out drawer cart interactions, and high-impact visual merchandising.',
    liveUrl: 'https://black-trendz.vercel.app/',
    mainScreenshot: '/projects/black_trendz_1.jpg',
    detailScreenshots: ['/projects/detail_code.jpg', '/projects/detail_mobile.jpg'],
  },
  {
    number: '07',
    title: 'BASIL TOWN',
    category: 'WEB PROJECT',
    tech: ['HTML', 'CSS', 'JavaScript'],
    description:
      'A warm artisanal restaurant showcase engineered with smooth transitions, interactive chef menu previews, and dedicated online table booking workflows.',
    liveUrl: 'https://basil-town.vercel.app/',
    mainScreenshot: '/projects/basil_town_1.jpg',
    detailScreenshots: ['/projects/detail_mobile.jpg', '/projects/black_trendz_1.jpg'],
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] pt-24 sm:pt-36 pb-24 px-4 sm:px-6 md:px-12 relative z-30 select-none"
      aria-label="Manufacturing Line: Projects"
    >
      <div className="max-w-[1500px] mx-auto">
        {/* Technical Section Header */}
        <div className="text-center mb-16 sm:mb-24">
          <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#00F0FF] uppercase block mb-3">
            // ARULFORGE PRODUCTION LINE
          </span>
          <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white">
            PROJECT MANUFACTURING
          </h2>
          <p className="font-light text-xs sm:text-sm md:text-base text-[#BBCCD7]/70 max-w-2xl mx-auto mt-4 font-kanit">
            Observe projects transitioning from raw wireframes into deployed applications. Hover over any finished artifact to engage the circular X-Ray lens.
          </p>
        </div>

        {/* Manufacturing Line Projects */}
        <div className="relative mt-12 sm:mt-16">
          {projectsList.map((project, index) => (
            <ProjectManufacturing
              key={project.number}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
