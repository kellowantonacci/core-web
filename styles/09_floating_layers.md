# Floating Layers (Плавающие слои)

## Описание темы
Эффект нулевой гравитации. Элементы интерфейса семантически отдалены от фона и друг от друга огромными отступами (margin/gap до 4rem) и мягкими тенями с экстра-глубоким падением (0 40px 60px -15px). При взаимодействии кинетика заставляет элемент буквально взлетать (translateY(-10px)) на протяжении 600ms, подчеркивая невесомость конструкций.

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>light</mode>
  <colors>
    <primary>#6366F1</primary>
    <background>#F3F4F6</background>
    <surface>#FFFFFF</surface>
    <border>transparent</border>
  </colors>
  <geometry>
    <border-radius>2rem</border-radius>
    <border-width>0px</border-width>
    <box-shadow>0 40px 60px -15px rgba(0,0,0,0.1)</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>none</backdrop-filter>
  </effects>
  <animation>
    <transition-duration>600ms</transition-duration>
    <transition-timing-function>ease</transition-timing-function>
    <transform-hover>translateY(-10px)</transform-hover>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Floating Layers (Плавающие слои). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
