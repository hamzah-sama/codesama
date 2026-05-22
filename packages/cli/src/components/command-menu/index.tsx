import { useState, type RefObject } from "react";
import {
  TerminalConsole,
  TextAttributes,
  type ScrollBoxRenderable,
} from "@opentui/core";
import { getFilterCommands } from "./filter-commands";
import { COMMANDS_COL_WIDTH, MAX_VISIBLE_COMMANDS } from "./constants";

interface Props {
  query: string;
  selectedIndex?: number;
  scrollRef?: RefObject<ScrollBoxRenderable | null>;
}

export const CommandMenu = ({ query, selectedIndex, scrollRef }: Props) => {
  const filter = getFilterCommands(query);

  const visibleHeight = Math.min(filter.length, MAX_VISIBLE_COMMANDS);

  if (filter.length === 0) {
    return (
      <box paddingX={1}>
        <text attributes={TextAttributes.DIM}>No matching commands</text>
      </box>
    );
  }

  return (
    <scrollbox ref={scrollRef} height={visibleHeight}>
      {filter.map((cmd, index) => {
        const isSelected = index === selectedIndex;
        return (
          <box
            flexDirection="row"
            paddingX={1}
            height={1}
            key={cmd.value}
            backgroundColor={isSelected ? "#89b4fa" : undefined}
            overflow="hidden"
          >
            <box flexShrink={0} width={COMMANDS_COL_WIDTH}>
              <text selectable={false} fg={isSelected ? "black" : "white"}>
                {cmd.value}
              </text>
            </box>
            <box flexShrink={0} flexGrow={1} overflow="hidden">
              <text selectable={false} fg={isSelected ? "black" : "gray"}>
                {cmd.description}
              </text>
            </box>
          </box>
        );
      })}
    </scrollbox>
  );
};
