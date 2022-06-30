const express = require('express');
const verifyToken = require('../../middleware/verifyToken');
const whishlistModelSchema = require('../../models/wishlistModel');
const ObjectId = require('mongodb').ObjectId;

// router
const router = express.Router();

// save wishlist
router.post('/saveWishlist', verifyToken, async (req, res) => {
  const { userId, articleId } = req.body;
  try {
    const user = await usersModelSchema.findOne({ _id: new ObjectId(userId) });

    // if _id is not correct
    if (!user) {
      return res.status(404).send({
        message: 'Utente non esistente , riprova',
      });
    }

    // save article
    const articleSaved = await whishlistModelSchema.create({
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
