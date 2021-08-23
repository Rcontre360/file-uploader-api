import config from "../../config";
import mysql, { Pool } from "mysql";

const db = mysql.createPool({
  host: config.database.url,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
});

export const createConnection = () =>
  new Promise((resolve, reject) => {
    db.getConnection((err: Error) => {
      if (err) {
        reject(err);
        console.log("error connecting: " + err.message, err.stack);
        return;
      }
      console.log("database connected");
      resolve({ message: "success" });
    });
  });

export default db;
