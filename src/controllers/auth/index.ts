class AuthService {
  private database: Database;

  constructor({ database }: { database: Database }) {
    this.database = database;
  }

  async signup(user: User) {
    const existingUser = await this.database.findUsers(user);
    if (existingUser.length > 0) throw new Error("User cannot be signed up");

    const userCreated = await this.database.createUser(user);
    delete (userCreated as any).password;
    return userCreated;
  }
}

export default AuthService;
