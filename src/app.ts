import "dotenv/config";
import { App } from "@slack/bolt";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message("hello", async ({ message, say }) => {
  const userMessage = message as any;
  await say(`Hey there <@${userMessage.user}> !`);
});

(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);
  console.log(`Bbot up and running on port ${port}`);
})();
