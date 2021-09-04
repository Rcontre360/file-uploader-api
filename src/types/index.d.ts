interface Database {
  createUser(user: User): Promise<User>;
  findUsers(data: { email: string }): Promise<User[]>;
  updateUser(fields: Partial<User>, userId: string): Promise<boolean>;

  insertFiles(file: UserFile[]): Promise<UserFile[]>;
  getFiles(userId: string): Promise<UserFile[]>;
  deleteFile(fileId: string): Promise<UserFile>;
}

interface EmailService {
  sendConfirmationEmail({
    email,
    userName,
    userId,
  }: {
    email: string;
    userName: string;
    userId: string;
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
  isVerified: boolean;
  userName: string;
  email: string;
  userPassword: string;
  salt?: string;
}

interface UserFile {
  id: string;
  userId: string;
  mimeType: string;
  fileName: string;
  size: number;
  createdAt?: string;
}

declare module NodeJS {
  interface Global {
    appRoot: string;
  }
}
