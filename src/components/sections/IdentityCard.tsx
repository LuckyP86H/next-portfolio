'use client';

import { Download, ArrowRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import Button from '@components/ui/Button';
import { useTypewriter } from '@lib/useTypewriter';

const ROLES = ['Software Engineer', 'Backend Developer', 'Java + Spring', 'Docker + Kubernetes'];

export default function IdentityCard({ basePath }: { basePath: string }) {
  const typed = useTypewriter(ROLES);

  return (
    <div className="flex h-full flex-col justify-center gap-5 p-6 sm:p-8">
      <p className="text-xs text-chic-muted">
        <span className="text-chic-green">visitor@portfolio</span>
        <span className="text-chic-muted">:</span>
        <span className="text-chic-cyan">~</span>
        <span className="text-chic-muted">$</span> whoami
      </p>

      <div>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Paul <span className="text-chic-cyan">Xu</span>
        </h1>
        <p className="mt-3 text-lg text-chic-fg sm:text-xl" aria-label="Software Engineer">
          <span className="text-chic-cyan">&gt;</span> <span>{typed}</span>
          <span
            className="ml-1 inline-block h-5 w-[9px] translate-y-0.5 animate-blink bg-chic-cyan"
            aria-hidden
          />
        </p>
      </div>

      <p className="max-w-xl text-sm leading-relaxed text-chic-muted">
        I build scalable backend systems and enjoy working with Java, Spring, Docker, and
        Kubernetes. Currently a Software Engineer at Clari with 4 years of experience shipping
        robust services and faster build infrastructure.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button href={`${basePath}/Resume.pdf`} variant="primary">
          <Download className="h-4 w-4" aria-hidden />
          Resume
        </Button>
        <Button href="#projects" variant="secondary">
          View Projects
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <span className="mx-1 hidden h-5 w-px bg-chic-border sm:block" aria-hidden />
        <a
          href="https://github.com/LuckyP86H"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-2 text-chic-muted transition-colors hover:text-chic-cyan"
        >
          <FaGithub className="h-5 w-5" aria-hidden />
        </a>
        <a
          href="https://linkedin.com/in/paul-xu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="p-2 text-chic-muted transition-colors hover:text-chic-cyan"
        >
          <FaLinkedin className="h-5 w-5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
