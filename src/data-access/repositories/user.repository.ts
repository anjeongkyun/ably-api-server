import { UserRepository } from "@/domain-model/repositories/user.repository";
import { User } from "@/domain-model/entities/user";
import { userDataModel } from "@/data-access/models/user.model";
import { UserDataMapper } from "@/data-access/mappers/user.data.mapper";
import { NotFoundException } from "@/domain-model/exceptions/not-found-exception";

export class UserRepositoryImpl implements UserRepository {
  private mapper: UserDataMapper = new UserDataMapper();
  signUp(user: User): Promise<User> {
    return userDataModel
      .create(this.mapper.toDocument(user))
      .then(this.mapper.toEntity);
  }

  comparePassword(email: string, password: string): Promise<boolean> {
    return userDataModel.comparePassword(email, password);
  }

  getByEmail(email: string): Promise<User> {
    return userDataModel
      .findOne({
        email,
      })
      .exec()
      .then((document) => {
        if (!document) {
          throw new NotFoundException(`${email} is not exist`);
        }
        return this.mapper.toEntity(document);
      });
  }
}
