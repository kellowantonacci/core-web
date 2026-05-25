import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LikedTheme {
  themeId: string;
  paletteIndex: number;
}

interface ThemeState {
  activeThemeId: string;
  activePaletteIndex: number;
  likedThemes: LikedTheme[];
  showLikedOnly: boolean;

  setActiveThemeId: (id: string) => void;
  setActivePaletteIndex: (index: number) => void;

  toggleLikeCurrentTheme: () => void;
  clearLikedThemes: () => void;
  setShowLikedOnly: (show: boolean) => void;

  nextTheme: (_totalThemes: number) => void;
  prevTheme: (_totalThemes: number) => void;
  nextPalette: (totalPalettes: number) => void;
  prevPalette: (totalPalettes: number) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      activeThemeId: 'wireframe', // Initial theme
      activePaletteIndex: 0,
      likedThemes: [],
      showLikedOnly: false,

      setActiveThemeId: (id) => set({ activeThemeId: id }),
      setActivePaletteIndex: (index) => set({ activePaletteIndex: index }),

      toggleLikeCurrentTheme: () => {
        const { activeThemeId, activePaletteIndex, likedThemes } = get();
        const exists = likedThemes.find(
          (t) => t.themeId === activeThemeId && t.paletteIndex === activePaletteIndex
        );

        if (exists) {
          set({
            likedThemes: likedThemes.filter(
              (t) => !(t.themeId === activeThemeId && t.paletteIndex === activePaletteIndex)
            ),
          });
        } else {
          set({
            likedThemes: [...likedThemes, { themeId: activeThemeId, paletteIndex: activePaletteIndex }],
          });
        }
      },

      clearLikedThemes: () => set({ likedThemes: [] }),

      setShowLikedOnly: (show) => set({ showLikedOnly: show }),

      nextTheme: (_totalThemes) => {
        // Implement simple increment for now, logic will depend on themes array
        // We'll manage this in a hook or component passing the length
      },
      prevTheme: (_totalThemes) => {},
      nextPalette: (totalPalettes) => {
        const { activePaletteIndex } = get();
        set({ activePaletteIndex: (activePaletteIndex + 1) % totalPalettes });
      },
      prevPalette: (totalPalettes) => {
        const { activePaletteIndex } = get();
        set({ activePaletteIndex: (activePaletteIndex - 1 + totalPalettes) % totalPalettes });
      },
    }),
    {
      name: 'core-web-theme-storage',
    }
  )
);
