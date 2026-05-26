export type ToastOptions = {
  variant?: "success" | "error" | "info";
  message: string;
  duration?: number;
};

export const DEFAULT_DURATION = 3000;
