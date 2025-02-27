'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import Contact from '@/components/sections/Contact';

const sections = [
  { id: 'about', component: About, title: 'About' },
  { id: 'portfolio', component: Portfolio, title: 'Portfolio' },
  { id: 'contact', component: Contact, title: 'Contact' },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const goToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      setDirection(index > activeSection ? 1 : -1);
      setActiveSection(index);
    }
  };

  // Handle swipe events
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;
    
    // If swiped left (next)
    if (diff > 50 && activeSection < sections.length - 1) {
      goToSection(activeSection + 1);
      setTouchStart(null);
    }
    
    // If swiped right (previous)
    else if (diff < -50 && activeSection > 0) {
      goToSection(activeSection - 1);
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const CurrentSection = sections[activeSection].component;

  return (
    <div 
      ref={containerRef}
      className="relative h-full min-h-screen"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation dots */}
      <div className="fixed left-1/2 bottom-6 transform -translate-x-1/2 z-10 flex space-x-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => goToSection(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeSection
                ? 'bg-primary-500 dark:bg-primary-400'
                : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
            }`}
            aria-label={`Go to ${section.title} section`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      {!isMobile && (
        <>
          {activeSection > 0 && (
            <button
              onClick={() => goToSection(activeSection - 1)}
              className="fixed left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-dark-card/80 shadow-md hover:bg-white dark:hover:bg-dark-card transition-colors"
              aria-label="Previous section"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
          )}
          
          {activeSection < sections.length - 1 && (
            <button
              onClick={() => goToSection(activeSection + 1)}
              className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-dark-card/80 shadow-md hover:bg-white dark:hover:bg-dark-card transition-colors"
              aria-label="Next section"
            >
              <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
          )}
        </>
      )}

      {/* Section title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {sections[activeSection].title}
        </h2>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeSection}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="w-full h-full"
        >
          <div className="container mx-auto px-4 py-12">
            <CurrentSection />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}