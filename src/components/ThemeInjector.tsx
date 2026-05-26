"use client";

import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { themes } from '@/config/themes';

export function ThemeInjector() {
  const { activeThemeIndex, activePaletteIndex } = useThemeStore();
  const theme = themes[activeThemeIndex] || themes[0];
  const palette = theme.palettes[activePaletteIndex] || theme.palettes[0];

  useEffect(() => {
    const root = document.documentElement;

    // Remove old classes
    root.classList.remove('light', 'dark');
    // Add current mode class
    root.classList.add(palette.mode);

    // Color variables helper
    const hexToHsl = (hex: string): string => {
      hex = hex.replace(/^#/, '');
      if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
      }

      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.substring(4, 6), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0;
      const l = (max + min) / 2;

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
    };

    // Standard Shadcn Variables mapped to our custom palette
    const colorVars = {
      '--background': hexToHsl(palette.colors.background),
      '--foreground': hexToHsl(palette.colors.primary),
      '--card': hexToHsl(palette.colors.surface),
      '--card-foreground': hexToHsl(palette.colors.primary),
      '--popover': hexToHsl(palette.colors.surface),
      '--popover-foreground': hexToHsl(palette.colors.primary),
      '--primary': hexToHsl(palette.colors.primary),
      '--primary-foreground': palette.mode === "dark" ? '0 0% 7%' : '0 0% 100%',
      '--secondary': hexToHsl(palette.colors.muted),
      '--secondary-foreground': hexToHsl(palette.colors.primary),
      '--muted': hexToHsl(palette.colors.muted),
      '--muted-foreground': hexToHsl(palette.colors.primary),
      '--accent': hexToHsl(palette.colors.accent),
      '--accent-foreground': hexToHsl(palette.colors.primary),
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 98%',
      '--border': hexToHsl(palette.colors.border),
      '--input': hexToHsl(palette.colors.border),
      '--ring': hexToHsl(palette.colors.primary),
    };

    Object.entries(colorVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Custom Theme Variables
    root.style.setProperty("--theme-background", palette.colors.background);
    root.style.setProperty("--theme-foreground", palette.colors.primary);
    root.style.setProperty("--theme-primary", palette.colors.primary);
    root.style.setProperty("--theme-muted", palette.colors.muted);
    root.style.setProperty("--theme-accent", palette.colors.accent);
    root.style.setProperty("--theme-success", palette.colors.success);
    root.style.setProperty("--theme-error", palette.colors.error);
    root.style.setProperty(
      "--theme-primary-foreground",
      palette.mode === "dark" ? "#111111" : "#FFFFFF"
    );
    root.style.setProperty("--theme-surface", palette.colors.surface);
    root.style.setProperty("--theme-border", palette.colors.border);

    // Glassmorphism specific color overrides
    if (theme.id === "03-glassmorphism") {
      const glassSurface = palette.mode === "dark" ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.4)";
      const glassBorder = palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
      root.style.setProperty("--theme-surface", glassSurface);
      root.style.setProperty("--theme-border", glassBorder);
    }

    // Geometry & Animation variables
    root.style.setProperty("--radius", theme.tokens.geometry.borderRadius);
    root.style.setProperty("--theme-border-radius", theme.tokens.geometry.borderRadius);
    root.style.setProperty("--theme-border-width", theme.tokens.geometry.borderWidth);
    root.style.setProperty("--theme-box-shadow", theme.tokens.geometry.boxShadow);
    root.style.setProperty("--theme-backdrop-filter", theme.tokens.effects.backdropFilter);
    root.style.setProperty("--theme-transition-duration", theme.tokens.animation.duration);
    root.style.setProperty("--theme-transition-timing-function", theme.tokens.animation.timingFunction);

    // Active & Hover States
    root.style.setProperty("--theme-active-translate-x", theme.tokens.animation.activeTranslateX);
    root.style.setProperty("--theme-active-translate-y", theme.tokens.animation.activeTranslateY);
    root.style.setProperty("--theme-active-box-shadow", theme.tokens.geometry.activeBoxShadow);
    root.style.setProperty("--theme-hover-transform", theme.tokens.animation.hoverTransform);

    // Document element styles for scrolling/perspective
    root.style.perspective = "1000px";

  }, [theme, palette]);

  return null;
}
