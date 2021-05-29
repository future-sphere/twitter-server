import mongoose from 'mongoose';

interface Post extends mongoose.Document {
  title: string;
  author: string;
}

const PostSchema: mongoose.Schema = new mongoose.Schema({
  title: String,
  author: Boolean,
});

const PostModel = mongoose.model<Post>('Todos', PostSchema);

export default PostModel;
