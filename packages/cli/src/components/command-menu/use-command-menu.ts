import type { ScrollBoxRenderable } from "@opentui/core";
import { useRef, useState, type RefObject } from "react";
import { getFilterCommands } from "./filter-commands";
import type { Command } from "./types";
import { commandNavigation } from "./command-navigation";

type useCommandMenuReturn = {
  showCommandMenu: boolean;
  commandQuery: string;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  scrollRef: RefObject<ScrollBoxRenderable | null>;
  handleContentChange: (text: string) => void;
  selectCommand: (index: number) => Command | undefined;
};

export const useCommandMenu = (): useCommandMenuReturn => {
  const [textValue, setTextValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const scrollRef = useRef<ScrollBoxRenderable>(null);

  const commandQuery =
    showCommandMenu && textValue.startsWith("/") ? textValue.slice(1) : "";

  const filteredCommands = getFilterCommands(commandQuery);

  const handleContentChange = (text: string) => {
    setTextValue(text);
    setSelectedIndex(0);

    const scrollBox = scrollRef.current;
    if (scrollBox) {
      scrollBox.scrollTo(0);
    }

    const prefix = text.startsWith("/") ? text.slice(1) : null;
    if (prefix !== null && !prefix.includes(" ")) {
      setShowCommandMenu(true);
    } else {
      setShowCommandMenu(false);
    }
  };

  const selectCommand = (index: number): Command | undefined => {
    const command = filteredCommands[index];
    if (command) {
      setShowCommandMenu(false);
    }
    return command;
  };

  commandNavigation({
    showCommandMenu,
    setShowCommandMenu,
    filteredCommands,
    setSelectedIndex,
    scrollRef,
  });

  return {
    showCommandMenu,
    commandQuery,
    selectedIndex,
    setSelectedIndex,
    scrollRef,
    handleContentChange,
    selectCommand,
  };
};
