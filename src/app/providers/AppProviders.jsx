import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { LocaleProvider } from '@shared/i18n/LocaleProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/** 'light' | 'dark' | 'system' — persisted, applied via [data-theme] per the token contract in tokens.css. */
const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('futaze-theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
    localStorage.setItem('futaze-theme', theme);
  }, [theme]);

  const value = useMemo(() => [theme, setTheme], [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within AppProviders');
  return ctx;
}

export function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <ThemeProvider>
          <TooltipPrimitive.Provider delayDuration={200}>{children}</TooltipPrimitive.Provider>
        </ThemeProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}
