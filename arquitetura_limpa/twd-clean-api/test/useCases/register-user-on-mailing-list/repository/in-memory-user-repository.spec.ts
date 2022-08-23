import { UserData } from "../../../../src/entities";

import { InMemoryUserRepository } from "./"; 

describe("In memory User repository", () => {

  test("should return null if user is not found", async () => {
    const users: UserData[] = [];
    const userRepo = new InMemoryUserRepository(users);

    const user = await userRepo.findUserByEmail("any@email.com");

    expect(user).toBeNull();
  });

  test("should return user if it is found in the repository", async () => {
    const users: UserData[] = [];
    const userRepo = new InMemoryUserRepository(users);

    const name = "any_name";
    const email = "any@email.com";

    await userRepo.add({ name, email });

    const user = await userRepo.findUserByEmail("any@email.com");
    
    expect(user.name).toBe("any_name");
  });

  test("should return all users in the repository", async () => {
    const users: UserData[] = [
      {
        name: "any_name",
        email: "any@email.com",
      },
      {
        name: "second_name",
        email: "second@email.com",
      },
    ];
    const userRepo = new InMemoryUserRepository(users);

    const returnedUsers = await userRepo.findAllUsers();

    expect(returnedUsers.length).toBe(2);
  });

});