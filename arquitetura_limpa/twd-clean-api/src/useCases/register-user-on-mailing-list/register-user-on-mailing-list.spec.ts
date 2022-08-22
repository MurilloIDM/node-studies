import { InvalidEmailError } from "../../entities/errors/invalid-email-error";
import { InvalidNameError } from "../../entities/errors/invalid-name-error";
import { UserData } from "../../entities/user-data";
import { left } from "../../shared/either";
import { UserRepository } from "./ports/user-repository";
import { RegisterUserOnMailingList } from "./register-user-on-mailing-list";
import { InMemoryUserRepository } from "./repository/in-memory-user-repository";

describe("Register user on mailing list use case", () => {

  test("should add user with complete data to mailing list", async () => {
    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usercase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo);

    const name = "any_name";
    const email = "any@email.com";

    const response = await usercase.execute({ name, email });

    const user = await repo.findUserByEmail("any@email.com");

    expect(user.name).toBe("any_name");
    expect(response.value.name).toBe("any_name");
  });

  test("should not add user with invalid email to mailing list", async () => {
    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usercase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo);

    const name = "any_name";
    const invalidEmail = "invalid_email";

    const response = await usercase.execute({ name, email: invalidEmail });
    const user = await repo.findUserByEmail(invalidEmail);

    expect(user).toBeNull();
    expect(response).toEqual(left(new InvalidEmailError()));    
  });

});