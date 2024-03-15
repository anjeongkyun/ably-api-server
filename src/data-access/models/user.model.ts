import mongoose, { Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { InvalidRequestException } from "@/domain-model/exceptions/invalid-request-exception";

export interface UserDocument {
  _id?: mongoose.Types.ObjectId;
  email: string;
  password: string;
  signUpDateTime: Date;
}

export const userSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  signUpDateTime: { type: Date, required: true },
});

interface UserModel extends Model<UserDocument> {
  comparePassword: (email: string, password: string) => Promise<boolean>;
}

const hash = (password: string) => {
  return bcrypt.hashSync(password, 11);
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const hashedPassword = hash(this.password);
  this.password = hashedPassword;
  next();
});

userSchema.statics.comparePassword = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new InvalidRequestException(404, "user not found");
  }
  return bcrypt.compareSync(password, user.password);
};

export const userDataModel = model<UserDocument, UserModel>(
  "users",
  userSchema,
  "users"
);
