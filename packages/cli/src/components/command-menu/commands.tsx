import type { Command } from "./types";
import { HelpDialog } from '../../provider/dialog/components/help-dialog';

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
      ctx.dialog.open( { title: "Help", children: <HelpDialog /> });
    },
  },
  {
    name: "version",
    description: "Show version",
    value: "/version",
  },
];
