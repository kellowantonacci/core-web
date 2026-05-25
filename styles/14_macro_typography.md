# Macro-Typography (Макро-типографика)

## Описание темы
Текст выступает в роли основного интерфейса и контейнера. Внутренние физические отступы блоков сведены к минимуму (0.25em 0). Иерархия строится исключительно на типографических масштабах: гигантские размеры шрифта, контроль над line-height и letter-spacing. Тени и оптика отключены, структура зависит от плотности литер и пустого пространства вокруг них (негативного пространства).

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
    <surface>transparent</surface>
    <border>#E5E7EB</border>
  </colors>
  <geometry>
    <border-radius>0px</border-radius>
    <border-width>0px</border-width>
    <box-shadow>none</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>none</backdrop-filter>
  </effects>
  <animation>
    <transition-duration>200ms</transition-duration>
    <transition-timing-function>ease-in-out</transition-timing-function>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Macro-Typography (Макро-типографика). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
