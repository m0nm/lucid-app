import { z } from "zod";
import c from "./user.constants";

export const UserSchema = z.object({
  body: z.object({
    email: z.string({ required_error: c.EMAILREQUIRED }).email(c.EMAILINVALID),

    password: z
      .string({ required_error: c.PASSWORDREQUIRED })
      .min(6, c.PASSWORDLENGTH),

    avatar: z.string().url().optional(),
  }),
});

export const CreateUserSchema = UserSchema.merge(
  z.object({
    body: UserSchema.shape.body.extend({
      passwordConfirm: z.string({
        required_error: c.PASSWORDCONFIRMREQUIRED,
      }),
    }),
  })
).refine(({ body }) => body.password === body.passwordConfirm, {
  message: c.PASSWORDMATCH,
  path: ["password_confirm"],
});

export const UpdateUserSchema = UserSchema.merge(
  z.object({
    body: UserSchema.shape.body.deepPartial().extend({
      newPassword: z.string().min(6, c.PASSWORDLENGTH).optional(),
    }),
  })
);
