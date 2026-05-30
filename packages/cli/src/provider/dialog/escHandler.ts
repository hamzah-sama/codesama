import { useKeyboard } from "@opentui/react";

interface Props {
  close: () => void;
  disabledKey: boolean;
}
export const escHandler = ({ close, disabledKey }: Props) => {
  useKeyboard((key) => {
    if (disabledKey) return;
    if (key.name === "escape") close();
  });
};
