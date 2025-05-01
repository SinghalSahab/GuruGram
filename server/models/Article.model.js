// models/Article.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: String,
  content: String,
  date: { type: Date, default: Date.now }
});

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: String,
  author: String,
  date: { type: Date, default: Date.now },
  commentCount: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [commentSchema]
});

export default mongoose.model('Article', articleSchema);
