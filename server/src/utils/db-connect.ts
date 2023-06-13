import logger from "./logger";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export default async function dbConnect() {
  const db_local_URI = process.env.DB_LOCAL_URI as string;
  const db_remove_URI = process.env.DB_REMOTE_URI as string;
  const nodeEnv = process.env.NODE_ENV || "development";

  try {
    await mongoose.connect(
      nodeEnv == "development" ? db_local_URI : db_remove_URI
    );
    logger.info("DB connected");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}
