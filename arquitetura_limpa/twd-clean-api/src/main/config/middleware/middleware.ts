import { bodyParser } from "@/main/config/middleware/body-parser";
import { cors } from "@/main/config/middleware/cors";
import { Express } from "express";

export const setupMiddleware = (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
}