"use client";

import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { themes } from '@/config/themes';

export function ThemeInjector() {
  const { activeThemeId, activePaletteIndex } = useThemeStore();
  const theme = themes.find((t) => t.id === activeThemeId) || themes[0];
  const palette = theme.palettes[activePaletteIndex] || theme.palettes[0];

  useEffect(() => {
    const root = document.documentElement;

    // Remove old classes
    root.classList.remove('light', 'dark');
    // Add current mode class
    root.classList.add(palette.mode);

    // Color tokens
    const colorVars = {
      '--background': hexToHsl(palette.colors.background),
      '--foreground': hexToHsl(palette.colors.foreground),
      '--card': hexToHsl(palette.colors.surface),
      '--card-foreground': hexToHsl(palette.colors.foreground),
      '--popover': hexToHsl(palette.colors.surface),
      '--popover-foreground': hexToHsl(palette.colors.foreground),
      '--primary': hexToHsl(palette.colors.primary),
      '--primary-foreground': hexToHsl(palette.colors.background),
      '--secondary': hexToHsl(palette.colors.muted),
      '--secondary-foreground': hexToHsl(palette.colors.foreground),
      '--muted': hexToHsl(palette.colors.muted),
      '--muted-foreground': hexToHsl(palette.colors.mutedForeground),
      '--accent': hexToHsl(palette.colors.muted),
      '--accent-foreground': hexToHsl(palette.colors.foreground),
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 98%',
      '--border': hexToHsl(palette.colors.border),
      '--input': hexToHsl(palette.colors.border),
      '--ring': hexToHsl(palette.colors.ring),
    };

    Object.entries(colorVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Geometry tokens
    root.style.setProperty('--radius', theme.tokens.geometry.borderRadius);

    // Wireframe specific globals if needed
    if (theme.id === 'wireframe') {
       // Since wireframe removes border radius completely and uses thin borders
       document.documentElement.style.setProperty('--border-width', theme.tokens.geometry.borderWidth);
       // We can dynamically add global styles for transition
       document.documentElement.style.setProperty('--transition-duration', theme.tokens.animation.transitionDuration);
    } else {
       document.documentElement.style.setProperty('--border-width', '1px');
       document.documentElement.style.setProperty('--transition-duration', '150ms');
    }

  }, [theme, palette]);

  return null;
}

// Simple hex to HSL converter for Shadcn variables
function hexToHsl(hex: string): string {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
