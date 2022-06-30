const express = require('express');
const wishlistModelSchema = require('../../models/wishlistModel');
const verifyToken = require('../../middleware/verifyToken');
const ObjectId = require('mongodb').ObjectId;

// router
const router = express.Router();

// delete whishlist
router.delete('/deleteWishlist', verifyToken, async (req, res) => {
  try {
    const deleteArticle = await wishlistModelSchema.findOneAndDelete({
      articleId: new ObjectId(req.body.id),
    });

    // check if articles is retrive
    if (!deleteArticle) {
      return res.status(200).send({
        message: "Non è stato possibile eliminare l'articolo della wishlist",
      });
    }

    return res.status(200).send({
      message: 'Articolo eliminato della wishlist',
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
