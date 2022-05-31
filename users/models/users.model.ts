import mongoose, { Model, Schema } from "mongoose";
import IUser from "../IUser";
import db from "../../common/services/mongoose.service";

const userSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number,
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

userSchema.methods.findById = function (id: string) {
  return this.model("User").findById(id);
};
// userSchema.findById throws type error ???

const User = db.model("Users", userSchema);

export const findByEmail = (email: string) => {
  return User.find({ email: email });
};
export const findById = async (id: string) => {
  // infer type of result
  const result: any = await User.findById(id);
  if (result) {
    delete result._id;
    delete result.__v;
    return result.toJSON();
  }
};

export const createUser = (userData: IUser) => {
  const user = new User(userData);
  return user.save();
};

export const list = (perPage: number, page: number) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
};

export const patchUser = (
  id: string,
  userData: mongoose.UpdateQuery<IUser>
) => {
  return User.findOneAndUpdate(
    {
      _id: id,
    },
    userData
  );
};

export const removeById = (userId: string) => {
  return new Promise((resolve, reject) => {
    User.deleteMany({ _id: userId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
