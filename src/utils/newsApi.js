const axios = require('axios');
const articleSchema = require('../api/models/articleModel');

const newsApi = async () => {
  const response = await axios({
    method: 'GET',
    url: `https://newsapi.org/v2/top-headlines?country=${process.env.NEWS__LANGUAGE}&apiKey=${process.env.NEWS__ITA_KEY}`,
    data: null,
  });

  // check responses 0 has success of failure
  if (response.status !== 200) {
    console.log('It is not possible to save articles');
    return;
  }

  // create a new articles array
  const articles = response.data.articles.map((article) => {
    return {
      title: article.title,
      image: article.urlToImage,
      description: article.description,
      content: article.content,
      category: article.category || 'notizie__generali',
      externalUrlArticle: article.url,
      publishedAt: article.publishedAt,
      editorialBoard: article.source.name,
      source: 'newsApi',
      author: article.author,
    };
  });
  const isSuccess = await articleSchema.insertMany(articles);

  // check if articles has been save or not
  if (!!isSuccess) {
    console.log('Articles saved');
    return;
  }

  return;
};

module.exports = newsApi;
