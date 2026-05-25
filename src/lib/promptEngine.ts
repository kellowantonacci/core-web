import { ThemeConfig, Palette } from '@/config/themes';

export function generatePrompt(theme: ThemeConfig, palette: Palette): string {
  return `<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>${palette.mode}</mode>
  <colors>
    <primary>${palette.colors.primary}</primary>
    <background>${palette.colors.background}</background>
    <surface>${palette.colors.surface}</surface>
    <border>${palette.colors.border}</border>
  </colors>
  <geometry>
    <border-radius>${theme.tokens.geometry.borderRadius}</border-radius>
    <border-width>${theme.tokens.geometry.borderWidth}</border-width>
    <box-shadow>${theme.tokens.geometry.boxShadow}</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>${theme.tokens.effects.backdropFilter}</backdrop-filter>
  </effects>
  <animation>
    <transition-duration>${theme.tokens.animation.transitionDuration}</transition-duration>
    <transition-timing-function>${theme.tokens.animation.transitionTimingFunction}</transition-timing-function>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of ${theme.name} (${theme.description}). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
`;
}
