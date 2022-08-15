describe("User domain entity", () => {
  
  test("should not create user with invalid e-mail address", () => {
    const invalidEmail = "invalid_email";
    const error = User.create({ name: "any_name", email: invalidEmail });
  });

});