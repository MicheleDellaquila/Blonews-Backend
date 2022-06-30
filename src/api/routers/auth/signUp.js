const express = require('express');
const usersModelSchema = require('../../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// router
const router = express.Router();

// signUp
router.post('/signUp', async (req, res) => {
  try {
    const { name, surname, email, password, editorialBoard } = req.body;

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user into db
    const user = await usersModelSchema.create({
      name: name,
      surname: surname,
      password: hashedPassword,
      email: email,
      editorialBoard: editorialBoard || 'freelance',
    });
    const isSave = await user.save();

    // check if user is saves
    if (!isSave) {
      return res.status(200).send({
        message: 'Non è stato possibile registrarti nella piattaforma, riprova.',
      });
    }

    // create token
    const token = jwt.sign({ id: user._id.toString() }, 'secret', {
      expiresIn: '1h',
    });

    return res.status(200).send({
      user: user,
      token: token,
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
