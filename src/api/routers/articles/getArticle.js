const express = require('express');
const articleSchema = require('../../models/articleModel');
const axios = require('axios');

// router
const router = express.Router();

// get article
router.get('/articolo/:title', async (req, res) => {
  try {
    const article = await articleSchema.findOne({
      $title: { $search: req.params.title },
    });

    // check if article is find
    if (Object.keys(article).length === 0) {
      return res.status(200).send({
        message: 'Articolo non trovato, riprova',
      });
    }

    // call get wishlist
    const response = await axios({
      method: 'GET',
      url: `http://localhost:3001/getWishlist/${article._id}`,
      data: null,
    });
    const { articleId } = response.data;

    return res.status(200).send({
      article: article,
      inWishlist: !!articleId,
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
