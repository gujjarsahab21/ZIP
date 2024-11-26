import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    membershipStatus: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    renewalStatus: { type: String, enum: ['pending', 'renewed'], default: 'pending' },
    membershipStartDate: { type: Date, default: Date.now },
    membershipExpiryDate: { type: Date, default: function() {
      // Default expiry date is 1 year from the membership start date
      return new Date(this.membershipStartDate).setFullYear(new Date(this.membershipStartDate).getFullYear() + 1);
    }},
  },
  { timestamps: true }
);

const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);

export default Member;
