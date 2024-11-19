// routes/admin.js

import express from 'express';
import User from '../models/User.js';  // Import the User model

const router = express.Router();

// Admin route to fetch all users
router.get('/members', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from MongoDB
    res.status(200).json(users);  // Send the list of users as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Admin route to update user membership status
router.put('/members/:id', async (req, res) => {
  try {
    const { membershipStatus } = req.body;  // Get membership status from request body
    const user = await User.findById(req.params.id);  // Find user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.membershipStatus = membershipStatus;  // Update the user's membership status
    await user.save();  // Save the updated user data
    res.status(200).json({ message: 'User status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status' });
  }
});

export default router;
