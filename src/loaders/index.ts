import { Application } from "express";
import { createConnection } from "./database";
import express from "./express";

export default async ({ app }: { app: Application }) => {
  await createConnection();
  express({ app });
};
