'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type BentoCardProps = {
  id?: string;
  title?: string;
  icon?: ReactNode;
  /** Grid-span / sizing utilities live here (e.g. "md:col-span-2 md:row-span-2"). */
  className?: string;
  /** Padding / layout utilities for the body region. */
  bodyClassName?: string;
  'data-testid'?: string;
  children: ReactNode;
};

/**
 * A single panel in the Bento Grid dashboard: pure-black surface, sharp 1px border,
 * cyan glow on hover, and an optional IDE-style title bar with window dots.
 * Entrance animation uses a small opacity/translate to keep CLS negligible.
 */
export default function BentoCard({
  id,
  title,
  icon,
  className = '',
  bodyClassName = 'p-4 sm:p-5',
  children,
  ...rest
}: BentoCardProps) {
  return (
    <motion.section
      id={id}
      data-testid={rest['data-testid']}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`group relative flex min-w-0 flex-col overflow-hidden rounded border border-chic-border bg-chic-panel transition-[border-color,box-shadow] duration-300 hover:border-chic-cyan/60 hover:shadow-glow-sm ${className}`}
    >
      {title && (
        <header className="flex items-center gap-2 border-b border-chic-border px-4 py-2.5">
          {icon && <span className="text-chic-cyan" aria-hidden>{icon}</span>}
          <span className="truncate text-[11px] uppercase tracking-[0.2em] text-chic-muted">
            {title}
          </span>
          <span className="ml-auto flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-chic-border transition-colors group-hover:bg-chic-magenta/70" />
            <span className="h-2 w-2 rounded-full bg-chic-border transition-colors group-hover:bg-chic-amber/70" />
            <span className="h-2 w-2 rounded-full bg-chic-border transition-colors group-hover:bg-chic-green/70" />
          </span>
        </header>
      )}
      <div className={`flex min-h-0 flex-1 flex-col ${bodyClassName}`}>{children}</div>
    </motion.section>
  );
}
