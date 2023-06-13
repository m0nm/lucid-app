import throwError from "@/utils/throw-error";
import { User } from "../user";
import { verifyJwtToken, signJwtToken } from "@/utils/jwt";
import { sendMail } from "./auth.utils";

const clientUrl = process.env.CLIENT_URL;

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user && typeof user === "undefined") throwError(404, "User not found");

  const isValidPassword = await user?.comparePassword(password);
  if (!isValidPassword) throwError(400, "Invalid Credentials");

  const token = user?.signJwtToken();
  return { user, token };
}

export async function forgotPassword(email: string) {
  const user = await User.findOne({ email });
  if (user === null || typeof user === "undefined") {
    throwError(404, "No user found by this email");
  }

  const token = signJwtToken(email, { expiresIn: "10m" });
  const link = `${clientUrl}/reset-password/?userId=${user?._id}&token=${token}`;

  await sendMail(email, link);

  return true;
}

export async function resetPassword(
  userId: string,
  token: string,
  password: string
) {
  const user = await User.findOne({ _id: userId });

  if (user === null || typeof user === "undefined") {
    throwError(404, "No user found by this email");
  }

  verifyJwtToken(token);

  user!.password = password;
  await user?.save();

  return true;
}
