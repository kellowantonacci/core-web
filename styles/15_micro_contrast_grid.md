# Micro-Contrast Grid (Микроконтрастная сетка)

## Описание темы
Опирается на субпиксельную точность. Физические непрозрачные заливки фона заменяются мощным оптическим фильтром контраста и яркости (backdrop-filter: contrast(1.1) brightness(0.95)). Этот фильтр едва заметно изменяет структуру пикселей фона под элементом, создавая разграничение плоскостей без применения теней или тяжелых границ. Изоляция слоев обязательна, а кинетика поддерживает строгий, линейный 200-миллисекундный переход.

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>light</mode>
  <colors>
    <primary>#2563EB</primary>
    <background>#FAFAFA</background>
    <surface>transparent</surface>
    <border>transparent</border>
  </colors>
  <geometry>
    <border-radius>0.5rem</border-radius>
    <border-width>0px</border-width>
    <box-shadow>none</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>contrast(1.1) brightness(0.95)</backdrop-filter>
  </effects>
  <animation>
    <transition-duration>200ms</transition-duration>
    <transition-timing-function>linear</transition-timing-function>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Micro-Contrast Grid (Микроконтрастная сетка). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
