import { Router } from "express";
import { authorizationMiddleware, uploaderMiddleware } from "@shared/index";
import path from "path";
import MysqlDatabase from "@services/database";
import FileService from "@controllers/files";

const route = Router();

export default ({ app }: { app: Router }) => {
  route.post(
    "/files/:userId",
    authorizationMiddleware,
    uploaderMiddleware,
    async (req, res) => {
      const { userId } = req.params;
      const fileRequest = req.files as any[];
      const service = new FileService({ database: new MysqlDatabase() });
      await service.insertFiles(
        fileRequest.map((file) => ({
          userId,
          fileName: file.originalname as string,
          mimeType: file.mimetype as string,
          size: file.size as number,
          id: file.filename as string,
        }))
      );
      res.status(201).json({ message: "success" });
    }
  );

  //TODO
  route.delete("/files/:fileId", authorizationMiddleware, async (req, res) => {
    res;
    res.send(201);
  });

  route.get("/files/all/:userId", authorizationMiddleware, async (req, res) => {
    const { userId } = req.params;
    const service = new FileService({ database: new MysqlDatabase() });
    const files = await service.getFiles(userId);
    res.status(201).json({ files });
  });

  route.get(
    "/files/:fileId",
    authorizationMiddleware,
    async (req, res, next) => {
      const { fileId } = req.params;
      const service = new FileService({ database: new MysqlDatabase() });
      try {
        const filePath = await service.getFile(fileId);
        res.download(filePath);
      } catch (err) {
        next(err);
      }
    }
  );

  app.use(route);
};
