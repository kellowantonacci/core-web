# Spatial UI (Пространственный интерфейс)

## Описание темы
Разработан для сред расширенной реальности (XR) и глубоко эмулирует Z-пространство. Геометрические зазоры увеличены (spatial_gap_base: 3rem) для обеспечения четкой визуальной сепарации слоев. Пятое измерение гипертрофировано: элементы получают transform: translateZ(50px) и огромный z-index. Тени симулируют глубокое падение (0 25px 50px -12px). Кинетика включает трехмерные вращения при наведении (rotateX(5deg)), что заставляет интерфейс вести себя как физические панели, подвешенные в пустом пространстве.

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>dark</mode>
  <colors>
    <primary>#EC4899</primary>
    <background>#000000</background>
    <surface>#18181B</surface>
    <border>#27272A</border>
  </colors>
  <geometry>
    <border-radius>1rem</border-radius>
    <border-width>1px</border-width>
    <box-shadow>0 25px 50px -12px rgba(0,0,0,0.5)</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>none</backdrop-filter>
    <transform>translateZ(50px)</transform>
  </effects>
  <animation>
    <transition-duration>500ms</transition-duration>
    <transition-timing-function>ease-out</transition-timing-function>
    <transform-hover>rotateX(5deg) scale(1.05)</transform-hover>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Spatial UI (Пространственный интерфейс). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
