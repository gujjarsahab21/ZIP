import mongoose from 'mongoose';

const MemoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,  // You could reference a User model if you have authentication
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    publishedAt: {
        type: Date,
        default: Date.now,
    },
});

const Memo = mongoose.model('Memo', MemoSchema);

export default Memo;
