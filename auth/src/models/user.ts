import { Schema, model } from "mongoose";
import { Password } from "../services";

export type User = {
  email: string;
  password: string;
};

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        delete ret.password;

        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

userSchema.pre("save", async function (next) {
  this.password = await Password.hash(this.password);

  next();
});

export const User = model<User>("User", userSchema);
