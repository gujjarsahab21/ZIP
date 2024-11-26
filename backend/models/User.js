import mongoose from 'mongoose';

// Define the generatePlannerId function
function generatePlannerId() {
  return 'planner-' + Math.random().toString(36).substr(2, 9); // Example random ID generator
}

// Define the User schema
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  profilePhoto: { type: String }, // URL or file path for the profile photo
  membershipType: { type: String, default: 'I' },
  membershipStatus: { type: String, default: 'inactive' },
  uploadedDocuments: { type: [String] },
  plannerId: { 
    type: String, 
    required: true, 
    unique: true, 
    default: generatePlannerId,
  },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create the User model
const User = mongoose.model('User', UserSchema);

export default User;
