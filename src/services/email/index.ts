import nodemailer from "nodemailer";
import welcomeTemplate from "@services/email/welcomeTemplate";
import config from "@config/index";

class NodeMailerService implements EmailService {
  sendConfirmationEmail = async ({
    email,
    userName,
    userId,
  }: {
    email: string;
    userName: string;
    userId: string;
  }) => {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: config.mailer.email,
        pass: config.mailer.password,
      },
    });
    const mailOptions = {
      from: config.mailer.email,
      to: email,
      subject: `Welcome ${userName}`,
      html: welcomeTemplate({
        userName,
        loginUrl: `${config.url}/verify/${email}/${userId}`,
      }),
    };
    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (e) {
      throw e;
    }
  };

  sendChangePasswordEmail = async ({
    email,
    userName,
  }: {
    email: string;
    userName: string;
  }) => {};
}

export default NodeMailerService;
