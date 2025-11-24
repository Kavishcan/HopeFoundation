const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const Donation = require('../models/Donation');

// Mock Payment Route
router.post('/process', auth, async (req, res) => {
  const { amount, cardNumber, expiry, cvc } = req.body;

  // Simple validation (Mock)
  if (!amount || !cardNumber || !expiry || !cvc) {
    return res.status(400).json({ message: 'Please enter all payment details' });
  }

  try {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const donation = new Donation({
      userId: req.user.id,
      userName: req.user.name || 'Anonymous',
      amount: amount,
      paymentMethod: 'Credit Card (Mock)',
      last4: cardNumber.slice(-4)
    });
    
    await donation.save();
    res.json({ success: true, donation });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
