import nodemailer from "nodemailer";
import config from "@config/index";

class NodeMailerService implements EmailService {
  sendConfirmationEmail = async ({
    email,
    userName,
  }: {
    email: string;
    userName: string;
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
      text: "Hello world?",
      html: "<b>Hello world?<",
    };
    try {
      const response = await transporter.sendMail(mailOptions);
      console.log(response);
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
