import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "../../provider/theme";
import { THEMES, type Theme } from "../../theme";
import { DialogSearchList } from "../dialog-search-list";
import { useDialog } from "../../provider/dialog";

export const ThemeDialog = () => {
  const { setTheme, currentTheme } = useTheme();
  const originalThemeRef = useRef(currentTheme);
  const confirmedThemeRef = useRef(false);
  const dialog = useDialog();

  const handleSelect = useCallback(
    (theme: Theme) => {
      confirmedThemeRef.current = true;
      setTheme(theme);
      dialog.close();
    },
    [setTheme, dialog],
  );

  const handleHighlight = useCallback(
    (theme: Theme) => {
      setTheme(theme);
    },
    [setTheme],
  );

  //   revert back to original theme if the user closes the dialog without making a selection
  useEffect(() => {
    return () => {
      if (!confirmedThemeRef.current) {
        setTheme(originalThemeRef.current);
      }
    };
  }, [setTheme]);
  return (
    <DialogSearchList
      items={THEMES}
      placeholder="Select Theme..."
      emptyText="No matching items"
      getKey={(item) => item.name}
      filterFn={(item, query) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      }
      renderItem={(theme, isSelected) => (
        <text selectable={false} fg={isSelected ? "black" : "white"}>
          {theme.name === originalThemeRef.current.name
            ? "\u0020\u2022\u0020"
            : "\u0020\u0020\u0020"}
          {theme.name}
        </text>
      )}
      onSelect={handleSelect}
      onHighlight={handleHighlight}
    />
  );
};
