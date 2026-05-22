import type { Command } from "./types";

export const COMMANDS: Command[] = [
  {
    name: "new",
    description: "Start an new conversation",
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
  },
  {
    name: "help",
    description: "Show help",
    value: "/help",
  },
  {
    name: "version",
    description: "Show version",
    value: "/version",
  },
];
