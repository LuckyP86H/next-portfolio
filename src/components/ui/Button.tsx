'use client';

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-chic-cyan text-black hover:bg-chic-cyan/90 hover:shadow-glow',
  secondary:
    'border border-chic-border text-chic-fg hover:border-chic-cyan/60 hover:text-chic-cyan',
  ghost: 'text-chic-muted hover:text-chic-cyan',
};

type CommonProps = { variant?: Variant; className?: string; children: ReactNode };
type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Single-page portfolio: internal navigation is hash-based and assets are basePath-prefixed
 * by callers, so a plain anchor is always correct — no next/link needed.
 */
export default function Button(props: NativeButtonProps | AnchorProps) {
  if (props.href !== undefined) {
    const { variant = 'primary', className = '', children, href, ...rest } = props;
    const classes = `${BASE} ${VARIANTS[variant]} ${className}`;
    const external = /^https?:\/\//.test(href) || href.startsWith('mailto:');
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { variant = 'primary', className = '', children, ...rest } = props;
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
