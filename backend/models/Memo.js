import mongoose from 'mongoose';

const memoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Memo = mongoose.model('Memo', memoSchema);

export default Memo;
