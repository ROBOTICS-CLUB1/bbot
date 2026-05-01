import { App } from "@slack/bolt";
import { registerHelpCommand } from "./help";

export function registerCommands(app: App): void {
  registerHelpCommand(app);
}
