import { UserDocument } from "@/data-access/models/user.model";
import { User } from "@/domain-model/entities/user";

export class UserDataMapper {
  toEntity(document: UserDocument): User {
    return new User(
      document.email,
      document.password,
      document.signUpDateTime,
      document._id?.toString()
    );
  }

  toDocument(entity: User): UserDocument {
    return {
      email: entity.email,
      password: entity.password,
      signUpDateTime: entity.signUpDateTime,
    };
  }
}
