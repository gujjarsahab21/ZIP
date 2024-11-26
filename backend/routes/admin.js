import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/adminController.js';
import Admin from '../models/admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login Attempt:', { email, password });

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('Admin not found');
      return res.status(404).json({ message: 'Admin not found' });
    }
    console.log('Admin Found:', admin);

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log('Password Valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid Password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('Token Generated:', token);

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Optional route for registering admins
router.post('/register', registerAdmin);

export default router;
