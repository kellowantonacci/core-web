import { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";

export function useKeyboardNavigation() {
  const { nextTheme, previousTheme, nextPalette, previousPalette } = useThemeStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Игнорируем события, если фокус находится в полях ввода
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousTheme();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextTheme();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        previousPalette();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        nextPalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextTheme, previousTheme, nextPalette, previousPalette]);
}
