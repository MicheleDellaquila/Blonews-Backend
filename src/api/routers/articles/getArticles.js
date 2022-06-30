const express = require('express');
const articlesModelSchema = require('../../models/articlesModel');
const moment = require('moment');

// router
const router = express.Router();

// get articles
router.get('/', async (_, res) => {
  try {
    const today = moment().startOf('day');
    const end = moment(today).endOf('day').toDate();
    const articles = await articlesModelSchema.find({
      publishedAt: {
        $gte: today.toDate(),
        $lt: end,
      },
    });

    // check if articles is retrive
    if (articles.length === 0) {
      return res.status(200).send({
        message: 'Non è stato possibile ritrovare gli articoli',
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
