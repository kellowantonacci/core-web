# Glassmorphism (Глассморфизм)

## Описание темы
Опирается на физическое преломление света и мягкую искусственную глубину. Основная морфология сглажена (border_radius_base: 1.5rem). Третье измерение (оптика) доминирует благодаря правилу backdrop-filter: blur(16px) saturate(1.2), которое делает фон матовым, усиливая его цветовую насыщенность для контраста. Иллюзия стеклянных поверхностей поддерживается составными тенями: мягкой внешней проекцией (0 8px 32px rgba(0, 0, 0, 0.1)) и ультратонким внутренним бликом на границе, вычисляемым через inset 0 0 0 1px color-mix(...). Изоляция слоя здесь критически важна для предотвращения утечки фильтра Гаусса.

## Prompt for AI Generation (v0, Lovable, Bolt.new, Cursor)
Скопируйте этот промпт, чтобы сгенерировать интерфейс в данном стиле:

```xml
<system_instruction>
You are an expert UI/UX developer. Build the interface using Next.js, Tailwind CSS, and shadcn/ui. Strictly follow the design tokens below. Do not hallucinate colors or spacings. Ensure minimalist, scalable SVG usage for icons.
</system_instruction>

<design_tokens>
  <mode>dark</mode>
  <colors>
    <primary>#A855F7</primary>
    <background>#0F172A</background>
    <surface>rgba(255, 255, 255, 0.05)</surface>
    <border>rgba(255, 255, 255, 0.1)</border>
  </colors>
  <geometry>
    <border-radius>1.5rem</border-radius>
    <border-width>1px</border-width>
    <box-shadow>0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255,255,255,0.1)</box-shadow>
  </geometry>
  <effects>
    <backdrop-filter>blur(16px) saturate(1.2)</backdrop-filter>
  </effects>
  <animation>
    <transition-duration>300ms</transition-duration>
    <transition-timing-function>ease-out</transition-timing-function>
  </animation>
</design_tokens>

<components_override>
  <!-- Implement specific UI components following the strict rules of Glassmorphism (Глассморфизм). -->
  <!-- Apply geometry, effects, and animations to Buttons, Inputs, Cards, etc. -->
</components_override>
```
