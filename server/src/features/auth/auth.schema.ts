import z from "zod";

export const ForgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Email must be a valid email"),
  }),
});

export const ResetPasswordSchema = z.object({
  body: z.object({
    password: z.string({ required_error: "Password is required" }),
  }),
});
