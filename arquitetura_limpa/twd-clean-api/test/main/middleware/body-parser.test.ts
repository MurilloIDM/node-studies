import request from "supertest";

import { app } from "@/main/config";

describe("Body parser middleware", () => {

  test("should parse body as json", async () => {
    app.post("/test_body_parser", (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .post("/test_body_parser")
      .send({ name: "Murillo" })
      .expect({ name: "Murillo" });
  });

});