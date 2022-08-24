import { UserData } from "@/entities";
import { RegisterUserOnMailingList } from "@/useCases/register-user-on-mailing-list";
import { MissingParamError } from "@/web-controllers/errors";
import { HttpRequest, HttpResponse } from "@/web-controllers/ports";
import { badRequest, created } from "@/web-controllers/utils";

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList;

  constructor(usecase: RegisterUserOnMailingList) {
    this.usecase = usecase;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.name || !request.body.email) {
      const missingParam =
        !request.body.name && !request.body.email ? "name and email" :
        !request.body.name ? "name" : 
        !request.body.email ? "email" : "";
      return badRequest(new MissingParamError(missingParam));
    }

    const userData: UserData = request.body;

    const response = await this.usecase.execute(userData);

    if (response.isRight()) {
      return created(response.value);
    }

    return badRequest(response.value);
  }
}