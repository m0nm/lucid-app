import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects } from "zod";

const validate =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, query, params } = req;

      schema.parse({ body, query, params });
      return next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

export default validate;
