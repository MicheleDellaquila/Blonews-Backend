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
    const newArticle = await articleSchema.findByIdAndUpdate(
      { _id: new ObjectId(idArticle) },
      {
        $set: {
          comments: {
            idUser: user._id,
            fullName: user.name + ' ' + user.surname,
            avatar: user.avatar ?? '',
            content: content,
            publishedAt: new Date(),
            response: {
              _id: '',
              idUser: null,
              fullName: '',
              avatar: '',
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
      throw new Exception('Non è stato possibile salvare il commento');
    }

    return res.status(200).send({
      comment: newArticle.comments.find(
        (comment) => comment.idUser === String(user._id),
      ),
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
