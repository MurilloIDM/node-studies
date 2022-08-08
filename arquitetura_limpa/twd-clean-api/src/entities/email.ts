export class Email {
  static validate(email: string): boolean {
    if (!email) return false;

    if (email.length > 320) return false;

    const [local, domain] = email.split("@");

    const lengthLocal = local.length;
    const lengthDomain = domain.length;

    if (lengthLocal === 0 || lengthLocal > 64 || lengthDomain > 255) return false;

    return true;
  }
}