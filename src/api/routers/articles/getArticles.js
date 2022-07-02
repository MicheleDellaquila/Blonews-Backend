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
    const todayNews = await getTodayNews();
    const mostViewedNews = await getMostViewedNews();
    const communityNews = await getCommunityNews();
    const techNews = await getTechNews();

    return res.status(200).send({
      todayNews: todayNews,
      mostViewedNews: mostViewedNews,
      communityNews: communityNews,
      techNews: techNews,
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
});

module.exports = router;
