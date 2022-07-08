const articleSchema = require('../api/models/articleModel');

const getTechNews = async (res) => {
  try {
    const articles = await articleSchema
      .find({ category: 'tecnologia' })
      .limit(3);

    // check if exist tech articles
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

module.exports = getTechNews;
