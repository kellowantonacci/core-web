# High-Density Dashboard (Высокоплотная аналитика)

## Описание темы
Сугубо функциональная топология, спроектированная для терминалов Bloomberg, авиадиспетчерских систем и сложных аналитических дашбордов. Задача — уместить максимум информации на минимальной площади (measure_max_width: 100ch). Скругления почти отсутствуют (0.125rem), границы ультратонкие (0.5px). Тени, преломления и режимы наложения полностью удалены для обеспечения максимальной четкости текста и нулевой загрузки GPU.

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>dark</mode>
  <colors>
    <primary>#EAB308</primary>
    <background>#111827</background>
    <surface>#1F2937</surface>
    <border>#374151</border>
  </colors>
  <geometry>
    <border-radius>0.125rem</border-radius>
    <border-width>0.5px</border-width>
    <box-shadow>none</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>none</backdrop-filter>
  </effects>
  <animation>
    <transition-duration>100ms</transition-duration>
    <transition-timing-function>linear</transition-timing-function>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of High-Density Dashboard (Высокоплотная аналитика). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
