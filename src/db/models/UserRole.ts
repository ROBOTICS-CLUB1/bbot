import mongoose, { Schema, Document, mongo } from "mongoose";

export interface IUserRole extends Document {
  userId: string;
  role: "admin" | "lead" | "member" | "guest";
}

const UserRoleSchema = new Schema<IUserRole>({
  userId: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "lead", "member", "guest"],
    default: "member",
  },
});

export const UserRole = mongoose.model<IUserRole>("UserRole", UserRoleSchema);
