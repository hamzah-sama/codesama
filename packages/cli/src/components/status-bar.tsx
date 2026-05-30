import { TextAttributes } from "@opentui/core";
import { useTheme } from "../provider/theme";

export const StatusBar = () => {
  const { colors } = useTheme();
  return (
    <box flexDirection="row" gap={1}>
      <text fg={colors.primary}>Build</text>
      <text attributes={TextAttributes.DIM} fg="gray">
        &#8250;
      </text>
      <text>opus-4-6</text>
    </box>
  );
};
