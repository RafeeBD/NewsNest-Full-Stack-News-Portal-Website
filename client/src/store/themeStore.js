import { create } from 'zustand';

export const useThemeStore = create((set) => {
  // Check initial theme from localStorage or system preference
  const savedTheme = localStorage.getItem('newsnest_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : prefersDark ? 'dark' : 'light';

  // Apply class to html document
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return {
    theme: initialTheme,
    toggleTheme: () =>
      set((state) => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('newsnest_theme', nextTheme);

        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        return { theme: nextTheme };
      }),
  };
});
