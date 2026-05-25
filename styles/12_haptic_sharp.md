# Haptic Sharp (Киберпанк)

## Описание темы
Агрессивная, напряженная эстетика, где классические прямоугольники срезаются с помощью многоугольных векторных масок clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px)...), формируя скошенные углы и футуристичные фаски. Фильтры и тени отсутствуют, уступая место жестким линиям в 2px. Кинетика экстремально быстрая (50ms) с кривой cubic-bezier(0.1, 0.9, 0.2, 1), обеспечивающей агрессивный, щелкающий отклик при масштабировании (scale(0.98)).

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>dark</mode>
  <colors>
    <primary>#FDE047</primary>
    <background>#09090B</background>
    <surface>#18181B</surface>
    <border>#FDE047</border>
  </colors>
  <geometry>
    <border-radius>0px</border-radius>
    <border-width>2px</border-width>
    <box-shadow>none</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>none</backdrop-filter>
    <clip-path>polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)</clip-path>
  </effects>
  <animation>
    <transition-duration>50ms</transition-duration>
    <transition-timing-function>cubic-bezier(0.1, 0.9, 0.2, 1)</transition-timing-function>
    <transform-active>scale(0.98)</transform-active>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Haptic Sharp (Киберпанк). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
