import { useTerminalDimensions } from "@opentui/react";
import type { ToastOptions } from "./types";

interface Props {
  currentToast: ToastOptions | null;
}

export const Toast = ({ currentToast }: Props) => {
  if (!currentToast) return null;
  const { width } = useTerminalDimensions();

  return (
    <box
      position="absolute"
      top={2}
      left={2}
      justifyContent="center"
      alignItems="flex-start"
      width={Math.max(1, Math.min(60, width - 6))}
      paddingX={2}
      paddingY={1}
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
