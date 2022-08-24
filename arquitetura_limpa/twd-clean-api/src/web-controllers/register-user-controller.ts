import { UserData } from "@/entities";
import { RegisterUserOnMailingList } from "@/useCases/register-user-on-mailing-list";
import { HttpRequest, HttpResponse } from "@/web-controllers/ports";
import { created } from "@/web-controllers/utils";

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList;

  constructor(usecase: RegisterUserOnMailingList) {
    this.usecase = usecase;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body;

    const response = await this.usecase.execute(userData);

    if (response.isRight()) {
      return created(response.value);
    }
  }
}