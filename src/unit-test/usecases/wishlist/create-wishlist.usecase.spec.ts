import { CreateWishListCommand } from "@/contracts/commands/wishlist/create-wishlist-command";
import { UserRepositoryImpl } from "@/data-access/repositories/user.repository";
import { WishListRepositoryImpl } from "@/data-access/repositories/wishlist.repository";
import { User } from "@/domain-model/entities/user";
import { WishList } from "@/domain-model/entities/wishlist";
import { InvalidCommandException } from "@/domain-model/exceptions/invalid-command.exception";
import { InvalidRequestException } from "@/domain-model/exceptions/invalid-request-exception";
import { CreateWishListUseCase } from "@/domain-model/usecases/wishlist/create-wishlist.usecase";
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

describe("Specs For CreateWishListUseCase", () => {
  it.each([
    [faker.datatype.string(), faker.datatype.string(), faker.datatype.string()],
  ])(
    "sut correctly creates wishlist",
    async (email, password, wishListName) => {
      //Arrange
      const signedUpUser = await new UserRepositoryImpl().signUp(
        User.create({ email: email, password: password })
      );
      const command: CreateWishListCommand = {
        userId: signedUpUser.id,
        name: wishListName,
      };

      //Act
      const actual: WishList = await getSut().execute(command);

      //Assert
      expect(actual).not.toBeNull();
      expect(actual.id).not.toBeNull();
      expect(actual.userId).toStrictEqual(signedUpUser.id);
      expect(actual.name).toStrictEqual(wishListName);
      expect(actual.productIds).toHaveLength(0);
      expect(actual.deleted).not.toBeTruthy();
    }
  );

  it.each([
    [faker.datatype.string(), faker.datatype.string(), faker.datatype.string()],
  ])(
    "sut throws InvalidRequestException if name of wishList exists",
    async (email, password, name) => {
      //Arrange
      const signedUpUser = await new UserRepositoryImpl().signUp(
        User.create({ email: email, password: password })
      );
      const createdWishList = await new WishListRepositoryImpl().create(
        WishList.create({ userId: signedUpUser.id, name: name })
      );

      const command: CreateWishListCommand = {
        userId: signedUpUser.id,
        name: createdWishList.name,
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
      expect((actual as InvalidCommandException).status).toStrictEqual(400);
    }
  );
});

const getSut = (): CreateWishListUseCase => {
  return new CreateWishListUseCase(new WishListRepositoryImpl());
};
