import { Request, Response, NextFunction } from "express";
import joi, { ObjectSchema } from "joi";

export const validationMiddleware =
  (schema: ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await schema.validateAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
