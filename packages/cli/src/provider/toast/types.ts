
export type ToastVariant = "success" | "error" | "info";

export type ToastOptions = {
  variant?: ToastVariant
  message: string;
  duration?: number;
};

export const DEFAULT_DURATION = 3000;
