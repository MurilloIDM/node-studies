import { InvalidEmailError, InvalidNameError } from "@/entities/errors";
import { User,UserData } from "@/entities";
import { Either, left, right } from "@/shared";
import { UserRepository } from "./ports";
import { UseCase } from "@/useCases/ports";

export class RegisterUserOnMailingList implements UseCase {
  private readonly userRepo: UserRepository

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  public async perform(
    request: UserData
  ): Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(request);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const hasExistUser = await this.userRepo.exists(request);

    if (!hasExistUser) {
      await this.userRepo.add(request);
    }

    return right(request);
  }

}