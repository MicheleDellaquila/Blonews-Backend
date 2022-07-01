const articleSchema = require('../../models/articleModel');
const moment = require('moment');

const getTodayNews = async () => {
  try {
    const today = moment().startOf('day');
    const end = moment(today).endOf('day').toDate();
    const articles = await articleSchema.find(
      { source: 'newsApi' },
      {
        publishedAt: {
          $gte: today.toDate(),
          $lt: end,
        },
      },
    );

    return articles;
  } catch (e) {
    return e;
  }
};

module.exports = getTodayNews;
