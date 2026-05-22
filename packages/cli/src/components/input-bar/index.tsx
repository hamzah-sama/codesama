import type { TextareaRenderable } from "@opentui/core";
import { StatusBar } from "../status-bar";
import { CommandMenu } from "../command-menu";
import { useRenderer } from "@opentui/react";
import { useEffect, useRef } from "react";
import { useCommandMenu } from "../command-menu/use-command-menu";
import type { Command } from "../command-menu/types";
import { TEXTAREA_KEY_BINDING } from "../input-bar/key-binding";

interface Props {
  onSubmit: (text: string) => void;
  disabled?: boolean;
}

export const InputBar = ({ onSubmit, disabled = false }: Props) => {
  const textAreaRef = useRef<TextareaRenderable>(null);
  const onSubmitRef = useRef<() => void>(() => {});
  const renderer = useRenderer();
  const {
    showCommandMenu,
    commandQuery,
    selectedIndex,
    scrollRef,
    selectCommand,
    setSelectedIndex,
    handleContentChange,
  } = useCommandMenu();

  const handleTextareaContentChange = () => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    handleContentChange(textarea.plainText);
  };

  const handleSubmit = () => {
    if (disabled) return;

    const textarea = textAreaRef.current;
    if (!textarea) return;

    const text = textarea.plainText.trim();
    if (text.length === 0) return;

    onSubmit(text);
    textarea.setText("");
  };
  const handleCommand = (command: Command | undefined) => {
    if (!command) return;
    const textarea = textAreaRef.current;
    if (!textarea) return;

    textarea.setText("");

    if (command.action) {
      command.action({ exit: () => renderer.destroy() });
    } else {
      textarea.insertText(`${command.value} `);
    }
  };

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    textArea.onSubmit = () => onSubmitRef.current();
  }, []);

  onSubmitRef.current = () => {
    if (disabled) return;

    if (showCommandMenu) {
      const command = selectCommand(selectedIndex);
      handleCommand(command);
      return;
    }

    handleSubmit();
  };

  return (
    <box alignItems="center" width="100%">
      <box border={["left"]} borderColor="cyan" width={70}>
        <box
          position="relative"
          width="100%"
          backgroundColor="#1a1a24"
          paddingX={2}
          paddingY={1}
          justifyContent="center"
          gap={1}
        >
          {showCommandMenu && (
            <box
              position="absolute"
              zIndex={10}
              left={0}
              bottom="100%"
              width="100%"
              backgroundColor="#1a1a24"
            >
              <CommandMenu
                query={commandQuery}
                selectedIndex={selectedIndex}
                scrollRef={scrollRef}
              />
            </box>
          )}
          <textarea
            focused={!disabled}
            ref={textAreaRef}
            placeholder={`Ask anything... fix a bug in database`}
            keyBindings={TEXTAREA_KEY_BINDING}
            onContentChange={handleTextareaContentChange}
          />
          <StatusBar />
        </box>
      </box>
    </box>
  );
};
