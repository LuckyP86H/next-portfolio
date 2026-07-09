'use client';

import { motion } from 'framer-motion';
import { aboutMeParagraphs } from '@content/about-me';

function Prompt() {
  return (
    <span>
      <span className="text-chic-green">visitor@portfolio</span>
      <span className="text-chic-muted">:</span>
      <span className="text-chic-cyan">~</span>
      <span className="text-chic-muted">$</span>
    </span>
  );
}

/**
 * Terminal-style "About Me". Renders real, crawlable text (each paragraph fades in
 * with a small translate so CLS stays negligible) framed as `cat about-me.txt`.
 */
export default function TerminalAbout() {
  return (
    <div className="flex h-full flex-col gap-3 p-4 text-[13px] sm:p-5">
      <p className="text-chic-muted">
        <Prompt /> <span className="text-chic-fg">cat about-me.txt</span>
      </p>

      <div className="space-y-3">
        {aboutMeParagraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay: 0.12 * i, duration: 0.4 }}
            className="leading-relaxed text-chic-fg/90"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <p className="mt-auto flex items-center gap-1 pt-2 text-chic-muted">
        <Prompt />
        <span className="inline-block h-4 w-[9px] animate-blink bg-chic-cyan" aria-hidden />
      </p>
    </div>
  );
}
