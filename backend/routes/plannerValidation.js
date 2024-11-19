import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Endpoint to validate Planner ID
router.get('/validate/:plannerId', async (req, res) => {
  try {
    const { plannerId } = req.params;
    const user = await User.findOne({ plannerId });

    if (!user) {
      return res.status(404).json({ error: 'Planner ID not found.' });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      membershipStatus: user.membershipStatus,
      expiryDate: user.expiryDate,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
    