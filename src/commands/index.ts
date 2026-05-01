import { App } from "@slack/bolt";
import { registerHelpCommand } from "./help";
import { registerPingCommand } from "./ping";

export function registerCommands(app: App): void {
  registerHelpCommand(app);
  registerPingCommand(app);
}
