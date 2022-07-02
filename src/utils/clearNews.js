const articleSchema = require('../api/models/articleModel');

const clearNews = async () => {
  try {
    const isSuccess = await articleSchema.deleteMany({
      source: 'newsApi',
    });

    if (!!isSuccess) {
      console.log('Articles deleted');
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = clearNews;
