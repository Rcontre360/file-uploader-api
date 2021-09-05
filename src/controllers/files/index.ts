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
    new Promise<string>(async (resolve, reject) => {
      try {
        const file = await this.database.getFile(fileId);
        const filePath = path.resolve(
          (global as any).appRoot,
          "./public/uploads/",
          fileId
        );
        fs.exists(filePath, (exists) => {
          if (exists) resolve(filePath);
          else reject(new Error("File not found"));
        });
      } catch (err) {
        reject(new Error("File not found"));
      }
    });

  getFiles = async (userId: string) => {
    return await this.database.getFiles(userId);
  };

  deleteFile = async (fileId: string) => {
    await this.database.deleteFile(fileId);
  };
}

export default FileService;
