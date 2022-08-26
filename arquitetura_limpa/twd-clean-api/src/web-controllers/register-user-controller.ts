import { UserData } from "@/entities";
import { UseCase } from "@/useCases/ports";
import { MissingParamError } from "@/web-controllers/errors";
import { HttpRequest, HttpResponse } from "@/web-controllers/ports";
import { badRequest, created, serverError } from "@/web-controllers/utils";

export class RegisterUserController {
  private readonly usecase: UseCase;

  constructor(usecase: UseCase) {
    this.usecase = usecase;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {

    try {
      if (!request.body.name || !request.body.email) {
        const missingParam =
          !request.body.name && !request.body.email ? "name and email" :
          !request.body.name ? "name" : 
          !request.body.email ? "email" : "";
        return badRequest(new MissingParamError(missingParam));
      }
  
      const userData: UserData = request.body;
  
      const response = await this.usecase.perform(userData);
  
      if (response.isRight()) {
        return created(response.value);
      }
  
      return badRequest(response.value);
    } catch (error) {
      return serverError(error);
    }
  }
}