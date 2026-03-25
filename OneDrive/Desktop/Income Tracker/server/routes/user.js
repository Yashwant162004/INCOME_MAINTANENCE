const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

router.put('/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'avatar'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
