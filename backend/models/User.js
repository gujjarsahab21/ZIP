import mongoose from 'mongoose';

// Define the generatePlannerId function
function generatePlannerId() {
  // You could use a simple random generation, or a library like UUID.
  return 'planner-' + Math.random().toString(36).substr(2, 9); // Example random ID generator
}

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  membershipStatus: { type: String, default: 'inactive' },
  phone: { type: String },
  address: { type: String },
  uploadedDocuments: { type: [String] }, // Store file URLs or paths
  plannerId: { 
    type: String, 
    required: true, 
    unique: true,
    default: function() {
      return generatePlannerId(); // Call the function to generate plannerId
    }
  }

});

// Create the User model
const User = mongoose.model('User', UserSchema);

export default User; // Export the model
