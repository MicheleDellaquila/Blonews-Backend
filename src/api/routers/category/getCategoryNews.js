const express = require('express');
const articleSchema = require('../../models/articleModel');

// router
const router = express.Router();

// filter for most news
router.get('/categoria/:name', async (req, res) => {
  try {
    const articleCategory = await articleSchema.find({
      category: req.params.name,
    });

    // check if exist or not
    if (!articleCategory) {
      throw Error('Errore , non è stato possibile ritrovare gli articoli');
    }

    return res.status(200).send({
      articles: articleCategory,
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
