import express from "express";
import cors from "cors";
import morgan from "morgan";
import auth from "./auth";
import files from "./files";

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("tiny"));
  auth({ app });
  files({ app });

  app.use((req, res, next) => {
    const err = new Error("Not Found");
    (err as any).status = 404;
    next(err);
  });
  app.use((err: any, req: any, res: any, next: any) => {
    if (err.name === "UnauthorizedError")
      return res.status(err.status).send({ message: err.message }).end();
    return next(err);
  });
  app.use((err: any, req: any, res: any, next: any) => {
    console.log("error: ", err.message);
    res.status(err.status || 500);
    res.json({
      error: err.message,
    });
  });
};
