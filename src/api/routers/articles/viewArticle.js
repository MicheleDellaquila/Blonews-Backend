const express = require('express');
const articleSchema = require('../../models/articleModel');

// router
const router = express.Router();

// update views article
router.patch('/articolo/:title', async (req, res) => {
  try {
    const article = await articleSchema.findOneAndUpdate(
      {
        $title: { $search: req.params.title },
      },
      { $inc: { views: 1 } },
      { new: true },
    );

    // check if article is find
    if (Object.keys(article).length === 0) {
      return res.status(200).send({
        message: 'Articolo non trovato, riprova',
      });
    }
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
