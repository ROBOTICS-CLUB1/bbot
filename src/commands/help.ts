import { App } from "@slack/bolt";

export function registerHelpCommand(app: App): void {
  app.command("/bbot", async ({ command, ack, respond }) => {
    if (command.text.trim() !== "help") return await ack();

    await ack();
    await respond({
      response_type: "ephemeral",
      text: [
        "*Available commands:*",
        "`/bbot ping` - check if bot is alive",
        "`/bbot ping` - check if bot is alive",
      ].join("\n"),
    });
  });
}
