'use client';

import { ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import Button from '@components/ui/Button';
import { useTypewriter } from '@lib/useTypewriter';
import { site } from '@content/site';

const ROLES = ['Software Engineer', 'AI Platform', 'Data Ingestion', 'Conversation Intelligence'];

export default function IdentityCard() {
  const { word, text } = useTypewriter(ROLES);

  return (
    <div className="flex h-full flex-col justify-center gap-5 p-5 sm:p-8">
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
        <p className="mt-3 grid text-lg text-chic-fg sm:text-xl">
          {/* Static text for assistive tech; the cycling typewriter is decorative. */}
          <span className="sr-only">{ROLES[0]}</span>
          {/* Every role, invisible, in one grid cell: the cell fits the tallest, so switching
              roles never changes the line's height and the page below never jumps. */}
          {ROLES.map((role) => (
            <span key={role} aria-hidden className="invisible col-start-1 row-start-1">
              &gt; {role}
            </span>
          ))}
          {/* The current role is laid out in full from its first keystroke, with the untyped
              rest invisible, so each letter appears where it will stay. The cursor is drawn
              over the text instead of taking space in it, so it can never wrap by itself. */}
          <span aria-hidden className="col-start-1 row-start-1">
            <span className="text-chic-cyan">&gt;</span> {text}
            <span className="relative">
              <span className="absolute bottom-1 left-1 h-5 w-[9px] animate-blink bg-chic-cyan" />
            </span>
            <span className="invisible">{word.slice(text.length)}</span>
          </span>
        </p>
      </div>

      <p className="max-w-xl text-sm leading-relaxed text-chic-muted">
        Software Engineer on <span className="text-chic-fg">{site.company}</span>&apos;s AI
        Platform team, powering data ingestion and next-generation conversation intelligence for
        GTM teams.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button href="#projects" variant="primary">
          View projects
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="#contact" variant="secondary">
          <Mail className="h-4 w-4" aria-hidden />
          Get in touch
        </Button>
        <span className="mx-1 hidden h-5 w-px bg-chic-border sm:block" aria-hidden />
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-2 text-chic-muted transition-colors hover:text-chic-cyan"
        >
          <FaGithub className="h-5 w-5" aria-hidden />
        </a>
        <a
          href={site.linkedin}
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
