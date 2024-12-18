import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: false },
    role: { type: String, required: true },
    isActive: { type: Boolean, required: false },
    isusernameVerified: { type: Boolean, required: false },
    isDeleted: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  },
);

export interface User extends mongoose.Document {
  id: Number;
  userId: String;
  email: String;
  password: String;
  fullName: String;
  role: String;
  isActive: Boolean;
  isEmailVerified: Boolean;
  isDeleted: Boolean;
}
