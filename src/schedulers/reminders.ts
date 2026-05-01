import cron from "node-cron";
import { App } from "@slack/bolt";

export function startSchdeuledAnnouncements(app: App): void {
  const cronExpr = process.env.ANNOUNCEMENT_CRON;
  const channel = process.env.ANNOUNCEMENT_CHANNEL;
  const text = process.env.ANNOUNCEMENT_TEXT;

  if (!cronExpr || !channel || !text) {
    console.warn(
      "[reminders] Missing one or more env vars: ANNOUNCEMENT_CRON, ANNOUNCEMENT_CHANNEL,ANNOUNCEMENT_TEXT. Scheduled announcements disabled.",
    );
    return;
  }

  cron.schedule(cronExpr, async () => {
    try {
      await app.client.chat.postMessage({ channel, text });
      console.log(`[reminders] Announcement sent to ${channel}`);
    } catch (err) {
      console.error("[reminders] Failed to send announcement:", err);
    }
  });

  console.log(`[reminders] Scheduled announcements active (${cronExpr})`);
}
