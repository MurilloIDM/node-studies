import { UserData } from "@/entities";
import { InvalidEmailError, InvalidNameError } from "@/entities/errors";
import { RegisterUserOnMailingList } from "@/useCases/register-user-on-mailing-list";
import { UserRepository } from "@/useCases/register-user-on-mailing-list/ports";
import { MissingParamError } from "@/web-controllers/errors";
import { HttpRequest, HttpResponse } from "@/web-controllers/ports";
import { RegisterUserController } from "@/web-controllers/register-user-controller";
import { InMemoryUserRepository } from "@test/useCases/register-user-on-mailing-list/repository";

describe("Register user web controller", () => {

  test("should return status code 201 when request contains valid user data", async () => {
    const request: HttpRequest = {
      body: {
        name: "Any name",
        email: "any@mail.com",
      }
    };

    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo);
    const controller: RegisterUserController = new RegisterUserController(usecase);

    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(request.body);
  });

  test("should return status code 400 when request contains invalid name", async () => {
    const request: HttpRequest = {
      body: {
        name: "a",
        email: "any@email.com",
      },
    };

    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo);
    const controller: RegisterUserController = new RegisterUserController(usecase);

    const response: HttpResponse = await controller.handle(request);
    
    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(InvalidNameError);
  });

  test("should return status code 400 when request contains invalid email", async () => {
    const request: HttpRequest = {
      body: {
        name: "Any name",
        email: "any @email.com",
      },
    };

    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo);
    const controller: RegisterUserController = new RegisterUserController(usecase);

    const response: HttpResponse = await controller.handle(request);
    
    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(InvalidEmailError);
  });

  test("should return status code 400 when request is missing user name", async () => {
    const request: HttpRequest = {
      body: {
        email: "any@email.com",
      },
    };

    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo);
    const controller: RegisterUserController = new RegisterUserController(usecase);

    const response: HttpResponse = await controller.handle(request);
    
    expect(response.statusCode).toEqual(400);
    expect(response.body.message as MissingParamError).toEqual("Missing name parameter from request.");
  });

  test("should return status code 400 when request is missing user email", async () => {
    const request: HttpRequest = {
      body: {
        name: "Any request",
      },
    };

    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo);
    const controller: RegisterUserController = new RegisterUserController(usecase);

    const response: HttpResponse = await controller.handle(request);
    
    expect(response.statusCode).toEqual(400);
    expect(response.body.message as MissingParamError).toEqual("Missing email parameter from request.");
  });

  test("should return status code 400 when request is missing user name and email", async () => {
    const request: HttpRequest = {
      body: {},
    };

    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo);
    const controller: RegisterUserController = new RegisterUserController(usecase);

    const response: HttpResponse = await controller.handle(request);
    
    expect(response.statusCode).toEqual(400);
    expect(response.body.message as MissingParamError).toEqual("Missing name and email parameter from request.");
  });

});