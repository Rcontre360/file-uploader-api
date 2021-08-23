import { Router } from "express";
import joi from "joi";
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
        password: joi.string().required().min(5),
        repeatPassword: joi.ref("password"),
      })
    ),
    async (req, res, next) => {
      try {
        const auth = new AuthService({ database: new Database() });
        const user = await auth.signup(req.body);
        return res.status(201).json({ user });
      } catch (err) {
        next(err);
      }
    }
  );

  route.post("/login", (req, res) => {
    res.send("login");
  });

  route.post("/logout", (req, res) => {
    res.send("logout");
  });
  app.use(route);
};
