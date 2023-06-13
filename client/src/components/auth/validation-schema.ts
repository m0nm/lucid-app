import z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .nonempty("Email is required")
    .email("Email must be a valid email"),

  password: z
    .string({ required_error: "Password is required" })
    .nonempty("Password is required"),
});

export const registerSchema = loginSchema
  .extend({
    password: z
      .string({ required_error: "Password is required" })
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long"),

    passwordConfirm: z
      .string({ required_error: "Password confirmation is required" })
      .nonempty("Password confirmation is required"),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });
