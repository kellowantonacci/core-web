# Diffuse Glow (Диффузное свечение)

## Описание темы
Топология, где границы элементов размываются, формируя барьер из света. Геометрия использует круговые формы (50%). Огромные тени с нулевым смещением смешиваются с currentColor, а оптика и четвертое измерение объединяют backdrop-filter: blur(20px) с режимом композитинга mix-blend-mode: color-dodge. Это заставляет цвета переднего плана экспоненциально осветлять фон, генерируя мягкие, светящиеся ореолы вокруг элементов.

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>dark</mode>
  <colors>
    <primary>#818CF8</primary>
    <background>#020617</background>
    <surface>rgba(129, 140, 248, 0.1)</surface>
    <border>transparent</border>
  </colors>
  <geometry>
    <border-radius>50rem</border-radius>
    <border-width>0px</border-width>
    <box-shadow>0 0 40px currentColor</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>blur(20px)</backdrop-filter>
    <mix-blend-mode>color-dodge</mix-blend-mode>
  </effects>
  <animation>
    <transition-duration>400ms</transition-duration>
    <transition-timing-function>ease</transition-timing-function>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Diffuse Glow (Диффузное свечение). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
