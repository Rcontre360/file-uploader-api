import { Router } from "express";
import path from "path";
import multer from "multer";

const route = Router();
const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, path.resolve((global as any).appRoot, "./public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

export default ({ app }: { app: Router }) => {
  route.post("/file", uploadFile, async (req, res, next) => {
    console.log("FOUND");
    res.send(201);
  });

  app.use(route);
};
