interface Database {
  createUser(user: User): Promise<User>;
  findUsers(data: { email: string }): Promise<User[]>;
  createFile(file: unknown): Promise<unknown>;
}

interface EmailService {
  sendConfirmationEmail({
    email,
    userName,
  }: {
    email: string;
    userName: string;
  }): Promise<unknown>;
  sendChangePasswordEmail({
    email,
    userName,
  }: {
    email: string;
    userName: string;
  }): Promise<unknown>;
}

interface User {
  id?: string;
  userName: string;
  email: string;
  userPassword: string;
  salt?: string;
}

declare module NodeJS {
  interface Global {
    appRoot: string;
  }
}
