import type { KeyBinding } from "@opentui/core";

export const TEXTAREA_KEY_BINDING: KeyBinding[] = [
  {
    name: "return",
    action: "submit",
  },
  {
    name: "enter",
    action: "submit",
  },
  {
    name: "return",
    action: "newline",
    shift: true,
  },
  {
    name: "enter",
    action: "newline",
    shift: true,
  },
];