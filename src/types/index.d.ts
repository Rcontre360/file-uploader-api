interface Database {
  createUser(user: User): Promise<User>;
  findUsers(user: User): Promise<User[]>;
}

interface User {
  name: string;
  email: string;
  password: string;
}

declare module NodeJS {
  interface Global {
    appRoot: string;
  }
}
