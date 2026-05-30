import { useTheme } from "../theme";
import type { ToastOptions, ToastVariant } from "./types";

interface Props {
  currentToast: ToastOptions | null;
}

export const Toast = ({ currentToast }: Props) => {
  if (!currentToast) return null;
  const { colors } = useTheme();
  const variantColor: Record<ToastVariant, string> = {
    success: colors.success,
    error: colors.error,
    info: colors.info,
  };

  const borderColor = currentToast.variant
    ? variantColor[currentToast.variant]
    : variantColor.info;

  return (
    <box
      position="absolute"
      top={2}
      right={2}
      justifyContent="center"
      alignItems="flex-start"
      paddingX={2}
      paddingY={1}
      borderColor={borderColor}
      border={["left", "right"]}
    >
      <text wrapMode="word" fg="#e1e1e1" width="100%">
        {currentToast?.message}
      </text>
    </box>
  );
};
