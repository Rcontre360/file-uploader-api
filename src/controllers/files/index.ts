import path from "path";
import fs from "fs";

class FileService {
  database: Database;

  constructor({ database }: { database: Database }) {
    this.database = database;
  }

  insertFiles = async (files: UserFile[]) => {
    await this.database.insertFiles(files);
    return files;
  };

  getFile = (fileId: string) =>
    new Promise<string>((resolve, reject) => {
      const filePath = path.resolve(
        (global as any).appRoot,
        "./public/uploads/",
        fileId
      );
      fs.exists(filePath, (exists) => {
        if (exists) resolve(filePath);
        else reject(new Error("File not found"));
      });
    });

  getFiles = async (userId: string) => {
    return await this.database.getFiles(userId);
  };

  deleteFile = async (fileId: string) => {
    await this.database.deleteFile(fileId);
  };
}

export default FileService;
