/**
 * Tailwind config — "Developer Chic"
 * High-contrast dark UI: pure-black surfaces, matrix-cyan accent, sharp 1px borders,
 * Fira Code mono applied globally.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
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
        blink: 'blink 1.05s steps(2, start) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
