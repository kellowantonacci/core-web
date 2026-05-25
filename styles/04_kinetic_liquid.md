# Kinetic Liquid (Кинетическая жидкость)

## Описание темы
Интерфейс, спроектированный с акцентом на биологическую упругость. Полностью исключает острые углы, применяя абсолютное скругление (border_radius_base: 9999px) к каждому интерактивному узлу. Индивидуальность темы заложена в шестом измерении: использование сложной математической кривой Безье с выраженным эффектом перерегулирования (отскока) — cubic-bezier(0.34, 1.56, 0.64, 1) на протяжении 400ms. При взаимодействии элемент деформируется, масштабируясь и отклоняясь (scale(1.05) skewX(-2deg)), имитируя законы поверхностного натяжения жидкостей.

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>light</mode>
  <colors>
    <primary>#06B6D4</primary>
    <background>#F8FAFC</background>
    <surface>#FFFFFF</surface>
    <border>transparent</border>
  </colors>
  <geometry>
    <border-radius>9999px</border-radius>
    <border-width>0px</border-width>
    <box-shadow>0 4px 14px 0 rgba(6, 182, 212, 0.39)</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>none</backdrop-filter>
  </effects>
  <animation>
    <transition-duration>400ms</transition-duration>
    <transition-timing-function>cubic-bezier(0.34, 1.56, 0.64, 1)</transition-timing-function>
    <transform>scale(1.05) skewX(-2deg)</transform>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Kinetic Liquid (Кинетическая жидкость). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
