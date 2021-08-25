import nodemailer from "nodemailer";
import config from "@config/index";

class NodeMailerService implements EmailService {
  sendConfirmationEmail = async ({
    email,
    userName,
  }: {
    email: string;
    userName: string;
  }) => {};

  sendChangePasswordEmail = async ({
    email,
    userName,
  }: {
    email: string;
    userName: string;
  }) => {};
}
