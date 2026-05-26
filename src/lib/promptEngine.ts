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
    <muted>${palette.colors.muted}</muted>
    <accent>${palette.colors.accent}</accent>
    <success>${palette.colors.success}</success>
    <error>${palette.colors.error}</error>
  </colors>
  <geometry>
    <border-radius>${theme.tokens.geometry.borderRadius}</border-radius>
    <border-width>${theme.tokens.geometry.borderWidth}</border-width>
    <box-shadow>${theme.tokens.geometry.boxShadow}</box-shadow>
    <active-box-shadow>${theme.tokens.geometry.activeBoxShadow}</active-box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>${theme.tokens.effects.backdropFilter}</backdrop-filter>
  </effects>
  <animation>
    <transition-duration>${theme.tokens.animation.duration}</transition-duration>
    <transition-timing-function>${theme.tokens.animation.timingFunction}</transition-timing-function>
    <active-translate-x>${theme.tokens.animation.activeTranslateX}</active-translate-x>
    <active-translate-y>${theme.tokens.animation.activeTranslateY}</active-translate-y>
    <hover-transform>${theme.tokens.animation.hoverTransform}</hover-transform>
    <active-transform>${theme.tokens.animation.activeTransform}</active-transform>
  </animation>
</design_tokens>

<components_override>
${theme.componentRules.map((rule) => `  <rule>${rule}</rule>`).join("\n")}
</components_override>`;
}
