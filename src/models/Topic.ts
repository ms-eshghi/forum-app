import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Topic = mongoose.model('Topic', TopicSchema);