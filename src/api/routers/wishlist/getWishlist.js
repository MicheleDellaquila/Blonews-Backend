const express = require('express');
const wishlistModelSchema = require('../../models/wishlistModel');

// router
const router = express.Router();

// get whishlist
router.get('/getWishlist/:id', async (req, res) => {
  try {
    const articleId = await wishlistModelSchema.find({
      articleId: req.params.id,
    });

    return res.status(200).send({
      articleId: articleId.find((item) => item.articleId)?.articleId,
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
