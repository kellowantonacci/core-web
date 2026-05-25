# Folded Origami (Свернутое оригами)

## Описание темы
Создает оптическую иллюзию бумаги, сложенной в трехмерном пространстве. Углы идеально острые. Основная магия скрыта в четвертом и шестом измерениях: использование mix-blend-mode: multiply заставляет слои затемнять друг друга в местах наложения, а трансформация скоса (skewY(-2deg)) в сочетании со слабыми, реалистичными тенями создает эффект физических сгибов бумажного листа.

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>light</mode>
  <colors>
    <primary>#F97316</primary>
    <background>#FAF5FF</background>
    <surface>#FFFFFF</surface>
    <border>#E5E7EB</border>
  </colors>
  <geometry>
    <border-radius>0px</border-radius>
    <border-width>1px</border-width>
    <box-shadow>2px 4px 12px rgba(0,0,0,0.08)</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>none</backdrop-filter>
    <mix-blend-mode>multiply</mix-blend-mode>
    <transform>skewY(-2deg)</transform>
  </effects>
  <animation>
    <transition-duration>300ms</transition-duration>
    <transition-timing-function>ease-out</transition-timing-function>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Folded Origami (Свернутое оригами). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
