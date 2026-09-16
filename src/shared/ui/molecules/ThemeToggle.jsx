import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@app/providers/AppProviders';
import { IconButton } from '@shared/ui/atoms/Button';

/** Resolves 'system' against the OS preference so the icon always reflects what's on screen. */
function useResolvedTheme(theme) {
  if (theme !== 'system') return theme;
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle({ className }) {
  const [theme, setTheme] = useTheme();
  const resolved = useResolvedTheme(theme);

  return (
    <IconButton
      label={resolved === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}
      className={className}
    >
      {resolved === 'dark' ? <Sun /> : <Moon />}
    </IconButton>
  );
}
