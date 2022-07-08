const articleSchema = require('../api/models/articleModel');

const getMostViewedNews = async (res) => {
  try {
    const articles = await articleSchema.find({}).sort({ views: -1 }).limit(3);

    // check if exist most viewed articles
    if (articles.length === 0) {
      throw new Error('Abbiamo riscontrato un problema');
    }

    return articles;
  } catch (e) {
    return res.status(500).send({
      message: 'Abbiamo riscontrato un problema',
    });
  }
};

module.exports = getMostViewedNews;
