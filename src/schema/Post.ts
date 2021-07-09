import mongoose from 'mongoose';

interface Comment {
  userId: string;
  commentId: string;
  text: string;
  createdAt: Date;
  likedBy: string[];
}

interface Post extends mongoose.Document {
  title: string;
  author: string;
  likedBy: string[]; // list of user ids who's liked this post already
  comments: Comment[];
}

const PostSchema: mongoose.Schema = new mongoose.Schema({
  title: String,
  author: String,
  likedBy: [String], // list of user ids who's liked this post already
  comments: [],
});

const PostModel = mongoose.model<Post>('Posts', PostSchema);

export default PostModel;
