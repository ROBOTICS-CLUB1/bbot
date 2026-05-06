import { UserRole } from "../db";

const ROLE_HIERARCHY: Record<string, number> = {
  guest: 0,
  member: 1,
  lead: 2,
  admin: 3,
};

export function requireRole(minRole: string) {
  return async ({ command, ack, respond, next }: any) => {
    const userId = command?.user_id;
    if (!userId) {
      await ack();
      await respond({
        response_type: "ephemeral",
        text: "Could not identify you user. ",
      });
      return;
    }

    const record = await UserRole.findOne({ userId });
    const role = record?.role ?? "member";

    if (ROLE_HIERARCHY[role] < ROLE_HIERARCHY[minRole]) {
      await ack();
      await respond({
        response_type: "ephemeral",
        text: `This command requires the ${minRole} role or higher.  You are ${role}. `,
      });
      return;
    }

    await next();
  };
}
