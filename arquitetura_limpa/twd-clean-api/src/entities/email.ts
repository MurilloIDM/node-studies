import { Either, left, right } from "@/shared";
import { InvalidEmailError } from "@/entities/errors";

export class Email {
  public readonly value: string;

  private constructor(email: string) {
    this.value = email;
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    if (Email.validate(email)) {
      return right(new Email(email));
    }

    return left(new InvalidEmailError(email));
  }

  static validate(email: string): boolean {
    if (!email) return false;

    if (email?.length > 320) return false;

    const [local, domain] = email?.split("@");

    const lengthLocal = local?.length;
    const lengthDomain = domain?.length;

    if (lengthLocal === 0 || lengthLocal > 64 || lengthDomain === 0 || lengthDomain > 255) return false;

    const domainParts = domain?.split(".");

    if (domainParts?.some((part) => part?.length > 63)) return false;

    const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!emailRegex.test(email)) return false;

    return true;
  }
}