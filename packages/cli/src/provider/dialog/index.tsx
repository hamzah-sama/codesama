import { createContext, use, useCallback, useState } from "react";
import type { DialogConfig } from "./types";
import { RGBA, TextAttributes } from "@opentui/core";
import { useKeyboardLayer } from "../keyboard";
import { escHandler } from "./escHandler";
import { useTerminalDimensions } from "@opentui/react";

export type dialogContextValue = {
  open: (config: DialogConfig) => void;
  close: () => void;
};

const dialogContext = createContext<dialogContextValue | null>(null);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDialog, setCurrentDialog] = useState<DialogConfig | null>(null);
  const { push, pop } = useKeyboardLayer();
  const close = useCallback(() => {
    setCurrentDialog(null);
    pop("dialog");
  }, [pop]);

  const open = useCallback(
    (config: DialogConfig) => {
      setCurrentDialog(config);
      push("dialog", () => {
        close();
        return true;
      });
    },
    [push, close],
  );

  return (
    <dialogContext.Provider value={{ open, close }}>
      {children}
      <Dialog currentDialog={currentDialog} close={close} />
    </dialogContext.Provider>
  );
};

export const useDialog = () => {
  const value = use(dialogContext);
  if (!value) {
    throw new Error("useDialog must be used within a DialogProvider");
  }

  return value;
};

interface Props {
  currentDialog: DialogConfig | null;
  close: () => void;
}
export const Dialog = ({ currentDialog, close }: Props) => {
  const { isTopLayer } = useKeyboardLayer();
  escHandler({ close, disabledKey: !currentDialog || !isTopLayer("dialog") });
  const dimensions = useTerminalDimensions();
  if (!currentDialog) return null;
  const { title, children } = currentDialog;
  return (
    <box
      position="absolute"
      top={0}
      left={0}
      width={dimensions.width}
      height={dimensions.height}
      justifyContent="center"
      alignItems="center"
      backgroundColor={RGBA.fromInts(0, 0, 0, 150)}
      zIndex={100}
    >
      <box
        flexDirection="column"
        gap={1}
        width={Math.min(60, dimensions.width - 4)}
        paddingX={4}
        paddingY={1}
        height="auto"
      >
        <box
          paddingBottom={1}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <text attributes={TextAttributes.BOLD}>{title}</text>
          <box flexDirection="row" gap={1}>
            <text attributes={TextAttributes.INVERSE}> ESC </text>
            <text attributes={TextAttributes.DIM}>close</text>
          </box>
        </box>
        <box flexGrow={1}>{children}</box>
      </box>
    </box>
  );
};
