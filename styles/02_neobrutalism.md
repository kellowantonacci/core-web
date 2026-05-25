# Neobrutalism (Необрутализм)

## Описание темы
Графичная жесткость, отсылающая к ранним эпохам веб-дизайна, но переосмысленная через современные параметры. Геометрия гипертрофирована: используются сверхтолстые границы (border_width_base: 4px). Ключевым оптическим решением является использование жестких, неразмытых смещений в box-shadow и drop-shadow (например, 4px 4px 0px currentColor), которые имитируют массивные контуры в стиле поп-арт. Топология слоев требует строгой изоляции (isolation: isolate), а кинетика характеризуется короткими, отрывистыми микро-анимациями (150ms), где элементы буквально вдавливаются в плоскость экрана на 2 пикселя по осям X и Y (translate(2px, 2px)).

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>light</mode>
  <colors>
    <primary>#FF3366</primary>
    <background>#FFF5E1</background>
    <surface>#FFFFFF</surface>
    <border>#000000</border>
  </colors>
  <geometry>
    <border-radius>0px</border-radius>
    <border-width>4px</border-width>
    <box-shadow>4px 4px 0px currentColor</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>none</backdrop-filter>
  </effects>
  <animation>
    <transition-duration>150ms</transition-duration>
    <transition-timing-function>ease</transition-timing-function>
    <transform>translate(2px, 2px)</transform>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Neobrutalism (Необрутализм). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
