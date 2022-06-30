const express = require('express');
const usersModelSchema = require('../../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// router
const router = express.Router();

// reset password
router.post('/resetPassword', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const newUser = await usersModelSchema.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      {
        new: true,
      },
    );

    // if user is not update
    if (!newUser) {
      return res.status(200).send({
        message: 'Non è stato possibile aggiornare la tua password.',
      });
    }

    // create token
    const token = jwt.sign({ id: newUser._id.toString() }, 'secret', {
      expiresIn: '1h',
    });

    return res.status(200).send({
      token: token,
      user: newUser,
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
