import mongoose from 'mongoose';

interface User extends mongoose.Document {
  username: string;
  password: string;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
  username: String,
  password: Boolean,
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;
