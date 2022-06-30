const express = require('express');
const articlesModelSchema = require('../../models/articlesModel');

// router
const router = express.Router();

// get article
router.get('/category/:cat', async (req, res) => {
  try {
    const articles = await articlesModelSchema.find({ category: req.params.cat });

    // check if article is find
    if (articles.length === 0) {
      return res.status(200).send({
        message: 'Gli articoli della categoria non sono stati trovati.',
      });
    }

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
