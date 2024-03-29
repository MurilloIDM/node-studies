import { Email } from "@/entities";

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

  test("should not accept local part large than 64 chars", () => {
    const email = 'l'.repeat(65) + "@email.com";
    expect(Email.validate(email)).toBeFalsy();
  });

  test("should not accept strings large than 320 chars", () => {
    const email = 'c'.repeat(64) + "@" + 'd'.repeat(127) + "." + 'c'.repeat(128);
    expect(Email.validate(email)).toBeFalsy();
  });

  test("should not accept domain part large than 255 chars", () => {
    const email = "local@" + 'd'.repeat(128) + '.' + 'd'.repeat(127);
    expect(Email.validate(email)).toBeFalsy();
  });

  test("should not accept empty local part", () => {
    const email = "@email.com";
    expect(Email.validate(email)).toBeFalsy();
  });

  test("should not accept empty domain", () => {
    const email = "any@";
    expect(Email.validate(email)).toBeFalsy();
  });

  test("should not accept domain with a part large than 63 chars", () => {
    const email = "any@" + 'd'.repeat(64) + ".com";
    expect(Email.validate(email)).toBeFalsy();
  });

  test("should not accept local parth with invalid char", () => {
    const email = "any email@email.com";
    expect(Email.validate(email)).toBeFalsy();
  });

})