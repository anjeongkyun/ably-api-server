import { SignInCommand } from "@/contracts/commands/user/sign-in-command";
import { SignInCommandResponse } from "@/contracts/commands/user/sign-in-command-response";
import { UserRepositoryImpl } from "@/data-access/repositories/user.repository";
import { User } from "@/domain-model/entities/user";
import { InvalidCommandException } from "@/domain-model/exceptions/invalid-command.exception";
import { SignInUseCase } from "@/domain-model/usecases/user/sign-in.usecase";
import { TokenGeneratorStub } from "@/unit-test/doubles/TokenGeneratorStub";
import { clear, close, connect } from "@/unit-test/settings/database";
import { faker } from "@faker-js/faker";

beforeAll(async () => {
  await connect();
});
beforeEach(async () => {
  await clear();
});
afterAll(async () => {
  await close();
});

describe("Specs For SignInUseCase", () => {
  it.each([
    [faker.datatype.string(), faker.datatype.string(), faker.datatype.string()],
  ])(
    "sut throws InvalidCommandException if password comparison fails",
    async (email, password, diffPassword) => {
      //Arrange
      const signedUpUser = await new UserRepositoryImpl().signUp(
        User.create({ email: email, password: password })
      );
      const command: SignInCommand = {
        email: signedUpUser.email,
        password: diffPassword,
      };

      //Act
      var actual = null;
      try {
        await getSut().execute(command);
      } catch (err) {
        actual = err;
      }

      //Assert
      expect(actual).toBeInstanceOf(InvalidCommandException);
      expect((actual as InvalidCommandException).status).toStrictEqual(401);
    }
  );

  it.each([[faker.datatype.string(), faker.datatype.string()]])(
    "sut returns token after successful sign in",
    async (email, password) => {
      //Arrange
      const signedUpUser = await new UserRepositoryImpl().signUp(
        User.create({ email: email, password: password })
      );
      const command: SignInCommand = {
        email: signedUpUser.email,
        password: password,
      };

      //Act
      const actual: SignInCommandResponse = await getSut().execute(command);

      //Assert
      expect(actual).not.toBeNull();
      expect(actual.data.token).not.toBeNull();
    }
  );
});

const getSut = (): SignInUseCase => {
  return new SignInUseCase(new UserRepositoryImpl(), new TokenGeneratorStub());
};
