'use client';

import { GitBranch, Circle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from 'react-icons/fa6';
import type { ReactNode } from 'react';

const SOCIALS = [
  { href: 'https://github.com/LuckyP86H', label: 'GitHub', icon: <FaGithub className="h-4 w-4" aria-hidden /> },
  { href: 'https://linkedin.com/in/paul-xu', label: 'LinkedIn', icon: <FaLinkedin className="h-4 w-4" aria-hidden /> },
  { href: 'https://twitter.com/PaulLovesCoding', label: 'X (Twitter)', icon: <FaXTwitter className="h-4 w-4" aria-hidden /> },
  { href: 'mailto:paulxu155@gmail.com', label: 'Email', icon: <FaEnvelope className="h-4 w-4" aria-hidden /> },
];

/** VS Code-style status bar. */
export default function Footer() {
  return (
    <footer className="mt-auto border-t border-chic-border bg-chic-panel">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-2 text-xs text-chic-muted sm:flex-row sm:px-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-chic-cyan">
            <GitBranch className="h-3.5 w-3.5" aria-hidden />
            main
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <Circle className="h-2 w-2 fill-chic-green text-chic-green" aria-hidden />
            deployed
          </span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline">TypeScript React</span>
        </div>

        <div className="flex items-center gap-1 sm:ml-auto">
          {SOCIALS.map((s) => (
            <SocialLink key={s.label} href={s.href} label={s.label}>
              {s.icon}
            </SocialLink>
          ))}
        </div>

        <p className="text-[11px] text-chic-muted sm:ml-4">
          &copy; {new Date().getFullYear()} Paul Xu
        </p>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={label}
      className="p-2 text-chic-muted transition-colors hover:text-chic-cyan"
    >
      {children}
    </a>
  );
}
