import { NextFunction, Request, Response } from "express";
import userModel from "./user.model";

export const checkUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const isExist = await userModel.exists({ email: body.email });

    if (isExist) {
      return res.status(400).send({ message: "Email already exist" });
    }

    return next();
  } catch (error) {
    res.status(400).send(error);
  }
};
