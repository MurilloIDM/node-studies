import { UserData } from "./user-data";

describe("Register user on mailing list use case", () => {

  test("should add user with complete data to mailing list", async () => {
    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usercase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo);

    const name = "any_name";
    const email = "any@email.com";

    const response = await usercase.registerUserOnMailingList({ name, email });

    const user = await repo.findUserByEmail("any@email.com");

    expect(user.name).toBe("any_name");
  });

});