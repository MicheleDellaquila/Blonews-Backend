const express = require('express');
const articleSchema = require('../../models/articleModel');
const userSchema = require('../../models/userModel');
const ObjectId = require('mongodb').ObjectId;
const verifyToken = require('../../middleware/verifyToken');

// router
const router = express.Router();

// create article
router.post('/createComment', verifyToken, async (req, res) => {
  try {
    const { idArticle, idUser, content } = req.body;

    // search user
    const user = await userSchema.findById({
      _id: new ObjectId(idUser),
    });

    // save comment into db
    const newArticle = await articleSchema.findOneAndUpdate(
      { _id: new ObjectId(idArticle) },
      {
        $set: {
          comments: {
            user: user,
            content: content,
            publishedAt: new Date(),
            response: {
              _id: '',
              idUser: '',
              content: '',
              publishedAt: null,
            },
          },
        },
      },
      { new: true },
    );

    // check if comment was update
    if (Object.keys(newArticle).length === 0) {
      return res.status(500).send({
        message: 'Non è stato possibile salvare il tuo commento',
      });
    }

    return res.status(200).send({
      updateArticle: newArticle,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
