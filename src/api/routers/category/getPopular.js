const express = require('express');
const articleSchema = require('../../models/articleModel');

// router
const router = express.Router();

// get article
router.get('/categoria/:name/popular', async (req, res) => {
  try {
    const popularArticles = await articleSchema.find().sort({ views: -1 });

    return res.status(200).send({
      articles: popularArticles,
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
