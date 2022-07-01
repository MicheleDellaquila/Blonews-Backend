const express = require('express');
const getTodayNews = require('../../../utils/getTodayNews');
const getMostViewedNews = require('../../../utils/getMostViewed');
const getCommunityNews = require('../../../utils/getCommunityNews');
const getTechNews = require('../../../utils/getTechNews');

// router
const router = express.Router();

// get articles
router.get('/', async (_, res) => {
  try {
    const todayNews = getTodayNews();
    const mostViewedNews = getMostViewedNews();
    const communityNews = getCommunityNews();
    const techNews = getTechNews();

    return res.status(200).send({
      todayNews: todayNews.length === 0 ? "Articoli non trovati" : todayNews,
      mostViewedNews: mostViewedNews.length === 0 ? "Articoli non trovati" : mostViewedNews,
      communityNews: communityNews.length === 0 ? "Articoli non trovati" : communityNews,
      techNews: techNews.length === 0 ? "Articoli non trovati" : techNews,
    })
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
