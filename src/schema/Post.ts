import mongoose from 'mongoose';

interface Post extends mongoose.Document {
  title: string;
  author: string;
}

const PostSchema: mongoose.Schema = new mongoose.Schema({
  title: String,
  author: String,
});

const PostModel = mongoose.model<Post>('Posts', PostSchema);

export default PostModel;
