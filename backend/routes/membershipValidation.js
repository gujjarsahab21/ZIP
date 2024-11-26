// routes/membershipValidation.js
import express from 'express';
import Membership from '../models/Membership.js';

const router = express.Router();

router.post('/validate', async (req, res) => {
  const { plannerId } = req.body;

  if (!plannerId) {
    return res.status(400).json({ error: 'Planner ID is required.' });
  }

  try {
    const membership = await Membership.findOne({ plannerId });

    if (!membership) {
      return res.status(404).json({ error: 'Membership not found.' });
    }

    res.status(200).json({ data: membership });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
