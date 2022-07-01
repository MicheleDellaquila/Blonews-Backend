const articleSchema = require('../../models/articleModel');

const getTechNews = async () => {
  try {
    const articles = articleSchema.find({ category: 'tecnologia' }).limit(3);
    return articles;
  } catch (e) {
    return e;
  }
};

module.exports = getTechNews;
