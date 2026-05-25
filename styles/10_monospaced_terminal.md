# Monospaced Terminal (Моноширинный терминал)

## Описание темы
Отдает дань уважения ретро-эстетике старых ЭЛТ-мониторов. Полностью исключает скругления и плотные заливки. Иллюзия фосфорного свечения дисплеев достигается комбинацией text-shadow и двойной обводки box-shadow (0 0 10px currentColor, inset 0 0 10px currentColor). Кинетика практически отключена (50ms), обеспечивая мгновенный отклик, характерный для командных строк.

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>dark</mode>
  <colors>
    <primary>#4ADE80</primary>
    <background>#052e16</background>
    <surface>#064e3b</surface>
    <border>#4ADE80</border>
  </colors>
  <geometry>
    <border-radius>0px</border-radius>
    <border-width>1px</border-width>
    <box-shadow>0 0 10px currentColor, inset 0 0 10px currentColor</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>none</backdrop-filter>
  </effects>
  <animation>
    <transition-duration>50ms</transition-duration>
    <transition-timing-function>linear</transition-timing-function>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Monospaced Terminal (Моноширинный терминал). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
