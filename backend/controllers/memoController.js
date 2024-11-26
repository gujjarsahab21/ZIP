import Memo from '../models/Memo.js';
import User from '../models/User.js'; // Import the User model
import { sendEmail } from '../utils/emailService.js'; // Import the email sending function

// Function to send email to all users
const sendEmailNotification = async (memo) => {
  try {
    // Fetch all user emails from the database
    const users = await User.find({});
    const emailAddresses = users.map(user => user.email);

    if (emailAddresses.length === 0) {
      console.log("No users found in the database.");
      return;
    }

    const subject = memo.title;
    const message = memo.content;

    // Send email to all users using the sendEmail function
    emailAddresses.forEach(async (email) => {
      await sendEmail(email, subject, message);
    });
  } catch (error) {
    console.error("Error fetching user emails:", error);
  }
};

const getAllMemos = async (req, res) => {
    try {
      // Fetch all memos from the database, sorted by creation date in descending order
      const memos = await Memo.find().sort({ createdAt: -1 });
  
      // Return the list of memos in the response
      return res.status(200).json(memos);
    } catch (error) {
      console.error("Error fetching memos:", error);
      return res.status(500).json({ error: error.message });
    }
  };

// Create a new memo
const createMemo = async (req, res) => {
  try {
    const { title, content, createdBy } = req.body;

    // Create new memo object
    const newMemo = new Memo({
      title,
      content,
      createdBy,
    });

    // Save memo to the database
    await newMemo.save();

    // Send email notifications to all users
    sendEmailNotification(newMemo);

    return res.status(201).json(newMemo);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { createMemo, sendEmailNotification , getAllMemos}; // Use named exports instead of default
