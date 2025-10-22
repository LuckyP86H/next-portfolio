'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render toggle on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-6 h-6" />;
  }

  const toggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={resolvedTheme === 'dark'}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-shadow shadow-sm hover:shadow-md bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-yellow-300 ring-1 ring-slate-100 dark:ring-slate-700"
    >
      {resolvedTheme === 'dark' ? (
        <FaSun className="h-5 w-5 text-yellow-300" />
      ) : (
        <FaMoon className="h-5 w-5" />
      )}
    </button>
  );
}