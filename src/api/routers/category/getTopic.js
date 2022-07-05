const express = require('express');
const articleSchema = require('../../models/articleModel');

// router
const router = express.Router();

// get categoria
router.get('/categoria/:name', async (req, res) => {
  try {
    const articlesTopic = await articleSchema.find({
      category: req.params.name,
    });

    // check if article is find
    if (articlesTopic.length === 0) {
      return res.status(200).send({
        message: 'Gli articoli della categoria non sono stati trovati.',
      });
    }

    return res.status(200).send({
      articles: articlesTopic,
      totalPost: articlesTopic.length,
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
