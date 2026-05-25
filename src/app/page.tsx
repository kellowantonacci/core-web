"use client";

import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useEffect, useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { useThemeStore } from "@/store/useThemeStore";
import { themes } from "@/config/themes";
import { generatePrompt } from "@/lib/promptEngine";
import { Button } from "@/components/ui/button";
import { Heart, Copy, List, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  useKeyboardNavigation();
  const {
    activeThemeId,
    activePaletteIndex,
    likedThemes,
    showLikedOnly,
    toggleLikeCurrentTheme,
    clearLikedThemes,
    setShowLikedOnly,
  } = useThemeStore();

  const activeTheme = themes.find((t) => t.id === activeThemeId) || themes[0];
  const activePalette = activeTheme.palettes[activePaletteIndex] || activeTheme.palettes[0];

  const isLiked = likedThemes.some(
    (t) => t.themeId === activeThemeId && t.paletteIndex === activePaletteIndex
  );

  const handleCopyPrompt = () => {
    const prompt = generatePrompt(activeTheme, activePalette);
    navigator.clipboard.writeText(prompt);
    toast("Prompt Copied", {
      description: "The XML design tokens have been copied to your clipboard.",
    });
  };

  const handleCopyAllLiked = () => {
    if (likedThemes.length === 0) {
      toast.error("No liked themes to copy");
      return;
    }

    const prompts = likedThemes.map((liked) => {
      const theme = themes.find((t) => t.id === liked.themeId) || themes[0];
      const palette = theme.palettes[liked.paletteIndex] || theme.palettes[0];
      return generatePrompt(theme, palette);
    });

    navigator.clipboard.writeText(prompts.join('\n\n---\n\n'));
    toast("All Liked Prompts Copied", {
      description: `Copied ${likedThemes.length} XML design prompts to your clipboard.`,
    });
  }

  // Prevent hydration errors with client-only store usage
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-bold">Core-web</h1>
            <span className="text-sm text-muted-foreground border-l pl-4">
              {activeTheme.name} - {activePalette.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={toggleLikeCurrentTheme}
            >
              <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {isLiked ? "Liked" : "Like"}
            </Button>

            <Button
              variant={showLikedOnly ? "secondary" : "outline"}
              size="sm"
              onClick={() => setShowLikedOnly(!showLikedOnly)}
            >
              <List className="mr-2 h-4 w-4" />
              {showLikedOnly ? "Show All" : `Liked (${likedThemes.length})`}
            </Button>

            <Button variant="outline" size="sm" onClick={clearLikedThemes}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Clear
            </Button>

            <Button size="sm" onClick={handleCopyPrompt}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Prompt
            </Button>

             <Button variant="secondary" size="sm" onClick={handleCopyAllLiked} disabled={likedThemes.length === 0}>
              <Copy className="mr-2 h-4 w-4" />
              Copy All Liked
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-background text-foreground transition-colors duration-300">
        <Dashboard />
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Use Left/Right arrows to change theme, Up/Down arrows to change palette.
      </footer>
    </div>
  );
}
