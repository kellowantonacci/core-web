export interface Palette {
  id: string;
  label: string;
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    background: string;
    surface: string;
    border: string;
    muted: string;
    accent: string;
    success: string;
    error: string;
  };
}

export interface ThemeTokens {
  geometry: {
    borderRadius: string;
    borderWidth: string;
    boxShadow: string;
    activeBoxShadow: string;
  };
  effects: {
    backdropFilter: string;
  };
  animation: {
    duration: string;
    timingFunction: string;
    activeTranslateX: string;
    activeTranslateY: string;
    hoverTransform: string;
  };
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  tokens: ThemeTokens;
  componentRules: string[];
  palettes: Palette[];
}

export const sharedPalettes: Palette[] = [
  {
    id: "mono-light",
    label: "Mono Light",
    mode: "light",
    colors: {
      primary: "#000000",
      background: "#FFFFFF",
      surface: "#FFFFFF",
      border: "#000000",
      muted: "#F3F3F3",
      accent: "#EAEAEA",
      success: "#DDF7E5",
      error: "#FCE4E4",
    },
  },
  {
    id: "mono-dark",
    label: "Mono Dark",
    mode: "dark",
    colors: {
      primary: "#FFFFFF",
      background: "#111111",
      surface: "#171717",
      border: "#FFFFFF",
      muted: "#222222",
      accent: "#2D2D2D",
      success: "#102418",
      error: "#2A1212",
    },
  },
  {
    id: "mint",
    label: "Mint",
    mode: "light",
    colors: {
      primary: "#0F3B2E",
      background: "#E8F6F3",
      surface: "#FFFFFF",
      border: "#0F3B2E",
      muted: "#D1EBE5",
      accent: "#1ABC9C",
      success: "#27AE60",
      error: "#C0392B",
    },
  },
];

export const themes: ThemeConfig[] = [
  {
    id: "01-wireframe",
    name: "Wireframe",
    description:
      "Absolute minimalism with 1px borders, zero radius, zero shadow, and instant state changes for technical interfaces.",
    tokens: {
      geometry: {
        borderRadius: "0px",
        borderWidth: "1px",
        boxShadow: "none",
        activeBoxShadow: "none",
      },
      effects: {
        backdropFilter: "none",
      },
      animation: {
        duration: "0ms",
        timingFunction: "linear",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "none",
      },
    },
    componentRules: [
      "Buttons must stay flat with 1px borders and no decorative fills beyond token colors.",
      "Inputs, cards, dialogs, header, and sidebar must use rigid rectangular geometry with no shadows.",
      "All interactive feedback must be immediate without easing or spring motion.",
      "Icons must remain simple scalable SVG strokes aligned to the border-first aesthetic.",
    ],
    palettes: sharedPalettes,
  },
  {
    id: "02-neobrutalism",
    name: "Neobrutalism",
    description:
      "Graphic boldness with 4px borders, hard offset shadows, pop-art contrast, and push-in click effects.",
    tokens: {
      geometry: {
        borderRadius: "0px",
        borderWidth: "4px",
        boxShadow: "4px 4px 0px currentColor",
        activeBoxShadow: "0px 0px 0px currentColor",
      },
      effects: {
        backdropFilter: "none",
      },
      animation: {
        duration: "150ms",
        timingFunction: "ease",
        activeTranslateX: "4px",
        activeTranslateY: "4px",
        hoverTransform: "none",
      },
    },
    componentRules: [
      "Buttons must have a 4px border, background fill, and offset shadow.",
      "All elements should use thick 4px borders with solid black/currentColor shadows.",
      "When active, interactive elements must translate (4px, 4px) and reduce shadow to simulate physical pressing.",
      "High contrast palettes inspired by pop-art and retro-web aesthetics.",
    ],
    palettes: sharedPalettes,
  },
  {
    id: "03-glassmorphism",
    name: "Glassmorphism",
    description:
      "Frosted glass aesthetic featuring Gaussian blur, soft double shadows, transparency layering, and fluid easing transitions.",
    tokens: {
      geometry: {
        borderRadius: "1.5rem",
        borderWidth: "1px",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
        activeBoxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.08)",
      },
      effects: {
        backdropFilter: "blur(16px) saturate(1.2)",
      },
      animation: {
        duration: "300ms",
        timingFunction: "ease-out",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "scale(1.02)",
      },
    },
    componentRules: [
      "Borders must be ultra-thin and semi-transparent to mimic light refraction.",
      "Surfaces should use Gaussian blur (backdrop-filter) and low opacity.",
      "Soft double-layer shadows (outer blur + inner inset highlight) represent the physical glass edge.",
      "Animations must use smooth easing transitions simulating friction and light.",
    ],
    palettes: sharedPalettes,
  },
  {
    id: "04-kinetic-liquid",
    name: "Kinetic Liquid",
    description:
      "Organic fluid layout built with full rounding, shadow glow boundaries, and a springy overshoot deformation.",
    tokens: {
      geometry: {
        borderRadius: "9999px",
        borderWidth: "0px",
        boxShadow: "0 10px 30px 0 rgba(0,0,0,0.06)",
        activeBoxShadow: "0 5px 15px 0 rgba(0,0,0,0.04)",
      },
      effects: {
        backdropFilter: "none",
      },
      animation: {
        duration: "400ms",
        timingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "scale(1.06) skewX(-3deg)",
      },
    },
    componentRules: [
      "All corners must be fully rounded (capsule shapes) without exception.",
      "No physical borders should outline components; space and depth define boundaries.",
      "Hover interactions must trigger a bouncy spring deformation (scale + skew).",
      "Soft, large glow shadows anchor elements on a clean canvas.",
    ],
    palettes: sharedPalettes,
  },
  {
    id: "05-spatial-ui",
    name: "Spatial UI",
    description:
      "XR-inspired depth modeling using floating Z-axis elevations, deep soft drop-shadows, and 3D tilting hover behaviors.",
    tokens: {
      geometry: {
        borderRadius: "1rem",
        borderWidth: "1px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        activeBoxShadow: "0 10px 20px -10px rgba(0,0,0,0.2)",
      },
      effects: {
        backdropFilter: "none",
      },
      animation: {
        duration: "500ms",
        timingFunction: "ease-out",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "perspective(800px) rotateX(4deg) scale(1.03)",
      },
    },
    componentRules: [
      "Deep perspective and offset shadow elevation represent depth on the Z-axis.",
      "Interactive items must tilt slightly (rotateX) on hover, responding like suspended 3D panels.",
      "Rounded corners and crisp borders outline components cleanly in a floating dark space.",
      "Generous spacing and transition ease mimic volumetric weight.",
    ],
    palettes: sharedPalettes,
  },
];

export const totalPlannedThemes = 15;
