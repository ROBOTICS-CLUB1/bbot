import cron from "node-cron";
import cronParser from "cron-parser";
import { App } from "@slack/bolt";
import { Reminder } from "../db";

function matchesNow(cronExpr: string | String): boolean {
  try {
    const interval = cronParser.parseExpression(cronExpr.toString(), {
      utc: true,
    });
    const prev = interval.prev().toDate();
    const now = new Date();
    return (
      prev.getUTCFullYear() === now.getUTCFullYear() &&
      prev.getUTCMonth() === now.getUTCMonth() &&
      prev.getUTCDate() === now.getUTCDate() &&
      prev.getUTCHours() === now.getUTCHours() &&
      prev.getUTCMinutes() === now.getUTCMinutes()
    );
  } catch {
    return false;
  }
}

export function startDynamicScheduler(app: App): void {
  cron.schedule("* * * * *", async () => {
    const now = new Date();

    let reminders;
    try {
      reminders = await Reminder.find({ enabled: true });
    } catch {
      console.error("[scheduler] DB query failed");
      return;
    }

    for (const reminder of reminders) {
      if (reminder.startDate && now < reminder.startDate) continue;
      if (reminder.endDate && now > reminder.endDate) continue;
      if (!matchesNow(reminder.cron)) continue;

      try {
        await app.client.chat.postMessage({
          channel: reminder.channel.toString(),
          text: reminder.text.toString(),
        });
        console.log(
          `[scheduler] Fired reminder ${reminder._id} to ${reminder.channel}`,
        );
      } catch (err) {
        console.error(
          `[scheduler] Failed to post reminder ${reminder._id}:`,
          err,
        );
      }
    }
  });

  console.log("[scheduler] Dynamic scheduler active");
}

export function startScheduledAnnouncements(app: App): void {
  startDynamicScheduler(app);
}
