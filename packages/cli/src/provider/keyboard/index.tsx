import { createContext, use, useCallback, useState, useRef } from "react";
import { ctrlCHandler } from "./ctrl-c-handler";

export type Responder = () => boolean;
export type KeyboardContextValue = {
  push: (id: string, responder?: Responder) => void;
  pop: (id: string) => void;
  isTopLayer: (id: string) => boolean;
  setResponder: (id: string, responder: Responder | null) => void;
};

const keyboardContext = createContext<KeyboardContextValue | null>(null);

export const KeyboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stack, setStack] = useState<string[]>(["base"]);
  const stackRef = useRef(stack);
  stackRef.current = stack;
  const responders = useRef<Map<string, Responder>>(new Map());
  const push = useCallback((id: string, responder?: Responder) => {
    if (responder) {
      responders.current.set(id, responder);
    }

    setStack((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const pop = useCallback((id: string) => {
    responders.current.delete(id);
    setStack((prev) => prev.filter((item) => item !== id));
  }, []);

  const isTopLayer = useCallback(
    (id: string) => {
      return stack[stack.length - 1] === id || stack.length === 0;
    },
    [stack],
  );

  const setResponder = useCallback(
    (id: string, responder: Responder | null) => {
      if (responder) {
        responders.current.set(id, responder);
      } else {
        responders.current.delete(id);
      }
    },
    [],
  );

  ctrlCHandler({ stackRef, responders });
  return (
    <keyboardContext.Provider value={{ push, pop, isTopLayer, setResponder }}>
      {children}
    </keyboardContext.Provider>
  );
};

export const useKeyboardLayer = (): KeyboardContextValue => {
  const context = use(keyboardContext);
  if (!context) {
    throw new Error("useKeyboard must be used within a KeyboardProvider");
  }
  return context;
};
