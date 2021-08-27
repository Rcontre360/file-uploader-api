import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
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
      userName: user.userName,
      email: user.email,
      userPassword: userHash,
      isVerified: false,
      id: uuid(),
      salt: String(salt),
    });
    const token = this.createToken(userCreated);
    const mailer = new MailService();

    await mailer.sendConfirmationEmail({
      email: user.email,
      userName: user.userName,
      userId: userCreated.id,
    });

    delete userCreated.userPassword;
    return { user: userCreated, token };
  };

  login = async (
    { email, password }: { email: string; password: string },
    verify: (hashedPassword: string, password: string) => Promise<boolean>
  ) => {
    const userQuery = await this.database.findUsers({ email });
    if (userQuery.length <= 0 || !userQuery[0].isVerified)
      throw new Error("User cannot be logged");

    const isValidPassword = await verify(userQuery[0].userPassword, password);

    if (!isValidPassword) throw new Error("Invalid password");
    if (!userQuery[0].isVerified) throw new Error("User is not verified");

    return { user: userQuery[0] };
  };

  verifyUser = async ({ email, id }: { email: string; id: string }) => {
    const userQuery = await this.database.findUsers({ email });
    if (!userQuery[0]) throw new Error("User not found");

    this.database.updateUser({ isVerified: true }, id);

    const token = this.createToken(userQuery[0]);

    return { user: userQuery[0], token };
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
