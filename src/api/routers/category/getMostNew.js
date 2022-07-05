const express = require('express');
const articleSchema = require('../../models/articleModel');

// router
const router = express.Router();

// filter for most news
router.get('/categoria/:name/mostNew', async (req, res) => {
  try {
    const articlesMostNew = await articleSchema.find(
      {},
      {},
      { sort: { publishedAt: -1 } },
    );

    return res.status(200).send({
      articles: articlesMostNew,
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
