import { useEffect, useState } from 'react';

// Define the name of the class to use for dark mode
const DARK_CLASS = 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  
  // Initialize theme when component mounts
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_CLASS : 'light');
    setTheme(savedTheme);
  }, []);
  
  // Handle theme changes
  useEffect(() => {
    if (!mounted) return;
    
    // Add no-transition class before changing theme
    document.documentElement.classList.add('no-transition');
    
    if (theme === DARK_CLASS) {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
    localStorage.setItem('theme', theme);
    
    // Remove no-transition class after a short delay
    const timeoutId = setTimeout(() => {
      document.documentElement.classList.remove('no-transition');
    }, 10);
    
    return () => clearTimeout(timeoutId);
  }, [theme, mounted]);
  
  // Listen for system preferences
  useEffect(() => {
    if (!mounted) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? DARK_CLASS : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted]);
  
  const handleClick = () => {
    setTheme(theme === 'light' ? DARK_CLASS : 'light');
  };
  
  // Don't render anything until mounted to prevent hydration errors
  if (!mounted) return null;
  
  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg bg-slate-200 dark:bg-dark-bg hover:bg-slate-300 dark:hover:bg-slate-800 shadow-sm dark:shadow-[0_2px_4px_rgba(255,255,255,0.05)] border dark:border-slate-600"
      aria-label="Toggle theme"
      type="button"
    >
      {theme === DARK_CLASS ? (
        <svg className="w-5 h-5 text-slate-800 dark:text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <title>Light mode</title>
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-slate-800 dark:text-yellow-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <title>Dark mode</title>
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
} 