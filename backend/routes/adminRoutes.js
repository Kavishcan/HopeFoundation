const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Donation = require('../models/Donation');

// Get all users (Admin only)
router.get('/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find();
    const safeUsers = users.map(user => {
      const { password, ...rest } = user;
      return rest;
    });
    res.json(safeUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Dashboard stats
router.get('/stats', auth, admin, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const totalDonations = await Donation.aggregateTotal();
    res.json({ userCount, totalDonations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
