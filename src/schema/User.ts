import mongoose from 'mongoose';

interface User extends mongoose.Document {
  username: string;
  password: string;
  avatar: string;
  phone: string;
  email: string;
  friends: [string];
  gender: number;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
  username: String,
  password: String,
  avatar: String,
  phone: String,
  email: String,
  friends: [String],
  gender: Number
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;
