import { Router } from "express";
import joi from "joi";
import argon2 from "argon2";
import Database from "@services/database";
import AuthService from "@controllers/auth";
import { validationMiddleware } from "@shared/index";

const route = Router();

export default ({ app }: { app: Router }) => {
  route.post(
    "/signup",
    validationMiddleware(
      joi.object({
        userName: joi.string().alphanum().required().min(3).max(255),
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        userPassword: joi.string().required().min(5),
        repeatPassword: joi.ref("userPassword"),
      })
    ),
    async (req, res, next) => {
      try {
        const auth = new AuthService({ database: new Database() });
        const { user, token } = await auth.signup(req.body, argon2.hash);
        return res.status(201).json({ user, token });
      } catch (err) {
        next(err);
      }
    }
  );

  route.post(
    "/login",
    validationMiddleware(
      joi.object({
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: joi.string().required().min(5),
      })
    ),
    async (req, res) => {
      const auth = new AuthService({ database: new Database() });
      const { user, token } = await auth.login(req.body, argon2.verify);
      res.status(201).json({ user, token });
    }
  );

  route.post("/logout", (req, res) => {
    res.send("logout");
  });
  app.use(route);
};
