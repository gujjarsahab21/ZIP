import express from 'express';
import Memo from '../models/Memo.js';

const router = express.Router();

// Create a memo
router.post('/add', async (req, res) => {
  try {
    const { title, content } = req.body;
    const memo = new Memo({ title, content });
    await memo.save();
    res.status(201).json({ message: 'Memo created successfully', memo });
  } catch (err) {
    res.status(500).json({ error: 'Error creating memo' });
  }
});

// Get all memos
router.get('/all', async (req, res) => {
  try {
    const memos = await Memo.find();
    res.status(200).json(memos);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching memos' });
  }
});

// Update a memo
router.put('/update/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const memo = await Memo.findByIdAndUpdate(req.params.id, { title, content, updatedAt: Date.now() }, { new: true });
    res.status(200).json({ message: 'Memo updated successfully', memo });
  } catch (err) {
    res.status(500).json({ error: 'Error updating memo' });
  }
});

// Delete a memo
router.delete('/delete/:id', async (req, res) => {
  try {
    await Memo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Memo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting memo' });
  }
});

export default router;
