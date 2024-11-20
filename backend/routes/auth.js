import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js'; // Note the .js extension in ES modules
import jwt from 'jsonwebtoken';

const router = express.Router();

const protectRoute = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied." });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token is not valid." });
    }
    req.user = decoded;
    next();
  });
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      'your_secret_key', // Replace with your actual secret key
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful!', token });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    // Check if username is provided
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Log the email for debugging
    console.log("Email being checked:", email);

    // Check if the email already exists in the database
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      console.log("User with email already exists:", existingEmailUser);
      return res.status(400).json({ error: 'Email already in use.' });
    }

    // Check if the username already exists in the database
    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
      console.log("User with username already exists:", existingUsernameUser);
      return res.status(400).json({ error: 'Username already in use.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with name, email, password, and username
    const user = new User({
      name,
      email,
      password: hashedPassword,
      username,  // Include the username in the user document
    });

    // Save the new user to the database
    await user.save();

    // Send success response
    res.status(201).json({ message: 'Registration successful!' });

  } catch (err) {
    console.error("Error during registration:", err);  // Log the error for debugging
    res.status(500).json({ error: 'Internal server error.' });
  }
});



router.get('/profile', protectRoute, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put('/update-profile/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phone, address } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, phone, address },
      { new: true } // Return the updated user
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Error updating profile." });
  }
});


export default router;
