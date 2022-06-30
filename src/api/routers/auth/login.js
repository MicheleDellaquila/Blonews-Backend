const express = require('express');
const usersModelSchema = require('../../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// router
const router = express.Router();

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersModelSchema.findOne({ email: email });

    // if email not correct
    if (!user) {
      return res.status(404).send({
        message: 'Utente non esistente , riprova',
      });
    }
    const validatePassword = await bcrypt.compare(password, user.password);

    // if user not exist
    if (!validatePassword) {
      return res.status(401).send({
        message: 'Password invalida',
      });
    }

    // create new token
    const token = jwt.sign({ id: user._id.toString() }, 'secret', {
      expiresIn: '1h',
    });

    return res.status(200).send({
      token: token,
      user: user,
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
