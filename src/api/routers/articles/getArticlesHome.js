const express = require('express');
const getTodayNews = require('../../../utils/getTodayNews');
const getMostViewedNews = require('../../../utils/getMostViewed');
const getCommunityNews = require('../../../utils/getCommunityNews');
const getTechNews = require('../../../utils/getTechNews');

// router
const router = express.Router();

// get articles home
router.get('/home', async (_, res) => {
  try {
    const todayNews = await getTodayNews(res);
    const mostViewedNews = await getMostViewedNews(res);
    const communityNews = await getCommunityNews(res);
    const techNews = await getTechNews(res);

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
