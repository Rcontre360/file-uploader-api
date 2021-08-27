class FileService {
  database: Database;

  constructor({ database }: { database: Database }) {
    this.database = database;
  }

  createFile = async (file: UserFile) => {
    await this.database.createFile(file);
    return file;
  };

  getFiles = async (userId: string) => {
    return await this.database.getFiles(userId);
  };

  deleteFile = async (fileId: string) => {
    await this.database.deleteFile(fileId);
  };
}

export default FileService;
