import "dotenv/config";
import { App } from "@slack/bolt";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN!,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN!,
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
});

app.message(async ({ message, say }) => {
  if ("text" in message && message.user) {
    console.log(`Received: "${message.text}" from user ${message.user}`);
    await say(`Hey <@${message.user}>, I got your message!`);
  }
});

(async () => {
  await app.start();
  console.log(`Bbot running in (Socket Mode) running `);
})();
