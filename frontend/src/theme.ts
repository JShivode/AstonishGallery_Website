// frontend/src/theme.ts
import { createTheme } from '@mui/material/styles';

/**
 * Safely reads a CSS variable from the :root.
 * If not found, returns the fallback color.
 */
function getCSSVariable(varName: string, fallback: string): string {
  if (typeof window === 'undefined') {
    // If SSR or no window, return fallback
    return fallback;
  }
  const rootStyles = getComputedStyle(document.documentElement);
  const value = rootStyles.getPropertyValue(varName).trim();
  return value || fallback;
}

/**
 * Creates a Material UI theme by reading colors from CSS variables
 * declared in your global CSS (e.g., :root { --primary-color: #1976d2; }).
 */
export function createAppTheme() {
  // Use fallback colors if the CSS variable is not found
  const primaryColor = getCSSVariable('--primary-color', '#1976d2');
  const secondaryColor = getCSSVariable('--secondary-color', '#9c27b0');

  return createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
    },
    typography: {
      fontFamily: 'var(--font-family), sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 'var(--card-radius)',
          },
        },
      },
    },
  });
}
