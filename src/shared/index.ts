import { Request, Response, NextFunction } from "express";
import path from "path";
import { v4 as uuid } from "uuid";
import multer from "multer";
import jwt from "express-jwt";
import { ObjectSchema } from "joi";
import config from "@config/index";

export const validationMiddleware =
  (schema: ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };

export const authorizationMiddleware = jwt({
  secret: config.jwtSecret,
  userProperty: "token",
  algorithms: [config.jwtAlgorithm], // JWT Algorithm
  getToken: (req) => {
    if (
      (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Token") ||
      (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer")
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    return null;
  },
});

const maxSize = 100 * 1024 * 1024;
export const uploaderMiddleware = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve((global as any).appRoot, "./public/uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, `${uuid()}.${getFileExtension(file.originalname)}`);
    },
  }),
  limits: { fileSize: maxSize },
}).array("file");

export const getFileExtension = (filename: string) => {
  const reverse = (str: string) => str.split("").reverse().join("");
  const reversedName = reverse(filename);
  return reverse(reversedName.substring(0, reversedName.indexOf(".")));
};
