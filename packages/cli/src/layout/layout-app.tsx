import { DialogProvider } from "../provider/dialog";
import { KeyboardProvider } from "../provider/keyboard";
import { ThemeProvider } from "../provider/theme";
import { ToastProvider } from "../provider/toast/toast-provider";
import { App } from "./app";

export const LayoutApp = () => {
  return (
    <ThemeProvider>
      <KeyboardProvider>
        <DialogProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </DialogProvider>
      </KeyboardProvider>
    </ThemeProvider>
  );
};
