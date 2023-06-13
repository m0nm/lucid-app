import { z } from "zod";

export const TagSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "tag name is required" }),
  }),
});
