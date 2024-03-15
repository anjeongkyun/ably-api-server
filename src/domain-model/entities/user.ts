import { SignUpCommand } from "@/contracts/commands/user/sign-up-command";

export class User {
  id?: string;
  email: string;
  password?: string;
  signUpDateTime: Date;

  constructor(
    email: string,
    password: string,
    signUpDateTime: Date,
    id?: string
  ) {
    this.email = email;
    this.password = password;
    this.signUpDateTime = signUpDateTime;
    this.id = id;
  }

  static create(command: SignUpCommand) {
    return new User(command.email, command.password, new Date(), null);
  }
}
