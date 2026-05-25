export interface Palette {
  name: string;
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    background: string;
    surface: string;
    border: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    ring: string;
  };
}

export interface ThemeTokens {
  geometry: {
    borderRadius: string;
    borderWidth: string;
    boxShadow: string;
  };
  effects: {
    backdropFilter: string;
  };
  animation: {
    transitionDuration: string;
    transitionTimingFunction: string;
  };
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  tokens: ThemeTokens;
  palettes: Palette[];
}

export const wireframePalettes: Palette[] = [
  {
    name: 'Classic Black & White',
    mode: 'light',
    colors: {
      primary: '#000000',
      background: '#FFFFFF',
      surface: '#FFFFFF',
      border: '#000000',
      foreground: '#000000',
      muted: '#f4f4f5',
      mutedForeground: '#71717a',
      ring: '#000000',
    },
  },
  {
    name: 'Hacker Green',
    mode: 'dark',
    colors: {
      primary: '#00ff00',
      background: '#000000',
      surface: '#000000',
      border: '#00ff00',
      foreground: '#00ff00',
      muted: '#09090b',
      mutedForeground: '#00cc00',
      ring: '#00ff00',
    },
  },
  {
    name: 'Blueprint Blue',
    mode: 'light',
    colors: {
      primary: '#ffffff',
      background: '#003366',
      surface: '#003366',
      border: '#ffffff',
      foreground: '#ffffff',
      muted: '#002244',
      mutedForeground: '#b3d1ff',
      ring: '#ffffff',
    },
  }
];

export const themes: ThemeConfig[] = [
  {
    id: 'wireframe',
    name: 'Wireframe',
    description: 'Каркасная топология. Абсолютный минимализм, нулевое скругление, тонкие границы.',
    tokens: {
      geometry: {
        borderRadius: '0px',
        borderWidth: '1px',
        boxShadow: 'none',
      },
      effects: {
        backdropFilter: 'none',
      },
      animation: {
        transitionDuration: '0ms',
        transitionTimingFunction: 'linear',
      },
    },
    palettes: wireframePalettes,
  },
  // Placeholders for other themes
];
