import { join } from "node:path";
import { homedir } from "node:os";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import {
  DEFAULT_THEME,
  THEMES,
  type Theme,
  type ThemeColors,
} from "../../theme";
import { createContext, use, useCallback, useState } from "react";

type preferenceTheme = {
  themeName: string;
};

const CONFIG_DIR = join(homedir(), ".codesama");
const PREFERENCE_THEME_PATH = join(CONFIG_DIR, "theme.json");

export const getInitialTheme = (): Theme => {
  try {
    const preference = JSON.parse(
      readFileSync(PREFERENCE_THEME_PATH, "utf-8"),
    ) as Partial<preferenceTheme>;

    const savedTheme = THEMES.find(
      (theme) => theme.name === preference.themeName,
    );
    return savedTheme ?? DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

export const savePreferenceTheme = (theme: Theme) => {
  try {
    mkdirSync(CONFIG_DIR, { recursive: true });
    writeFileSync(
      PREFERENCE_THEME_PATH,
      JSON.stringify(
        { themeName: theme.name } satisfies preferenceTheme,
        null,
        2,
      ),
      "utf-8",
    );
  } catch {}
};

type ThemeContextValue = {
  colors: ThemeColors;
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = (): ThemeContextValue => {
  const value = use(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return value;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme());

  const setTheme = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
    savePreferenceTheme(theme);
  }, []);
  return (
    <ThemeContext.Provider
      value={{ colors: currentTheme.colors, currentTheme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
