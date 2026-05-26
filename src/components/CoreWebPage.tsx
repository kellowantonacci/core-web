"use client";

import {
  Copy,
  Heart,
  LoaderCircle,
  Menu,
  Search,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { generatePrompt } from "@/lib/promptEngine";
import { themes, totalPlannedThemes } from "@/config/themes";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/useThemeStore";

function likedPromptBundle(likedKeys: string[]) {
  return likedKeys
    .map((key) => {
      const [themeId, paletteId] = key.split(":");
      const theme = themes.find((item) => item.id === themeId);
      const palette = theme?.palettes.find((item) => item.id === paletteId);

      if (!theme || !palette) {
        return null;
      }

      return `<!-- ${theme.name} / ${palette.label} -->\n${generatePrompt(theme, palette)}`;
    })
    .filter(Boolean)
    .join("\n\n");
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-theme border-[var(--theme-border)] bg-[var(--theme-surface)] rounded-theme shadow-theme transition-all duration-theme ease-theme theme-backdrop">
      <div className="border-b-theme border-[var(--theme-border)] px-4 py-3 text-xs uppercase tracking-[0.2em]">
        {title}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function CoreWebPage() {
  const {
    activeThemeIndex,
    activePaletteIndex,
    likedKeys,
    showLikedOnly,
    nextTheme,
    previousTheme,
    nextPalette,
    previousPalette,
    selectPalette,
    toggleLiked,
    resetLiked,
    toggleLikedFilter,
  } = useThemeStore();

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedLiked, setCopiedLiked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [switchEnabled, setSwitchEnabled] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [radioValue, setRadioValue] = useState("a");
  const timeoutRef = useRef<number | null>(null);

  // Подключаем кастомный хук навигации с клавиатуры
  useKeyboardNavigation();

  const theme = themes[activeThemeIndex] ?? themes[0];
  const palette = theme.palettes[activePaletteIndex] ?? theme.palettes[0];
  const activeKey = `${theme.id}:${palette.id}`;
  const isLiked = likedKeys.includes(activeKey);
  const prompt = generatePrompt(theme, palette);
  const themeNumber = String(activeThemeIndex + 1).padStart(2, "0");
  const paletteCards = theme.palettes.map((item, index) => ({
    index,
    palette: item,
    key: `${theme.id}:${item.id}`,
  }));
  const visiblePaletteCards = showLikedOnly
    ? paletteCards.filter((item) => likedKeys.includes(item.key))
    : paletteCards;
  const textState = textValue.trim().length === 0 ? "idle" : textValue.trim().length < 4 ? "error" : "success";
  const textareaState = textareaValue.trim().length === 0 ? "idle" : textareaValue.trim().length < 12 ? "error" : "success";

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function copyText(value: string, type: "single" | "liked") {
    if (!value.trim()) {
      return;
    }

    await navigator.clipboard.writeText(value);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    if (type === "single") {
      setCopiedPrompt(true);
      setCopiedLiked(false);
    } else {
      setCopiedLiked(true);
      setCopiedPrompt(false);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopiedPrompt(false);
      setCopiedLiked(false);
    }, 1600);
  }

  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <main
        className="relative min-h-screen bg-[var(--theme-background)] text-[var(--theme-foreground)] overflow-hidden"
        style={{ transitionDuration: "0ms", transitionTimingFunction: "linear" }}
      >
        {/* Ambient grid background */}
        <div
          className="pointer-events-none absolute inset-0 theme-grid-bg transition-opacity duration-1000 ease-in-out"
          style={{ opacity: `calc(var(--theme-decorations-opacity, 0.15) * 0.45)` }}
        />

        {/* Ambient glow blobs */}
        <div
          className="pointer-events-none absolute -left-48 -top-48 h-96 w-96 rounded-full bg-[var(--theme-accent)] blur-[100px] transition-all duration-1000 ease-in-out"
          style={{ opacity: `calc(var(--theme-decorations-opacity, 0.15) * 0.8)` }}
        />
        <div
          className="pointer-events-none absolute -right-48 -bottom-48 h-96 w-96 rounded-full bg-[var(--theme-primary)] blur-[120px] transition-all duration-1000 ease-in-out"
          style={{ opacity: `calc(var(--theme-decorations-opacity, 0.15) * 0.6)` }}
        />

        <div className="relative mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-4 p-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="border-theme border-[var(--theme-border)] bg-[var(--theme-surface)] rounded-theme shadow-theme transition-all duration-theme ease-theme theme-backdrop">
            <div className="border-b-theme border-[var(--theme-border)] px-4 py-4">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--theme-foreground)]/65">Core-web</div>
              <div className="mt-2 text-2xl font-semibold">Стиль {themeNumber}</div>
              <p className="mt-3 text-sm leading-6">{theme.description}</p>
            </div>

            <div className="space-y-4 p-4 text-sm">
              <div className="space-y-2 border-theme border-[var(--theme-border)] p-3 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--theme-foreground)]/65">Навигация</div>
                <div>Стрелки ← / →: переключить геометрию темы</div>
                <div>Стрелки ↑ / ↓: переключить цветовую палитру</div>
              </div>

              <div className="space-y-2 border-theme border-[var(--theme-border)] p-3 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--theme-foreground)]/65">Область охвата</div>
                <div>Реализовано: {themes.length} из {totalPlannedThemes} тем</div>
                <div>Тема: {theme.name}</div>
                <div>Палитра: {palette.label}</div>
              </div>

              <div className="space-y-2 border-theme border-[var(--theme-border)] p-3 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--theme-foreground)]/65">Стек технологий</div>
                <div>Next.js 16 App Router</div>
                <div>Tailwind CSS v4 (Rust Engine)</div>
                <div>Radix UI + Base UI</div>
                <div>Хранилище Zustand (Persist)</div>
              </div>

              <div className="space-y-2 border-theme border-[var(--theme-border)] p-3 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--theme-foreground)]/65">Токены геометрии</div>
                <div>Радиус: {theme.tokens.geometry.borderRadius}</div>
                <div>Толщина рамки: {theme.tokens.geometry.borderWidth}</div>
                <div>Тени: {theme.tokens.geometry.boxShadow}</div>
                <div>Длительность: {theme.tokens.animation.duration}</div>
              </div>
            </div>
          </aside>

          <div className="space-y-4">
            <header className="border-theme border-[var(--theme-border)] bg-[var(--theme-surface)] rounded-theme shadow-theme transition-all duration-theme ease-theme theme-backdrop">
              <div className="flex flex-col gap-3 border-b-theme border-[var(--theme-border)] px-4 py-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--theme-foreground)]/65">Интерактивная витрина</div>
                  <h1 className="mt-2 text-3xl font-semibold">Система тем {theme.name}</h1>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={previousTheme}>Пред. тема</Button>
                  <Button variant="outline" onClick={nextTheme}>След. тема</Button>
                  <Button variant="secondary" onClick={toggleLiked}>
                    <Heart className={cn("h-4 w-4", isLiked && "fill-current text-red-500")} />
                    {isLiked ? "В избранном" : "В избранное"}
                  </Button>
                  <Button variant="secondary" onClick={toggleLikedFilter}>
                    {showLikedOnly ? "Показать все" : "Только избранные"}
                  </Button>
                  <Button variant="outline" onClick={resetLiked}>Сбросить лайки</Button>
                  <Button onClick={() => copyText(prompt, "single")}>
                    <Copy className="h-4 w-4" />
                    {copiedPrompt ? "Скопировано!" : "Копировать промпт"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyText(likedPromptBundle(likedKeys), "liked")}
                    disabled={likedKeys.length === 0}
                  >
                    <Copy className="h-4 w-4" />
                    {copiedLiked ? "Скопировано!" : "Копировать все лайкнутые"}
                  </Button>
                </div>
              </div>

              <div className="grid gap-[var(--theme-border-width)] bg-[var(--theme-border)] md:grid-cols-4">
                {[
                  ["Тема", theme.name],
                  ["Цветовая палитра", palette.label],
                  ["В избранном", String(likedKeys.length)],
                  ["Фильтрация", showLikedOnly ? "Только избранное" : "Все пресеты"],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[var(--theme-surface)] px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.2em] text-[var(--theme-foreground)]/60">{label}</div>
                    <div className="mt-2 text-lg">{value}</div>
                  </div>
                ))}
              </div>
            </header>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-4">
                <Section title="Коллекция пресетов">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 text-sm">
                      <Button variant="outline" onClick={previousPalette}>Пред. палитра</Button>
                      <Button variant="outline" onClick={nextPalette}>След. палитра</Button>
                      <div className="border-theme border-[var(--theme-border)] px-3 py-2 rounded-theme shadow-theme transition-all duration-theme ease-theme bg-[var(--theme-surface)]">
                        Доступно пресетов: {visiblePaletteCards.length}
                      </div>
                    </div>

                    {visiblePaletteCards.length === 0 ? (
                      <div className="border-theme border-[var(--theme-border)] p-4 text-sm leading-6 rounded-theme shadow-theme transition-all duration-theme ease-theme bg-[var(--theme-surface)]">
                        Пока нет пресетов в избранном. Отметьте сердечком одну или несколько палитр в шапке и попробуйте снова.
                      </div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {visiblePaletteCards.map(({ index, palette: presetPalette, key }) => {
                          const selected = index === activePaletteIndex;
                          const liked = likedKeys.includes(key);

                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => selectPalette(index)}
                              className={cn(
                                "border-theme border-[var(--theme-border)] p-4 text-left outline-none rounded-theme shadow-theme hover:bg-[var(--theme-muted)] theme-interactive bg-[var(--theme-surface)]",
                                selected && "bg-[var(--theme-muted)] border-[var(--theme-foreground)]",
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--theme-foreground)]/65">{presetPalette.mode === "dark" ? "Темный" : "Светлый"}</div>
                                  <div className="mt-2 text-lg font-medium">{presetPalette.label}</div>
                                </div>
                                <span className="border-theme border-[var(--theme-border)] px-2 py-1 text-xs uppercase rounded-theme">
                                  {liked ? "Лайкнут" : selected ? "Активен" : "Пресет"}
                                </span>
                              </div>

                              <div className="mt-4 grid grid-cols-4 gap-2">
                                {[
                                  ["primary", presetPalette.colors.primary],
                                  ["background", presetPalette.colors.background],
                                  ["surface", presetPalette.colors.surface],
                                  ["border", presetPalette.colors.border],
                                ].map(([name, color]) => (
                                  <span
                                    key={name}
                                    className="h-10 border-theme border-[var(--theme-border)] rounded-theme"
                                    style={{ background: color }}
                                  />
                                ))}
                              </div>

                              <div className="mt-4 space-y-1 text-xs text-[var(--theme-foreground)]/75">
                                <div>Текст: {presetPalette.colors.primary}</div>
                                <div>Фон: {presetPalette.colors.background}</div>
                                <div>Рамка: {presetPalette.colors.border}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </Section>

                <div className="grid gap-4 lg:grid-cols-2">
                  <Section title="Кнопки (Buttons)">
                    <div className="flex flex-wrap gap-3">
                      <Button>Основная</Button>
                      <Button variant="secondary">Вторичная</Button>
                      <Button variant="outline">Контурная</Button>
                      <Button variant="ghost">Призрачная</Button>
                      <Button variant="link">Ссылка</Button>
                      <Button disabled>Отключена</Button>
                      <Button>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Загрузка
                      </Button>
                    </div>
                  </Section>

                  <Section title="Поля ввода (Inputs)">
                    <div className="space-y-3">
                      <Input
                        value={textValue}
                        onChange={(event) => setTextValue(event.target.value)}
                        className={cn(
                          textState === "error" && "bg-[var(--theme-error)]!",
                          textState === "success" && "bg-[var(--theme-success)]!",
                        )}
                        placeholder="Текстовое поле ввода"
                      />
                      <div className="flex h-10 items-center gap-2 border-theme border-[var(--theme-border)] px-3 bg-[var(--theme-surface)] rounded-theme shadow-theme transition-all duration-theme ease-theme">
                        <Search className="h-4 w-4 text-[var(--theme-foreground)]/50" />
                        <input
                          className="w-full border-0 bg-transparent p-0 outline-none text-sm placeholder:text-[var(--theme-foreground)]/50"
                          placeholder="Поиск с иконкой"
                        />
                      </div>
                      <Textarea
                        value={textareaValue}
                        onChange={(event) => setTextareaValue(event.target.value)}
                        className={cn(
                          "min-h-24",
                          textareaState === "error" && "bg-[var(--theme-error)]!",
                          textareaState === "success" && "bg-[var(--theme-success)]!",
                        )}
                        placeholder="Многострочный ввод (Textarea)"
                      />
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="border-theme border-[var(--theme-border)] p-3 text-xs rounded-theme shadow-theme bg-[var(--theme-error)] text-[var(--theme-foreground)]">
                          Ошибка ввода: минимум 4 символа
                        </div>
                        <div className="border-theme border-[var(--theme-border)] p-3 text-xs rounded-theme shadow-theme bg-[var(--theme-success)] text-[var(--theme-foreground)]">
                          Успех ввода: минимум 12 символов
                        </div>
                      </div>
                    </div>
                  </Section>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <Section title="Выбор / Свитч / Чекбокс / Радио">
                    <div className="space-y-4">
                      <Select defaultValue="default">
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите вариант" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">По умолчанию</SelectItem>
                          <SelectItem value="compact">Компактный</SelectItem>
                          <SelectItem value="strict">Строгий режим</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="flex items-center justify-between border-theme border-[var(--theme-border)] px-3 py-2 bg-[var(--theme-surface)] rounded-theme shadow-theme transition-all duration-theme ease-theme">
                        <span>Переключатель темы</span>
                        <Switch
                          checked={switchEnabled}
                          onCheckedChange={setSwitchEnabled}
                        />
                      </div>

                      <label className="flex items-center gap-3 border-theme border-[var(--theme-border)] px-3 py-2 bg-[var(--theme-surface)] rounded-theme shadow-theme hover:bg-[var(--theme-muted)] cursor-pointer theme-interactive">
                        <Checkbox
                          checked={checkboxChecked}
                          onCheckedChange={(checked) => setCheckboxChecked(checked === true)}
                        />
                        Выбор чекбокса
                      </label>

                      <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                        {[
                          ["a", "Вариант А"],
                          ["b", "Вариант Б"],
                        ].map(([value, label]) => (
                          <label key={value} className="flex items-center gap-3 border-theme border-[var(--theme-border)] px-3 py-2 bg-[var(--theme-surface)] rounded-theme shadow-theme hover:bg-[var(--theme-muted)] cursor-pointer theme-interactive">
                            <RadioGroupItem value={value} />
                            {label}
                          </label>
                        ))}
                      </RadioGroup>
                    </div>
                  </Section>

                  <Section title="Карточки / Бейджи / Тултипы">
                    <div className="space-y-3">
                      <div className="border-theme border-[var(--theme-border)] p-4 bg-[var(--theme-surface)] rounded-theme shadow-theme transition-all duration-theme ease-theme">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-lg font-medium">Системная карточка</div>
                            <p className="mt-2 text-sm leading-6 text-[var(--theme-foreground)]/80">
                              Карточка с параметризованным скруглением рамок, тенями и отступами, унаследованными от активной дизайн-системы.
                            </p>
                          </div>
                          <span className="border-theme border-[var(--theme-border)] px-2 py-1 text-xs uppercase rounded-theme bg-[var(--theme-muted)]">
                            Стабильно
                          </span>
                        </div>
                      </div>

                      <Tooltip>
                        <TooltipTrigger render={<Button variant="outline" />}>
                          Наведи для подсказки
                        </TooltipTrigger>
                        <TooltipContent sideOffset={4}>
                          Параметрический тултип
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </Section>
                </div>

                <Section title="Хедер / Сайдбар / Модальные окна">
                  <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
                    <div className="border-theme border-[var(--theme-border)] bg-[var(--theme-surface)] rounded-theme shadow-theme transition-all duration-theme ease-theme">
                      <div className="border-b-theme border-[var(--theme-border)] px-3 py-3 font-medium">Боковое меню</div>
                      <div className="space-y-2 p-3 text-sm">
                        <div className="border-theme border-[var(--theme-border)] px-3 py-2 rounded-theme hover:bg-[var(--theme-muted)] cursor-pointer transition-all duration-theme ease-theme bg-[var(--theme-surface)]">Обзор</div>
                        <div className="border-theme border-[var(--theme-border)] px-3 py-2 rounded-theme hover:bg-[var(--theme-muted)] cursor-pointer transition-all duration-theme ease-theme bg-[var(--theme-surface)]">Промпты</div>
                        <div className="border-theme border-[var(--theme-border)] px-3 py-2 rounded-theme hover:bg-[var(--theme-muted)] cursor-pointer transition-all duration-theme ease-theme bg-[var(--theme-surface)]">Избранное</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-theme border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                        <div className="flex items-center gap-2">
                          <Menu className="h-4 w-4" />
                          Панель заголовка (Header)
                        </div>
                        <Button variant="outline" onClick={() => setDialogOpen(true)}>Открыть диалог</Button>
                      </div>

                      <div className="border-theme border-[var(--theme-border)] p-4 text-sm leading-6 rounded-theme shadow-theme transition-all duration-theme ease-theme bg-[var(--theme-surface)]">
                        Этот раздел демонстрирует верстку стандартных компоновочных блоков:
                        хедер, сайдбар и всплывающие окна в рамках одной дизайн-системы.
                      </div>
                    </div>
                  </div>
                </Section>
              </div>

              <Section title="Генератор промптов (Prompt Engine)">
                <div className="space-y-4">
                  <div className="grid gap-px bg-[var(--theme-border)] text-sm border border-[var(--theme-border)]">
                    {[
                      ["Режим темы", palette.mode === "dark" ? "Темный" : "Светлый"],
                      ["Основной цвет", palette.colors.primary],
                      ["Фоновый цвет", palette.colors.background],
                      ["Цвет поверхности", palette.colors.surface],
                      ["Цвет границы", palette.colors.border],
                    ].map(([label, value]) => (
                      <div key={label} className="grid grid-cols-[140px_minmax(0,1fr)] bg-[var(--theme-surface)] px-3 py-2">
                        <span className="uppercase tracking-[0.15em] text-[var(--theme-foreground)]/60 text-[10px]">{label}</span>
                        <span className="font-mono text-xs">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-theme border-[var(--theme-border)] p-4 text-sm leading-6 rounded-theme shadow-theme transition-all duration-theme ease-theme bg-[var(--theme-surface)]">
                    <div className="text-xs uppercase tracking-[0.2em] text-[var(--theme-foreground)]/65">Правила для компонентов AI:</div>
                    <div className="mt-3 space-y-2">
                      {theme.componentRules.map((rule) => (
                        <div key={rule} className="border-theme border-[var(--theme-border)] px-3 py-2 rounded-theme bg-[var(--theme-muted)]/20 text-xs">
                          {rule}
                        </div>
                      ))}
                    </div>
                  </div>

                  <pre className="overflow-x-auto border-theme border-[var(--theme-border)] bg-[var(--theme-muted)] p-4 text-[10px] leading-5 rounded-theme shadow-theme transition-all duration-theme ease-theme font-mono">
                    <code>{prompt}</code>
                  </pre>
                </div>
              </Section>
            </div>
          </div>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent showCloseButton={true}>
            <DialogTitle>Диалоговое окно стиля {theme.name}</DialogTitle>
            <div className="space-y-4 text-sm leading-6">
              <DialogDescription>
                Диалог полностью наследует параметры набора токенов: фоновую подложку (backdrop), скругление углов, тени и анимационные тайминги.
              </DialogDescription>
              <div className="border-theme border-[var(--theme-border)] p-3 rounded-theme shadow-theme transition-all duration-theme ease-theme bg-[var(--theme-muted)]/20">
                Это подтверждает масштабируемость системы на оверлеи и всплывающие окна.
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </TooltipPrimitive.Provider>
  );
}
