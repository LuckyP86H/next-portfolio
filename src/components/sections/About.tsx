'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaFileDownload, FaArrowUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@components/ui/Button';
// Import D3 more explicitly to ensure it loads
import * as d3 from 'd3';

// Import the simplified chart creator
import createSimplifiedSkillsChart from '@utils/createSimplifiedSkillsChart';

// Add these type declarations if needed
declare global {
  interface Window {
    KeyboardEvent: typeof KeyboardEvent;
  }
}

// Updated skills data - keeping the same data structure
const skills = [
  { 
    name: 'Java (JDK 17)', 
    level: 80, 
    category: 'Languages',
    description: 'Primary language for backend development. Experienced with new JDK 17 features, streams, concurrency, and collections.'
  },
  { 
    name: 'Spring', 
    level: 80, 
    category: 'Frameworks',
    description: 'Expert in Spring Boot, Spring Cloud, and microservices architecture with REST APIs.'
  },
  { 
    name: 'Python', 
    level: 40, 
    category: 'Languages',
    description: 'Used for scripting, data analysis, and automation tasks.'
  },
  { 
    name: 'React', 
    level: 30, 
    category: 'Frontend',
    description: 'Building interactive user interfaces with modern React and hooks.'
  },
  { 
    name: 'Next.js', 
    level: 20, 
    category: 'Frontend',
    description: 'Creating server-rendered React applications with Next.js.'
  },
  { 
    name: 'PostgreSQL', 
    level: 60, 
    category: 'Data',
    description: 'Database design, performance tuning, and complex query optimization.'
  },
  { 
    name: 'MongoDB', 
    level: 50, 
    category: 'Data',
    description: 'Document database for flexible schema applications, including aggregation framework.'
  },
  { 
    name: 'Gradle', 
    level: 70, 
    category: 'Build & Ops',
    description: 'Build automation with custom tasks and dependency management.'
  },
  { 
    name: 'Bazel', 
    level: 60, 
    category: 'Build & Ops',
    description: 'Fast, scalable build system with incremental builds and caching.'
  },
  { 
    name: 'GitHub Actions', 
    level: 55, 
    category: 'Build & Ops',
    description: 'CI/CD workflow automation directly integrated with repositories.'
  },
  { 
    name: 'AWS', 
    level: 40, 
    category: 'Cloud',
    description: 'Experience with EC2, S3, Lambda, and other core AWS services.'
  }
];

// Reorganize content into paragraphs
const aboutMeParagraphs = [
  "Hello everyone! My name is Paul. Welcome to my home page. I have a Bachelor's degree in Computer Science from UWaterloo. I am passionate about building scalable software and have experience with backend development using Spring, as well as tools like GitHub Actions, Docker, and AWS.",
  
  "I am currently a Software Engineer at Clari with 4 years of experience. My work focuses on developing robust backend systems and improving build infrastructure. I've recently been exploring various build systems including Gradle and Bazel for better performance and scalability.",
  
  "When I'm not coding, I enjoy exploring food in the city, playing badminton, basketball, and staying fit. I'm also passionate about learning new technologies and constantly improving my skills in data structures, algorithms, and system design."
];

interface AboutProps {
  onSectionChange?: (sectionIndex: number) => void;
}

export default function About(props: AboutProps = {}) {
  const { onSectionChange } = props;
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  interface TooltipContent {
    visible: boolean;
    skill: {
      name: string;
      level: number;
      category: string;
      description: string;
    } | null;
    x: number;
    y: number;
  }

  // State for tooltip since we're managing it ourselves
  const [tooltipContent, setTooltipContent] = useState<TooltipContent>({
    visible: false,
    skill: null,
    x: 0,
    y: 0
  });
  
  // Get the basePath from environment
  const basePath = process.env.NODE_ENV === 'production' ? '/next-portfolio' : '';

  const sections = [
    { id: 'intro', title: 'About Me' },
    { id: 'skills', title: 'Skills & Expertise' },
    { id: 'experience', title: 'Experience' }
  ];

  // Keyboard navigation handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSection < sections.length - 1) {
          goToSection(currentSection + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSection > 0) {
          goToSection(currentSection - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown as EventListener);
    return () => window.removeEventListener('keydown', handleKeyDown as EventListener);
  }, [currentSection, sections.length, isTransitioning]);

  // Handle window resize and wheel events
  useEffect(() => {
    // Use a ref to track whether we're handling a wheel event
    let isHandlingWheel = false;
    let wheelTimer: NodeJS.Timeout | undefined = undefined;
    
    const handleWheel = (e: WheelEvent) => { // Add WheelEvent type
      if (isTransitioning || isHandlingWheel) return;
      
      // Prevent natural scrolling
      e.preventDefault();
      
      // Throttle wheel events
      const delta = e.deltaY;
      if (Math.abs(delta) < 50) return;
      
      isHandlingWheel = true;
      
      if (delta > 0 && currentSection < sections.length - 1) {
        goToSection(currentSection + 1);
      } else if (delta < 0 && currentSection > 0) {
        goToSection(currentSection - 1);
      }
      
      // Reset the handling flag after a delay
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        isHandlingWheel = false;
      }, 800); // Slightly longer than transition time
    };
    
    window.addEventListener('wheel', handleWheel as EventListener);
    
    // Disable standard scrolling on the page
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
      clearTimeout(wheelTimer);
    };
  }, [currentSection, sections.length, isTransitioning]);

  // Create D3 chart when skills section is active (responsive)
  useEffect(() => {
    if (currentSection !== 1 || !svgRef.current) return;

    const colorScale = d3.scaleOrdinal()
      .domain(['Languages', 'Frameworks', 'Frontend', 'Data', 'Build & Ops', 'Cloud'])
      .range(['#3b82f6', '#f97316', '#ef4444', '#10b981', '#8b5cf6', '#6366f1']);

    // Pass the React setter directly; the chart now emits container-relative coords via d3.pointer
    createSimplifiedSkillsChart(svgRef, skills, selectedCategory, colorScale, setTooltipContent);

    // Observe container size and redraw on changes
    const container = svgRef.current.parentElement ?? svgRef.current;
    const ro = new ResizeObserver(() => {
      if (!svgRef.current) return;
      // remove previous contents
      while (svgRef.current.firstChild) svgRef.current.removeChild(svgRef.current.firstChild);
      createSimplifiedSkillsChart(svgRef, skills, selectedCategory, colorScale, setTooltipContent);
    });
    ro.observe(container);

    return () => ro.disconnect();
  }, [currentSection, selectedCategory]);

  const goToSection = (index: number) => {
    if (index >= 0 && index < sections.length && index !== currentSection) {
      setIsTransitioning(true);
      setCurrentSection(index);
      
      // Notify parent component of section change if the callback exists
      if (typeof onSectionChange === 'function') {
        onSectionChange(index);
      }
      
      // Reset transitioning state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
        
        // Update scroll to top button visibility
        setShowScrollTop(index === sections.length - 1);
      }, 700); // Match this with your transition duration
    }
  };

  const scrollToTop = () => {
    goToSection(0);
  };

  // Touch handling for swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientY);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart || isTransitioning) return;
    
    const touchY = e.touches[0].clientY;
    const diff = touchStart - touchY;
    
    // Threshold for swipe detection
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSection < sections.length - 1) {
        // Swiping up, go to next section
        goToSection(currentSection + 1);
      } else if (diff < 0 && currentSection > 0) {
        // Swiping down, go to previous section
        goToSection(currentSection - 1);
      }
      setTouchStart(null);
    }
  };
  
  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  // Simplified skills chart component as a fallback
  interface Skill {
    name: string;
    level: number;
    category: string;
    description: string;
  }

  interface SimpleSkillsChartProps {
    skills: Skill[];
    selectedCategory: string | null;
    onCategorySelect: (category: string | null) => void;
  }

  const SimpleSkillsChart = ({ skills, selectedCategory, onCategorySelect }: SimpleSkillsChartProps) => {
    // Filter skills by category if one is selected
    const filteredSkillsAll = selectedCategory 
      ? skills.filter(skill => skill.category === selectedCategory)
      : skills;

    // collapsed view shows a limited set to avoid large vertical lists
    const [expanded, setExpanded] = useState(false);
    const visibleLimit = 6;
    const filteredSkills = expanded ? filteredSkillsAll : filteredSkillsAll.slice(0, visibleLimit);

    // Get all unique categories
    const categories = Array.from(new Set(skills.map(skill => skill.category))) as string[];

    // Color mapping for categories
    const getCategoryColor = (category: string): string => {
      const colorMap: Record<string, string> = {
        'Languages': '#3b82f6',
        'Frameworks': '#f97316',
        'Frontend': '#ef4444',
        'Data': '#10b981',
        'Build & Ops': '#8b5cf6',
        'Cloud': '#6366f1'
      };
      return colorMap[category] || '#9ca3af';
    };

    return (
      <div className="space-y-6">
        {/* Category filter buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategorySelect(selectedCategory === category ? null : category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? 'bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              style={{ 
                borderLeft: `4px solid ${getCategoryColor(category)}`,
              }}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Skills bars */}
        {filteredSkills.map((skill) => (
          <div key={skill.name} className="relative">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span 
                  className="font-medium text-gray-800 dark:text-gray-200"
                  style={{ color: getCategoryColor(skill.category) }}
                >
                  {skill.name}
                </span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  {skill.category}
                </span>
              </div>
              <span className="text-sm font-semibold">{skill.level}%</span>
            </div>
            
            {/* Progress bar background */}
            <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full">
              {/* Filled part of progress bar */}
              <div 
                className="h-2.5 rounded-full transition-all duration-500"
                style={{ 
                  width: `${skill.level}%`,
                  backgroundColor: getCategoryColor(skill.category)
                }}
              />
            </div>
            
            {/* Skill description on hover */}
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 italic">
              {skill.description}
            </div>
          </div>
        ))}
        {filteredSkillsAll.length > visibleLimit && (
          <div className="text-center mt-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-primary-600 dark:text-primary-400 underline"
            >
              {expanded ? 'Show less' : `Show all ${filteredSkillsAll.length} skills`}
            </button>
          </div>
        )}
      </div>
    );
  };

  // Section components
  const IntroSection = () => (
    <motion.div 
      className="min-h-screen flex flex-col justify-center items-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-3xl mx-auto bg-white dark:bg-dark-card rounded-xl shadow-lg p-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-primary-100 dark:border-primary-900 shadow-md mb-6 md:mb-0 md:mr-8">
            <Image
              src={`${basePath}/assets/images/profile.jpg`}
              alt="Paul Xu"
              fill
              className="object-cover"
              sizes="160px"
              priority
            />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              Paul Xu
            </h1>
            <h2 className="text-xl text-primary-600 dark:text-primary-400 font-medium mb-3">
              Software Engineer
            </h2>
            <div className="flex justify-center md:justify-start">
              <Button href={`${basePath}/Resume.pdf`} variant="primary">
                <FaFileDownload className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300 font-light leading-relaxed text-lg">
          {aboutMeParagraphs.map((paragraph, index) => (
            <motion.p 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <button 
          onClick={() => goToSection(1)}
          className="text-primary-600 dark:text-primary-400 flex flex-col items-center"
          aria-label="Scroll to Skills section"
        >
          <span className="text-sm mb-2">Scroll to see my skills</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 animate-bounce" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );

  const SkillsSection = () => {
    const [d3ChartFailed, setD3ChartFailed] = useState(false);
    
    // Try to initialize D3 chart after a delay
    useEffect(() => {
      if (currentSection === 1) {
        let timer;
        // Check if chart is rendered after a timeout
        timer = setTimeout(() => {
          // If no children in the SVG, fallback to simple chart
          if (!svgRef.current || svgRef.current.childNodes.length === 0) {
            setD3ChartFailed(true);
          }
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }, [currentSection]);
    
    // Handle category selection
    const handleCategorySelect = (category: string | null) => {
      setSelectedCategory(category);
    };

    return (
      <motion.div 
        className="min-h-screen flex flex-col justify-center items-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
  <div className="max-w-4xl w-full mx-auto bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 md:p-10 relative max-h-[calc(100vh-160px)] overflow-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
            Skills & Expertise
          </h2>
          
          {/* Category selection buttons */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              {Array.from(new Set(skills.map(s => s.category))).map(category => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(selectedCategory === category ? null : category)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedCategory === category 
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              {selectedCategory ? `Showing ${selectedCategory} skills` : 'Showing top skills across categories'}
            </p>
          </div>
          
          {/* Skills visualization */}
          {d3ChartFailed ? (
            <SimpleSkillsChart 
              skills={skills} 
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          ) : (
            <div className="relative h-[400px] w-full flex items-center justify-center">
              <svg 
                ref={svgRef} 
                className="d3-chart max-w-full"
                style={{ margin: '0 auto' }}
              ></svg>
              
              {/* Custom tooltip that follows the mouse */}
              {tooltipContent.visible && tooltipContent.skill && (
                <div 
                  className="absolute bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-50 max-w-xs"
                  style={{
                    left: `${Math.max(8, tooltipContent.x + 8)}px`,
                    top: `${Math.max(8, tooltipContent.y + 8)}px`,
                    transform: 'translate(0, -50%)',
                    maxWidth: 'min(280px, 40%)'
                  }}
                >
                  <div className="font-bold text-gray-900 dark:text-white">{tooltipContent.skill.name} - {tooltipContent.skill.level}%</div>
                  <div className="text-sm text-primary-600 dark:text-primary-400">{tooltipContent.skill.category}</div>
                  <div className="text-xs mt-1 text-gray-600 dark:text-gray-300">{tooltipContent.skill.description}</div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button 
            onClick={() => goToSection(2)}
            className="text-primary-600 dark:text-primary-400 flex flex-col items-center"
            aria-label="Scroll to Experience section"
          >
            <span className="text-sm mb-2">View my experience</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 animate-bounce" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    );
  };

  const ExperienceSection = () => (
    <motion.div 
      className="min-h-screen flex flex-col justify-center items-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl w-full mx-auto bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 md:p-10">
        <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-gray-100 text-center">
          Professional Experience
        </h2>
        
        <div className="space-y-12">
          <motion.div 
            className="relative pl-8 border-l-4 border-primary-500 dark:border-primary-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 border-4 border-white dark:border-dark-card"></div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Software Engineer</h3>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-primary-600 dark:text-primary-400 font-medium">Clari</span>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-300">2021 - Present</span>
              <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full text-xs">Full-time</span>
            </div>
            <div className="text-gray-600 dark:text-gray-300 space-y-3">
              <p>
                Lead backend infrastructure development using Java and Spring Boot, creating scalable microservices for enterprise clients.
              </p>
              <p>
                Implemented and optimized build systems with Gradle and Bazel, improving build times by 35% across the organization.
              </p>
              <p>
                Collaborated with cross-functional teams to design and deploy cloud-native solutions with Docker and AWS.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative pl-8 border-l-4 border-gray-300 dark:border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-dark-card"></div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Volunteer</h3>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-gray-700 dark:text-gray-300 font-medium">MongoDB Local Event</span>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-300">2023</span>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs">Community</span>
            </div>
            <div className="text-gray-600 dark:text-gray-300 space-y-3">
              <p>
                Assisted in organizing and running MongoDB's local developer event, helping with registration, technical setup, and speaker coordination.
              </p>
              <p>
                Participated in hands-on workshops and contributed to discussions about MongoDB best practices and use cases.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll to top button appears only in the last section */}
      {showScrollTop && (
        <motion.button
          className="fixed bottom-10 right-10 bg-primary-500 dark:bg-primary-600 text-white p-3 rounded-full shadow-lg z-10"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <FaArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </motion.div>
  );

  // Main component render - IMPORTANT: This doesn't include any Header or Footer
  // These should be managed by the parent component (page.tsx)
  return (
    <div 
      className="h-screen w-screen snap-y snap-mandatory overflow-hidden bg-gray-50 dark:bg-dark-background relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <main className="h-full w-full">
        <AnimatePresence mode="wait">
          {currentSection === 0 && (
            <div key="intro" className="h-full w-full snap-start">
              <IntroSection />
            </div>
          )}
          
          {currentSection === 1 && (
            <div key="skills" className="h-full w-full snap-start">
              <SkillsSection />
            </div>
          )}
          
          {currentSection === 2 && (
            <div key="experience" className="h-full w-full snap-start">
              <ExperienceSection />
            </div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Navigation indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-10">
        <div className="flex flex-col space-y-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => goToSection(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-primary-600 dark:bg-primary-400 w-4 h-4' 
                  : 'bg-gray-300 dark:bg-gray-700'
              }`}
              aria-label={`Go to ${section.title} section`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}