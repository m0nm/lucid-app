import express, { Response } from "express";
import passport from "passport";
import verifyUser from "./middleware/verify-user";

import { userRoutes } from "@/features/user";
import { authRoutes } from "@/features/auth";
import { noteRoutes } from "@/features/note";
import { tagRoutes } from "@/features/tag";
import { taskRoutes } from "./features/task";
import { notebookRoutes } from "./features/notebook";

const router = express.Router();

router.use("/api/healthcheck", (req, res: Response) => {
  return res.sendStatus(200);
});

router.use("/api/users", userRoutes);
router.use("/api/auth", authRoutes);

router.use(
  "/api/notes",
  passport.authenticate("jwt", { session: false }),
  verifyUser,
  noteRoutes
);

router.use(
  "/api/tags",
  passport.authenticate("jwt", { session: false }),
  verifyUser,
  tagRoutes
);

router.use(
  "/api/notebooks",
  passport.authenticate("jwt", { session: false }),
  verifyUser,
  notebookRoutes
);

router.use(
  "/api/tasks",
  passport.authenticate("jwt", { session: false }),
  verifyUser,
  taskRoutes
);

export default router;
