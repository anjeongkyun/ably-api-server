import { User } from "@/domain-model/entities/user";

export interface UserRepository {
  signUp(user: User): Promise<User>;
  comparePassword(email: string, password: string): Promise<boolean>;
  getByEmail(email: string): Promise<User>;
}
