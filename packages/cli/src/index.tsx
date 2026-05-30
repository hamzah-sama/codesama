import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { LayoutApp } from "./layout/layout-app";

const renderer = await createCliRenderer({
  exitOnCtrlC: false,
});
createRoot(renderer).render(<LayoutApp />);
