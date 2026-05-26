"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Select from "@radix-ui/react-select";
import * as Switch from "@radix-ui/react-switch";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  Check,
  ChevronDown,
  Copy,
  Heart,
  LoaderCircle,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
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

  const theme = themes[activeThemeIndex] ?? themes[0];
  const palette = theme.palettes[activePaletteIndex] ?? theme.palettes[0];
  const activeKey = `${theme.id}:${palette.id}`;
  const isLiked = likedKeys.includes(activeKey);
  const prompt = generatePrompt(theme, palette);
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
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousTheme();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextTheme();
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        previousPalette();
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        nextPalette();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextPalette, nextTheme, previousPalette, previousTheme]);

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
    <Tooltip.Provider delayDuration={0}>
      <main
        className="min-h-screen bg-[var(--theme-background)] text-[var(--theme-foreground)]"
        style={{ transitionDuration: "0ms", transitionTimingFunction: "linear" }}
      >
        <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-4 p-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="border-theme border-[var(--theme-border)] bg-[var(--theme-surface)] rounded-theme shadow-theme transition-all duration-theme ease-theme theme-backdrop">
            <div className="border-b-theme border-[var(--theme-border)] px-4 py-4">
              <div className="text-xs uppercase tracking-[0.2em]">Core-web</div>
              <div className="mt-2 text-2xl font-semibold">Style 0{activeThemeIndex + 1}</div>
              <p className="mt-3 text-sm leading-6">{theme.description}</p>
            </div>

            <div className="space-y-4 p-4 text-sm">
              <div className="space-y-2 border-theme border-[var(--theme-border)] p-3 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                <div className="text-xs uppercase tracking-[0.2em]">Navigation</div>
                <div>Left / Right: switch theme geometry</div>
                <div>Up / Down: switch palette in current theme</div>
              </div>

              <div className="space-y-2 border-theme border-[var(--theme-border)] p-3 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                <div className="text-xs uppercase tracking-[0.2em]">Scope</div>
                <div>Implemented: {themes.length} of {totalPlannedThemes} planned themes</div>
                <div>Current: {theme.name}</div>
                <div>Palette: {palette.label}</div>
              </div>

              <div className="space-y-2 border-theme border-[var(--theme-border)] p-3 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                <div className="text-xs uppercase tracking-[0.2em]">Stack</div>
                <div>Next.js 16 App Router</div>
                <div>Tailwind CSS v4</div>
                <div>Radix UI + Base UI</div>
                <div>Zustand store</div>
              </div>

              <div className="space-y-2 border-theme border-[var(--theme-border)] p-3 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                <div className="text-xs uppercase tracking-[0.2em]">Geometry</div>
                <div>Border radius: {theme.tokens.geometry.borderRadius}</div>
                <div>Border width: {theme.tokens.geometry.borderWidth}</div>
                <div>Shadow: {theme.tokens.geometry.boxShadow}</div>
                <div>Transition: {theme.tokens.animation.duration}</div>
              </div>
            </div>
          </aside>

          <div className="space-y-4">
            <header className="border-theme border-[var(--theme-border)] bg-[var(--theme-surface)] rounded-theme shadow-theme transition-all duration-theme ease-theme theme-backdrop">
              <div className="flex flex-col gap-3 border-b-theme border-[var(--theme-border)] px-4 py-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em]">Interactive Showcase</div>
                  <h1 className="mt-2 text-3xl font-semibold">{theme.name} Theme System</h1>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={previousTheme}>Prev Theme</Button>
                  <Button variant="outline" onClick={nextTheme}>Next Theme</Button>
                  <Button variant="secondary" onClick={toggleLiked}>
                    <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                    {isLiked ? "Liked" : "Like Theme"}
                  </Button>
                  <Button variant="secondary" onClick={toggleLikedFilter}>
                    {showLikedOnly ? "Show All" : "Show Liked"}
                  </Button>
                  <Button variant="outline" onClick={resetLiked}>Reset Liked</Button>
                  <Button onClick={() => copyText(prompt, "single")}>
                    <Copy className="h-4 w-4" />
                    {copiedPrompt ? "Copied" : "Copy Design Prompt"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyText(likedPromptBundle(likedKeys), "liked")}
                    disabled={likedKeys.length === 0}
                  >
                    <Copy className="h-4 w-4" />
                    {copiedLiked ? "Copied" : "Copy All Liked"}
                  </Button>
                </div>
              </div>

              <div className="grid gap-[var(--theme-border-width)] bg-[var(--theme-border)] md:grid-cols-4">
                {[
                  ["Theme", theme.name],
                  ["Palette", palette.label],
                  ["Liked Presets", String(likedKeys.length)],
                  ["Filter", showLikedOnly ? "Liked presets only" : "All presets"],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[var(--theme-surface)] px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.2em]">{label}</div>
                    <div className="mt-2 text-lg">{value}</div>
                  </div>
                ))}
              </div>
            </header>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-4">
                <Section title="Preset Collection">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 text-sm">
                      <Button variant="outline" onClick={previousPalette}>Prev Palette</Button>
                      <Button variant="outline" onClick={nextPalette}>Next Palette</Button>
                      <div className="border-theme border-[var(--theme-border)] px-3 py-2 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                        Visible presets: {visiblePaletteCards.length}
                      </div>
                    </div>

                    {visiblePaletteCards.length === 0 ? (
                      <div className="border-theme border-[var(--theme-border)] p-4 text-sm leading-6 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                        No liked presets yet. Mark one or more palette combinations and enable the liked filter again.
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
                                "border-theme border-[var(--theme-border)] p-4 text-left outline-none rounded-theme shadow-theme transition-all duration-theme ease-theme hover:bg-[var(--theme-muted)] hover:[transform:var(--theme-hover-transform)] active:translate-x-[var(--theme-active-translate-x)] active:translate-y-[var(--theme-active-translate-y)] active:shadow-[var(--theme-active-box-shadow)]",
                                selected && "bg-[var(--theme-muted)] border-[var(--theme-foreground)]",
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="text-xs uppercase tracking-[0.2em]">{presetPalette.mode}</div>
                                  <div className="mt-2 text-lg font-medium">{presetPalette.label}</div>
                                </div>
                                <span className="border-theme border-[var(--theme-border)] px-2 py-1 text-xs uppercase rounded-theme">
                                  {liked ? "Liked" : selected ? "Active" : "Preset"}
                                </span>
                              </div>

                              <div className="mt-4 grid grid-cols-4 gap-2">
                                {[
                                  presetPalette.colors.primary,
                                  presetPalette.colors.background,
                                  presetPalette.colors.surface,
                                  presetPalette.colors.border,
                                ].map((color) => (
                                  <span
                                    key={color}
                                    className="h-10 border-theme border-[var(--theme-border)] rounded-theme"
                                    style={{ background: color }}
                                  />
                                ))}
                              </div>

                              <div className="mt-4 space-y-1 text-sm">
                                <div>Primary: {presetPalette.colors.primary}</div>
                                <div>Background: {presetPalette.colors.background}</div>
                                <div>Border: {presetPalette.colors.border}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </Section>

                <div className="grid gap-4 lg:grid-cols-2">
                  <Section title="Buttons">
                    <div className="flex flex-wrap gap-3">
                      <Button>Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                      <Button disabled>Disabled</Button>
                      <Button>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Loading
                      </Button>
                    </div>
                  </Section>

                  <Section title="Inputs">
                    <div className="space-y-3">
                      <input
                        value={textValue}
                        onChange={(event) => setTextValue(event.target.value)}
                        className={cn(
                          "h-10 w-full border-theme bg-[var(--theme-surface)] px-3 outline-none rounded-theme shadow-theme transition-all duration-theme ease-theme focus-visible:ring-2 focus-visible:ring-[var(--theme-border)]",
                          textState === "error" && "bg-[var(--theme-error)]",
                          textState === "success" && "bg-[var(--theme-success)]",
                          "border-[var(--theme-border)]",
                        )}
                        placeholder="Text input"
                      />
                      <div className="flex h-10 items-center gap-2 border-theme border-[var(--theme-border)] px-3 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                        <Search className="h-4 w-4" />
                        <input
                          className="w-full border-0 bg-transparent p-0 outline-none"
                          placeholder="Input with icon"
                        />
                      </div>
                      <textarea
                        value={textareaValue}
                        onChange={(event) => setTextareaValue(event.target.value)}
                        className={cn(
                          "min-h-24 w-full border-theme px-3 py-2 outline-none rounded-theme shadow-theme transition-all duration-theme ease-theme focus-visible:ring-2 focus-visible:ring-[var(--theme-border)]",
                          textareaState === "error" && "bg-[var(--theme-error)]",
                          textareaState === "success" && "bg-[var(--theme-success)]",
                          textareaState === "idle" && "bg-[var(--theme-surface)]",
                          "border-[var(--theme-border)]",
                        )}
                        placeholder="Textarea"
                      />
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="border-theme border-[var(--theme-border)] p-3 text-sm rounded-theme shadow-theme" style={{ background: "var(--theme-error)" }}>
                          Text input error: minimum 4 characters
                        </div>
                        <div className="border-theme border-[var(--theme-border)] p-3 text-sm rounded-theme shadow-theme" style={{ background: "var(--theme-success)" }}>
                          Textarea success: minimum 12 characters
                        </div>
                      </div>
                    </div>
                  </Section>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <Section title="Select / Switch / Checkbox / Radio">
                    <div className="space-y-4">
                      <Select.Root defaultValue="default">
                        <Select.Trigger className="flex h-10 w-full items-center justify-between border-theme border-[var(--theme-border)] px-3 text-sm rounded-theme shadow-theme transition-all duration-theme ease-theme hover:bg-[var(--theme-muted)] hover:[transform:var(--theme-hover-transform)] active:translate-x-[var(--theme-active-translate-x)] active:translate-y-[var(--theme-active-translate-y)] active:shadow-[var(--theme-active-box-shadow)]">
                          <Select.Value placeholder="Select item" />
                          <Select.Icon>
                            <ChevronDown className="h-4 w-4" />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="border-theme border-[var(--theme-border)] bg-[var(--theme-surface)] rounded-theme shadow-theme transition-all duration-theme ease-theme theme-backdrop">
                            <Select.Viewport>
                              <Select.Item value="default" className="px-3 py-2 text-sm outline-none hover:bg-[var(--theme-muted)] cursor-pointer">Default</Select.Item>
                              <Select.Item value="compact" className="px-3 py-2 text-sm outline-none hover:bg-[var(--theme-muted)] cursor-pointer">Compact</Select.Item>
                              <Select.Item value="strict" className="px-3 py-2 text-sm outline-none hover:bg-[var(--theme-muted)] cursor-pointer">Strict</Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>

                      <div className="flex items-center justify-between border-theme border-[var(--theme-border)] px-3 py-2 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                        <span>Theme switch</span>
                        <Switch.Root
                          checked={switchEnabled}
                          onCheckedChange={setSwitchEnabled}
                          className="flex h-6 w-11 items-center border-theme border-[var(--theme-border)] px-1 rounded-theme shadow-theme duration-theme ease-theme transition-all data-[state=checked]:bg-[var(--theme-primary)] hover:[transform:var(--theme-hover-transform)]"
                        >
                          <Switch.Thumb className="block h-4 w-4 border-theme border-[var(--theme-border)] bg-[var(--theme-surface)] rounded-theme duration-theme ease-theme transition-transform data-[state=checked]:translate-x-5" />
                        </Switch.Root>
                      </div>

                      <label className="flex items-center gap-3 border-theme border-[var(--theme-border)] px-3 py-2 rounded-theme shadow-theme transition-all duration-theme ease-theme hover:bg-[var(--theme-muted)] cursor-pointer hover:[transform:var(--theme-hover-transform)]">
                        <Checkbox.Root
                          checked={checkboxChecked}
                          onCheckedChange={(checked) => setCheckboxChecked(checked === true)}
                          className="flex h-5 w-5 items-center justify-center border-theme border-[var(--theme-border)] rounded-theme bg-[var(--theme-surface)] hover:bg-[var(--theme-muted)] data-[state=checked]:bg-[var(--theme-primary)] data-[state=checked]:text-[var(--theme-primary-foreground)] transition-all duration-theme ease-theme"
                        >
                          <Checkbox.Indicator>
                            <Check className="h-4 w-4" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        Checkbox option
                      </label>

                      <RadioGroup.Root value={radioValue} onValueChange={setRadioValue} className="space-y-2">
                        {[
                          ["a", "Option A"],
                          ["b", "Option B"],
                        ].map(([value, label]) => (
                          <label key={value} className="flex items-center gap-3 border-theme border-[var(--theme-border)] px-3 py-2 rounded-theme shadow-theme transition-all duration-theme ease-theme hover:bg-[var(--theme-muted)] cursor-pointer hover:[transform:var(--theme-hover-transform)]">
                            <RadioGroup.Item value={value} className="relative flex items-center justify-center h-5 w-5 border-theme border-[var(--theme-border)] bg-[var(--theme-surface)] rounded-theme transition-all duration-theme ease-theme">
                              <RadioGroup.Indicator className="relative flex items-center justify-center h-full w-full after:block after:h-2 after:w-2 after:bg-[var(--theme-primary)] after:rounded-theme" />
                            </RadioGroup.Item>
                            {label}
                          </label>
                        ))}
                      </RadioGroup.Root>
                    </div>
                  </Section>

                  <Section title="Cards / Badges / Tooltip">
                    <div className="space-y-3">
                      <div className="border-theme border-[var(--theme-border)] p-4 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-lg font-medium">System Card</div>
                            <p className="mt-2 text-sm leading-6">
                              Border-defined card with parameterized rounding, shadows, and spacing.
                            </p>
                          </div>
                          <span className="border-theme border-[var(--theme-border)] px-2 py-1 text-xs uppercase rounded-theme">
                            Stable
                          </span>
                        </div>
                      </div>

                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <Button variant="outline">Tooltip Trigger</Button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content className="border-theme border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-2 text-sm rounded-theme shadow-theme transition-all duration-theme ease-theme theme-backdrop" sideOffset={4}>
                            Zero-motion tooltip
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </div>
                  </Section>
                </div>

                <Section title="Header / Sidebar / Dialog">
                  <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
                    <div className="border-theme border-[var(--theme-border)] rounded-theme shadow-theme transition-all duration-theme ease-theme">
                      <div className="border-b-theme border-[var(--theme-border)] px-3 py-3 font-medium">Sidebar</div>
                      <div className="space-y-2 p-3 text-sm">
                        <div className="border-theme border-[var(--theme-border)] px-3 py-2 rounded-theme hover:bg-[var(--theme-muted)] cursor-pointer transition-all duration-theme ease-theme">Overview</div>
                        <div className="border-theme border-[var(--theme-border)] px-3 py-2 rounded-theme hover:bg-[var(--theme-muted)] cursor-pointer transition-all duration-theme ease-theme">Prompts</div>
                        <div className="border-theme border-[var(--theme-border)] px-3 py-2 rounded-theme hover:bg-[var(--theme-muted)] cursor-pointer transition-all duration-theme ease-theme">Favorites</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-theme border-[var(--theme-border)] px-4 py-3 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                        <div className="flex items-center gap-2">
                          <Menu className="h-4 w-4" />
                          Header bar
                        </div>
                        <Button variant="outline" onClick={() => setDialogOpen(true)}>Open Dialog</Button>
                      </div>

                      <div className="border-theme border-[var(--theme-border)] p-4 text-sm leading-6 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                        This section demonstrates layout primitives required by the specification:
                        header, sidebar, and modal dialog inside the same rigid system.
                      </div>
                    </div>
                  </div>
                </Section>
              </div>

              <Section title="Prompt Engine">
                <div className="space-y-4">
                  <div className="grid gap-px bg-[var(--theme-border)] text-sm">
                    {[
                      ["Mode", palette.mode],
                      ["Primary", palette.colors.primary],
                      ["Background", palette.colors.background],
                      ["Surface", palette.colors.surface],
                      ["Border", palette.colors.border],
                    ].map(([label, value]) => (
                      <div key={label} className="grid grid-cols-[120px_minmax(0,1fr)] bg-[var(--theme-surface)] px-3 py-2">
                        <span className="uppercase tracking-[0.15em] text-xs">{label}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-theme border-[var(--theme-border)] p-4 text-sm leading-6 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                    <div className="text-xs uppercase tracking-[0.2em]">Component Rules</div>
                    <div className="mt-3 space-y-2">
                      {theme.componentRules.map((rule) => (
                        <div key={rule} className="border-theme border-[var(--theme-border)] px-3 py-2 rounded-theme">
                          {rule}
                        </div>
                      ))}
                    </div>
                  </div>

                  <pre className="overflow-x-auto border-theme border-[var(--theme-border)] bg-[var(--theme-muted)] p-4 text-xs leading-6 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                    <code>{prompt}</code>
                  </pre>
                </div>
              </Section>
            </div>
          </div>
        </div>

        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/10 z-50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 border-theme border-[var(--theme-border)] bg-[var(--theme-surface)] rounded-theme shadow-theme transition-all duration-theme ease-theme theme-backdrop z-50">
              <div className="flex items-center justify-between border-b-theme border-[var(--theme-border)] px-4 py-3">
                <Dialog.Title className="text-lg font-medium">{theme.name} Dialog</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="border-theme border-[var(--theme-border)] p-2 rounded-theme hover:bg-[var(--theme-muted)] hover:[transform:var(--theme-hover-transform)] transition-all duration-theme ease-theme active:translate-x-[var(--theme-active-translate-x)] active:translate-y-[var(--theme-active-translate-y)] active:shadow-[var(--theme-active-box-shadow)]" aria-label="Close dialog">
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>
              <div className="space-y-4 p-4 text-sm leading-6">
                <p>
                  The dialog inherits the same rigid geometry: flat surface, border,
                  radius, shadow, and motion configured by the design tokens.
                </p>
                <div className="border-theme border-[var(--theme-border)] p-3 rounded-theme shadow-theme transition-all duration-theme ease-theme">
                  This confirms the style system can scale across overlays and structural UI.
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </main>
    </Tooltip.Provider>
  );
}
