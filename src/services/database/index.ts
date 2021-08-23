import db from "../../loaders/database";

class MysqlDatabase implements Database {
  createUser = (user: User) =>
    new Promise<User>((resolve) => {
      const params = [user.name, user.email, user.password];
      db.query(
        "INSERT INTO users(userName,email,userPassword) VALUES(?,?,?)",
        params,
        (error, results, fields) => {
          if (error) throw error;
          resolve(user);
        }
      );
    });
  findUsers = (user: User) =>
    new Promise<User[]>((resolve) => {
      const params = [user.name, user.email, user.password];
      db.query(
        "SELECT * FROM users WHERE userName = ? AND email = ? AND userPassword = ?",
        params,
        (error, results, fields) => {
          if (error) throw error;
          resolve(results);
        }
      );
    });
}

export default MysqlDatabase;
