'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import CodeBlock from '@components/ui/CodeBlock';
import Button from '@components/ui/Button';
import { projects, projectCategories, type Project } from '@content/projects';
import { basePath } from '@content/site';

const EXT: Record<string, string> = { javascript: 'js', typescript: 'ts', java: 'java', python: 'py', go: 'go' };
const extFor = (lang: string) => EXT[lang] ?? 'txt';

export default function ProjectsGrid() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter));

  // Dialog behaviour: Escape closes, the page behind stops scrolling, focus moves to the
  // close button and returns to the card that opened it.
  useEffect(() => {
    if (!selected) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [selected]);

  return (
    <div className="flex h-full flex-col gap-4 p-4 sm:p-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
            className={`border px-2.5 py-1 text-xs transition-colors ${
              filter === category
                ? 'border-chic-cyan bg-chic-cyan/10 text-chic-cyan'
                : 'border-chic-border text-chic-muted hover:border-chic-cyan/50 hover:text-chic-fg'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.button
              key={project.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={() => setSelected(project)}
              className="group/card flex flex-col overflow-hidden rounded border border-chic-border bg-black text-left transition-colors hover:border-chic-cyan/60"
              aria-label={`Open details for ${project.title}`}
            >
              <header className="flex items-center justify-between gap-2 border-b border-chic-border px-3 py-2">
                <span className="truncate text-sm font-semibold text-chic-fg">{project.title}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-wider text-chic-muted">
                  {project.language}
                </span>
              </header>

              <div className="relative h-32 overflow-hidden border-b border-chic-border bg-black">
                {project.image ? (
                  <Image
                    src={`${basePath}${project.image}`}
                    alt={`${project.title} preview`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover opacity-90 transition-transform duration-300 group-hover/card:scale-105"
                  />
                ) : (
                  <>
                    <CodeBlock
                      code={project.snippet}
                      language={project.language}
                      className="h-full rounded-none border-0"
                    />
                    {/* Fade the cropped snippet out so the cut-off reads as intentional. */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black to-transparent"
                    />
                  </>
                )}
                <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/70 to-transparent p-2 text-[11px] text-chic-cyan opacity-0 transition-opacity group-hover/card:opacity-100">
                  view →
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-3">
                <p className="line-clamp-2 text-xs leading-relaxed text-chic-muted">
                  {project.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="border border-chic-border px-1.5 py-0.5 text-[10px] text-chic-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded border border-chic-cyan/40 bg-chic-panel shadow-glow"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-chic-border bg-chic-panel px-4 py-3">
                <h3 id="project-dialog-title" className="truncate text-lg font-semibold text-chic-fg">
                  {selected.title}
                </h3>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close dialog"
                  className="shrink-0 p-1 text-chic-muted transition-colors hover:text-chic-cyan"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <div className="space-y-4 p-4">
                {selected.image && (
                  <div className="relative h-48 w-full overflow-hidden rounded border border-chic-border bg-black">
                    <Image
                      src={`${basePath}${selected.image}`}
                      alt={`${selected.title} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 640px"
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="text-sm leading-relaxed text-chic-muted">{selected.details}</p>
                <CodeBlock
                  code={selected.snippet}
                  filename={`${selected.id}.${extFor(selected.language)}`}
                  language={selected.language}
                />
                <div className="flex flex-wrap gap-1.5">
                  {selected.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="border border-chic-border px-2 py-0.5 text-xs text-chic-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button
                    href={selected.githubUrl}
                    variant={selected.liveUrl ? 'secondary' : 'primary'}
                  >
                    <FaGithub className="h-4 w-4" aria-hidden />
                    Repository
                  </Button>
                  {selected.liveUrl && (
                    <Button href={selected.liveUrl} variant="primary">
                      <ExternalLink className="h-4 w-4" aria-hidden />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
