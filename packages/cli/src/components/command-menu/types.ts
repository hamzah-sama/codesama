import type { ToastContextValue } from "../../provider/toast/toast-provider";

export type commandContext = {
  exit: () => void;
  toast: ToastContextValue;
};

export type Command = {
  name: string;
  description: string;
  value: string;
  action?: (ctx: commandContext) => void | Promise<void>;
};
