const articleSchema = require('../api/models/articleModel');
const moment = require('moment');

const getTodayNews = async (res) => {
  try {
    const today = moment().startOf('day');
    const end = moment(today).endOf('day').toDate();
    const articles = await articleSchema
      .find({
        source: 'newsApi',
        publishedAt: {
          $gte: today.toDate(),
          $lt: end,
        },
      })
      .limit(5);

    // check if exist today articles
    if (Object.keys(articles).length === 0) {
      throw new Error('Abbiamo riscontrato un problema');
    }

    return articles;
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
};

module.exports = getTodayNews;
