'use client';

import { useEffect, useState } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { site } from '@content/site';

/** Section anchors rendered as IDE editor tabs, in page order. */
const TABS = [
  { id: 'about', label: 'about.ts' },
  { id: 'skills', label: 'skills.json' },
  { id: 'experience', label: 'experience.log' },
  { id: 'projects', label: 'projects/' },
  { id: 'contact', label: 'contact.md' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('about');

  // Scroll-spy: highlight the tab whose section is crossing the viewport center.
  useEffect(() => {
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-chic-border bg-chic-black/90 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6" aria-label="Primary">
        {/* Brand / breadcrumb */}
        <a
          href="#top"
          className="flex flex-shrink-0 items-center gap-2 text-chic-fg transition-colors hover:text-chic-cyan"
          aria-label="Back to top"
        >
          <Terminal className="h-5 w-5 text-chic-cyan" aria-hidden />
          <span className="text-sm font-semibold tracking-tight">
            paul<span className="text-chic-cyan">@</span>xu
          </span>
          <span className="hidden text-xs text-chic-muted sm:inline">~/portfolio</span>
        </a>

        {/* Editor tabs — lg and up; at tablet widths five tabs plus the brand would overflow. */}
        <ul className="ml-4 hidden items-stretch self-stretch lg:flex">
          {TABS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <li key={tab.id} className="flex">
                <a
                  href={`#${tab.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative flex items-center border-r border-chic-border px-3.5 text-xs transition-colors first:border-l ${
                    isActive
                      ? 'bg-chic-elevated text-chic-cyan'
                      : 'text-chic-muted hover:bg-chic-elevated/60 hover:text-chic-fg'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-x-0 top-0 h-px bg-chic-cyan" aria-hidden />
                  )}
                  {tab.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 border border-chic-border px-2.5 py-1.5 text-xs text-chic-muted transition-colors hover:border-chic-cyan/60 hover:text-chic-cyan sm:inline-flex"
            aria-label="GitHub profile"
          >
            <FaGithub className="h-4 w-4" aria-hidden />
            <span>GitHub</span>
          </a>

          {/* Drawer toggle (below lg) */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center border border-chic-border text-chic-fg transition-colors hover:border-chic-cyan/60 hover:text-chic-cyan lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-tabs"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Tab drawer (below lg) */}
      {open && (
        <ul id="mobile-tabs" className="border-t border-chic-border bg-chic-panel lg:hidden">
          {TABS.map((tab) => (
            <li key={tab.id}>
              <a
                href={`#${tab.id}`}
                onClick={() => setOpen(false)}
                className={`block border-b border-chic-border px-5 py-3 text-sm transition-colors ${
                  active === tab.id
                    ? 'text-chic-cyan'
                    : 'text-chic-muted hover:bg-chic-elevated hover:text-chic-fg'
                }`}
              >
                <span className="text-chic-cyan">$</span> {tab.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
