import { bodyParser } from "@/main/config/middleware/body-parser";
import { Express } from "express";

export const setupMiddleware = (app: Express): void => {
  app.use(bodyParser);
}