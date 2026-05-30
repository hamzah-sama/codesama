import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { DEFAULT_DURATION, type ToastOptions } from "./types";
import { Toast } from ".";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentToast, setCurrentToast] = useState<ToastOptions | null>(null);
  const timeOutHandlerRef = useRef<NodeJS.Timeout | null>(null);

  const clearCurrentTimeOut = useCallback(() => {
    if (timeOutHandlerRef.current) {
      clearTimeout(timeOutHandlerRef.current);
      timeOutHandlerRef.current = null;
    }
  }, []);

  const show = useCallback(
    (options: ToastOptions) => {
      const duration = options.duration ?? DEFAULT_DURATION;

      clearCurrentTimeOut();

      setCurrentToast({
        variant: options.variant ?? "info",
        duration,
        message: options.message,
      });

      timeOutHandlerRef.current = setTimeout(() => {
        setCurrentToast(null);
      }, duration).unref();
    },
    [clearCurrentTimeOut],
  );

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast currentToast={currentToast} />
    </ToastContext.Provider>
  );
};

export type ToastContextValue = {
  show: (options: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return value;
};
