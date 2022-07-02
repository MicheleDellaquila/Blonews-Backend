const articleSchema = require('../api/models/articleModel');

const getMostViewedNews = async () => {
  try {
    const articles = articleSchema.find({}).sort({ views: -1 }).limit(3);
    return articles;
  } catch (e) {
    return e;
  }
};

module.exports = getMostViewedNews;
