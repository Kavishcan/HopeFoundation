const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Donation = require('../models/Donation');
const Volunteer = require('../models/Volunteer');

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

// Get all volunteers (Admin only)
router.get('/volunteers', auth, admin, async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
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
    const volunteerCount = await Volunteer.countDocuments();
    res.json({ userCount, totalDonations, volunteerCount });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
