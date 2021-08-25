import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import MailService from "@services/email";
import config from "@config/index";
import Mail from "nodemailer/lib/mailer";

class AuthService {
  private database: Database;

  constructor({ database }: { database: Database }) {
    this.database = database;
  }

  signup = async (
    user: User,
    createHash: (arg: string, options: { salt: Buffer }) => Promise<string>
  ) => {
    const salt = randomBytes(32);
    const userHash = await createHash(user.userPassword, { salt });

    const existingUser = await this.database.findUsers({ email: user.email });
    if (existingUser.length > 0) throw new Error("User cannot be signed up");

    const userCreated = await this.database.createUser({
      ...user,
      userPassword: userHash,
      salt: String(salt),
    });
    const token = this.createToken(userCreated);
    const mailer = new MailService();

    await mailer.sendConfirmationEmail({
      email: user.email,
      userName: user.userName,
    });

    delete userCreated.userPassword;
    return { user: userCreated, token };
  };

  login = async (
    { email, password }: { email: string; password: string },
    verify: (hashedPassword: string, password: string) => Promise<boolean>
  ) => {
    const queryResponse = await this.database.findUsers({ email });
    if (queryResponse.length <= 0) throw new Error("User cannot be logged");

    const isValidPassword = await verify(
      queryResponse[0].userPassword,
      password
    );
    if (!isValidPassword) throw new Error("Invalid password");

    const token = this.createToken(queryResponse[0]);
    return { user: queryResponse[0], token };
  };

  private createToken = (user: User) => {
    const expDate = new Date(new Date());
    expDate.setDate(new Date().getDate() + 10);
    return jwt.sign(
      {
        id: user.id,
        userName: user.userName,
        exp: expDate.getTime() / 1000,
      },
      config.jwtSecret
    );
  };
}

export default AuthService;
