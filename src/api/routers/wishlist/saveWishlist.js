const express = require('express');
const verifyToken = require('../../middleware/verifyToken');
const whishlistModel = require('../../models/wishlistModel');
const ObjectId = require('mongodb').ObjectId;

// router
const router = express.Router();

// save wishlist
router.post('/saveWishlist', verifyToken, async (req, res) => {
  try {
    const { userId, articleId } = req.body;
    const user = await usersModelSchema.findOne({ _id: new ObjectId(userId) });

    // if _id is not correct
    if (!user) {
      return res.status(404).send({
        message: 'Utente non esistente , riprova',
      });
    }

    // save article
    const articleSaved = await whishlistModel.create({
      userId: userId,
      articleId: articleId,
    });
    await articleSaved.save();

    return res.status(200).send({
      message: 'Articolo salvato nella wishlist',
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
