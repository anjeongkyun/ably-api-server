import { SignUpCommand } from "@/contracts/commands/user/sign-up-command";
import { User } from "@/domain-model/entities/user";
import { InvalidRequestException } from "@/domain-model/exceptions/invalid-request-exception";
import { NotFoundException } from "@/domain-model/exceptions/not-found-exception";
import { UserRepository } from "@/domain-model/repositories/user.repository";

export class SignUpUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(command: SignUpCommand): Promise<User> {
    await this.userRepository
      .getByEmail(command.email)
      .then((user) => {
        if (user) {
          throw new InvalidRequestException(400, "email already exists");
        }
      })
      .catch((err) => {
        if (err instanceof NotFoundException) {
          return;
        }
        throw err;
      });
    return await this.userRepository.signUp(User.create(command));
  }
}
