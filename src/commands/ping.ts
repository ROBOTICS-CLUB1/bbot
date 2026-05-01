import { App } from "@slack/bolt";

export function registerPingCommand(app: App): void {
  app.command("/bbot", async ({ command, ack, respond }) => {
    if (command.text.trim() !== "ping") return await ack();
    await ack();
    await respond({
      response_type: "ephemeral",
      text: `pong (${new Date().toISOString()})`,
    });
  });
}
