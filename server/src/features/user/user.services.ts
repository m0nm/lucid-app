import { signJwtToken } from "@/utils/jwt";
import throwError from "@/utils/throw-error";
import User from "./user.model";
import { UserDocument } from "./user.types";

export async function createUser(
  user: Pick<UserDocument, "email" | "password">
) {
  const newUser = await User.create(user);
  const token = signJwtToken(newUser.email);

  return { newUser, token };
}

export async function updateUser(
  userId: UserDocument["id"],
  updates: Pick<Partial<UserDocument>, "email" | "password" | "avatar"> & {
    newPassword: string | undefined;
  }
) {
  const user = await User.findOne({ _id: userId });
  if (user === null || typeof user === "undefined") {
    throwError(404, "User not found");
    return;
  }

  const { avatar, email, password, newPassword } = updates;

  // update avatar
  if (avatar) {
    user.avatar = avatar;
    await user.save();
  }

  // update email
  else if (email && password) {
    const emailExist = await User.findOne({ email });
    if (emailExist) throwError(400, "Email already taken");

    const valid = await user.comparePassword(password);
    if (!valid) throwError(400, "Invalid credentials");

    user.email = email;
    await user.save();
  }

  // update password
  else if (password && newPassword) {
    const valid = await user.comparePassword(password);
    if (!valid) throwError(400, "Invalid credentials");

    user.password = newPassword;
    await user.save();
  }

  return user;
}

export async function deleteUser(userId: string, password: string) {
  const user = await User.findOne({ _id: userId });
  if (user === null || typeof user === "undefined") {
    throwError(404, "User not found");
    return;
  }

  const valid = await user?.comparePassword(password);
  if (!valid) throwError(400, "Invalid credentials");

  await user?.delete();

  return true;
}
