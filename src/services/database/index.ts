import db from "../../loaders/database";

class MysqlDatabase implements Database {
  createUser = (user: User) =>
    new Promise<User>((resolve) => {
      const params = [user.userName, user.email, user.userPassword, user.salt];
      db.query(
        "INSERT INTO users(userName,email,userPassword,salt) VALUES(?,?,?,?)",
        params,
        (error, results, fields) => {
          if (error) throw error;
          resolve(user);
        }
      );
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
  createFile = (file: unknown) => new Promise<unknown>((resolve) => {});
}

export default MysqlDatabase;
