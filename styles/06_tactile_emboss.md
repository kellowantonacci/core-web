# Tactile Emboss (Тактильное тиснение)

## Описание темы
Интерфейс физического выдавливания, известный как неоморфизм. Границы минимизированы до 1px, а глубина достигается исключительно математической игрой света и тени с использованием color-mix() для вычисления светлых и темных фасок. Токен box_shadow_inset генерирует двойную внутреннюю тень: светлую сверху слева (источник света) и темную снизу справа (зона затенения), используя light-dark() для автоматической инверсии в темной теме. Кинетика короткая (100ms) с линейным смещением translateY(1px), создающим эффект физического нажатия на упругую кнопку клавиатуры.

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>light</mode>
  <colors>
    <primary>#3B82F6</primary>
    <background>#E0E5EC</background>
    <surface>#E0E5EC</surface>
    <border>rgba(255,255,255,0.2)</border>
  </colors>
  <geometry>
    <border-radius>1rem</border-radius>
    <border-width>1px</border-width>
    <box-shadow>9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5), inset 0px 0px 0px rgba(163,177,198,0.6)</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>none</backdrop-filter>
  </effects>
  <animation>
    <transition-duration>100ms</transition-duration>
    <transition-timing-function>linear</transition-timing-function>
    <transform-active>translateY(1px)</transform-active>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Tactile Emboss (Тактильное тиснение). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
