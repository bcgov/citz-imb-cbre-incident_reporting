import { model } from "mongoose";
import { userSchema } from "./user.schema";

export const UserModel = model("User", userSchema);
