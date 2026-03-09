import { useEffect } from 'react';

/**
 * Ensures theme is applied from localStorage on initial load (for Landing/Login which have no Header).
 */
const ThemeInit = ({ children }) => {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, []);
  return children;
};

export default ThemeInit;
