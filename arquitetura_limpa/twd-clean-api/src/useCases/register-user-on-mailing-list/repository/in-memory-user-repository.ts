import { UserData } from "@/entities";
import { UserRepository } from "@/useCases/register-user-on-mailing-list/ports";


export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[];

  constructor(repository: UserData[]) {
    this.repository = repository;
  }

  async add(user: UserData): Promise<void> {
    const exists = await this.exists(user);
  
    if (!exists) {
      this.repository.push(user);
    }
  }

  async findUserByEmail(email: string): Promise<UserData> {
    const user = this.repository.find((user) => user.email === email);
    return user || null;
  }

  async findAllUsers(): Promise<UserData[]> {
    return this.repository;
  }

  async exists(user: UserData): Promise<boolean> {
    const userExists = await this.findUserByEmail(user.email);
    return !!userExists;
  }

}