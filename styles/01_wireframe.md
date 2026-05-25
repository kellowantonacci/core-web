# Wireframe (Каркасная топология)

## Описание темы
Эта топология исповедует абсолютный минимализм, намеренно отрицая физический объем и плотные заливки поверхностей. Структурная целостность удерживается исключительно на тончайших границах (border-width_base: 1px) и нулевом скруглении углов (border_radius_base: 0). Вектор развития направлен на снижение когнитивной нагрузки пользователя за счет устранения визуального шума. Кинетическое измерение сведено к абсолютному нулю (transition_duration_base: 0ms с линейной кривой), обеспечивая мгновенную, машинную реакцию на наведение и фокус, что идеально подходит для сугубо технических, административных интерфейсов.

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>light</mode>
  <colors>
    <primary>#000000</primary>
    <background>#FFFFFF</background>
    <surface>#FFFFFF</surface>
    <border>#000000</border>
  </colors>
  <geometry>
    <border-radius>0px</border-radius>
    <border-width>1px</border-width>
    <box-shadow>none</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>none</backdrop-filter>
  </effects>
  <animation>
    <transition-duration>0ms</transition-duration>
    <transition-timing-function>linear</transition-timing-function>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Wireframe (Каркасная топология). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
