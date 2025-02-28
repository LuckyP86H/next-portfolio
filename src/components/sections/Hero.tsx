'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hello, I'm <span className="text-primary-600 dark:text-primary-400">Paul Xu</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-6">
          Software Engineer
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          I build scalable backend systems and enjoy working with Java, Spring, Docker, and Kubernetes.
          Welcome to my portfolio!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              // Fix: Cast the element to HTMLButtonElement which has the click() method
              const aboutButton = document.querySelector('button[aria-label="Go to About section"]') as HTMLButtonElement;
              aboutButton?.click();
            }}
            className="btn btn-primary px-6 py-3 text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More About Me
          </motion.a>
          <motion.a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary px-6 py-3 text-base flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume <ArrowRight className="ml-2 h-4 w-4" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}