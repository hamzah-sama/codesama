export type ToastOptions = {
  variant: "success" | "error" | "info";
  message?: string;
  duration?: number;
};

export const DEFAULT_DURAION = 3000;
