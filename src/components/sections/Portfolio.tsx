'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';

const projects = [
  {
    id: 'letter-guess',
    title: 'Letter Guess Game',
    description: 'A fun letter guessing game built with vanilla JavaScript.',
    image: '/assets/images/letter_guess.jpg',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/LuckyP86H/Letter-Guess-Game',
    liveUrl: 'https://luckyp86h.github.io/Letter-Guess-Game',
    details: 'This is a simple letter guessing game where players need to guess a random letter. The game tracks wins, losses, and guesses left.'
  },
  {
    id: 'crystal-collector',
    title: 'Crystal Collector Game',
    description: 'Interactive number-matching game with crystals.',
    image: '/assets/images/crystal_collector.png',
    technologies: ['JavaScript', 'jQuery', 'Bootstrap'],
    githubUrl: 'https://github.com/LuckyP86H/Crystal-Collector',
    liveUrl: 'https://luckyp86h.github.io/Crystal-Collector',
    details: 'This game assigns random values to crystals. The player must click on the crystals to match a target number.'
  },
  {
    id: 'trivia-game',
    title: 'Trivia Game',
    description: 'A timed trivia quiz with multiple-choice questions.',
    image: '/assets/images/trivia.jpg',
    technologies: ['JavaScript', 'jQuery', 'Responsive Design'],
    githubUrl: 'https://github.com/LuckyP86H/Trivia-Game',
    liveUrl: 'https://luckyp86h.github.io/Trivia-Game',
    details: 'This trivia game presents multiple-choice questions with a timer. After completing all questions, the player receives a summary of correct/incorrect answers.'
  },
  {
    id: 'gif-tastic',
    title: 'Dynamic GIF Page',
    description: 'A web app that fetches and displays GIFs from GIPHY API.',
    image: '/assets/images/gif_tastic.jpg',
    technologies: ['JavaScript', 'AJAX', 'API Integration'],
    githubUrl: 'https://github.com/LuckyP86H/Gif-Tastic-Dynamic',
    liveUrl: 'https://luckyp86h.github.io/Gif-Tastic-Dynamic',
    details: 'This application allows users to search for GIFs by category. It fetches results from the GIPHY API and displays them dynamically.'
  },
  {
    id: 'ill-hue-minate',
    title: 'ill-HUE-minate',
    description: 'Color palette generator and visualization tool.',
    image: '/assets/images/ill_HUE_minate.jpg',
    technologies: ['JavaScript', 'Canvas API', 'Color Theory'],
    githubUrl: 'https://github.com/LuckyP86H/illHUEminate',
    liveUrl: 'https://luckyp86h.github.io/illHUEminate/',
    details: 'A tool that generates complementary color palettes and visualizes them in various design contexts to help users select harmonious color schemes.'
  }
];

// Filter categories
const categories = ['All', 'JavaScript', 'APIs', 'Games', 'Responsive Design'];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.technologies.includes(filter));

  return (
    <div className="max-w-6xl mx-auto">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-1 rounded-full text-sm transition-colors ${
              filter === category 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              layoutId={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(project)}
              className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg"
            >
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={selectedProject.id}
              className="bg-white dark:bg-dark-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
                <Image 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-cover"
                />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedProject.title}</h2>
                
                <p className="mt-4 text-gray-700 dark:text-gray-300">{selectedProject.details}</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProject.technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="mt-6 flex gap-4">
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    Repository
                  </a>
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}