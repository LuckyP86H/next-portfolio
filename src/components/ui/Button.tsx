"use client";

import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import Link from 'next/link';

type BaseProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  as?: ElementType;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function Button(props: ButtonProps | AnchorProps) {
  const { children, variant = 'primary', className = '', as, ...rest } = props as any;

  const base = 'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-base font-medium shadow-sm transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variants: Record<string, string> = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:scale-105',
    secondary: 'bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white ring-1 ring-slate-200 dark:ring-slate-700 hover:scale-105',
    ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-800/50',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  // If href is present, render an anchor. If 'as' is Link, render Link directly.
  if ((rest as AnchorProps).href) {
    const anchor = rest as AnchorProps;
    // For internal links use next/link
    if (anchor.href && anchor.href.startsWith('/')) {
      return (
        // motion(Link) would require special typing; using motion.a on Link's child is simpler for now
        <Link href={anchor.href} className={classes} {...(anchor as any)}>
          {children}
        </Link>
      );
    }

    return (
      <motion.a
        {...(anchor as HTMLMotionProps<'a'>)}
        href={anchor.href}
        target={anchor.target}
        rel={anchor.rel}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  // Otherwise render a motion.button
  return (
    <motion.button
      {...(rest as HTMLMotionProps<'button'>)}
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
