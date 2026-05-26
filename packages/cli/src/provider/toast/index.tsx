import { useTerminalDimensions } from "@opentui/react";
import type { ToastOptions } from "./types";

interface Props {
  currentToast: ToastOptions | null;
}

export const Toast = ({ currentToast }: Props) => {
  if (!currentToast) return null;
  const variantColor = {
    success: "green",
    error: "red",
    info: "blue",
  };

  const borderColor = currentToast.variant
    ? variantColor[currentToast.variant]
    : variantColor.info;

  return (
    <box
      position="absolute"
      top={2}
      left={2}
      justifyContent="center"
      alignItems="flex-start"
      paddingX={2}
      paddingY={1}
      borderColor={borderColor}
      border={["left", "right"]}
    >
      <box flexDirection="column" gap={1} width="100%">
        <text wrapMode="word" fg="#e1e1e1" width="100%">
          {currentToast?.message}
        </text>
      </box>
    </box>
  );
};
