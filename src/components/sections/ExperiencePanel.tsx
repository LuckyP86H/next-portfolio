'use client';

import { motion } from 'framer-motion';
import { experience } from '@content/experience';

export default function ExperiencePanel() {
  return (
    <div className="flex h-full flex-col gap-6 p-5 sm:p-6">
      <ol className="relative space-y-8 border-l border-chic-border pl-6">
        {experience.map((entry, i) => (
          <motion.li
            key={`${entry.org}-${entry.role}`}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
            className="relative"
          >
            <span
              className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-chic-black ${
                entry.current ? 'bg-chic-cyan shadow-glow-sm' : 'bg-chic-muted'
              }`}
              aria-hidden
            />
            <h3 className="text-base font-semibold text-chic-fg">{entry.role}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
              <span className="text-chic-cyan">{entry.org}</span>
              <span className="text-chic-muted">•</span>
              <span className="text-chic-muted">{entry.period}</span>
              <span className="border border-chic-border px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-chic-muted">
                {entry.kind}
              </span>
            </div>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-chic-muted">
              {entry.points.map((point, p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-1 text-chic-cyan" aria-hidden>
                    ▹
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
