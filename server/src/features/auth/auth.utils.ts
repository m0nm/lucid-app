import path from "path";
import nodemailer from "nodemailer";
import ejs from "ejs";
import logger from "@/utils/logger";

const env = process.env.NODE_ENV || "development";

export const sendMail = async (recieverEmail: string, link: string) => {
  try {
    let transporter;

    if (env == "development") {
      // use this for testing
      let testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } else {
      transporter = nodemailer.createTransport({
        // @ts-ignore
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }

    const logo = path.resolve(
      __dirname,
      "../../views/assets/logo-light-mode.png"
    );
    const html = await ejs.renderFile(
      path.resolve(__dirname, "../../views/reset-password.ejs"),
      {
        link,
        logo,
      }
    );

    let info = await transporter.sendMail({
      from: '"Lucid" <lucid@tech.com>',
      to: recieverEmail,
      subject: "Reset your password",
      text: `reset password link (skip this message if you did not request a password reset), ${link}`,
      html,
    });

    if (env == "development") {
      logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info)); // works in test
    }

    return true;
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
