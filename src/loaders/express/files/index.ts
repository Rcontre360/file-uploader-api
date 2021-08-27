import { Router } from "express";
import { authorizationMiddleware, uploaderMiddleware } from "@shared/index";
import auth from "../auth";

const route = Router();

export default ({ app }: { app: Router }) => {
  route.post(
    "/files",
    authorizationMiddleware,
    uploaderMiddleware,
    async (req, res) => {
      console.log(req.file);
      res.send(201);
    }
  );

  route.delete("/files/:fileId", authorizationMiddleware, async (req, res) => {
    res;
    res.send(201);
  });

  route.get("/files/:userId", authorizationMiddleware, async (req, res) => {
    res;
    res.send(201);
  });

  route.get("/files/:fileId", authorizationMiddleware, async (req, res) => {
    res;
    res.send(201);
  });

  app.use(route);
};
