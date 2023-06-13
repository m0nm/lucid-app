import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import "../config/mongoose";

import router from "./routes";
import errorHandler from "./middleware/error-handler";
import dbConnect from "./utils/db-connect";
import logger from "./utils/logger";
import { applyPassportStrategy } from "config/passport";

const app = express();
const clientUrl = process.env.CLIENT_URL;

app.use(express.static(path.resolve(__dirname, "./views/assets")));

app.use(compression());
app.use(cors({ origin: clientUrl }));
app.use(helmet());
app.use(express.json());
applyPassportStrategy(passport);

app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  logger.info(`App is running at port: ${PORT}`);
  await dbConnect();
});
