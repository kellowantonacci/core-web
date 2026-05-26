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
    activeTransform: string;
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

export const neobrutalismPalettes: Palette[] = [
  {
    id: "neobrutalism-yellow",
    label: "Yellow Pop Art",
    mode: "light",
    colors: {
      primary: "#000000",
      background: "#FFF066",
      surface: "#FFFFFF",
      border: "#000000",
      muted: "#FFECA1",
      accent: "#FF4D4D",
      success: "#52B788",
      error: "#FF4D4D",
    },
  },
  {
    id: "neobrutalism-pink",
    label: "Cyber Pink",
    mode: "light",
    colors: {
      primary: "#000000",
      background: "#FF9EBB",
      surface: "#FFFFFF",
      border: "#000000",
      muted: "#FFC2D4",
      accent: "#C77DFF",
      success: "#52B788",
      error: "#FF4D4D",
    },
  },
  ...sharedPalettes,
];

export const glassmorphismPalettes: Palette[] = [
  {
    id: "glass-aurora",
    label: "Aurora Blue",
    mode: "dark",
    colors: {
      primary: "#E0E7FF",
      background: "#0F172A",
      surface: "rgba(30, 41, 59, 0.4)",
      border: "rgba(255, 255, 255, 0.1)",
      muted: "#1E1B4B",
      accent: "#818CF8",
      success: "#10B981",
      error: "#EF4444",
    },
  },
  {
    id: "glass-rose",
    label: "Rose Quartz",
    mode: "light",
    colors: {
      primary: "#4C1D95",
      background: "#FFF1F2",
      surface: "rgba(255, 255, 255, 0.4)",
      border: "rgba(0, 0, 0, 0.1)",
      muted: "#FDE2E4",
      accent: "#EC4899",
      success: "#10B981",
      error: "#EF4444",
    },
  },
  ...sharedPalettes,
];

export const terminalPalettes: Palette[] = [
  {
    id: "terminal-green",
    label: "Phosphor Green",
    mode: "dark",
    colors: {
      primary: "#39FF14",
      background: "#0A0F0D",
      surface: "#0E1412",
      border: "#39FF14",
      muted: "#0C2511",
      accent: "#1B4D22",
      success: "#39FF14",
      error: "#FF3333",
    },
  },
  {
    id: "terminal-amber",
    label: "Phosphor Amber",
    mode: "dark",
    colors: {
      primary: "#FFB000",
      background: "#0F0C08",
      surface: "#14100A",
      border: "#FFB000",
      muted: "#2B1D0A",
      accent: "#6B4700",
      success: "#FFB000",
      error: "#FF3333",
    },
  },
  ...sharedPalettes.filter(p => p.mode === "dark"),
];

export const origamiPalettes: Palette[] = [
  {
    id: "origami-pastel",
    label: "Pastel Peach",
    mode: "light",
    colors: {
      primary: "#4A3B32",
      background: "#FFF0E5",
      surface: "#FFFBF7",
      border: "#D2B48C",
      muted: "#F5D6C6",
      accent: "#FFB7B2",
      success: "#B5EAD7",
      error: "#FF9AA2",
    },
  },
  {
    id: "origami-lavender",
    label: "Pastel Lavender",
    mode: "light",
    colors: {
      primary: "#3D3A45",
      background: "#F3E8FF",
      surface: "#FAF5FF",
      border: "#C084FC",
      muted: "#E9D5FF",
      accent: "#D6BCFA",
      success: "#C6F6D5",
      error: "#FED7D7",
    },
  },
  ...sharedPalettes.filter(p => p.mode === "light"),
];

export const diffuseGlowPalettes: Palette[] = [
  {
    id: "glow-cyberpunk",
    label: "Neon Cyberpunk",
    mode: "dark",
    colors: {
      primary: "#00FFFF",
      background: "#0D0B18",
      surface: "rgba(22, 18, 36, 0.2)",
      border: "#FF007F",
      muted: "#1B1635",
      accent: "#FF007F",
      success: "#39FF14",
      error: "#FF3333",
    },
  },
  {
    id: "glow-sunset",
    label: "Retrowave Sunset",
    mode: "dark",
    colors: {
      primary: "#FF8C00",
      background: "#1B0C1B",
      surface: "rgba(44, 17, 44, 0.2)",
      border: "#FF007F",
      muted: "#321432",
      accent: "#FF007F",
      success: "#4CAF50",
      error: "#F44336",
    },
  },
  ...sharedPalettes.filter(p => p.mode === "dark"),
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
        activeTransform: "none",
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
        activeTransform: "translate(4px, 4px)",
      },
    },
    componentRules: [
      "Buttons must have a 4px border, background fill, and offset shadow.",
      "All elements should use thick 4px borders with solid black/currentColor shadows.",
      "When active, interactive elements must translate (4px, 4px) and reduce shadow to simulate physical pressing.",
      "High contrast palettes inspired by pop-art and retro-web aesthetics.",
    ],
    palettes: neobrutalismPalettes,
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
        activeTransform: "scale(0.98)",
      },
    },
    componentRules: [
      "Borders must be ultra-thin and semi-transparent to mimic light refraction.",
      "Surfaces should use Gaussian blur (backdrop-filter) and low opacity.",
      "Soft double-layer shadows (outer blur + inner inset highlight) represent the physical glass edge.",
      "Animations must use smooth easing transitions simulating friction and light.",
    ],
    palettes: glassmorphismPalettes,
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
        activeTransform: "scale(0.94) skewX(-1deg)",
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
        activeTransform: "perspective(800px) rotateX(2deg) scale(0.97)",
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
  {
    id: "06-tactile-emboss",
    name: "Tactile Emboss",
    description:
      "Neomorphic layout simulating physical extrusion and debossing with color-mix highlights and inset shadows.",
    tokens: {
      geometry: {
        borderRadius: "1rem",
        borderWidth: "1px",
        boxShadow: "var(--theme-neomorphic-shadow)",
        activeBoxShadow: "var(--theme-neomorphic-active-shadow)",
      },
      effects: {
        backdropFilter: "none",
      },
      animation: {
        duration: "100ms",
        timingFunction: "linear",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "none",
        activeTransform: "translateY(1px)",
      },
    },
    componentRules: [
      "Surfaces must merge with background using identical background and surface tokens.",
      "Depth is established via dual light/dark drop shadows (top-left highlight + bottom-right shadow).",
      "Active state is simulated by inverting shadow offsets to inset shadows.",
      "Physical borders must be ultra-thin and blend into the embossing structure.",
    ],
    palettes: sharedPalettes,
  },
  {
    id: "07-organic-asymmetry",
    name: "Organic Asymmetry",
    description:
      "Natural forms breaking the rigid grid, using irregular border-radii and smooth breathing transitions.",
    tokens: {
      geometry: {
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        borderWidth: "1px",
        boxShadow: "0 10px 30px -10px currentColor",
        activeBoxShadow: "0 5px 15px -10px currentColor",
      },
      effects: {
        backdropFilter: "none",
      },
      animation: {
        duration: "800ms",
        timingFunction: "ease-in-out",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "scale(1.02) rotate(1deg)",
        activeTransform: "scale(0.98)",
      },
    },
    componentRules: [
      "Components must use asymmetric radii to mimic organic objects like pebbles or water drops.",
      "Borders should remain thin to let the irregular shape stand out clearly.",
      "Transitions must use long, high-damping easing to simulate liquid suspension.",
      "All interactive elements shift slightly in scale and angle to mimic physical weight.",
    ],
    palettes: sharedPalettes,
  },
  {
    id: "08-high-density-dashboard",
    name: "High-Density Dashboard",
    description:
      "Bloomberg-inspired technical density with 0.5px borders, compact spacing, zero shadows, and fast transitions.",
    tokens: {
      geometry: {
        borderRadius: "0.125rem",
        borderWidth: "0.5px",
        boxShadow: "none",
        activeBoxShadow: "none",
      },
      effects: {
        backdropFilter: "none",
      },
      animation: {
        duration: "100ms",
        timingFunction: "linear",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "none",
        activeTransform: "none",
      },
    },
    componentRules: [
      "Zero borders, zero shadows, zero radii, maximum spatial density.",
      "Layout and elements must pack data tightly without decorative blank space.",
      "Transitions are minimized to 100ms linear to ensure instant response without visual distractions.",
      "Text alignment and structural boundaries are primary cues instead of visual layers.",
    ],
    palettes: sharedPalettes,
  },
  {
    id: "09-floating-layers",
    name: "Floating Layers",
    description:
      "Aesthetic of zero gravity, using deep soft shadows, elevated layers, and vertical flight animations.",
    tokens: {
      geometry: {
        borderRadius: "2rem",
        borderWidth: "0px",
        boxShadow: "0 40px 60px -15px rgba(0,0,0,0.1)",
        activeBoxShadow: "0 15px 30px -15px rgba(0,0,0,0.1)",
      },
      effects: {
        backdropFilter: "none",
      },
      animation: {
        duration: "600ms",
        timingFunction: "ease",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "translateY(-10px)",
        activeTransform: "translateY(-2px) scale(0.99)",
      },
    },
    componentRules: [
      "Components must have no physical borders; edges are defined solely by deep ambient shadows.",
      "Hover state triggers vertical lift (negative translateY) simulating weightlessness.",
      "Spacing between cards and columns is generous to reinforce the floating layers concept.",
      "Glow boundaries and shadows soften on click to signify landing.",
    ],
    palettes: sharedPalettes,
  },
  {
    id: "10-monospaced-terminal",
    name: "Monospaced Terminal",
    description:
      "CRT monitor aesthetic with phosphor glow text-shadows, double borders, and stepped retro animations.",
    tokens: {
      geometry: {
        borderRadius: "0px",
        borderWidth: "1px",
        boxShadow: "0 0 10px currentColor, inset 0 0 10px currentColor",
        activeBoxShadow: "0 0 5px currentColor, inset 0 0 5px currentColor",
      },
      effects: {
        backdropFilter: "none",
      },
      animation: {
        duration: "50ms",
        timingFunction: "linear",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "none",
        activeTransform: "translate(1px, 1px)",
      },
    },
    componentRules: [
      "All fonts must resolve to monospaced, aligning text columns to rigid terminal lines.",
      "Borders and text use double-stroke phosphor glows using drop-shadow and text-shadow.",
      "Animations must use stepped easing functions (steps) to mimic early hardware terminal output.",
      "Surfaces should remain transparent, letting background grid lines shine through the CRT glass.",
    ],
    palettes: terminalPalettes,
  },
  {
    id: "11-folded-origami",
    name: "Folded Origami",
    description:
      "Paper-folding layout mimicking geometric creases with skew transforms and multiply blend modes.",
    tokens: {
      geometry: {
        borderRadius: "0px",
        borderWidth: "1px",
        boxShadow: "2px 4px 12px rgba(0,0,0,0.08)",
        activeBoxShadow: "1px 2px 6px rgba(0,0,0,0.08)",
      },
      effects: {
        backdropFilter: "none",
      },
      animation: {
        duration: "300ms",
        timingFunction: "ease-out",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "none",
        activeTransform: "none",
      },
    },
    componentRules: [
      "Surfaces should use light/pastel hues to mimic colored origami paper.",
      "A structural skew transform (skewY(-2deg)) must shape container boundaries.",
      "Overlapping layers must employ mix-blend-mode: multiply to simulate light absorption in paper folds.",
      "Borders remain thin and simple, avoiding rounded geometry or heavy decor.",
    ],
    palettes: origamiPalettes,
  },
  {
    id: "12-haptic-sharp",
    name: "Haptic Sharp",
    description:
      "Futuristic layout utilizing angular clip-paths, high-contrast borders, and quick click scales.",
    tokens: {
      geometry: {
        borderRadius: "0px",
        borderWidth: "2px",
        boxShadow: "none",
        activeBoxShadow: "none",
      },
      effects: {
        backdropFilter: "none",
      },
      animation: {
        duration: "50ms",
        timingFunction: "cubic-bezier(0.1, 0.9, 0.2, 1)",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "none",
        activeTransform: "scale(0.98)",
      },
    },
    componentRules: [
      "Container morphology must use polygon clip-paths to create 45-degree corner bevels.",
      "Heavy, high-contrast borders outline components without drop shadows.",
      "Active states trigger a rapid scale down (0.98) representing an tactile micro-switch.",
      "Interface geometry must remain rigid, rejecting curve-based border radius values.",
    ],
    palettes: sharedPalettes,
  },
  {
    id: "13-diffuse-glow",
    name: "Diffuse Glow",
    description:
      "Aesthetic of borderless components defined by glowing currentColor drop shadows and color-dodge blurs.",
    tokens: {
      geometry: {
        borderRadius: "50rem",
        borderWidth: "0px",
        boxShadow: "0 0 40px currentColor",
        activeBoxShadow: "0 0 20px currentColor",
      },
      effects: {
        backdropFilter: "blur(20px)",
      },
      animation: {
        duration: "400ms",
        timingFunction: "ease",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "scale(1.03)",
        activeTransform: "scale(0.97)",
      },
    },
    componentRules: [
      "Rounded contours (capsules/circles) must outline all interactive surfaces.",
      "Physical borders are prohibited; layout edges are expressed through radiant glows.",
      "Floating surfaces use Gaussian blurs and color-dodge blend mode to saturate backing layers.",
      "Shadow dimensions dynamically reflect text currentColor, maintaining perfect chroma-alignment.",
    ],
    palettes: diffuseGlowPalettes,
  },
  {
    id: "14-macro-typography",
    name: "Macro-Typography",
    description:
      "Typography-first layout where massive letterforms act as structures with zero margins and zero shadows.",
    tokens: {
      geometry: {
        borderRadius: "0px",
        borderWidth: "0px",
        boxShadow: "none",
        activeBoxShadow: "none",
      },
      effects: {
        backdropFilter: "none",
      },
      animation: {
        duration: "200ms",
        timingFunction: "ease-in-out",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "none",
        activeTransform: "none",
      },
    },
    componentRules: [
      "Eliminate card surfaces and borders; structure elements purely with white space.",
      "Scale typographic headers to extreme weights, adjusting letter-spacing and line-height.",
      "Inner paddings are minimized, forcing letters to frame boundaries.",
      "Visual separation relies entirely on bold/regular type weight contrasts.",
    ],
    palettes: sharedPalettes,
  },
  {
    id: "15-micro-contrast-grid",
    name: "Micro-Contrast Grid",
    description:
      "Subpixel grid topology where flat borders are replaced by light-dark backdrop filters.",
    tokens: {
      geometry: {
        borderRadius: "0.5rem",
        borderWidth: "0px",
        boxShadow: "none",
        activeBoxShadow: "none",
      },
      effects: {
        backdropFilter: "contrast(1.1) brightness(0.95)",
      },
      animation: {
        duration: "200ms",
        timingFunction: "linear",
        activeTranslateX: "0px",
        activeTranslateY: "0px",
        hoverTransform: "scale(1.01)",
        activeTransform: "scale(0.99)",
      },
    },
    componentRules: [
      "Surfaces must be transparent, relying on contrast/brightness filters to segment space.",
      "Physical boundaries and border dividers are replaced by subpixel grid lines.",
      "Strict stacking contexts and layer isolation isolate backing filters from bleed-out.",
      "Transitions remain short and linear to preserve visual clarity.",
    ],
    palettes: sharedPalettes,
  },
];

export const totalPlannedThemes = 15;
