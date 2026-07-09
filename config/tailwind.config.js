/**
 * Canonical Tailwind config — "Developer Chic"
 * High-contrast dark UI: pure-black surfaces, matrix-cyan accent, sharp 1px borders,
 * Fira Code mono applied globally. Shared config imported by root tailwind.config.js.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        chic: {
          black: '#000000',
          panel: '#0a0a0a',
          elevated: '#111111',
          border: '#1f1f1f',
          cyan: '#00f2ff',
          'cyan-dim': '#00b8c4',
          fg: '#e6edf3', // ~16:1 on black
          muted: '#8b98a6', // ~7:1 on black (WCAG AA for normal text)
          green: '#39ff14',
          magenta: '#ff2fb9',
          amber: '#ffb000',
        },
        // Semantic accent alias so `accent` utilities map to the cyan brand color.
        accent: {
          DEFAULT: '#00f2ff',
          dim: '#00b8c4',
        },
      },
      fontFamily: {
        // Fira Code everywhere — technical + content areas share the mono stack.
        sans: ['var(--font-fira-code)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        mono: ['var(--font-fira-code)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        // Sharp aesthetic: nothing rounder than a hairline corner.
        DEFAULT: '2px',
        md: '3px',
        lg: '4px',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0, 242, 255, 0.35), 0 0 18px -4px rgba(0, 242, 255, 0.45)',
        'glow-sm': '0 0 0 1px rgba(0, 242, 255, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.45s ease-out forwards',
        blink: 'blink 1.05s steps(2, start) infinite',
        scan: 'scan 6s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
      },
    },
  },
  plugins: [],
};
