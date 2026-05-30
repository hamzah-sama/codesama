import { useKeyboard, useRenderer } from "@opentui/react";
import type { Responder } from ".";

interface Props {
  stackRef: React.RefObject<string[]>;
  responders: React.RefObject<Map<string, Responder>>;
}

export const ctrlCHandler = ({ stackRef, responders }: Props) => {
  const renderer = useRenderer();
  useKeyboard((key) => {
    if (!key.ctrl || key.name !== "c") return;
    const currentStack = stackRef.current;

    for (let i = currentStack.length - 1; i >= 0; i--) {
      const layerId = currentStack[i]!;
      const responder = responders.current.get(layerId);
      if (responder?.()) {
        return;
      }
    }

    renderer.destroy();
  });
};
