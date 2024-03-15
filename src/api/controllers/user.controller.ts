import { UsecaseContext } from "@/api/contexts";
import { SignInCommand } from "@/contracts/commands/user/sign-in-command";
import { SignUpCommand } from "@/contracts/commands/user/sign-up-command";
import { HttpException } from "@/domain-model/exceptions/HttpException";
import { InvalidCommandException } from "@/domain-model/exceptions/invalid-command.exception";
import { InvalidRequestException } from "@/domain-model/exceptions/invalid-request-exception";
import { SignInUseCase } from "@/domain-model/usecases/user/sign-in.usecase";
import { SignUpUseCase } from "@/domain-model/usecases/user/sign-up.usecase";
import { NextFunction, Request, Response } from "express";

export class UserController {
  private signUpUseCase: SignUpUseCase;
  private signInUseCase: SignInUseCase;

  constructor(usecaseContext: UsecaseContext) {
    this.signUpUseCase = usecaseContext.signUpUseCase;
    this.signInUseCase = usecaseContext.signInUseCase;
  }

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    const command: SignUpCommand = req.body;
    this.signUpUseCase
      .execute(command)
      .then(() => res.status(200).json({}))
      .catch((err) => {
        console.error(err);
        if (err instanceof InvalidRequestException) {
          next(new HttpException(err.status, err.message));
          return;
        }
        next(err);
      });
  };

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    const command: SignInCommand = req.body;
    this.signInUseCase
      .execute(command)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.error(err);
        if (err instanceof InvalidCommandException) {
          next(new HttpException(err.status, err.message));
          return;
        }
        next(err);
      });
  };
}
