import mongoose, { Schema } from "mongoose";
interface IUser {
  username: string;
  questions: mongoose.Types.ObjectId[];
}
const UserSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

export const User = mongoose.model<IUser>("User", UserSchema);
