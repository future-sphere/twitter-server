import mongoose from 'mongoose';

interface User extends mongoose.Document {
  username: string;
  password: string;
  avatar: string;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
  username: String,
  password: Boolean,
  avatar: String,
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;
