import { Email } from "./email";

describe("E-mail validation", () => {

  test("should not accpet null strings", () => {
    const email = null;
    expect(Email.validate(email)).toBeFalsy();
  });

  test("should not accept empty strings", () => {
    const email = "";
    expect(Email.validate(email)).toBeFalsy();
  });

  test("should accpet valid email", () => {
    const email = "any@email.com";
    expect(Email.validate(email)).toBeTruthy();
  });

})