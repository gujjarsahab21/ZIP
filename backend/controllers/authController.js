import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Member from '../models/member.js';

// User registration function
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        username,
      });
  
      // Save the user to database
      const savedUser = await newUser.save();
  
      // Create a new member for this user
      const newMember = new Member({
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        membershipStatus: 'active',  // Default membership status
        membershipStartDate: new Date(),
        membershipExpiryDate: null,  // Set expiry if needed
      });
  
      // Save the member to the database
      await newMember.save();
  
      // Generate JWT token for the user
      const token = jwt.sign(
        { userId: savedUser._id, email: savedUser.email },
        'your_secret_key', // Use a secret key for JWT
        { expiresIn: '1h' }
      );
  
      // Send the response with token
      res.status(201).json({ token, user: savedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong during registration." });
    }
  };

const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, phone, address } = req.body;

        const userId = req.userId;  // We already set this in the authenticate middleware
        if (!userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        // Check if required fields are missing
        if (!firstName || !lastName) {
            return res.status(400).json({ message: "First name and last name are required" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, phone, address },
            { new: true } // Return the updated user
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser); // Return the updated user object
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
};

export default { updateProfile, registerUser };
