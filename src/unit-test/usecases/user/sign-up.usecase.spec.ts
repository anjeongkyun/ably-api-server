import { SignUpCommand } from "@/contracts/commands/user/sign-up-command";
import { UserRepositoryImpl } from "@/data-access/repositories/user.repository";
import { User } from "@/domain-model/entities/user";
import { InvalidRequestException } from "@/domain-model/exceptions/invalid-request-exception";
import { SignUpUseCase } from "@/domain-model/usecases/user/sign-up.usecase";
import { clear, close, connect } from "@/unit-test/settings/database";
import { faker } from "@faker-js/faker";
import { differenceInMinutes } from "date-fns";

beforeAll(async () => {
  await connect();
});
beforeEach(async () => {
  await clear();
});
afterAll(async () => {
  await close();
});

describe("Specs For SignUpUseCase", () => {
  it.each([
    [faker.datatype.string(), faker.datatype.string(), faker.datatype.string()],
  ])(
    "sut throws InvalidRequestException if email of command already exists",
    async (email, password, diffPassword) => {
      //Arrange
      const signedUser = await new UserRepositoryImpl().signUp(
        User.create({ email: email, password })
      );

      const command: SignUpCommand = {
        email: signedUser.email,
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
      expect(actual).toBeInstanceOf(InvalidRequestException);
      expect((actual as InvalidRequestException).status).toStrictEqual(400);
    }
  );
  it.each([[faker.datatype.string(), faker.datatype.string(), new Date()]])(
    "sut correctly sign up user",
    async (expectedEmail, expectedPassword, now) => {
      //Arrange
      const command: SignUpCommand = {
        email: expectedEmail,
        password: expectedPassword,
      };

      //Act
      const actual: User = await getSut().execute(command);

      //Assert
      expect(actual).not.toBeNull();
      expect(actual.id).not.toBeNull();
      expect(actual.email).toStrictEqual(expectedEmail);
      expect(differenceInMinutes(actual.signUpDateTime, now)).toBeLessThan(1);
    }
  );
});

const getSut = (): SignUpUseCase => {
  return new SignUpUseCase(new UserRepositoryImpl());
};
