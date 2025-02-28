'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Log theme changes for debugging
  useEffect(() => {
    if (mounted) {
      console.log('Current theme:', theme);
      console.log('Resolved theme:', resolvedTheme);
    }
  }, [theme, resolvedTheme, mounted]);

  // Ensure it only runs on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-5 h-5" />; // Placeholder with same dimensions
  }

  // Force direct manipulation of the class if needed
  const forceThemeToggle = () => {
    const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Also update next-themes state
    setTheme(newTheme);
    
    console.log('Toggled to:', newTheme);
  };

  return (
    <button
      onClick={forceThemeToggle}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-300" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700" />
      )}
    </button>
  );
}