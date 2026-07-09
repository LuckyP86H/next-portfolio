'use client';

import { useEffect, useState } from 'react';

type TypewriterOptions = {
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
};

/**
 * Lightweight typewriter hook (replaces the typewriter-effect dependency).
 * Cycles through `words`, typing then deleting each. Honors prefers-reduced-motion
 * by rendering the first word statically.
 */
export function useTypewriter(words: string[], options: TypewriterOptions = {}): string {
  const { typeSpeed = 70, deleteSpeed = 40, pause = 1400 } = options;
  const [subIndex, setSubIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduced || words.length === 0) return;
    const current = words[index % words.length];

    if (!deleting && subIndex === current.length) {
      const timer = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timer);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const timer = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(timer);
  }, [subIndex, deleting, index, words, reduced, typeSpeed, deleteSpeed, pause]);

  if (reduced) return words[0] ?? '';
  return (words[index % words.length] ?? '').slice(0, subIndex);
}

export default useTypewriter;
