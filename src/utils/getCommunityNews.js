const articleSchema = require('../api/models/articleModel');

const getCommunityNews = async () => {
  try {
    const articles = articleSchema
      .find({ category: { $nin: 'tecnologia' }, source: { $nin: 'newsApi' } })
      .limit(3);
    return articles;
  } catch (e) {
    return e;
  }
};

module.exports = getCommunityNews;
