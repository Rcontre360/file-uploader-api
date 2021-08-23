import express from "express";
import path from "path";
import config from "./config";
import loaders from "./loaders";

const port = config.port;
(global as any).appRoot = path.resolve(__dirname, "../");

const start = async () => {
  const app = express();
  loaders({ app });

  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
};

start();
