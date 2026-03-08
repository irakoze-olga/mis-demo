const express = require('express');
const router = express.Router();
const User = require('../models/User'); // your user model

router.post('/test-user', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'User saved!', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
