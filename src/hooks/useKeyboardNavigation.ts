import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { themes } from '@/config/themes';

export function useKeyboardNavigation() {
  const {
    activeThemeId,
    activePaletteIndex,
    setActiveThemeId,
    setActivePaletteIndex,
    showLikedOnly,
    likedThemes
  } = useThemeStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      let availableThemes = themes;

      // If showing only liked, filter themes that have at least one liked palette
      if (showLikedOnly) {
         const likedThemeIds = Array.from(new Set(likedThemes.map(t => t.themeId)));
         availableThemes = themes.filter(t => likedThemeIds.includes(t.id));
         if(availableThemes.length === 0) availableThemes = themes; // fallback
      }

      const currentThemeIndex = availableThemes.findIndex((t) => t.id === activeThemeId);
      // Fallback if not found in filtered list
      const safeThemeIndex = currentThemeIndex >= 0 ? currentThemeIndex : 0;
      const currentTheme = availableThemes[safeThemeIndex];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const availablePalettes = currentTheme.palettes;

      if(showLikedOnly) {
        const likedPalettesForTheme = likedThemes
            .filter(t => t.themeId === currentTheme.id)
            .map(t => t.paletteIndex);

        // If there are liked palettes for this theme, use only those indexes, else all
        if(likedPalettesForTheme.length > 0) {
            // We need to manage switching between specific palette indexes
            // For simplicity in this demo, if showLikedOnly is true, we might just jump to the first liked palette
            // A more robust implementation would keep track of the current liked palette index
        }
      }

      if (e.key === 'ArrowRight') {
        const nextIndex = (safeThemeIndex + 1) % availableThemes.length;
        setActiveThemeId(availableThemes[nextIndex].id);
        setActivePaletteIndex(0); // Reset palette when changing theme
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (safeThemeIndex - 1 + availableThemes.length) % availableThemes.length;
        setActiveThemeId(availableThemes[prevIndex].id);
        setActivePaletteIndex(0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const nextIndex = (activePaletteIndex + 1) % currentTheme.palettes.length;
        setActivePaletteIndex(nextIndex);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const prevIndex = (activePaletteIndex - 1 + currentTheme.palettes.length) % currentTheme.palettes.length;
        setActivePaletteIndex(prevIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeThemeId, activePaletteIndex, setActiveThemeId, setActivePaletteIndex, showLikedOnly, likedThemes]);
}
