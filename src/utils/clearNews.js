const articleSchema = require('../api/models/articleModel');

const clearNews = async () => {
  try {
    const isSuccess = articleSchema.deleteMany(
      { source: 'newsApi' },
      {
        publishedAt: {
          $lte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        },
      },
    );

    if (!!isSuccess) {
      console.log('Articles deleted');
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = clearNews;
