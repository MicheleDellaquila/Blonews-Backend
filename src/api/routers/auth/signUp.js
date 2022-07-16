const express = require('express');
const userSchema = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Storage = require('../../middleware/storage');
const deleteFile = require('../../helpers/deleteFile');

// router
const router = express.Router();

// signUp
router.post('/signUp', Storage.single('avatar'), async (req, res) => {
  try {
    const { name, surname, email, password, editorialBoard } = req.body;

    // check email doesn't exist in db
    const exist = await userSchema.findOne({ email: email });

    if (exist) {
      const isError = deleteFile({
        folder: req.header('Upload'),
        name: req.file.filename,
      });

      // check if file is deleted
      if (isError) {
        return res.status(400).send({
          message: 'Abbiamo riscontrato dei problemi',
        });
      }

      return res.status(400).send({
        message: 'Email già esistente, inserisci una nuovo email',
      });
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user into db
    const user = await usersModelSchema.create({
      avatar: req.file
        ? `http://localhost:3001/uploads/${req.header('Upload')}/${
            req.file.filename
          }`
        : '',
      name: name,
      surname: surname,
      password: hashedPassword,
      email: email,
      editorialBoard: editorialBoard || 'freelance',
    });
    const isSave = await user.save();

    // check if user is saves
    if (!isSave) {
      const isError = deleteFile(req.file.filename);

      // check if file is deleted
      if (isError) {
        return res.status(400).send({
          message: 'Abbiamo riscontrato dei problemi',
        });
      }

      return res.status(500).send({
        message:
          'Non è stato possibile registrarti nella piattaforma, riprova.',
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
