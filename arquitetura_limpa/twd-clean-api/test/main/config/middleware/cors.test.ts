import request from "supertest";
import { app } from "@/main/config";

describe("CORS Middleware", () => {
  test("should enable CORS", async () => {
    app.post("/test_cors", (req, res) => {
      res.send();
    });

    await request(app)
      .get("/test_cors")
      .expect("access-control-allow-origin", "*")
      .expect("access_control-allow-headers", "*")
      .expect("access-control-allow-methods", "*")
  });
});