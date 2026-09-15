'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/** Honors the OS reduced-motion setting for every framer-motion animation on the page. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
