const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

// Submit volunteer application (public route)
router.post('/apply', async (req, res) => {
  const { name, email, phone, skills, availability, message } = req.body;

  // Validation
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Please provide name, email, and phone' });
  }

  try {
    // Check if already applied
    const existing = await Volunteer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'You have already applied with this email' });
    }

    const volunteer = new Volunteer({
      name,
      email,
      phone,
      skills,
      availability,
      message
    });

    await volunteer.save();
    res.json({ success: true, message: 'Application submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
