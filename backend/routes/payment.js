import express from 'express';
import Payment from '../models/Payment.js';

const router = express.Router();

// Create a new payment
router.post('/initiate', async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // Create a new payment entry
    const payment = new Payment({ userId, amount });
    await payment.save();

    // Simulate payment gateway response (Replace this with Razorpay/Stripe integration later)
    setTimeout(async () => {
      payment.status = 'success'; // Assume payment was successful
      payment.referenceId = `REF-${Date.now()}`;
      await payment.save();
    }, 3000);

    res.status(201).json({ message: 'Payment initiated. Awaiting confirmation.', payment });
  } catch (err) {
    res.status(500).json({ error: 'Error initiating payment.' });
  }
});

// Get payment status
router.get('/status/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Payment not found.' });

    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching payment status.' });
  }
});

// Get payment history for a user
router.get('/history/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find payments for the user, sorted by date (most recent first)
      const payments = await Payment.find({ userId }).sort({ paymentDate: -1 });
  
      if (!payments || payments.length === 0) {
        return res.status(404).json({ error: "No payment history found for this user." });
      }
  
      res.status(200).json(payments);
    } catch (err) {
      res.status(500).json({ error: "Error fetching payment history." });
    }
  });
  

export default router;
