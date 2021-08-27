import db from "../../loaders/database";

class MysqlDatabase implements Database {
  createUser = (user: User) =>
    new Promise<User>((resolve) => {
      const params = this.createQuery(
        user as Record<keyof User, User[keyof User]>
      );
      db.query(`INSERT INTO users SET ${params}`, (error, results, fields) => {
        if (error) throw error;
        resolve(user);
      });
    });
  findUsers = (data: { email: string }) =>
    new Promise<User[]>((resolve) => {
      const params = [data.email];
      db.query(
        "SELECT * FROM users WHERE email = ?",
        params,
        (error, results, fields) => {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  updateUser = (updatedFields: Partial<User>, userId: string) =>
    new Promise<boolean>((resolve) => {
      const params = Object.entries(updatedFields)
        .map((entry) => `${entry[0]} = ${entry[1]}`)
        .join(" ");
      db.query(
        `UPDATE users SET ${params} WHERE id = '${userId}'`,
        params,
        (error, results, fields) => {
          if (error) throw error;
          resolve(true);
        }
      );
    });

  createFile = (file: unknown) => new Promise<unknown>((resolve) => {});

  private createQuery = (updatedFields: Record<string, unknown>) => {
    const surroundQuotes = (arg: unknown) =>
      typeof arg === "string" ? `'${arg}'` : arg;

    return Object.entries(updatedFields)
      .map((entry) => `${entry[0]} = ${surroundQuotes(entry[1])}`)
      .join(", ");
  };
}

export default MysqlDatabase;
