import { SignInCommand } from "@/contracts/commands/user/sign-in-command";
import { SignInCommandResponse } from "@/contracts/commands/user/sign-in-command-response";
import { InvalidCommandException } from "@/domain-model/exceptions/invalid-command.exception";
import { TokenGenerator } from "@/domain-model/generator/token-generator";
import { UserRepository } from "@/domain-model/repositories/user.repository";

export class SignInUseCase {
  private userRepository: UserRepository;
  private tokenGenerator: TokenGenerator;
  private readonly expiresIn = 60 * 60; // 1시간

  constructor(userRepository: UserRepository, tokenGenerator: TokenGenerator) {
    this.userRepository = userRepository;
    this.tokenGenerator = tokenGenerator;
  }

  async execute(command: SignInCommand): Promise<SignInCommandResponse> {
    await this.userRepository
      .comparePassword(command.email, command.password)
      .then((success) => {
        if (!success) {
          throw new InvalidCommandException(401, "Invalid credentials");
        }
      });

    const user = await this.userRepository.getByEmail(command.email);
    const token = await this.tokenGenerator.generate(
      {
        id: user.id,
        email: command.email,
        password: command.password,
      },
      this.expiresIn
    );
    return {
      data: { user: { userId: user.id, email: user.email }, token: token },
    } as SignInCommandResponse;
  }
}
