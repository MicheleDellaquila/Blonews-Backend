const express = require('express');
const articleSchema = require('../../models/articleModel');

// router
const router = express.Router();

// get articles
router.get('/', async (_, res) => {
  try {
    const articles = await articleSchema.find({});

    return res.status(200).send({
      articles: articles,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
