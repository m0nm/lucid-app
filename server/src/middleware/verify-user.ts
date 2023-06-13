import { Request, Response, NextFunction } from "express";
import throwError from "../utils/throw-error";

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throwError(404, "User not found");
  next();
};

export default verifyUser;
