import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Admin from '../models/admin.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createAdmin = async () => {
  try {
    const plainPassword = 'abcd1234'; // Use a consistent plain password
    // const hashedPassword = await bcrypt.hash(plainPassword, 10); // Hash only once
    const admin = new Admin({
      name: 'Admin',
      email: 'admin@example.com',
      password: plainPassword,
    });

    await admin.save();
    console.log('Admin created successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

createAdmin();
