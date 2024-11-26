// models/Membership.js
import mongoose from 'mongoose';

const MembershipSchema = new mongoose.Schema({
  plannerId: { type: String, required: true, unique: true }, // Link to the User's plannerId
  expiryDate: { type: Date, required: true }, // Membership expiry date
  membershipCategory: { type: String, required: true }, // Membership category (Type I, II, III, etc.)
  disciplinaryActions: { type: [String], default: [] }, // Array of disciplinary actions
}, { timestamps: true });

const Membership = mongoose.model('Membership', MembershipSchema);
export default Membership;
