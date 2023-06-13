import pino from "pino";
import dayjs from "dayjs";

const logger = pino({
  transport: {
    target: "pino-pretty",
  },
  timestamp: () => `, time: ${dayjs().format()}`,
  base: undefined,
});

export default logger;
