import { config } from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const isDevelopment = process.env.NODE_ENV === "development";

const envFound = config();
if (envFound.error) {
  throw new Error("Cannot find .env file");
}

export default {
  host: process.env.HOST,
  port: process.env.PORT,
  url: process.env.URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGORITHM,
  database: {
    user: process.env.DATABASE_USER,
    name: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    url: isDevelopment ? "localhost" : process.env.DATABASE_URL,
  },
  mailer: {
    email: process.env.EMAIL_NAME,
    password: process.env.EMAIL_PASSWORD,
  },
};
