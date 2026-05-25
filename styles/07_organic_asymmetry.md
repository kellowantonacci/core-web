# Organic Asymmetry (Органическая асимметрия)

## Описание темы
Разрушает скучные стандарты строгой ортогональной сетки. Основа геометрии — сложные, асимметричные радиусы скругления (60% 40% 30% 70% / 60% 30% 70% 40%), придающие элементам форму гальки или амебы. Тени мягкие, смешанные с currentColor для органичного слияния с контекстом. Анимации намеренно замедлены (до 800ms) с медленным затуханием, а при наведении объекты медленно увеличиваются и слегка поворачиваются (scale(1.02) rotate(1deg)), имитируя природное дыхание или течение воды.

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>light</mode>
  <colors>
    <primary>#10B981</primary>
    <background>#F0FDF4</background>
    <surface>#FFFFFF</surface>
    <border>#D1FAE5</border>
  </colors>
  <geometry>
    <border-radius>60% 40% 30% 70% / 60% 30% 70% 40%</border-radius>
    <border-width>1px</border-width>
    <box-shadow>0 10px 30px -10px currentColor</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>none</backdrop-filter>
  </effects>
  <animation>
    <transition-duration>800ms</transition-duration>
    <transition-timing-function>ease-in-out</transition-timing-function>
    <transform-hover>scale(1.02) rotate(1deg)</transform-hover>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Organic Asymmetry (Органическая асимметрия). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
