 'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@components/ui/Button';
import { FaArrowRight } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Typewriter from 'typewriter-effect'; // Updated import

export default function Hero() {
  // Get the basePath from environment
  const basePath = process.env.NODE_ENV === 'production' ? '/next-portfolio' : '';
  const pathname = usePathname();

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
          <Typewriter
            options={{
              strings: ['Software Engineer', 'Backend', 'Java', 'Spring', 'Kubernetes'],
              autoStart: true,
              loop: true,
            }}
          />
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          I build scalable backend systems and enjoy working with Java, Spring, Docker, and Kubernetes.
          Welcome to my portfolio!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button href="/about" variant="primary">Learn More About Me</Button>

          <Button href={`${basePath}/Resume.pdf`} variant="secondary">
            Download Resume <FaArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}