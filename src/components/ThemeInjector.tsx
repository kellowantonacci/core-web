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

    // Reset special effects properties first to avoid leakages
    root.style.setProperty("--theme-mix-blend-mode", "normal");
    root.style.setProperty("--theme-clip-path", "none");
    root.style.setProperty("--theme-transform", "none");

    // Glassmorphism specific color overrides
    if (theme.id === "03-glassmorphism") {
      const glassSurface = palette.mode === "dark" ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.4)";
      const glassBorder = palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
      root.style.setProperty("--theme-surface", glassSurface);
      root.style.setProperty("--theme-border", glassBorder);
    }

    // Tactile Emboss specific calculations
    if (theme.id === "06-tactile-emboss") {
      root.style.setProperty("--theme-surface", palette.colors.background);
      root.style.setProperty("--theme-border", "transparent");

      const isDark = palette.mode === "dark";
      const shadowDark = isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(163, 177, 198, 0.6)";
      const shadowLight = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.5)";
      
      const boxNs = `9px 9px 16px ${shadowDark}, -9px -9px 16px ${shadowLight}`;
      const activeNs = `inset 4px 4px 8px ${shadowDark}, inset -4px -4px 8px ${shadowLight}`;

      root.style.setProperty("--theme-neomorphic-shadow", boxNs);
      root.style.setProperty("--theme-neomorphic-active-shadow", activeNs);
    }

    // Folded Origami specific overrides
    if (theme.id === "11-folded-origami") {
      root.style.setProperty("--theme-mix-blend-mode", "multiply");
      root.style.setProperty("--theme-transform", "skewY(-2deg)");
    }

    // Haptic Sharp specific overrides
    if (theme.id === "12-haptic-sharp") {
      root.style.setProperty("--theme-clip-path", "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)");
    }

    // Diffuse Glow specific overrides
    if (theme.id === "13-diffuse-glow") {
      root.style.setProperty("--theme-surface", "rgba(129, 140, 248, 0.1)");
      root.style.setProperty("--theme-mix-blend-mode", "color-dodge");
    }

    // Micro-Contrast Grid specific overrides
    if (theme.id === "15-micro-contrast-grid") {
      root.style.setProperty("--theme-surface", "transparent");
    }

    // Font family control
    root.classList.remove('font-sans', 'font-mono');
    if (theme.id === "10-monospaced-terminal") {
      root.classList.add('font-mono');
    } else {
      root.classList.add('font-sans');
    }

    // Geometry & Animation variables
    root.style.setProperty("--radius", theme.tokens.geometry.borderRadius);
    root.style.setProperty("--theme-border-radius", theme.tokens.geometry.borderRadius);
    root.style.setProperty("--theme-border-width", theme.tokens.geometry.borderWidth);
    root.style.setProperty("--theme-box-shadow", theme.tokens.geometry.boxShadow);
    root.style.setProperty("--theme-backdrop-filter", theme.tokens.effects.backdropFilter);
    root.style.setProperty("--theme-transition-duration", theme.tokens.animation.duration);
    root.style.setProperty("--theme-transition-timing-function", theme.tokens.animation.timingFunction);

    // Dynamic overriding for calculated neomorphic shadows
    if (theme.id === "06-tactile-emboss") {
      const isDark = palette.mode === "dark";
      const shadowDark = isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(163, 177, 198, 0.6)";
      const shadowLight = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.5)";
      root.style.setProperty("--theme-box-shadow", `9px 9px 16px ${shadowDark}, -9px -9px 16px ${shadowLight}`);
      root.style.setProperty("--theme-active-box-shadow", `inset 4px 4px 8px ${shadowDark}, inset -4px -4px 8px ${shadowLight}`);
    } else {
      root.style.setProperty("--theme-active-box-shadow", theme.tokens.geometry.activeBoxShadow);
    }

    // Active & Hover States
    root.style.setProperty("--theme-active-translate-x", theme.tokens.animation.activeTranslateX);
    root.style.setProperty("--theme-active-translate-y", theme.tokens.animation.activeTranslateY);
    root.style.setProperty("--theme-hover-transform", theme.tokens.animation.hoverTransform);
    root.style.setProperty("--theme-active-transform", theme.tokens.animation.activeTransform);

    // Glow/ambient decorations opacity
    let decorationsOpacity = "0.15";
    if (theme.id === "01-wireframe") {
      decorationsOpacity = "0";
    } else if (theme.id === "02-neobrutalism") {
      decorationsOpacity = "0.04";
    } else if (theme.id === "03-glassmorphism") {
      decorationsOpacity = "0.24";
    } else if (theme.id === "04-kinetic-liquid") {
      decorationsOpacity = "0.18";
    } else if (theme.id === "05-spatial-ui") {
      decorationsOpacity = "0.28";
    } else if (theme.id === "06-tactile-emboss") {
      decorationsOpacity = "0.06";
    } else if (theme.id === "07-organic-asymmetry") {
      decorationsOpacity = "0.18";
    } else if (theme.id === "08-high-density-dashboard") {
      decorationsOpacity = "0";
    } else if (theme.id === "09-floating-layers") {
      decorationsOpacity = "0.22";
    } else if (theme.id === "10-monospaced-terminal") {
      decorationsOpacity = "0.3";
    } else if (theme.id === "11-folded-origami") {
      decorationsOpacity = "0.08";
    } else if (theme.id === "12-haptic-sharp") {
      decorationsOpacity = "0.05";
    } else if (theme.id === "13-diffuse-glow") {
      decorationsOpacity = "0.32";
    } else if (theme.id === "14-macro-typography") {
      decorationsOpacity = "0";
    } else if (theme.id === "15-micro-contrast-grid") {
      decorationsOpacity = "0.12";
    }
    root.style.setProperty("--theme-decorations-opacity", decorationsOpacity);

    // Document element styles for scrolling/perspective
    root.style.perspective = "1000px";

  }, [theme, palette]);

  return null;
}
