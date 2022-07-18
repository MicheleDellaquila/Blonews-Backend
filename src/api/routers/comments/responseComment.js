const express = require('express');
const userSchema = require('../../models/userModel');
const articleSchema = require('../../models/articleModel');
const ObjectId = require('mongodb').ObjectId;
const verifyToken = require('../../middleware/verifyToken');

// router
const router = express.Router();

// create article
router.patch('/responseComment', verifyToken, async (req, res) => {
  try {
    const { idArticle, idUserComment, idUser, content } = req.body;

    // search user
    const user = await userSchema.findById({
      _id: new ObjectId(idUser),
    });

    // search article and indexComment
    const article = await articleSchema.findById({
      _id: new ObjectId(idArticle),
    });
    const indexComment = article.comments.findIndex(
      (item) => item.idUser === idUserComment,
    );

    // check if element exist or not
    if (indexComment >= 0) {
      const updateArticle = await articleSchema.findOneAndUpdate(
        { _id: new ObjectId(idArticle) },
        {
          $set: {
            [`comments.${indexComment}.response`]: {
              _id: ObjectId(),
              idUser: idUser,
              fullName: user.name + ' ' + user.surname,
              avatar: user.avatar ?? '',
              content: content,
              publishedAt: new Date(),
            },
          },
        },
        { new: true },
      );

      return res.status(200).send({
        comment: updateArticle.comments.find(
          (comment) => comment.idUser === String(user._id),
        ),
      });
    }
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
