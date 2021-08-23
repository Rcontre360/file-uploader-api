import config from "./config";
import express from "express";
import loaders from "./loaders";

const port = config.port;

const start = async () => {
  const app = express();
  loaders({ app });

  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
};

start();
