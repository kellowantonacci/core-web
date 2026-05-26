import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themes } from '@/config/themes';

type ThemeStore = {
  activeThemeIndex: number;
  activePaletteIndex: number;
  likedKeys: string[];
  showLikedOnly: boolean;
  nextTheme: () => void;
  previousTheme: () => void;
  nextPalette: () => void;
  previousPalette: () => void;
  selectPalette: (paletteIndex: number) => void;
  toggleLiked: () => void;
  resetLiked: () => void;
  toggleLikedFilter: () => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      activeThemeIndex: 0,
      activePaletteIndex: 0,
      likedKeys: [],
      showLikedOnly: false,
      nextTheme: () => {
        const { activeThemeIndex } = get();
        set({
          activeThemeIndex: (activeThemeIndex + 1) % themes.length,
          activePaletteIndex: 0,
        });
      },
      previousTheme: () => {
        const { activeThemeIndex } = get();
        set({
          activeThemeIndex:
            (activeThemeIndex - 1 + themes.length) % themes.length,
          activePaletteIndex: 0,
        });
      },
      nextPalette: () => {
        const { activeThemeIndex, activePaletteIndex } = get();
        const paletteCount = themes[activeThemeIndex].palettes.length;
        set({ activePaletteIndex: (activePaletteIndex + 1) % paletteCount });
      },
      previousPalette: () => {
        const { activeThemeIndex, activePaletteIndex } = get();
        const paletteCount = themes[activeThemeIndex].palettes.length;
        set({
          activePaletteIndex: (activePaletteIndex - 1 + paletteCount) % paletteCount,
        });
      },
      selectPalette: (paletteIndex) => set({ activePaletteIndex: paletteIndex }),
      toggleLiked: () => {
        const { activeThemeIndex, activePaletteIndex, likedKeys } = get();
        const theme = themes[activeThemeIndex];
        const palette = theme.palettes[activePaletteIndex];
        const key = `${theme.id}:${palette.id}`;
        const exists = likedKeys.includes(key);

        set({
          likedKeys: exists ? likedKeys.filter((item) => item !== key) : [...likedKeys, key],
        });
      },
      resetLiked: () => set({ likedKeys: [], showLikedOnly: false }),
      toggleLikedFilter: () => set((state) => ({ showLikedOnly: !state.showLikedOnly })),
    }),
    {
      name: "core-web-theme-store",
      partialize: (state) => ({
        activeThemeIndex: state.activeThemeIndex,
        activePaletteIndex: state.activePaletteIndex,
        likedKeys: state.likedKeys,
        showLikedOnly: state.showLikedOnly,
      }),
    },
  )
);
