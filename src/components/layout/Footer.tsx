'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-dark-card mt-auto border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Paul Xu. All rights reserved.
            </p>
          </div>
          
          
          <div className="flex space-x-4">
            <SocialLink href="https://github.com/LuckyP86H" icon={<FaGithub size={18} />} label="GitHub" />
            <SocialLink href="https://linkedin.com/in/paul-xu" icon={<FaLinkedin size={18} />} label="LinkedIn" />
            <SocialLink href="https://twitter.com/PaulLovesCoding" icon={<FaXTwitter size={18} />} label="X (Twitter)" />
            <SocialLink href="mailto:paulxu155@gmail.com" icon={<FaEnvelope size={18} />} label="Email" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      aria-label={label}
    >
      {icon}
    </Link>
  );
}