import { DeleteWishListCommand } from "@/contracts/commands/wishlist/delete-wishlist-command";
import { UserRepositoryImpl } from "@/data-access/repositories/user.repository";
import { WishListRepositoryImpl } from "@/data-access/repositories/wishlist.repository";
import { User } from "@/domain-model/entities/user";
import { WishList } from "@/domain-model/entities/wishlist";
import { DeleteWishListUseCase } from "@/domain-model/usecases/wishlist/delete-wishlist.usecase";
import { clear, close, connect } from "@/unit-test/settings/database";
import { faker } from "@faker-js/faker";

beforeAll(async () => {
  await connect();
});
beforeEach(async () => {
  // await clear();
});
afterAll(async () => {
  await close();
});

describe("Specs For DeleteWishListUseCase", () => {
  it.each([
    [faker.datatype.string(), faker.datatype.string(), faker.datatype.string()],
  ])(
    "sut correctly deletes wishlist",
    async (email, password, wishListName) => {
      //Arrange
      const signedUpUser = await new UserRepositoryImpl().signUp(
        User.create({ email: email, password: password })
      );
      const createdWishList = await new WishListRepositoryImpl().create(
        WishList.create({ userId: signedUpUser.id, name: wishListName })
      );
      const command: DeleteWishListCommand = {
        wishListId: createdWishList.id,
      };

      //Act
      await getSut().execute(command);

      //Assert
      const actual = await new WishListRepositoryImpl().get(createdWishList.id);
      expect(actual).not.toBeNull();
      expect(actual.deleted).toStrictEqual(true);
    }
  );
});

const getSut = (): DeleteWishListUseCase => {
  return new DeleteWishListUseCase(new WishListRepositoryImpl());
};
