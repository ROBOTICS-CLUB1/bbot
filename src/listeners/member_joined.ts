import { App } from "@slack/bolt";

export function setupMemberOnboarding(app: App): void {
  const onboardingChannel = process.env.ONBOARDING_CHANNEL;
  const welcomeMessage = process.env.WELCOME_MESSAGE;

  if (!onboardingChannel || !welcomeMessage) {
    console.warn(
      `[member_joined] Missing ONBOARDING_CHANNEL or WELCOME_MESSAGE. Onboarding disabled.`,
    );
    return;
  }

  app.event("member_joined_channel", async ({ event, client }) => {
    if (event.channel != onboardingChannel) return;

    try {
      await client.chat.postEphemeral({
        channel: event.channel,
        user: event.user,
        text: welcomeMessage,
      });

      console.log(
        `[member_joined] Welcomed user ${event.user} in ${event.channel}`,
      );
    } catch (err) {
      console.error("[member_joined] Failed to send welcome message");
    }
  });

  console.log(
    `[member_joined] Onboarding listener active for channel ${onboardingChannel}`,
  );
}
