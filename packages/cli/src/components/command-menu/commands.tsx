import type { Command } from "./types";
import { ThemeDialog } from "../dialogs/theme-dialogs";

export const COMMANDS: Command[] = [
  {
    name: "new",
    description: "Start a new conversation",
    value: "/new",
  },
  {
    name: "exit",
    description: "Quit the application",
    value: "/exit",
    action: (ctx) => {
      ctx.exit();
    },
  },
  {
    name: "clear",
    description: "Clear console",
    value: "/clear",
    action: (ctx) => {
      ctx.toast.show({ message: "Clearing console..." });
    },
  },
  {
    name: "help",
    description: "Show help",
    value: "/help",
    action: (ctx) => {
      ctx.dialog.open({ title: "Help", children: <text>Help</text> });
    },
  },
  {
    name: "version",
    description: "Show version",
    value: "/version",
  },
  {
    name: "theme",
    description: "Change theme",
    value: "/theme",
    action: (ctx) => {
      ctx.dialog.open({ title: "Select theme", children: <ThemeDialog /> });
    },
  },
];
