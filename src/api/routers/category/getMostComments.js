const express = require('express');
const articleSchema = require('../../models/articleModel');

// router
const router = express.Router();

// get article
router.get('/categoria/:name/mostComments', async (req, res) => {
  try {
    const articlesMostComments = await articleSchema.find().sort({ "comments.length": -1 });

    return res.status(200).send({
      articles: articlesMostComments,
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
