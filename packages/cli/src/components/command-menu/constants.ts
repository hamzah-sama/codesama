import { COMMANDS } from "./commands";

export const MAX_VISIBLE_COMMANDS = 8;

export const COMMANDS_COL_WIDTH =
  Math.max(...COMMANDS.map((cmd) => cmd.name.length)) + 4;
