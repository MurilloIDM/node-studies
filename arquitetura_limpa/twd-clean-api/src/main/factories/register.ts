import { RegisterUserController } from "@/web-controllers";
import { RegisterUserOnMailingList } from "@/useCases/register-user-on-mailing-list";
import { InMemoryUserRepository } from "@/useCases/register-user-on-mailing-list/repository";

export const makeRegisterUserController = (): RegisterUserController => {
  const inMemoryUserRepository = new InMemoryUserRepository([]);
  const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(inMemoryUserRepository);
  const registerUserController = new RegisterUserController(registerUserOnMailingListUseCase);

  return registerUserController;
}