import { useKeyboard } from "@opentui/react";
import type { Command } from "../command-menu/types";
import type { ScrollBoxRenderable } from "@opentui/core";

interface Props {
  showCommandMenu: boolean;
  setShowCommandMenu: (value: boolean) => void;
  filteredCommands: Command[];
  setSelectedIndex: (index: number | ((prevIndex: number) => number)) => void;
  scrollRef: React.RefObject<ScrollBoxRenderable | null>;
}

export const commandNavigation = ({
  showCommandMenu,
  setShowCommandMenu,
  filteredCommands,
  setSelectedIndex,
  scrollRef,
}: Props) => {
  useKeyboard((key) => {
    if (!showCommandMenu) return;
    if (key.name === "escape") {
      key.preventDefault();
      setShowCommandMenu(false);
    }

    if (key.name === "up") {
      key.preventDefault();
      setSelectedIndex((index: number) => {
        const newIndex = Math.max(index - 1, 0);

        const scrollbox = scrollRef.current;
        if (scrollbox && newIndex < scrollbox.scrollTop) {
          scrollbox.scrollTo(newIndex);
        }
        return newIndex;
      });
    }

    if (key.name === "down") {
      key.preventDefault();
      setSelectedIndex((index: number) => {
        if (filteredCommands.length === 0) return 0;
        const newIndex = Math.min(index + 1, filteredCommands.length - 1);

        const scrollbox = scrollRef.current;
        if (scrollbox) {
          const viewPortHeight = scrollbox.viewport.height;
          const visibleEnd = scrollbox.scrollTop + viewPortHeight - 1;
          if (newIndex > visibleEnd) {
            scrollbox.scrollTo(newIndex - viewPortHeight + 1);
          }
        }
        return newIndex;
      });
    }
  });
};
